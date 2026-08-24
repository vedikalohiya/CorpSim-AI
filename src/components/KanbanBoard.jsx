import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import GitTerminalSimulator from './GitTerminalSimulator';
import DocumentationWiki from './DocumentationWiki';
import { Kanban, Code, Terminal, BookOpen, Send, X, User, Play, Sparkles } from 'lucide-react';
import { executeCodeSandbox } from '../services/codeSandbox';

export default function KanbanBoard({ defaultSubTab = 'board' }) {
  const { tickets, updateTicketStatus, submitTicketSolution, roleData } = useWorkspace();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [solutionCode, setSolutionCode] = useState('');
  const [sandboxResult, setSandboxResult] = useState(null);
  const [subTab, setSubTab] = useState(defaultSubTab);


  const columns = [
    { id: 'To Do', label: 'To Do', color: '#6B7280' },
    { id: 'In Progress', label: 'In Progress', color: '#3B82F6' },
    { id: 'Review', label: 'Code Review', color: '#8B5CF6' },
    { id: 'Done', label: 'Done', color: '#10B981' }
  ];

  const handleOpenTicket = (ticket) => {
    setSelectedTicket(ticket);
    setSolutionCode(ticket.submittedCode || ticket.solutionTemplate || '');
    setSandboxResult(null);
  };

  const handleRunSandbox = () => {
    if (!solutionCode.trim()) return;
    const res = executeCodeSandbox(solutionCode, selectedTicket?.category || 'SQL');
    setSandboxResult(res);
  };

  const handleModalSubmit = () => {
    if (!selectedTicket) return;
    submitTicketSolution(selectedTicket.id, solutionCode);
    setSelectedTicket(null);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header & Sub-Navigation */}
      <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Kanban size={22} color="#6366F1" /> Jira Task Workspace — {roleData.teamName}
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setSubTab('board')}
            className={subTab === 'board' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
            <Kanban size={14} /> Jira Board
          </button>
          <button
            onClick={() => setSubTab('git')}
            className={subTab === 'git' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
            <Terminal size={14} /> Git CLI & PRs
          </button>
          <button
            onClick={() => setSubTab('docs')}
            className={subTab === 'docs' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
            <BookOpen size={14} /> Tech Specs
          </button>
        </div>
      </div>

      {subTab === 'git' && <GitTerminalSimulator />}
      {subTab === 'docs' && <DocumentationWiki />}

      {subTab === 'board' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          alignItems: 'flex-start'
        }}>
          {columns.map(col => {
            const colTickets = tickets.filter(t => t.status === col.id);

            return (
              <div key={col.id} className="glass-panel" style={{
                padding: '16px',
                minHeight: '480px',
                background: 'rgba(17, 24, 39, 0.6)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                  paddingBottom: '10px',
                  borderBottom: '1px solid var(--border-color)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.9rem', color: 'white' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: col.color }} />
                    {col.label}
                  </div>
                  <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                    {colTickets.length}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {colTickets.map(ticket => (
                    <div
                      key={ticket.id}
                      onClick={() => handleOpenTicket(ticket)}
                      className="glass-panel glass-panel-hover"
                      style={{
                        padding: '14px',
                        cursor: 'pointer',
                        background: 'rgba(31, 41, 55, 0.5)',
                        border: ticket.status === 'In Progress' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid var(--border-color)'
                      }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>{ticket.id}</span>
                        <span className={`badge badge-${ticket.priority === 'Critical' ? 'rose' : ticket.priority === 'High' ? 'amber' : 'emerald'}`} style={{ fontSize: '0.65rem' }}>
                          {ticket.priority}
                        </span>
                      </div>

                      <h4 style={{ color: 'white', fontWeight: 600, fontSize: '0.875rem', marginBottom: '8px', lineHeight: 1.3 }}>
                        {ticket.title}
                      </h4>

                      <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Due: <strong>{ticket.dueDate}</strong></span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <User size={12} /> {ticket.assignee}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Ticket Modal */}
      {selectedTicket && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px'
        }}>
          <div className="glass-panel animate-fade-in" style={{
            width: '100%',
            maxWidth: '850px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            background: '#111827',
            border: '1px solid rgba(99, 102, 241, 0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                  <span className="badge badge-indigo">{selectedTicket.id}</span>
                  <span className="badge badge-amber">{selectedTicket.category}</span>
                  <span className="badge badge-violet">Due {selectedTicket.dueDate}</span>
                </div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white' }}>{selectedTicket.title}</h2>
              </div>
              <button onClick={() => setSelectedTicket(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Move Status:</span>
              {columns.map(c => (
                <button
                  key={c.id}
                  onClick={() => updateTicketStatus(selectedTicket.id, c.id)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: selectedTicket.status === c.id ? c.color : 'rgba(255,255,255,0.05)',
                    color: 'white',
                    border: 'none'
                  }}>
                  {c.label}
                </button>
              ))}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '6px' }}>Task Description</h4>
              <p style={{ color: 'white', fontSize: '0.9rem', lineHeight: 1.5 }}>{selectedTicket.description}</p>
            </div>

            <div className="glass-panel" style={{ padding: '16px', background: 'rgba(17, 24, 39, 0.9)', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ color: '#818CF8', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Code size={16} /> Live In-Browser Code & Query Sandbox
                </h4>
                <button onClick={handleRunSandbox} className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem', color: '#34D399', border: '1px solid #10B981' }}>
                  <Play size={12} /> Test Execution
                </button>
              </div>

              <textarea
                value={solutionCode}
                onChange={e => setSolutionCode(e.target.value)}
                rows={6}
                className="input-field"
                style={{ fontFamily: 'monospace', fontSize: '0.85rem', resize: 'vertical' }}
              />

              {sandboxResult && (
                <div style={{ marginTop: '14px', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: sandboxResult.success ? '#34D399' : '#EF4444', marginBottom: '6px' }}>
                    {sandboxResult.message} ({sandboxResult.executionTimeMs}ms)
                  </div>

                  {sandboxResult.rows && (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', fontSize: '0.75rem', borderCollapse: 'collapse', color: 'white' }}>
                        <thead>
                          <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left' }}>
                            {sandboxResult.columns.map((col, idx) => (
                              <th key={idx} style={{ padding: '6px 10px', borderBottom: '1px solid var(--border-color)' }}>{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sandboxResult.rows.map((row, rIdx) => (
                            <tr key={rIdx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} style={{ padding: '6px 10px' }}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              <button 
                onClick={handleModalSubmit}
                className="btn-primary" style={{ marginTop: '14px' }}>
                <Send size={16} /> Submit Solution to Manager {roleData.manager.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
