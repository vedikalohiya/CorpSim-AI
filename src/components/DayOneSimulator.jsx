import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Sun, CheckCircle2, Circle, Send, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { evaluateCommunication } from '../services/aiEngine';

export default function DayOneSimulator({ setActiveTab }) {
  const { roleData, dayOneTasks, completeDayOneTask, sendSlackMessage } = useWorkspace();
  const [introText, setIntroText] = useState(
    `Hi everyone! Excited to join TechNova Solutions as a ${roleData.title} in the ${roleData.department} team. Looking forward to working with Sarah and Alex!`
  );
  const [liveEval, setLiveEval] = useState(evaluateCommunication(introText, "general"));

  const handleTextChange = (e) => {
    const text = e.target.value;
    setIntroText(text);
    setLiveEval(evaluateCommunication(text, "general"));
  };

  const handleSendIntro = () => {
    if (!introText.trim()) return;
    sendSlackMessage("general", introText);
    completeDayOneTask("send_intro");
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel" style={{
        padding: '28px',
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(99, 102, 241, 0.1))',
        border: '1px solid rgba(245, 158, 11, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Sun size={24} color="#F59E0B" />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>
            Day 1 Simulation — Welcome to {roleData.company}!
          </h1>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', maxWidth: '700px' }}>
          Your first day is dedicated to understanding company rules, introducing yourself to teammates, and attending your first 10:00 AM daily stand-up.
        </p>
      </div>

      {/* Task Checklist */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {dayOneTasks.map(task => (
          <div key={task.id} className="glass-panel" style={{
            padding: '20px',
            border: task.completed ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-color)',
            background: task.completed ? 'rgba(16, 185, 129, 0.08)' : 'rgba(31, 41, 55, 0.4)'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
              {task.completed ? (
                <CheckCircle2 size={22} color="#34D399" />
              ) : (
                <Circle size={22} color="var(--text-muted)" />
              )}
              <div>
                <h4 style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>{task.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>{task.subtitle}</p>
              </div>
            </div>
            {!task.completed && task.id === 'info_read' && (
              <button 
                onClick={() => completeDayOneTask('info_read')}
                className="btn-secondary" style={{ width: '100%', marginTop: '12px', fontSize: '0.8rem' }}>
                Mark Handbook Reviewed
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Interactive Task 2: Send Intro Simulator */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} color="#818CF8" /> Task 2: Send Team Introduction (Slack `#general`)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>
              Draft your introduction to Sarah, Alex, and your team:
            </label>
            <textarea
              value={introText}
              onChange={handleTextChange}
              rows={5}
              className="input-field"
              style={{ resize: 'vertical', fontFamily: 'inherit', fontSize: '0.9rem', lineHeight: 1.5 }}
            />

            <button
              onClick={handleSendIntro}
              className="btn-primary"
              style={{ marginTop: '14px' }}>
              <Send size={16} /> Send to Slack `#general`
            </button>
          </div>

          {/* AI Tone & Quality Evaluator Sidebar */}
          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(17, 24, 39, 0.8)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', marginBottom: '10px' }}>
              Live AI Communication Rating
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: liveEval.score >= 80 ? '#34D399' : '#F59E0B' }}>
                {liveEval.score}/100
              </span>
              <span className="badge badge-indigo">{liveEval.grade}</span>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              <strong>Tone:</strong> {liveEval.tone}
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {liveEval.feedback.map((fb, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '6px' }}>
                  <span>💡</span> <span>{fb}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Task 3: Attend Standup */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white' }}>Task 3: Daily Stand-up Sync (10:00 AM)</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            Submit your daily status update to Manager Sarah Jenkins in the Standup Module.
          </p>
        </div>
        <button 
          onClick={() => setActiveTab('standup')}
          className="btn-primary">
          <span>Go to Standup Sync</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
