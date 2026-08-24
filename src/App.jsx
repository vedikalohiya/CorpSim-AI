import React, { useState } from 'react';
import { WorkspaceProvider, useWorkspace } from './context/WorkspaceContext';
import WorkplaceOSHeader from './components/WorkplaceOSHeader';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import NotificationToast from './components/NotificationToast';
import RoleSelectorModal from './components/RoleSelectorModal';
import EmployeeIDModal from './components/EmployeeIDModal';

// All 19 workspace module components
import DashboardOverview from './components/DashboardOverview';
import RoleAssignment from './components/RoleAssignment';
import CompanyPortal from './components/CompanyPortal';
import VirtualOfficeFloorPlan from './components/VirtualOfficeFloorPlan';
import TeammateCollab from './components/TeammateCollab';
import ManagerTaskInbox from './components/ManagerTaskInbox';
import KanbanBoard from './components/KanbanBoard';
import GitTerminalSimulator from './components/GitTerminalSimulator';
import DocumentationWiki from './components/DocumentationWiki';
import SlackWorkspace from './components/SlackWorkspace';
import EmailPortal from './components/EmailPortal';
import StandupModule from './components/StandupModule';
import MeetingsHub from './components/MeetingsHub';
import ProductionWarRoom from './components/ProductionWarRoom';
import ScenariosHub from './components/ScenariosHub';
import PresentationSimulator from './components/PresentationSimulator';
import Feedback360 from './components/Feedback360';
import PerformanceReport from './components/PerformanceReport';
import AIMentorPanel from './components/AIMentorPanel';

import './styles/global.css';

// Map tab IDs to components
const TAB_COMPONENTS = {
  dashboard: DashboardOverview,
  role: RoleAssignment,
  company: CompanyPortal,
  floor: VirtualOfficeFloorPlan,
  teammates: TeammateCollab,
  tasks: ManagerTaskInbox,
  kanban: KanbanBoard,
  sandbox: null, // rendered inside KanbanBoard
  git: GitTerminalSimulator,
  docs: DocumentationWiki,
  slack: SlackWorkspace,
  email: EmailPortal,
  standup: StandupModule,
  meetings: MeetingsHub,
  warroom: ProductionWarRoom,
  scenarios: ScenariosHub,
  presentation: PresentationSimulator,
  feedback: Feedback360,
  certificate: PerformanceReport,
  ai_mentor: AIMentorPanel,
};

function MainWorkspace() {
  const { activeToast, setActiveToast } = useWorkspace();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isEmployeeIDOpen, setIsEmployeeIDOpen] = useState(false);

  const renderTabContent = () => {
    // sandbox tab shows the Kanban board with sandbox sub-tab pre-selected
    if (activeTab === 'sandbox') {
      return <KanbanBoard defaultSubTab="sandbox" />;
    }

    const Component = TAB_COMPONENTS[activeTab];
    if (!Component) return <DashboardOverview setActiveTab={setActiveTab} />;

    // Dashboard needs setActiveTab for quick-nav actions
    if (activeTab === 'dashboard') {
      return <DashboardOverview setActiveTab={setActiveTab} />;
    }

    return <Component />;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-base)' }}>
      {/* Enterprise VPN / OS Proxy Bar */}
      <WorkplaceOSHeader onOpenEmployeeID={() => setIsEmployeeIDOpen(true)} />

      {/* Corporate Workstation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
        onToggleAIMentor={() => setActiveTab('ai_mentor')}
      />

      <NotificationToast
        toast={activeToast}
        onClose={() => setActiveToast(null)}
      />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <main style={{
          flex: 1,
          padding: '24px',
          overflowY: 'auto',
          minWidth: 0
        }}>
          {renderTabContent()}
        </main>
      </div>

      <RoleSelectorModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
      />

      <EmployeeIDModal
        isOpen={isEmployeeIDOpen}
        onClose={() => setIsEmployeeIDOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <WorkspaceProvider>
      <MainWorkspace />
    </WorkspaceProvider>
  );
}
