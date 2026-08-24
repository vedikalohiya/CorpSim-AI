import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Users, Code, GitPullRequest, MessageSquare, ThumbsUp, ThumbsDown, Send, Star } from 'lucide-react';

const PAIR_SESSIONS = [
  {
    id: 'ps1',
    teammate: 'Alex Chen',
    avatar: 'AC',
    role: 'Senior Data Engineer',
    task: 'Debug failing Spark job on prod cluster',
    description: 'Alex is screen sharing the failing PySpark job. He\'s identified a partition skew issue causing executor OOM errors. Your job: help diagnose why partition count is uneven and suggest a fix.',
    hint: 'Try using .repartition() with a hash key on customer_id to distribute load evenly across executors.',
    codeSnippet: `# Failing PySpark job
df = spark.read.parquet("s3://data-lake/transactions/")
df_grouped = df.groupBy("product_id").agg(
    count("*").alias("tx_count"),
    sum("amount").alias("total_amount")
)
# ⚠️ Executor OOM on 3 of 8 nodes
df_grouped.write.parquet("s3://output/product_summary/")`,
    fixSnippet: `# Fixed: Add explicit repartition
df = spark.read.parquet("s3://data-lake/transactions/")
df_repartitioned = df.repartition(200, "customer_id")  # ✅
df_grouped = df_repartitioned.groupBy("product_id").agg(
    count("*").alias("tx_count"),
    sum("amount").alias("total_amount")
)
df_grouped.write.parquet("s3://output/product_summary/")`
  },
  {
    id: 'ps2',
    teammate: 'Priya Sharma',
    avatar: 'PS',
    role: 'Data Analyst',
    task: 'Review Priya\'s SQL query for the sales funnel report',
    description: 'Priya has written a SQL query for the weekly sales funnel report but is getting duplicate rows. She\'s asked you to do a code review and spot the issue.',
    hint: 'The JOIN is missing a DISTINCT or GROUP BY, causing fan-out on the orders table.',
    codeSnippet: `-- Priya's query (has a bug)
SELECT 
  u.user_id, u.name, u.email,
  o.order_id, o.amount, o.created_at
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
LEFT JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.created_at >= '2024-01-01'
ORDER BY o.created_at DESC;`,
    fixSnippet: `-- Fixed: Add DISTINCT to avoid fan-out
SELECT DISTINCT
  u.user_id, u.name, u.email,
  o.order_id, o.amount, o.created_at
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
LEFT JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.created_at >= '2024-01-01'
ORDER BY o.created_at DESC;`
  }
];

export default function TeammateCollab() {
  const { roleData } = useWorkspace();
  const [activeSession, setActiveSession] = useState(null);
  const [showFix, setShowFix] = useState(false);
  const [comment, setComment] = useState('');
  const [prComments, setPRComments] = useState([]);
  const [activeView, setActiveView] = useState('pairing'); // pairing | prs

  const PR_REVIEWS = [
    {
      id: 'pr214', number: '#214', author: 'Alex Chen', avatar: 'AC',
      title: 'Refactor: Spark job partitioning strategy for product_summary',
      branch: 'feature/spark-partition-fix → main',
      filesChanged: 3, additions: 47, deletions: 12,
      status: 'Review Requested',
      lines: [
        { line: 18, code: '  df_grouped = df.groupBy("product_id").agg(...)', comment: '' },
        { line: 21, code: '  df_grouped.write.parquet("s3://output/product_summary/")', comment: '' }
      ]
    }
  ];

  const addComment = () => {
    if (!comment.trim()) return;
    setPRComments(prev => [...prev, { text: comment, ts: new Date().toLocaleTimeString() }]);
    setComment('');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div className="glass-panel" style={{
        padding: '24px 28px',
        background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.06))',
        border: '1px solid rgba(99,102,241,0.25)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
          <Users size={24} color="#818CF8" />
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white' }}>Teammate Collaboration</h1>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Pair programming sessions, peer code reviews, and GitHub PR collaboration with your <strong style={{ color: '#818CF8' }}>{roleData.teamName}</strong> teammates.
        </p>
      </div>

      {/* Sub Tabs */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => setActiveView('pairing')} className={activeView === 'pairing' ? 'btn-primary' : 'btn-secondary'} style={{ fontSize: '0.8rem', padding: '7px 16px' }}>
          <Code size={14} /> Pair Programming Sessions
        </button>
        <button onClick={() => setActiveView('prs')} className={activeView === 'prs' ? 'btn-primary' : 'btn-secondary'} style={{ fontSize: '0.8rem', padding: '7px 16px' }}>
          <GitPullRequest size={14} /> PR Reviews (1 pending)
        </button>
      </div>

      {/* Pair Programming */}
      {activeView === 'pairing' && (
        <div style={{ display: 'grid', gridTemplateColumns: activeSession ? '1fr 1.4fr' : '1fr 1fr', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {PAIR_SESSIONS.map(session => (
              <div
                key={session.id}
                onClick={() => { setActiveSession(session); setShowFix(false); }}
                style={{
                  padding: '18px 20px',
                  background: activeSession?.id === session.id ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.03)',
                  border: activeSession?.id === session.id ? '1px solid rgba(99,102,241,0.45)' : '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '12px', cursor: 'pointer', transition: 'all 0.15s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, color: 'white', fontSize: '0.75rem'
                  }}>{session.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'white', fontSize: '0.875rem' }}>{session.teammate}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{session.role}</div>
                  </div>
                  <span style={{
                    marginLeft: 'auto', background: 'rgba(16,185,129,0.15)',
                    border: '1px solid rgba(16,185,129,0.3)', color: '#34D399',
                    fontSize: '0.6rem', fontWeight: 800, padding: '2px 8px', borderRadius: '8px'
                  }}>LIVE</span>
                </div>
                <div style={{ fontWeight: 600, color: '#C7D2FE', fontSize: '0.825rem' }}>{session.task}</div>
              </div>
            ))}
          </div>

          {activeSession && (
            <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ fontWeight: 800, color: 'white', fontSize: '1rem' }}>{activeSession.task}</h3>
                <button onClick={() => setActiveSession(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>×</button>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.65 }}>{activeSession.description}</p>

              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(148,163,184,0.6)', marginBottom: '6px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  {showFix ? '✅ Fixed Code' : '🐛 Buggy Code — Can You Spot It?'}
                </div>
                <pre style={{
                  background: 'rgba(0,0,0,0.45)', borderRadius: '8px',
                  padding: '14px', fontSize: '0.72rem', color: '#A5F3FC',
                  overflowX: 'auto', border: '1px solid rgba(255,255,255,0.08)',
                  lineHeight: 1.6, margin: 0
                }}>
                  {showFix ? activeSession.fixSnippet : activeSession.codeSnippet}
                </pre>
              </div>

              {!showFix && (
                <div style={{ padding: '10px 14px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '8px', fontSize: '0.78rem', color: '#FCD34D' }}>
                  💡 <strong>Hint:</strong> {activeSession.hint}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setShowFix(true)} className="btn-primary" style={{ flex: 1 }}>
                  <Star size={14} /> Show Fix
                </button>
                <button onClick={() => setShowFix(false)} className="btn-secondary" style={{ flex: 1 }}>
                  <Code size={14} /> Show Bug
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PR Review */}
      {activeView === 'prs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {PR_REVIEWS.map(pr => (
            <div key={pr.id} className="glass-panel" style={{ padding: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <GitPullRequest size={20} color="#8B5CF6" />
                <div>
                  <div style={{ fontWeight: 700, color: 'white', fontSize: '0.95rem' }}>{pr.title}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{pr.branch} · by {pr.author}</div>
                </div>
                <span style={{
                  marginLeft: 'auto', background: 'rgba(245,158,11,0.15)',
                  border: '1px solid rgba(245,158,11,0.3)', color: '#FCD34D',
                  fontSize: '0.65rem', fontWeight: 800, padding: '3px 10px', borderRadius: '8px'
                }}>
                  {pr.status}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.75rem', color: '#34D399' }}>+{pr.additions} additions</span>
                <span style={{ fontSize: '0.75rem', color: '#F87171' }}>−{pr.deletions} deletions</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{pr.filesChanged} files changed</span>
              </div>

              {/* Comment thread */}
              {prComments.length > 0 && (
                <div style={{ marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {prComments.map((c, i) => (
                    <div key={i} style={{
                      padding: '8px 12px', background: 'rgba(99,102,241,0.08)',
                      border: '1px solid rgba(99,102,241,0.2)', borderRadius: '8px',
                      fontSize: '0.78rem', color: 'rgba(203,213,225,0.9)'
                    }}>
                      <strong style={{ color: '#818CF8' }}>You</strong> · {c.ts}: {c.text}
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Leave a review comment..."
                  style={{
                    flex: 1, background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
                    color: 'white', padding: '9px 13px', fontSize: '0.82rem'
                  }}
                />
                <button onClick={addComment} className="btn-secondary"><Send size={14} /></button>
                <button className="btn-primary" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
                  <ThumbsUp size={14} /> Approve
                </button>
                <button className="btn-secondary" style={{ border: '1px solid rgba(239,68,68,0.3)', color: '#F87171' }}>
                  <ThumbsDown size={14} /> Request Changes
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
