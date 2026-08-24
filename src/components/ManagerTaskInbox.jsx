import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { ClipboardList, Clock, AlertCircle, CheckCircle2, MessageSquare, ChevronRight, Send } from 'lucide-react';

const MANAGER_TASKS = [
  {
    id: 'mt1',
    priority: 'HIGH',
    title: 'Prepare Q3 ETL pipeline performance summary',
    description: 'Sarah needs a written summary (under 300 words) of the ETL pipeline performance metrics for Q3 before the 2:00 PM leadership call. Pull figures from the Data Warehouse and include error rate, throughput, and SLA compliance.',
    dueBy: '2:00 PM Today',
    channel: 'Email',
    status: 'Pending'
  },
  {
    id: 'mt2',
    priority: 'MEDIUM',
    title: 'Review Alex\'s pull request for the Spark job refactor',
    description: 'Alex has opened PR #214 on GitHub. Sarah wants you to do a thorough code review — check for data type mismatches, partition skew, and add inline comments for any issues you find before end of day.',
    dueBy: '5:00 PM Today',
    channel: 'GitHub',
    status: 'Pending'
  },
  {
    id: 'mt3',
    priority: 'LOW',
    title: 'Update onboarding wiki page with new tooling',
    description: 'The team is now using dbt Cloud instead of raw SQL transforms. Update the Confluence onboarding page to reflect this change so future new joiners have accurate documentation.',
    dueBy: 'End of Week',
    channel: 'Confluence',
    status: 'Pending'
  }
];

const PRIORITY_COLORS = {
  HIGH: { bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.35)', text: '#F87171', dot: '#EF4444' },
  MEDIUM: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.35)', text: '#FCD34D', dot: '#F59E0B' },
  LOW: { bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.35)', text: '#818CF8', dot: '#6366F1' }
};

export default function ManagerTaskInbox() {
  const { roleData } = useWorkspace();
  const [tasks, setTasks] = useState(MANAGER_TASKS);
  const [activeTask, setActiveTask] = useState(null);
  const [reply, setReply] = useState('');
  const [sentReplies, setSentReplies] = useState({});

  const markDone = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'Done' } : t));
    if (activeTask?.id === id) setActiveTask(prev => ({ ...prev, status: 'Done' }));
  };

  const sendReply = (taskId) => {
    if (!reply.trim()) return;
    setSentReplies(prev => ({ ...prev, [taskId]: reply }));
    setReply('');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div className="glass-panel" style={{
        padding: '24px 28px',
        background: 'linear-gradient(135deg, rgba(239,68,68,0.08), rgba(99,102,241,0.06))',
        border: '1px solid rgba(239,68,68,0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
          <ClipboardList size={24} color="#F87171" />
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white' }}>
            Manager Task Inbox
          </h1>
          <span style={{
            background: '#EF4444', color: 'white',
            borderRadius: '10px', fontSize: '0.65rem',
            fontWeight: 800, padding: '2px 8px'
          }}>
            {tasks.filter(t => t.status === 'Pending').length} PENDING
          </span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Directives assigned to you by <strong style={{ color: '#F87171' }}>{roleData.manager.name}</strong> — VP of Data & Analytics. Respond promptly to show professionalism.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: activeTask ? '1fr 1fr' : '1fr', gap: '20px' }}>
        {/* Task List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {tasks.map(task => {
            const p = PRIORITY_COLORS[task.priority];
            const isSelected = activeTask?.id === task.id;
            return (
              <div
                key={task.id}
                onClick={() => setActiveTask(task)}
                style={{
                  padding: '18px 20px',
                  background: isSelected ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.03)',
                  border: isSelected ? '1px solid rgba(99,102,241,0.45)' : `1px solid ${p.border}`,
                  borderLeft: `4px solid ${p.dot}`,
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      background: p.bg, color: p.text, border: `1px solid ${p.border}`,
                      fontSize: '0.6rem', fontWeight: 800, padding: '2px 7px', borderRadius: '6px'
                    }}>
                      {task.priority}
                    </span>
                    <span style={{
                      background: 'rgba(255,255,255,0.05)', color: 'rgba(148,163,184,0.7)',
                      fontSize: '0.65rem', padding: '2px 7px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)'
                    }}>
                      via {task.channel}
                    </span>
                  </div>
                  {task.status === 'Done'
                    ? <CheckCircle2 size={16} color="#22C55E" />
                    : <Clock size={14} color="rgba(148,163,184,0.5)" />
                  }
                </div>

                <div style={{ fontWeight: 700, color: task.status === 'Done' ? 'rgba(203,213,225,0.5)' : 'white', fontSize: '0.9rem', marginBottom: '6px', textDecoration: task.status === 'Done' ? 'line-through' : 'none' }}>
                  {task.title}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: task.priority === 'HIGH' ? '#F87171' : 'rgba(148,163,184,0.6)', fontSize: '0.75rem' }}>
                  {task.priority === 'HIGH' && <AlertCircle size={12} />}
                  <Clock size={11} />
                  Due: {task.dueBy}
                  <ChevronRight size={14} style={{ marginLeft: 'auto', color: 'rgba(99,102,241,0.6)' }} />
                </div>

                {sentReplies[task.id] && (
                  <div style={{
                    marginTop: '8px', padding: '6px 10px',
                    background: 'rgba(16,185,129,0.1)', borderRadius: '6px',
                    fontSize: '0.72rem', color: '#34D399'
                  }}>
                    ✓ Replied: "{sentReplies[task.id]}"
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Task Detail Panel */}
        {activeTask && (
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'white', flex: 1, marginRight: '12px' }}>
                {activeTask.title}
              </h2>
              <button onClick={() => setActiveTask(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
            </div>

            {/* Manager Card */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px', background: 'rgba(255,255,255,0.04)',
              borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, color: 'white', fontSize: '0.85rem'
              }}>
                {roleData.manager.avatar}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'white', fontSize: '0.85rem' }}>{roleData.manager.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>VP of Data & Analytics · TechNova Solutions</div>
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.7 }}>
              {activeTask.description}
            </p>

            <div style={{ padding: '10px 14px', background: 'rgba(245,158,11,0.08)', borderRadius: '8px', border: '1px solid rgba(245,158,11,0.2)', fontSize: '0.8rem', color: '#FCD34D' }}>
              ⏰ Due: <strong>{activeTask.dueBy}</strong>
            </div>

            {/* Reply Box */}
            {activeTask.status !== 'Done' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(148,163,184,0.8)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <MessageSquare size={12} style={{ marginRight: '4px' }} />
                  Reply to {roleData.manager.name}
                </label>
                <textarea
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  placeholder={`Hi ${roleData.manager.name},\n\nThank you for the task. I will...`}
                  rows={4}
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
                    color: 'white', padding: '12px', fontSize: '0.82rem',
                    resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box'
                  }}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => sendReply(activeTask.id)}
                    className="btn-primary"
                    style={{ flex: 1 }}
                  >
                    <Send size={14} /> Send Reply
                  </button>
                  <button
                    onClick={() => markDone(activeTask.id)}
                    className="btn-secondary"
                    style={{ flex: 1 }}
                  >
                    <CheckCircle2 size={14} /> Mark Done
                  </button>
                </div>
              </div>
            )}

            {activeTask.status === 'Done' && (
              <div style={{ padding: '16px', background: 'rgba(16,185,129,0.1)', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.3)', textAlign: 'center', color: '#34D399', fontWeight: 700 }}>
                ✓ Task Completed
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
