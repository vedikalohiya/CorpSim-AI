import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import CompanyPortal from './CompanyPortal';
import VirtualOfficeFloorPlan from './VirtualOfficeFloorPlan';
import { 
  Sun, 
  Kanban, 
  ArrowRight, 
  Sparkles,
  Users,
  Building2,
  MapPin,
  LayoutDashboard
} from 'lucide-react';

export default function DashboardOverview({ setActiveTab }) {
  const { roleData, dayOneTasks, tickets, overallReadinessScore, metrics } = useWorkspace();
  const [subTab, setSubTab] = useState('overview');

  const activeTicket = tickets.find(t => t.status === "In Progress") || tickets[0];
  const pendingDayOne = dayOneTasks.filter(t => !t.completed);
  const doneTicketsCount = tickets.filter(t => t.status === "Done").length;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Sub Navigation Bar */}
      <div className="glass-panel" style={{ padding: '8px 16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button
          onClick={() => setSubTab('overview')}
          className={subTab === 'overview' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
          <LayoutDashboard size={14} /> Workstation Overview
        </button>
        <button
          onClick={() => setSubTab('floor_plan')}
          className={subTab === 'floor_plan' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
          <MapPin size={14} /> 2D Office Floor Plan
        </button>
        <button
          onClick={() => setSubTab('company_org')}
          className={subTab === 'company_org' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
          <Building2 size={14} /> Company Org & Handbook
        </button>
      </div>

      {subTab === 'floor_plan' && <VirtualOfficeFloorPlan />}
      {subTab === 'company_org' && <CompanyPortal />}

      {subTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Welcome Banner */}
          <div className="glass-panel" style={{
            padding: '28px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.08))',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div className="badge badge-indigo" style={{ marginBottom: '10px' }}>
                <Building2 size={12} /> Virtual Workplace • {roleData.company}
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', marginBottom: '8px' }}>
                Welcome to your Virtual Office, <span style={{ color: '#818CF8' }}>Vedika</span>!
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '650px' }}>
                You are assigned as <strong>{roleData.title}</strong> in the <strong>{roleData.department}</strong> department. 
                Work through your Jira tickets, communicate with Sarah & Alex in Slack, and maintain your 10:00 AM daily standups.
              </p>
            </div>

            <div style={{
              textAlign: 'right',
              background: 'rgba(17, 24, 39, 0.8)',
              padding: '16px 24px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', textTransform: 'uppercase', fontWeight: 700 }}>
                Workplace Readiness
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#34D399' }}>
                {overallReadinessScore}%
              </div>
              <div style={{ fontSize: '0.75rem', color: '#818CF8' }}>
                {doneTicketsCount}/{tickets.length} Jira Tickets Completed
              </div>
            </div>
          </div>

          {/* Quick Action Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px'
          }}>
            {/* Current Active Ticket */}
            <div className="glass-panel glass-panel-hover" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'white' }}>
                  <Kanban size={18} color="#6366F1" /> Active Jira Ticket
                </div>
                <span className="badge badge-indigo">{activeTicket ? activeTicket.id : 'N/A'}</span>
              </div>
              <div style={{ fontWeight: 600, color: 'white', fontSize: '0.9rem', marginBottom: '6px' }}>
                {activeTicket ? activeTicket.title : 'No active ticket'}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px', height: '36px', overflow: 'hidden' }}>
                {activeTicket ? activeTicket.description : ''}
              </p>
              <button 
                onClick={() => setActiveTab('kanban')}
                className="btn-primary" style={{ width: '100%', justifyContent: 'space-between' }}>
                <span>Open Jira Workspace</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Standup & Meetings */}
            <div className="glass-panel glass-panel-hover" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'white' }}>
                  <Users size={18} color="#F59E0B" /> Daily 10:00 AM Standup
                </div>
                <span className="badge badge-amber">Sync Required</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Submit your status update (Yesterday, Today, Blockers) and attend virtual voice meetings with Sarah & Alex.
              </p>
              <button 
                onClick={() => setActiveTab('standup')}
                className="btn-secondary" style={{ width: '100%', justifyContent: 'space-between' }}>
                <span>Go to Standup Sync</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Comms & Slack */}
            <div className="glass-panel glass-panel-hover" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'white' }}>
                  <Sparkles size={18} color="#10B981" /> Comms & Slack Suite
                </div>
                <span className="badge badge-emerald">Live AI Tone</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Communicate with Sarah, Alex, and Client Robert Vance in Slack channels and Outlook email.
              </p>
              <button 
                onClick={() => setActiveTab('slack')}
                className="btn-secondary" style={{ width: '100%', justifyContent: 'space-between' }}>
                <span>Open Slack & Email</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
