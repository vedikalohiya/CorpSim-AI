import React from 'react';
import { ROLES_DATA } from '../data/rolesData';
import { useWorkspace } from '../context/WorkspaceContext';
import { Check, Shield, X } from 'lucide-react';

export default function RoleSelectorModal({ isOpen, onClose }) {
  const { selectedRoleId, switchRole } = useWorkspace();

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '4px' }}>
              Choose Your Virtual Career Role
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Select a simulated career track to experience actual workplace deliverables, team dynamics, and Jira sprints.
            </p>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px'
            }}>
            <X size={20} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '16px'
        }}>
          {Object.values(ROLES_DATA).map(role => {
            const isSelected = selectedRoleId === role.id;

            return (
              <div
                key={role.id}
                onClick={() => {
                  switchRole(role.id);
                  onClose();
                }}
                className="glass-panel glass-panel-hover"
                style={{
                  padding: '20px',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid var(--primary-indigo)' : '1px solid var(--border-color)',
                  background: isSelected ? 'rgba(99, 102, 241, 0.1)' : 'rgba(31, 41, 55, 0.4)',
                  position: 'relative'
                }}>
                {isSelected && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'var(--primary-indigo)',
                    color: 'white',
                    borderRadius: '9999px',
                    padding: '2px 8px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Check size={12} /> Active Role
                  </div>
                )}

                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '6px' }}>
                  {role.title}
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  <span className="badge badge-indigo">{role.company}</span>
                  <span className="badge badge-violet">{role.department}</span>
                </div>

                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.4 }}>
                  {role.description}
                </p>

                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-subtle)',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  paddingTop: '10px',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span>Manager: <strong>{role.manager.name}</strong></span>
                  <span>Mentor: <strong>{role.mentor.name}</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
