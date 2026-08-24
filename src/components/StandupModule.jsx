import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import MeetingsHub from './MeetingsHub';
import { Users, Clock, Send, Sparkles, Video } from 'lucide-react';

export default function StandupModule() {
  const { roleData, standupHistory, submitStandup } = useWorkspace();
  const [subTab, setSubTab] = useState('standup');
  const [yesterday, setYesterday] = useState('');
  const [today, setToday] = useState('');
  const [blockers, setBlockers] = useState('No blockers currently.');
  const [lastEval, setLastEval] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!yesterday.trim() || !today.trim()) return;
    const res = submitStandup({ yesterday, today, blockers });
    setLastEval(res);
    setYesterday('');
    setToday('');
    setBlockers('No blockers currently.');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Sub Navigation Bar */}
      <div className="glass-panel" style={{ padding: '8px 16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button
          onClick={() => setSubTab('standup')}
          className={subTab === 'standup' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
          <Users size={14} /> 10:00 AM Standup Sync
        </button>
        <button
          onClick={() => setSubTab('meetings')}
          className={subTab === 'meetings' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
          <Video size={14} /> Virtual Voice Meetings
        </button>
      </div>

      {subTab === 'meetings' && <MeetingsHub />}

      {subTab === 'standup' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Header */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Users size={24} color="#818CF8" />
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>
                Daily 10:00 AM Stand-up Sync — {roleData.teamName}
              </h1>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Stand-ups keep your team synchronized. Answer 3 key questions concisely every morning.
            </p>
          </div>

          {/* Standup Form */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} color="#F59E0B" /> Today's Standup Submission
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                  1. What did you work on yesterday?
                </label>
                <input
                  type="text"
                  value={yesterday}
                  onChange={e => setYesterday(e.target.value)}
                  placeholder="e.g. Created staging table DDL for ticket TICK-101."
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                  2. What will you work on today?
                </label>
                <input
                  type="text"
                  value={today}
                  onChange={e => setToday(e.target.value)}
                  placeholder="e.g. Write PySpark clean_transactions logic for TICK-102."
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                  3. Do you have any blockers or impediments?
                </label>
                <input
                  type="text"
                  value={blockers}
                  onChange={e => setBlockers(e.target.value)}
                  placeholder="e.g. None currently / Waiting on DB access permissions from IT."
                  className="input-field"
                />
              </div>

              <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                <Send size={16} /> Submit Standup to Manager {roleData.manager.name}
              </button>
            </form>

            {lastEval && (
              <div className="glass-panel" style={{ marginTop: '20px', padding: '16px', background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#818CF8', fontWeight: 700, marginBottom: '6px' }}>
                  <Sparkles size={16} /> Manager Feedback ({lastEval.score}/100 - {lastEval.grade})
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                  {lastEval.feedback.join(' ')}
                </div>
              </div>
            )}
          </div>

          {/* History Log */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '16px' }}>Past Standup Entries</h3>
            {standupHistory.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No standup logs yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {standupHistory.map(entry => (
                  <div key={entry.id} className="glass-panel" style={{ padding: '14px', background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginBottom: '4px' }}>{entry.date}</div>
                    <div style={{ fontSize: '0.85rem', color: 'white' }}>
                      <strong>Yesterday:</strong> {entry.yesterday} | <strong>Today:</strong> {entry.today} | <strong>Blockers:</strong> {entry.blockers}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
