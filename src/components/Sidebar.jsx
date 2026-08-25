import React from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import {
  LayoutDashboard, UserCheck, Building2, Map, Users, ClipboardList,
  Kanban, Code2, GitBranch, MessageSquare, Mail, BookOpen,
  CalendarCheck, Video, Siren, AlertTriangle, Presentation,
  BarChart3, Award, Bot
} from 'lucide-react';

const SECTIONS = [
  {
    label: 'AI COPILOT',
    items: [
      { id: 'ai_mentor', emoji: '🤖', label: 'AI Workplace Assistant', desc: 'Ask anything in real time', icon: Bot },
    ]
  },
  {
    label: 'WORKSPACE',
    items: [
      { id: 'dashboard', emoji: '🏠', label: 'Dashboard', desc: 'Workstation Hub & Quick Stats', icon: LayoutDashboard },
      { id: 'role', emoji: '👩‍💼', label: 'Role Assignment', desc: 'Your Job Offer & Role Details', icon: UserCheck },
      { id: 'company', emoji: '🏢', label: 'Company Structure', desc: 'Org Chart & Team Hierarchy', icon: Building2 },
      { id: 'floor', emoji: '🗺️', label: 'Office Floor Plan', desc: 'Floor 4 — Data & Analytics Wing', icon: Map },
      { id: 'teammates', emoji: '👥', label: 'Teammate Collab', desc: 'Pair Programming & Reviews', icon: Users },
    ]
  },
  {
    label: 'TASKS & CODE',
    items: [
      { id: 'tasks', emoji: '📋', label: 'Manager Task Inbox', desc: 'Directives from Sarah Jenkins', icon: ClipboardList, badgeKey: 'managerTasks', badgeColor: '#EF4444' },
      { id: 'kanban', emoji: '🎫', label: 'Jira Board', desc: 'Kanban Swimlanes & Backlog', icon: Kanban, badgeKey: 'inProgress', badgeColor: '#6366F1' },
      { id: 'sandbox', emoji: '💻', label: 'Live Code Sandbox', desc: 'In-Browser SQL & PySpark', icon: Code2 },
      { id: 'git', emoji: '🔀', label: 'Git & GitHub', desc: 'Terminal CLI & PR Reviews', icon: GitBranch },
      { id: 'docs', emoji: '📝', label: 'Tech Docs Wiki', desc: 'Confluence Spec Sheets', icon: BookOpen },
    ]
  },
  {
    label: 'COMMUNICATION',
    items: [
      { id: 'slack', emoji: '💬', label: 'Slack Channels', desc: '#general · #standup · DMs', icon: MessageSquare, badgeKey: 'slackUnread', badgeColor: '#10B981' },
      { id: 'email', emoji: '📧', label: 'Outlook Email', desc: 'Inbox · Drafts · AI Tone Score', icon: Mail, badgeKey: 'unreadEmails', badgeColor: '#F59E0B' },
    ]
  },
  {
    label: 'MEETINGS & AGILE',
    items: [
      { id: 'standup', emoji: '📅', label: 'Daily Standup', desc: '10:00 AM Sync — Log Updates', icon: CalendarCheck },
      { id: 'meetings', emoji: '📹', label: 'Virtual Meetings', desc: 'Sprint Planning & Retros', icon: Video },
    ]
  },
  {
    label: 'CRISIS & PERFORMANCE',
    items: [
      { id: 'warroom', emoji: '🚨', label: 'Production War Room', desc: 'P1 Outages & RCA Reports', icon: Siren, badgeKey: 'p1Active', badgeColor: '#EF4444' },
      { id: 'scenarios', emoji: '⏰', label: 'Crisis Scenarios', desc: 'Deadline & Conflict Handling', icon: AlertTriangle },
      { id: 'presentation', emoji: '🎤', label: 'Sprint Presentation', desc: 'Sprint Review & Q&A Defense', icon: Presentation },
      { id: 'feedback', emoji: '📈', label: '360° Feedback', desc: 'Manager Performance Review', icon: BarChart3 },
      { id: 'certificate', emoji: '🏆', label: 'Corporate Certificate', desc: 'Skill Radar & PNG Download', icon: Award },
    ]
  }
];

export default function Sidebar({ activeTab, setActiveTab }) {
  const { tickets, emails } = useWorkspace();

  const inProgress = tickets.filter(t => t.status === 'In Progress').length;
  const unreadEmails = emails.filter(e => !e.read).length;

  const getBadge = (badgeKey) => {
    if (badgeKey === 'inProgress') return inProgress > 0 ? inProgress : null;
    if (badgeKey === 'unreadEmails') return unreadEmails > 0 ? unreadEmails : null;
    if (badgeKey === 'p1Active') return 1; // always active P1 alert
    if (badgeKey === 'managerTasks') return 3;
    if (badgeKey === 'slackUnread') return 5;
    return null;
  };

  return (
    <aside style={{
      width: '248px',
      minWidth: '248px',
      background: 'rgba(9, 12, 22, 0.88)',
      backdropFilter: 'blur(16px)',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      flexShrink: 0,
      paddingBottom: '20px'
    }}>
      {SECTIONS.map((section) => (
        <div key={section.label}>
          <div style={{
            fontSize: '0.62rem',
            fontWeight: 800,
            color: 'rgba(148,163,184,0.45)',
            letterSpacing: '0.1em',
            padding: '16px 16px 6px',
            userSelect: 'none'
          }}>
            {section.label}
          </div>

          {section.items.map((item) => {
            const isActive = activeTab === item.id;
            const badge = item.badgeKey ? getBadge(item.badgeKey) : null;

            return (
              <button
                key={item.id}
                id={`sidebar-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '8px 16px',
                  border: 'none',
                  borderLeft: isActive ? '3px solid #6366F1' : '3px solid transparent',
                  background: isActive
                    ? 'linear-gradient(90deg, rgba(99,102,241,0.18), rgba(99,102,241,0.04))'
                    : 'transparent',
                  color: isActive ? 'white' : 'rgba(148,163,184,0.85)',
                  cursor: 'pointer',
                  transition: 'all 0.12s ease',
                  textAlign: 'left',
                  borderRadius: '0 8px 8px 0',
                }}
                onMouseEnter={e => {
                  if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                }}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span style={{ fontSize: '1rem', lineHeight: 1, flexShrink: 0 }}>{item.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.82rem',
                    color: isActive ? 'white' : 'rgba(203,213,225,0.9)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontSize: '0.67rem',
                    color: 'rgba(100,116,139,0.85)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {item.desc}
                  </div>
                </div>

                {badge !== null && (
                  <span style={{
                    background: item.badgeColor,
                    color: 'white',
                    borderRadius: '10px',
                    fontSize: '0.6rem',
                    fontWeight: 800,
                    padding: '1px 6px',
                    flexShrink: 0,
                    minWidth: '18px',
                    textAlign: 'center',
                    boxShadow: `0 0 8px ${item.badgeColor}66`
                  }}>
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      ))}

      {/* Bottom status bar */}
      <div style={{
        marginTop: 'auto',
        padding: '12px 16px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginLeft: '0'
      }}>
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: '#22C55E',
          boxShadow: '0 0 6px #22C55E',
          flexShrink: 0
        }} />
        <div style={{ fontSize: '0.7rem', color: 'rgba(100,116,139,0.9)' }}>
          <div style={{ color: 'rgba(203,213,225,0.8)', fontWeight: 600 }}>Vedika Lohiya</div>
          <div>Active · TechNova Solutions</div>
        </div>
      </div>
    </aside>
  );
}
