import React from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Building2, Users, BookOpen, ShieldCheck, Mail, MessageSquare, Clock, AlertCircle } from 'lucide-react';

export default function CompanyPortal() {
  const { roleData } = useWorkspace();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '24px', background: 'rgba(17, 24, 39, 0.7)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--primary-indigo), var(--primary-violet))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <Building2 size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>{roleData.company}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Enterprise Virtual Corporate Portal • {roleData.department} Department
            </p>
          </div>
        </div>
      </div>

      {/* Org Hierarchy */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={20} color="#818CF8" /> Organization Structure & Hierarchy
        </h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          padding: '20px 0'
        }}>
          {/* Level 1: Manager */}
          <div className="glass-panel" style={{
            padding: '14px 28px',
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            textAlign: 'center',
            width: '280px'
          }}>
            <span style={{ fontSize: '1.8rem' }}>{roleData.manager.avatar}</span>
            <div style={{ fontWeight: 700, color: 'white', fontSize: '0.95rem' }}>{roleData.manager.name}</div>
            <div style={{ fontSize: '0.75rem', color: '#818CF8' }}>{roleData.manager.title}</div>
          </div>

          <div style={{ width: '2px', height: '20px', background: 'var(--border-color-glow)' }} />

          {/* Level 2: Mentor & Teammates */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div className="glass-panel" style={{
              padding: '12px 20px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              textAlign: 'center',
              width: '220px'
            }}>
              <span style={{ fontSize: '1.5rem' }}>{roleData.mentor.avatar}</span>
              <div style={{ fontWeight: 600, color: 'white', fontSize: '0.85rem' }}>{roleData.mentor.name}</div>
              <div style={{ fontSize: '0.7rem', color: '#34D399' }}>{roleData.mentor.title} (Mentor)</div>
            </div>

            {roleData.teammates.map((tm, idx) => (
              <div key={idx} className="glass-panel" style={{
                padding: '12px 20px',
                background: 'rgba(31, 41, 55, 0.5)',
                textAlign: 'center',
                width: '180px'
              }}>
                <span style={{ fontSize: '1.5rem' }}>{tm.avatar}</span>
                <div style={{ fontWeight: 600, color: 'white', fontSize: '0.85rem' }}>{tm.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{tm.role}</div>
              </div>
            ))}
          </div>

          <div style={{ width: '2px', height: '20px', background: 'var(--border-color-glow)' }} />

          {/* Level 3: You */}
          <div className="glass-panel" style={{
            padding: '14px 28px',
            background: 'linear-gradient(135deg, var(--primary-indigo), var(--primary-violet))',
            textAlign: 'center',
            width: '260px',
            boxShadow: 'var(--shadow-indigo)'
          }}>
            <span style={{ fontSize: '1.8rem' }}>👩💻</span>
            <div style={{ fontWeight: 800, color: 'white', fontSize: '1rem' }}>Vedika Lohiya (You)</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.85)' }}>{roleData.title}</div>
          </div>
        </div>
      </div>

      {/* Corporate Handbook */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={20} color="#F59E0B" /> Corporate Handbook & Rules of Engagement
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          <div className="glass-panel" style={{ padding: '16px' }}>
            <h4 style={{ color: '#818CF8', fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} /> Working Hours & Standups
            </h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Core hours are 9:00 AM - 5:00 PM. Daily 10:00 AM Standups are mandatory. Keep updates under 2 minutes: Yesterday, Today, Blockers.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '16px' }}>
            <h4 style={{ color: '#34D399', fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MessageSquare size={16} /> Slack & Teams Etiquette
            </h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Use DMs for 1-on-1 questions. Use channel tags like `@here` sparingly. Always acknowledge manager messages within 30 minutes during core hours.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '16px' }}>
            <h4 style={{ color: '#FBBF24', fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertCircle size={16} /> Missed Deadlines Policy
            </h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Encountering a delay is normal—silent delays are unpardonable. Notify Manager Sarah at least 6 hours before deadline with root cause & revised ETA.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
