import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { roles } from '../data/rolesData';
import { UserCheck, Briefcase, Building2, Mail, Hash, CheckCircle2 } from 'lucide-react';

export default function RoleAssignment() {
  const { roleData, selectedRoleId, switchRole } = useWorkspace();
  const [showOffer, setShowOffer] = useState(true);
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => setAccepted(true);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div className="glass-panel" style={{
        padding: '24px 28px',
        background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(99,102,241,0.06))',
        border: '1px solid rgba(16,185,129,0.25)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
          <UserCheck size={24} color="#34D399" />
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white' }}>Role Assignment</h1>
          {accepted && (
            <span style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.35)', color: '#34D399', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '8px' }}>
              ✓ OFFER ACCEPTED
            </span>
          )}
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Your official job offer letter and role details from TechNova Solutions HR.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Offer Letter */}
        <div className="glass-panel" style={{ padding: '32px', fontFamily: 'Georgia, serif' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>TechNova Solutions</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Technology & Innovation · Bengaluru, India</div>
            <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #6366F1, transparent)', margin: '16px 0' }} />
          </div>

          <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '20px' }}>
            Date: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
          </div>

          <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '6px' }}>To,</div>
          <div style={{ color: 'white', fontWeight: 700, fontSize: '1.05rem', marginBottom: '4px' }}>Ms. Vedika Lohiya</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '20px' }}>vedika.lohiya@gmail.com</div>

          <div style={{ color: 'white', fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>
            Subject: Offer of Employment — {roleData.title}, {roleData.department}
          </div>

          <div style={{ color: 'rgba(203,213,225,0.85)', fontSize: '0.875rem', lineHeight: 1.8, marginBottom: '20px' }}>
            <p>Dear Vedika,</p>
            <br />
            <p>
              We are delighted to extend this offer of employment to join <strong style={{ color: 'white' }}>TechNova Solutions</strong> as a <strong style={{ color: '#818CF8' }}>{roleData.title}</strong> within the <strong style={{ color: '#818CF8' }}>{roleData.department}</strong> team.
            </p>
            <br />
            <p>
              You will report directly to <strong style={{ color: 'white' }}>{roleData.manager.name}</strong>, VP of Data & Analytics, and will work alongside a world-class team of engineers, analysts, and architects in our Bengaluru Technology Centre.
            </p>
            <br />
            <p>
              Your role will involve {roleData.description}. You will be part of an Agile Scrum team, participating in daily standups, sprint planning, retrospectives, and bi-weekly stakeholder reviews.
            </p>
            <br />
            <p>
              Your Employee ID has been provisioned as <strong style={{ color: '#38BDF8' }}>#EMP-8942</strong>. Your first week onboarding schedule will be shared via your corporate email: <strong style={{ color: '#38BDF8' }}>vedika.lohiya@technova.com</strong>.
            </p>
            <br />
            <p>
              We look forward to welcoming you to the TechNova family. Please digitally sign and confirm your acceptance below.
            </p>
            <br />
            <p>Warm regards,</p>
            <p><strong style={{ color: 'white' }}>{roleData.hr.name}</strong><br />
            Human Resources · TechNova Solutions</p>
          </div>

          {!accepted ? (
            <button onClick={handleAccept} className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '0.95rem', fontFamily: 'Inter, sans-serif' }}>
              <CheckCircle2 size={18} /> I Accept This Offer — Sign & Confirm
            </button>
          ) : (
            <div style={{ padding: '14px', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.35)', borderRadius: '10px', textAlign: 'center', color: '#34D399', fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>
              ✓ Digitally Signed by Vedika Lohiya · {new Date().toLocaleString()}
            </div>
          )}
        </div>

        {/* Role Details Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'rgba(148,163,184,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>Role Details</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { icon: Briefcase, label: 'Title', value: roleData.title },
                { icon: Building2, label: 'Department', value: roleData.department },
                { icon: Mail, label: 'Corporate Email', value: 'vedika.lohiya@technova.com' },
                { icon: Hash, label: 'Employee ID', value: '#EMP-8942' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={15} color="#6366F1" />
                  <div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{label}</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'white' }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Switch Role */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'rgba(148,163,184,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Switch Role Simulation</div>
            {roles.map(r => (
              <button
                key={r.id}
                onClick={() => { switchRole(r.id); setAccepted(false); }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  width: '100%', padding: '8px 10px', marginBottom: '6px',
                  background: selectedRoleId === r.id ? 'rgba(99,102,241,0.18)' : 'rgba(255,255,255,0.03)',
                  border: selectedRoleId === r.id ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '8px', color: 'white', cursor: 'pointer', textAlign: 'left',
                  fontSize: '0.8rem', fontWeight: selectedRoleId === r.id ? 700 : 500
                }}
              >
                <span>{r.icon} {r.title}</span>
                {selectedRoleId === r.id && <CheckCircle2 size={14} color="#34D399" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
