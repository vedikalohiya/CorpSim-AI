import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { AlertOctagon, Flame, RefreshCw, Send, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function ProductionWarRoom() {
  const { incidents, roleData } = useWorkspace();
  const [incidentStatus, setIncidentStatus] = useState('Investigating');
  const [rcaReport, setRcaReport] = useState(`Root Cause Analysis (RCA) Report\nIncident: INC-901 Null Customer IDs in Transaction ETL\nRoot Cause: Upstream payment gateway update added unannounced 'partner_id' payload key.\nMitigation: Added PySpark fallback CTE filter (df['customer_id'].isNotNull()).`);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* P1 Alert Banner */}
      <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.25), rgba(153, 27, 27, 0.15))', border: '2px solid #EF4444' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Flame size={28} color="#EF4444" className="animate-pulse-glow" />
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>
              🚨 P1 Production Incident War Room — INC-901
            </h1>
            <div style={{ fontSize: '0.85rem', color: '#FCA5A5' }}>
              Affected Service: Customer Transaction Ingestion Pipeline • SLA Impact: Critical
            </div>
          </div>
        </div>
      </div>

      {/* Telemetry Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', uppercase: true }}>Pipeline Ingestion Error Rate</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#EF4444' }}>42.8%</div>
        </div>
        <div className="glass-panel" style={{ padding: '16px', background: 'rgba(245, 158, 11, 0.1)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', uppercase: true }}>Dashboard Sync Latency</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#F59E0B' }}>4.2s (SLA: &lt;500ms)</div>
        </div>
        <div className="glass-panel" style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.1)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', uppercase: true }}>Incident Status</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: incidentStatus === 'Resolved' ? '#34D399' : '#EF4444' }}>
            {incidentStatus}
          </div>
        </div>
      </div>

      {/* Incident Actions */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '14px' }}>
          Incident Mitigation Controls
        </h3>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <button 
            onClick={() => setIncidentStatus('Rollback Executed')}
            className="btn-secondary" style={{ border: '1px solid #EF4444', color: '#FCA5A5' }}>
            <RefreshCw size={16} /> Execute Emergency Rollback to v1.0.4
          </button>
          <button 
            onClick={() => setIncidentStatus('Resolved')}
            className="btn-primary" style={{ background: '#10B981' }}>
            <CheckCircle2 size={16} /> Mark Incident Resolved & Publish RCA
          </button>
        </div>

        {/* RCA Document */}
        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
            Post-Mortem Root Cause Analysis (RCA) Report:
          </label>
          <textarea
            value={rcaReport}
            onChange={e => setRcaReport(e.target.value)}
            rows={5}
            className="input-field"
            style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
          />
        </div>
      </div>
    </div>
  );
}
