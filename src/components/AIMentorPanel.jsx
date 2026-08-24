import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Bot, Send, Sparkles, Lightbulb, LoaderCircle } from 'lucide-react';
import { askCopilot, QUICK_PROMPTS } from '../services/copilotEngine';

export default function AIMentorPanel() {
  const { roleData, tickets } = useWorkspace();
  const [activePersona, setActivePersona] = useState('Mentor');
  const [messages, setMessages] = useState([
    {
      id: 'm0',
      sender: 'AI Workplace Copilot',
      avatar: '🤖',
      text: `Hello Vedika! I am your AI Workplace Assistant. I know your role (${roleData.title} at ${roleData.company}), active Jira tickets, and sprint status. How can I assist you today?`
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const activeTicket = tickets.find(t => t.status === "In Progress") || tickets[0];

  const handleSend = async (textToSend) => {
    const text = textToSend || inputQuery;
    if (!text.trim()) return;

    const userMsg = { id: `u_${Date.now()}`, sender: 'Vedika (You)', avatar: '👩💻', text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInputQuery('');
    setIsThinking(true);

    const aiRes = await askCopilot(text, messages, roleData, tickets);
    setMessages(prev => [...prev, {
      id: `ai_${Date.now()}`,
      sender: `AI ${activePersona}`,
      avatar: activePersona === 'Manager' ? '👩💼' : activePersona === 'Client' ? '🏦' : '🤖',
      text: aiRes.text,
      tips: aiRes.tips
    }]);
    setIsThinking(false);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: 'calc(100vh - 120px)' }}>
      {/* Header & Persona Selector */}
      <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Bot size={24} color="#818CF8" />
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>AI Workplace Assistant & Copilot</h2>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Context-aware for {roleData.title} • Ticket: {activeTicket ? activeTicket.id : 'N/A'}
            </div>
          </div>
        </div>

        {/* Persona Buttons */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {['Mentor', 'Manager', 'Client', 'HR'].map(p => (
            <button
              key={p}
              onClick={() => setActivePersona(p)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: activePersona === p ? 'var(--primary-indigo)' : 'rgba(255,255,255,0.05)',
                color: 'white',
                border: 'none'
              }}>
              AI {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Feed */}
      <div className="glass-panel" style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', gap: '12px' }}>
            <div style={{ fontSize: '1.6rem' }}>{msg.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: 'white', fontSize: '0.85rem', marginBottom: '4px' }}>{msg.sender}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-main)', background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: 'var(--radius-md)', whiteSpace: 'pre-line', lineHeight: 1.5 }}>
                {msg.text}
              </div>
              {msg.tips && (
                <div style={{ marginTop: '8px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {msg.tips.map((t, idx) => (
                    <span key={idx} className="badge badge-indigo" style={{ fontSize: '0.68rem' }}>
                      <Lightbulb size={10} /> {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isThinking && (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <Bot size={24} color="#818CF8" />
            <span><LoaderCircle size={14} style={{ verticalAlign: 'middle', marginRight: '6px', animation: 'spin 1s linear infinite' }} />Thinking...</span>
          </div>
        )}
      </div>

      {/* Quick Suggestion Prompts */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {QUICK_PROMPTS.slice(0, 6).map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt.text)}
            className="btn-secondary"
            style={{ fontSize: '0.75rem', whiteSpace: 'nowrap', padding: '6px 12px' }}>
            <Sparkles size={12} color="#F59E0B" /> {prompt.text}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={inputQuery}
          onChange={e => setInputQuery(e.target.value)}
          placeholder="Ask your AI Workplace Copilot anything about tickets, deadlines, or comms..."
          className="input-field"
        />
        <button type="submit" className="btn-primary" disabled={isThinking}>
          <Send size={16} /> Send
        </button>
      </form>
    </div>
  );
}
