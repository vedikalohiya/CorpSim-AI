import React from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Building2, Award, Calendar, Sparkles, RefreshCw, Clock, Play, FastForward, Pause } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenRoleModal, onToggleAIMentor }) {
  const { roleData, overallReadinessScore, sprintDay, currentTimeFormatted, clockSpeed, setClockSpeed } = useWorkspace();

  return (
    <header style={{
      height: '64px',
      background: 'rgba(11, 15, 25, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      {/* Brand & Active Company */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer'
        }} onClick={() => setActiveTab('dashboard')}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--primary-indigo), var(--primary-violet))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: 'var(--shadow-indigo)'
          }}>
            <Building2 size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', background: 'linear-gradient(to right, #FFF, #9CA3AF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              CorpSim <span style={{ color: 'var(--primary-indigo)', WebkitTextFillColor: 'initial' }}>AI</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {roleData.company} • Virtual Workspace
            </div>
          </div>
        </div>

        {/* Role Pill & Switcher */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 12px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '9999px',
          border: '1px solid var(--border-color)'
        }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)' }}>
            Role: <span style={{ color: '#818CF8' }}>{roleData.title}</span>
          </span>
          <button 
            onClick={onOpenRoleModal}
            title="Switch Career Role"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}>
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Live Workday Clock Ticker */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '4px 12px',
          borderRadius: '9999px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 800, color: '#34D399' }}>
            <Clock size={15} color="#34D399" />
            <span>{currentTimeFormatted}</span>
          </div>

          <div style={{ display: 'flex', gap: '4px', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '8px' }}>
            <button
              onClick={() => setClockSpeed(clockSpeed === 1 ? 0 : 1)}
              title={clockSpeed === 0 ? 'Play Clock' : 'Pause Clock'}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              {clockSpeed === 0 ? <Play size={14} color="#34D399" /> : <Pause size={14} color="var(--text-muted)" />}
            </button>
            <button
              onClick={() => setClockSpeed(clockSpeed === 5 ? 1 : 5)}
              title="Fast Forward 5x"
              style={{ background: 'none', border: 'none', color: clockSpeed === 5 ? '#F59E0B' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <FastForward size={14} />
            </button>
          </div>
        </div>

        {/* Sprint Day */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          background: 'rgba(31, 41, 55, 0.5)',
          padding: '6px 12px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)'
        }}>
          <Calendar size={15} color="#F59E0B" />
          <span>Sprint Day <strong>{sprintDay}</strong>/5</span>
        </div>

        {/* Readiness Score */}
        <div 
          onClick={() => setActiveTab('certificate')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(99, 102, 241, 0.12)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            cursor: 'pointer'
          }}>
          <Award size={18} color="#818CF8" />
          <div>
            <div style={{ fontSize: '0.65rem', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: 700 }}>Readiness Score</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#818CF8' }}>{overallReadinessScore}%</div>
          </div>
        </div>

        {/* AI Assistant Button */}
        <button
          onClick={onToggleAIMentor}
          className="btn-primary"
          style={{ padding: '8px 14px', fontSize: '0.8rem' }}>
          <Sparkles size={16} />
          <span>AI Copilot</span>
        </button>
      </div>
    </header>
  );
}
