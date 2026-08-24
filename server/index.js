import http from 'node:http';
import { MongoClient } from 'mongodb';

const port = Number(process.env.PORT || 3001);
const providerUrl = process.env.AI_API_URL || 'https://api.openai.com/v1/chat/completions';
const apiKey = process.env.AI_API_KEY;
const model = process.env.AI_MODEL || 'gpt-4o-mini';
const mongoUri = process.env.MONGODB_URI;
const mongoDatabase = process.env.MONGODB_DATABASE || 'corpsim';
let chatCollectionPromise;

function getChatCollection() {
  if (!mongoUri) return null;
  if (!chatCollectionPromise) {
    chatCollectionPromise = (async () => {
      const client = new MongoClient(mongoUri, { serverSelectionTimeoutMS: 3000 });
      await client.connect();
      return client.db(mongoDatabase).collection('chat_messages');
    })();
  }
  return chatCollectionPromise;
}

async function saveConversation(requestBody, assistantMessage) {
  const collection = getChatCollection();
  if (!collection) return;

  try {
    await (await collection).insertOne({
      messages: requestBody.messages,
      assistantMessage,
      context: requestBody.context || {},
      createdAt: new Date()
    });
  } catch (error) {
    console.error('MongoDB persistence failed:', error.message);
    chatCollectionPromise = null;
  }
}

function sendJson(response, status, body) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  });
  response.end(JSON.stringify(body));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', chunk => {
      body += chunk;
      if (body.length > 200_000) reject(new Error('Request body is too large'));
    });
    request.on('end', () => resolve(body));
    request.on('error', reject);
  });
}

const server = http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {});
    return;
  }

  if (request.method === 'GET' && request.url === '/health') {
    sendJson(response, 200, {
      ok: true,
      providerConfigured: Boolean(apiKey),
      databaseConfigured: Boolean(mongoUri)
    });
    return;
  }

  if (request.method !== 'POST' || request.url !== '/api/chat') {
    sendJson(response, 404, { error: 'Not found' });
    return;
  }

  if (!apiKey) {
    sendJson(response, 503, { error: 'AI_API_KEY is not configured on the server' });
    return;
  }

  try {
    const requestBody = JSON.parse(await readBody(request));
    if (!Array.isArray(requestBody.messages) || requestBody.messages.length === 0) {
      sendJson(response, 400, { error: 'messages must be a non-empty array' });
      return;
    }

    const providerResponse = await fetch(providerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: requestBody.messages,
        temperature: 0.7
      })
    });

    const providerBody = await providerResponse.json();
    if (!providerResponse.ok) {
      sendJson(response, providerResponse.status, {
        error: providerBody.error?.message || 'AI provider request failed'
      });
      return;
    }

    const message = providerBody.choices?.[0]?.message?.content;
    if (!message) {
      sendJson(response, 502, { error: 'AI provider returned no message' });
      return;
    }

    await saveConversation(requestBody, message);
    sendJson(response, 200, { message });
  } catch (error) {
    console.error('Chat request failed:', error.message);
    sendJson(response, 500, { error: 'Unable to process AI request' });
  }
});

server.listen(port, () => {
  console.log(`AI backend listening on http://localhost:${port}`);
});
