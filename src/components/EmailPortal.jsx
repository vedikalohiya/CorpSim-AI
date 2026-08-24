import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Mail, Send, Sparkles, Plus, Inbox, CheckCircle2, User } from 'lucide-react';
import { evaluateCommunication } from '../services/aiEngine';

export default function EmailPortal() {
  const { roleData, userProfile, emails, sendEmail } = useWorkspace();
  const [selectedEmail, setSelectedEmail] = useState(emails[0]);
  const [isComposing, setIsComposing] = useState(false);
  const [to, setTo] = useState(roleData.manager.name + " <sarah.jenkins@technova.com>");
  const [subject, setSubject] = useState("Update on Customer Transaction Pipeline Ticket");
  const [body, setBody] = useState(`Hi Sarah,\n\nI am currently finalizing the PySpark clean_transactions logic for ticket TICK-102. I expect to submit the Pull Request by 4:00 PM today.\n\nPlease let me know if you would like me to prioritize any edge cases.\n\nBest regards,\nVedika Lohiya`);
  const [liveEval, setLiveEval] = useState(evaluateCommunication(body, "manager"));

  const handleBodyChange = (e) => {
    const text = e.target.value;
    setBody(text);
    setLiveEval(evaluateCommunication(text, "manager"));
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!body.trim()) return;
    sendEmail(to, subject, body);
    setIsComposing(false);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: 'calc(100vh - 120px)' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Mail size={22} color="#818CF8" />
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>Outlook Email Suite — {userProfile.email}</h2>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Corporate Communication Simulator</div>
          </div>
        </div>
        <button onClick={() => setIsComposing(true)} className="btn-primary">
          <Plus size={16} /> Compose Professional Email
        </button>
      </div>

      {/* Inbox & Email View Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '16px', flex: 1, overflow: 'hidden' }}>
        {/* Inbox List */}
        <div className="glass-panel" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', fontWeight: 700, textTransform: 'uppercase', padding: '4px 8px' }}>
            Inbox ({emails.length})
          </div>

          {emails.map(email => (
            <div
              key={email.id}
              onClick={() => setSelectedEmail(email)}
              className="glass-panel glass-panel-hover"
              style={{
                padding: '12px',
                cursor: 'pointer',
                background: selectedEmail?.id === email.id ? 'rgba(99, 102, 241, 0.15)' : 'rgba(31, 41, 55, 0.4)',
                border: selectedEmail?.id === email.id ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid var(--border-color)'
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 700, color: 'white', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {email.sender.split('<')[0]}
                </span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-subtle)' }}>{email.date}</span>
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#818CF8', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {email.subject}
              </div>
            </div>
          ))}
        </div>

        {/* Email Content Viewer */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          {selectedEmail ? (
            <div>
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white', marginBottom: '8px' }}>{selectedEmail.subject}</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>From: <strong>{selectedEmail.sender}</strong></span>
                  <span>{selectedEmail.date}</span>
                </div>
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                {selectedEmail.body}
              </div>

              {selectedEmail.evalResult && (
                <div className="glass-panel" style={{ marginTop: '24px', padding: '14px', background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                  <div style={{ color: '#818CF8', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={14} /> AI Tone & Etiquette Rating: {selectedEmail.evalResult.score}/100 ({selectedEmail.evalResult.grade})
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {selectedEmail.evalResult.feedback.join(' ')}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '40px' }}>Select an email from inbox.</div>
          )}
        </div>
      </div>

      {/* Compose Email Modal */}
      {isComposing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '700px', padding: '28px', background: '#111827' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>New Corporate Email</h3>
              <button onClick={() => setIsComposing(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>To:</label>
                <input type="text" value={to} onChange={e => setTo(e.target.value)} className="input-field" />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Subject:</label>
                <input type="text" value={subject} onChange={e => setSubject(e.target.value)} className="input-field" />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Message Body:</label>
                <textarea value={body} onChange={handleBodyChange} rows={6} className="input-field" style={{ resize: 'vertical' }} />
              </div>

              {/* Live Tone Bar */}
              <div className="glass-panel" style={{ padding: '12px', background: 'rgba(17, 24, 39, 0.8)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: liveEval.score >= 80 ? '#34D399' : '#F59E0B' }}>
                  <span>AI Tone Score: {liveEval.score}/100</span>
                  <span>{liveEval.grade}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {liveEval.suggestions.join(' ')}
                </div>
              </div>

              <button type="submit" className="btn-primary">
                <Send size={16} /> Send Email
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
