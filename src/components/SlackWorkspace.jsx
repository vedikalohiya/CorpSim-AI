import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import EmailPortal from './EmailPortal';
import { MessageSquare, Hash, User, Send, Sparkles, Mail } from 'lucide-react';
import { evaluateCommunication } from '../services/aiEngine';

export default function SlackWorkspace() {
  const { roleData, slackMessages, sendSlackMessage } = useWorkspace();
  const [subTab, setSubTab] = useState('slack');
  const [activeChannel, setActiveChannel] = useState('general');
  const [inputMessage, setInputMessage] = useState('');
  const [liveEval, setLiveEval] = useState(evaluateCommunication('', 'general'));

  const channels = [
    { id: 'general', name: 'general', type: 'channel' },
    { id: 'team', name: roleData.teamName.toLowerCase().replace(/\s+/g, '-'), type: 'channel' },
    { id: 'standup', name: 'standup-log', type: 'channel' },
    { id: 'manager', name: `${roleData.manager.name} (Manager)`, type: 'dm', avatar: roleData.manager.avatar },
    { id: 'mentor', name: `${roleData.mentor.name} (Mentor)`, type: 'dm', avatar: roleData.mentor.avatar },
    { id: 'client', name: `${roleData.client.name} (Client)`, type: 'dm', avatar: roleData.client.avatar },
    { id: 'hr', name: `${roleData.hr.name} (HR)`, type: 'dm', avatar: roleData.hr.avatar }
  ];

  const filteredMessages = slackMessages.filter(m => m.channel === activeChannel || (activeChannel === 'general' && !m.channel));

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputMessage(val);
    setLiveEval(evaluateCommunication(val, activeChannel));
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendSlackMessage(activeChannel, inputMessage);
    setInputMessage('');
    setLiveEval(evaluateCommunication('', activeChannel));
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: 'calc(100vh - 120px)' }}>
      {/* Sub Navigation Bar */}
      <div className="glass-panel" style={{ padding: '8px 16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button
          onClick={() => setSubTab('slack')}
          className={subTab === 'slack' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
          <MessageSquare size={14} /> Slack Workplace Channels
        </button>
        <button
          onClick={() => setSubTab('email')}
          className={subTab === 'email' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
          <Mail size={14} /> Outlook Email Portal
        </button>
      </div>

      {subTab === 'email' && <EmailPortal />}

      {subTab === 'slack' && (
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '16px', flex: 1, overflow: 'hidden' }}>
          {/* Channels Sidebar */}
          <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontWeight: 700, color: 'white', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquare size={18} color="#818CF8" /> TechNova Comms
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>Channels</div>
              {channels.filter(c => c.type === 'channel').map(c => (
                <button
                  key={c.id}
                  onClick={() => setActiveChannel(c.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-md)',
                    background: activeChannel === c.id ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                    color: activeChannel === c.id ? 'white' : 'var(--text-muted)',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.825rem',
                    fontWeight: activeChannel === c.id ? 600 : 400
                  }}>
                  <Hash size={14} color={activeChannel === c.id ? '#818CF8' : 'var(--text-muted)'} />
                  {c.name}
                </button>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>Direct Messages</div>
              {channels.filter(c => c.type === 'dm').map(c => (
                <button
                  key={c.id}
                  onClick={() => setActiveChannel(c.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-md)',
                    background: activeChannel === c.id ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                    color: activeChannel === c.id ? 'white' : 'var(--text-muted)',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.825rem',
                    fontWeight: activeChannel === c.id ? 600 : 400
                  }}>
                  <span>{c.avatar}</span>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Hash size={18} color="#818CF8" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white' }}>{activeChannel}</h3>
            </div>

            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredMessages.map(msg => (
                <div key={msg.id} style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ fontSize: '1.6rem' }}>{msg.avatar || '👤'}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span style={{ fontWeight: 700, color: 'white', fontSize: '0.875rem' }}>{msg.sender}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>{msg.time}</span>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-main)', background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: 'var(--radius-md)' }}>
                      {msg.content}
                    </div>

                    {msg.evalResult && (
                      <div style={{ fontSize: '0.725rem', color: '#818CF8', marginTop: '4px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Sparkles size={12} />
                        <span>Comms Rating: <strong>{msg.evalResult.score}/100</strong> ({msg.evalResult.grade})</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} style={{ borderTop: '1px solid var(--border-color)', padding: '14px 20px', background: 'rgba(17, 24, 39, 0.8)' }}>
              {inputMessage.length > 5 && (
                <div style={{ fontSize: '0.75rem', color: liveEval.score >= 80 ? '#34D399' : '#F59E0B', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={12} /> Live Tone Score: <strong>{liveEval.score}/100</strong> ({liveEval.tone})
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={handleInputChange}
                  placeholder={`Message #${activeChannel}...`}
                  className="input-field"
                />
                <button type="submit" className="btn-primary">
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
