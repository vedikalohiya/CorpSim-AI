import React from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { ShieldCheck, Building2, Clock, DollarSign, X, CheckCircle2 } from 'lucide-react';

export default function EmployeeIDModal({ isOpen, onClose }) {
  const { roleData, userProfile, overallReadinessScore } = useWorkspace();

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 120,
      padding: '20px'
    }}>
      <div className="glass-panel animate-fade-in" style={{
        width: '100%',
        maxWidth: '480px',
        padding: '28px',
        background: 'linear-gradient(135deg, #0F172A, #1E1B4B)',
        border: '2px solid rgba(99, 102, 241, 0.5)',
        boxShadow: 'var(--shadow-indigo)',
        borderRadius: 'var(--radius-xl)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={20} color="#818CF8" />
            <span style={{ fontWeight: 800, color: 'white', letterSpacing: '0.05em', fontSize: '0.9rem' }}>
              TECHNOVA SOLUTIONS • EMPLOYEE ID
            </span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Badge Card Layout */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '90px',
            height: '110px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--primary-indigo), var(--primary-violet))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            border: '2px solid rgba(255,255,255,0.2)'
          }}>
            👩💻
          </div>

          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'white', marginBottom: '4px' }}>{userProfile.name}</h2>
            <div style={{ fontSize: '0.85rem', color: '#38BDF8', fontWeight: 700 }}>{roleData.title}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{roleData.department}</div>

            <div style={{ marginTop: '8px', display: 'flex', gap: '6px' }}>
              <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>ID: #EMP-8942</span>
              <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>Level 2 Access</span>
            </div>
          </div>
        </div>

        {/* Timecard & Payroll Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          <div className="glass-panel" style={{ padding: '12px', background: 'rgba(255,255,255,0.03)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', uppercase: true, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} color="#F59E0B" /> Today's Shift Log
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'white', marginTop: '4px' }}>8.0 Hours Worked</div>
            <div style={{ fontSize: '0.7rem', color: '#34D399' }}>09:00 AM - 05:00 PM</div>
          </div>

          <div className="glass-panel" style={{ padding: '12px', background: 'rgba(255,255,255,0.03)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', uppercase: true, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <DollarSign size={12} color="#34D399" /> Simulated Daily Pay
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#34D399', marginTop: '4px' }}>$360.00 / Day</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Rate: $45.00 / hr</div>
          </div>
        </div>

        {/* Security Compliance Verification */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#34D399', background: 'rgba(16, 185, 129, 0.1)', padding: '10px 14px', borderRadius: 'var(--radius-md)' }}>
          <ShieldCheck size={16} />
          <span>Active Employee • Security Clearance Verified • Corporate Ready ({overallReadinessScore}%)</span>
        </div>
      </div>
    </div>
  );
}
