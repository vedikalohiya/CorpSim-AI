# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## AI Copilot

The AI Workplace Assistant has two modes. Without configuration it uses the built-in workplace knowledge base. For a real general-purpose chatbot that can answer broad questions, connect the included backend to an AI model provider:

```env
AI_API_KEY=your_provider_key
AI_MODEL=gpt-4o-mini
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DATABASE=corpsim
```

Start it with `npm run server`, then set `VITE_AI_API_URL=http://localhost:3001/api/chat` in the frontend environment and restart Vite. The backend uses the OpenAI-compatible Chat Completions API by default; set `AI_API_URL` for another compatible provider. When `MONGODB_URI` is set, chat exchanges are saved in the `chat_messages` collection. Keep provider API keys and MongoDB credentials on the server and never put them in Vite client environment variables.

With `VITE_AI_API_URL` configured, all prompts are sent to the provider, including general questions about science, history, writing, coding, mathematics, and more. The model can answer safe questions broadly, but no AI system can guarantee literally every question or real-time accuracy without web search and appropriate safeguards.

The backend exposes `GET /health` and `POST /api/chat`. The chat endpoint receives `{ messages, context }` and returns `{ message }`.
