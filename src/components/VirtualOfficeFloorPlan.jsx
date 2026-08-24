import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Building2, Users, Coffee, Video, ShieldCheck, MapPin, User, Sparkles } from 'lucide-react';

export default function VirtualOfficeFloorPlan() {
  const { roleData } = useWorkspace();
  const [selectedDesk, setSelectedDesk] = useState(null);

  const desks = [
    {
      id: 'desk_vedika',
      name: 'Vedika Lohiya (You)',
      role: roleData.title,
      status: 'At Desk (Coding & Sprint Execution)',
      avatar: '👩💻',
      location: 'Workstation 4A',
      color: '#6366F1'
    },
    {
      id: 'desk_sarah',
      name: `${roleData.manager.name} (Manager)`,
      role: roleData.manager.title,
      status: 'In Executive Office (Reviewing Sprint Backlog & KPIs)',
      avatar: roleData.manager.avatar,
      location: 'Private Office 401',
      color: '#8B5CF6'
    },
    {
      id: 'desk_alex',
      name: `${roleData.mentor.name} (Mentor)`,
      role: roleData.mentor.title,
      status: 'At Desk (Available for Code Reviews & Pair Programming)',
      avatar: roleData.mentor.avatar,
      location: 'Workstation 4B',
      color: '#10B981'
    },
    {
      id: 'desk_priya',
      name: 'Priya Sharma',
      role: 'Mid Data Engineer',
      status: 'At Desk (Running PySpark Ingestion Pipelines)',
      avatar: '👩💻',
      location: 'Workstation 4C',
      color: '#F59E0B'
    },
    {
      id: 'conf_alpha',
      name: 'Conference Room Alpha',
      role: 'Virtual Meeting Space',
      status: 'Reserved for 10:00 AM Daily Standup & Client Sync',
      avatar: '🎥',
      location: 'Room 405',
      color: '#38BDF8'
    },
    {
      id: 'coffee_lounge',
      name: 'TechNova Coffee Lounge',
      role: 'Breakroom & Social Space',
      status: 'Open • Espresso Machine & Snacks Available',
      avatar: '☕',
      location: 'Floor 4 Central Breakroom',
      color: '#EC4899'
    }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.1))', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <MapPin size={26} color="#818CF8" />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>
            TechNova Solutions — 4th Floor Virtual Office Floor Plan
          </h1>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Data & Analytics Department • Interactive workstation presence map. Click any desk to view live coworker status.
        </p>
      </div>

      {/* 2D Grid Floor Plan Layout */}
      <div className="glass-panel" style={{ padding: '28px', background: '#090D16', border: '1px solid var(--border-color)' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-subtle)', uppercase: true, marginBottom: '16px' }}>
          FLOOR 4 LAYOUT — DATA & ANALYTICS WING
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {desks.map(d => (
            <div
              key={d.id}
              onClick={() => setSelectedDesk(d)}
              className="glass-panel glass-panel-hover"
              style={{
                padding: '20px',
                cursor: 'pointer',
                background: selectedDesk?.id === d.id ? 'rgba(99, 102, 241, 0.2)' : 'rgba(17, 24, 39, 0.8)',
                border: selectedDesk?.id === d.id ? `2px solid ${d.color}` : '1px solid var(--border-color)',
                position: 'relative'
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ fontSize: '2rem' }}>{d.avatar}</span>
                <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: d.color, fontSize: '0.65rem' }}>
                  {d.location}
                </span>
              </div>

              <h4 style={{ fontWeight: 800, color: 'white', fontSize: '0.95rem', marginBottom: '2px' }}>{d.name}</h4>
              <div style={{ fontSize: '0.75rem', color: d.color, fontWeight: 600, marginBottom: '8px' }}>{d.role}</div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: d.color }} />
                <span>{d.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Desk Detail Modal/Card */}
      {selectedDesk && (
        <div className="glass-panel animate-fade-in" style={{ padding: '20px', background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '2rem' }}>{selectedDesk.avatar}</span>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>{selectedDesk.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: '2px' }}>{selectedDesk.status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
