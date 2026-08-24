import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { ShieldCheck, Lock, Headphones, DollarSign, UserCheck, Clock, RefreshCw } from 'lucide-react';
import { toggleAmbientOfficeAudio } from '../services/ambientAudio';

export default function WorkplaceOSHeader({ onOpenEmployeeID }) {
  const { userProfile, overallReadinessScore } = useWorkspace();
  const [audioActive, setAudioActive] = useState(false);

  const handleAudioToggle = () => {
    const active = toggleAmbientOfficeAudio();
    setAudioActive(active);
  };

  return (
    <div style={{
      height: '32px',
      background: '#04070D',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      fontSize: '0.725rem',
      color: 'var(--text-muted)',
      zIndex: 50
    }}>
      {/* Left Proxy & VPN Indicators */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34D399', fontWeight: 600 }}>
          <Lock size={12} color="#34D399" />
          <span>VPN Connected: <strong>TechNova-US-East-1 (256-bit AES)</strong></span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-subtle)' }}>
          <ShieldCheck size={12} color="#818CF8" />
          <span>IT Compliance: <strong>PASSED</strong></span>
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Ambient Sound Toggle */}
        <button
          onClick={handleAudioToggle}
          title="Toggle Ambient Office Soundscape"
          style={{
            background: audioActive ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
            border: audioActive ? '1px solid #10B981' : 'none',
            color: audioActive ? '#34D399' : 'var(--text-muted)',
            cursor: 'pointer',
            padding: '2px 8px',
            borderRadius: '9999px',
            fontSize: '0.7rem',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
          <Headphones size={12} />
          <span>{audioActive ? 'Office Audio: ON' : 'Office Audio: OFF'}</span>
        </button>

        {/* Daily Payroll */}
        <div style={{ color: '#34D399', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
          <DollarSign size={12} />
          <span>$45.00/hr ($360/day)</span>
        </div>

        {/* Employee ID Trigger */}
        <button
          onClick={onOpenEmployeeID}
          style={{
            background: 'rgba(99, 102, 241, 0.2)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            color: '#818CF8',
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            fontSize: '0.7rem',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
          <UserCheck size={12} />
          <span>ID: #EMP-8942</span>
        </button>
      </div>
    </div>
  );
}
