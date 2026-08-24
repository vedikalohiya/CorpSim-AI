import React from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Award, CheckCircle2, Star, Users, MessageSquare } from 'lucide-react';

export default function Feedback360() {
  const { roleData, overallReadinessScore, metrics } = useWorkspace();

  const reviews = [
    {
      reviewer: roleData.manager.name,
      role: 'Manager (VP of Data)',
      avatar: roleData.manager.avatar,
      rating: 4.8,
      comment: 'Vedika has shown exceptional growth in sprint task execution and proactive blocker communication. Her PySpark staging code merged cleanly with zero production regressions.'
    },
    {
      reviewer: roleData.mentor.name,
      role: 'Senior Data Architect (Mentor)',
      avatar: roleData.mentor.avatar,
      rating: 4.9,
      comment: 'Great grasp of SQL indexing and CTE pipeline patterns. She asks the right questions during pair programming sessions and writes clean, well-commented code.'
    },
    {
      reviewer: 'Priya Sharma',
      role: 'Peer / Mid Data Engineer',
      avatar: '👩💻',
      rating: 4.7,
      comment: 'A true team player! Very responsive in Slack `#general` channel and always attends daily 10:00 AM standups prepared.'
    }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.1))', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Award size={28} color="#A78BFA" />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>
            Quarterly 360-Degree Performance Review & Feedback
          </h1>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Consolidated workplace performance evaluation from your Manager, Senior Mentor, and Teammates.
        </p>
      </div>

      {/* 360 Reviews Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {reviews.map((rev, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '20px', background: 'rgba(31, 41, 55, 0.4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.8rem' }}>{rev.avatar}</span>
                <div>
                  <h4 style={{ fontWeight: 700, color: 'white', fontSize: '0.95rem' }}>{rev.reviewer}</h4>
                  <div style={{ fontSize: '0.75rem', color: '#818CF8' }}>{rev.role}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F59E0B', fontWeight: 800 }}>
                <Star size={16} fill="#F59E0B" /> {rev.rating} / 5.0
              </div>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: 1.5, background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: 'var(--radius-md)' }}>
              "{rev.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
