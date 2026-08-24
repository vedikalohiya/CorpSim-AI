import React from 'react';
import { Bell, X, Sparkles } from 'lucide-react';

export default function NotificationToast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="glass-panel animate-fade-in" style={{
      position: 'fixed',
      top: '76px',
      right: '24px',
      zIndex: 110,
      width: '340px',
      padding: '16px',
      background: 'rgba(17, 24, 39, 0.95)',
      border: '1px solid rgba(99, 102, 241, 0.5)',
      boxShadow: 'var(--shadow-indigo)',
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-start'
    }}>
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '8px',
        background: 'rgba(99, 102, 241, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#818CF8',
        flexShrink: 0
      }}>
        <Bell size={20} />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'white' }}>{toast.title}</h4>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}>
            <X size={14} />
          </button>
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{toast.desc}</p>
      </div>
    </div>
  );
}
