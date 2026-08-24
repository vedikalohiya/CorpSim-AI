import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Terminal, GitBranch, GitPullRequest, CheckCircle2, Send, Plus } from 'lucide-react';

export default function GitTerminalSimulator() {
  const { gitState, addGitCommit, createPullRequest, roleData } = useWorkspace();
  const [commandInput, setCommandInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', text: 'CorpSim Git CLI v2.4.0 — Connected to repository github.com/technova/customer-analytics-etl' },
    { type: 'system', text: 'Type "git status", "git checkout -b feature/etl-clean", "git add .", "git commit -m \"...\"", or "git push"' }
  ]);
  const [activeSubTab, setActiveSubTab] = useState('terminal');
  const [prTitle, setPrTitle] = useState('feat(etl): PySpark staging clean logic for TICK-102');
  const [prDesc, setPrDesc] = useState('Filters out negative transaction amounts and null customer IDs. Ready for code review.');

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = commandInput.trim();
    if (!cmd) return;

    const newHistory = [...terminalHistory, { type: 'input', text: `$ ${cmd}` }];

    if (cmd === 'git status') {
      newHistory.push({ type: 'output', text: `On branch ${gitState.currentBranch}\nChanges to be committed:\n  modified: src/etl/clean_transactions.py\n  modified: sql/staging_schema.sql` });
    } else if (cmd.startsWith('git checkout -b')) {
      const branchName = cmd.split('git checkout -b')[1].trim();
      newHistory.push({ type: 'output', text: `Switched to a new branch '${branchName}'` });
    } else if (cmd === 'git add .') {
      newHistory.push({ type: 'output', text: 'staged 2 files for commit.' });
    } else if (cmd.startsWith('git commit')) {
      const match = cmd.match(/git commit -m ["'](.+)["']/);
      const msg = match ? match[1] : 'Update pipeline files';
      addGitCommit(msg);
      newHistory.push({ type: 'output', text: `[${gitState.currentBranch} a1f4d92] ${msg}\n 2 files changed, 48 insertions(+)` });
    } else if (cmd.startsWith('git push')) {
      newHistory.push({ type: 'output', text: `Enumerating objects: 5, done.\nWriting objects: 100% (5/5), 1.2 KiB | 1.2 MiB/s, done.\nTo github.com/technova/customer-analytics-etl.git\n * [new branch] ${gitState.currentBranch} -> ${gitState.currentBranch}` });
      newHistory.push({ type: 'system', text: '🎉 Branch pushed! Switch to the Pull Requests tab to open a PR for Alex Chen.' });
    } else {
      newHistory.push({ type: 'output', text: `command not recognized: ${cmd}. Try "git status", "git add .", "git commit -m \"...\"", or "git push"` });
    }

    setTerminalHistory(newHistory);
    setCommandInput('');
  };

  const handleCreatePR = (e) => {
    e.preventDefault();
    createPullRequest(prTitle, prDesc);
    setActiveSubTab('prs');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: 'calc(100vh - 120px)' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Terminal size={22} color="#10B981" />
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>Git & GitHub Simulator</h2>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Branch: {gitState.currentBranch} • Repo: technova/customer-analytics</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveSubTab('terminal')}
            className={activeSubTab === 'terminal' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.8rem' }}>
            <Terminal size={14} /> Git Terminal
          </button>
          <button
            onClick={() => setActiveSubTab('prs')}
            className={activeSubTab === 'prs' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.8rem' }}>
            <GitPullRequest size={14} /> Pull Requests ({gitState.pullRequests.length})
          </button>
        </div>
      </div>

      {activeSubTab === 'terminal' ? (
        <div className="glass-panel" style={{ flex: 1, padding: '20px', background: '#090D16', border: '1px solid #10B981', display: 'flex', flexDirection: 'column' }}>
          {/* Output Terminal */}
          <div style={{ flex: 1, overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {terminalHistory.map((item, idx) => (
              <div key={idx} style={{ color: item.type === 'input' ? '#38BDF8' : item.type === 'system' ? '#F59E0B' : '#A78BFA' }}>
                {item.text}
              </div>
            ))}
          </div>

          {/* CLI Form */}
          <form onSubmit={handleCommandSubmit} style={{ display: 'flex', gap: '10px', marginTop: '14px', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
            <span style={{ color: '#10B981', fontWeight: 700, fontFamily: 'monospace', alignSelf: 'center' }}>$</span>
            <input
              type="text"
              value={commandInput}
              onChange={e => setCommandInput(e.target.value)}
              placeholder="Type git status, git commit -m 'message', git push..."
              className="input-field"
              style={{ fontFamily: 'monospace' }}
            />
            <button type="submit" className="btn-primary">Execute</button>
          </form>
        </div>
      ) : (
        <div className="glass-panel" style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
          {/* Create PR Form */}
          <div className="glass-panel" style={{ padding: '20px', background: 'rgba(17, 24, 39, 0.8)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: '12px' }}>Open a GitHub Pull Request</h3>
            <form onSubmit={handleCreatePR} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="text" value={prTitle} onChange={e => setPrTitle(e.target.value)} className="input-field" />
              <textarea value={prDesc} onChange={e => setPrDesc(e.target.value)} rows={3} className="input-field" />
              <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                <GitPullRequest size={16} /> Create Pull Request & Request Review from {roleData.mentor.name}
              </button>
            </form>
          </div>

          {/* Active PR List */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: '12px' }}>Open Pull Requests</h3>
            {gitState.pullRequests.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No open pull requests yet.</p>
            ) : (
              gitState.pullRequests.map(pr => (
                <div key={pr.id} className="glass-panel" style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 700, color: 'white' }}>{pr.id}: {pr.title}</span>
                    <span className="badge badge-emerald">Approved & Merged by {pr.reviewer}</span>
                  </div>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>{pr.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
