import React, { createContext, useContext, useState, useEffect } from 'react';
import { ROLES_DATA, DEFAULT_ROLE, DAY_ONE_TASKS, WORKPLACE_SCENARIOS, INITIAL_SLACK_MESSAGES } from '../data/rolesData';
import { evaluateCommunication, generatePersonaResponse } from '../services/aiEngine';
import { WORKDAY_SCHEDULE, formatMinutesToTime } from '../services/workdayClock';

const WorkspaceContext = createContext();

const INITIAL_EMAILS = [
  {
    id: 'e1',
    sender: 'Sarah Jenkins <sarah.jenkins@technova.com>',
    subject: 'Welcome to TechNova! Sprint Priorities & Task Assignments',
    date: '9:00 AM',
    read: false,
    body: `Hi Vedika,\n\nWelcome to the Customer Analytics team! I have assigned your first set of sprint tickets on the Jira board (TICK-101 and TICK-102).\n\nPlease make sure to attend our 10:00 AM Daily Standup in the Virtual Meeting Room and check our Confluence wiki for staging database guidelines.\n\nBest regards,\nSarah Jenkins\nVP of Data Engineering`
  },
  {
    id: 'e2',
    sender: 'Robert Vance <robert.vance@abcbank.com>',
    subject: 'ABC Bank Q3 Transaction Telemetry Audit Requirements',
    date: '10:30 AM',
    read: false,
    body: `Hello TechNova Data Team,\n\nWe need to ensure that the customer transaction dashboard numbers match our internal bank ledger with 100% precision before Friday.\n\nPlease keep us updated on the ETL pipeline progress.\n\nRegards,\nRobert Vance\nHead of Digital Operations, ABC Bank`
  }
];

const INITIAL_DOCS = [
  {
    id: 'doc1',
    title: 'Customer Transaction Pipeline Architecture Spec',
    category: 'Architecture',
    author: 'Alex Chen',
    lastUpdated: 'Yesterday',
    content: `# Customer Transaction Pipeline Architecture Spec\n\n## Overview\nThis document outlines the end-to-end ingestion and cleaning pipeline for customer transaction payloads originating from Azure Blob Storage.\n\n## Data Flow\n1. Raw JSON payloads dumped every 15 minutes.\n2. PySpark ETL pipeline cleans invalid customer IDs and negative transaction amounts.\n3. Staging PostgreSQL database populated for executive dashboard consumption.`
  }
];

export function WorkspaceProvider({ children }) {
  const [selectedRoleId, setSelectedRoleId] = useState(() => {
    return localStorage.getItem('corpsim_role') || DEFAULT_ROLE;
  });

  const [userProfile, setUserProfile] = useState({
    name: "Vedika Lohiya",
    email: "vedika.lohiya@technova.com",
    avatar: "👩💻",
    experienceLevel: "Junior Level / Entry Level"
  });

  const roleData = ROLES_DATA[selectedRoleId] || ROLES_DATA[DEFAULT_ROLE];

  // Workday Clock State (540 mins = 9:00 AM)
  const [timeMinutes, setTimeMinutes] = useState(540);
  const [clockSpeed, setClockSpeed] = useState(1); // 1 = 1x, 5 = 5x, 0 = Paused
  const [activeToast, setActiveToast] = useState(null);
  const [firedEvents, setFiredEvents] = useState({});

  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem(`corpsim_tickets_${selectedRoleId}`);
    return saved ? JSON.parse(saved) : roleData.initialTickets;
  });

  const [dayOneTasks, setDayOneTasks] = useState(() => {
    const saved = localStorage.getItem(`corpsim_dayone_${selectedRoleId}`);
    return saved ? JSON.parse(saved) : DAY_ONE_TASKS;
  });

  const [slackMessages, setSlackMessages] = useState(() => {
    const saved = localStorage.getItem(`corpsim_slack_${selectedRoleId}`);
    return saved ? JSON.parse(saved) : INITIAL_SLACK_MESSAGES;
  });

  const [emails, setEmails] = useState(() => {
    const saved = localStorage.getItem(`corpsim_emails_${selectedRoleId}`);
    return saved ? JSON.parse(saved) : INITIAL_EMAILS;
  });

  const [docs, setDocs] = useState(() => {
    const saved = localStorage.getItem(`corpsim_docs_${selectedRoleId}`);
    return saved ? JSON.parse(saved) : INITIAL_DOCS;
  });

  const [gitState, setGitState] = useState({
    currentBranch: 'main',
    stagedFiles: [],
    commits: [
      { hash: 'a1b2c3d', message: 'Initial commit: database staging schema', author: 'Alex Chen' }
    ],
    pullRequests: []
  });

  const [standupHistory, setStandupHistory] = useState([]);
  const [completedScenarios, setCompletedScenarios] = useState({});
  const [sprintDay, setSprintDay] = useState(1);

  const [metrics, setMetrics] = useState({
    technical: 78,
    communication: 82,
    velocity: 70,
    collaboration: 85,
    softSkills: 80
  });

  // Automated Real-Time Clock Ticker
  useEffect(() => {
    if (clockSpeed === 0) return;

    const intervalMs = clockSpeed === 5 ? 1000 : 3000;
    const timer = setInterval(() => {
      setTimeMinutes(prev => {
        if (prev >= 1020) return 1020; // Cap at 5:00 PM
        return prev + 15;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [clockSpeed]);

  // Handle Automated Time-Based Events
  useEffect(() => {
    const currentTimeStr = formatMinutesToTime(timeMinutes);
    const scheduleMatch = WORKDAY_SCHEDULE.find(s => s.time === currentTimeStr);

    if (scheduleMatch && !firedEvents[scheduleMatch.event]) {
      setFiredEvents(prev => ({ ...prev, [scheduleMatch.event]: true }));
      setActiveToast({ title: scheduleMatch.title, desc: scheduleMatch.desc });

      // Automatically post teammate standups at 10:00 AM
      if (scheduleMatch.event === 'STANDUP_SYNC') {
        setSlackMessages(prev => [
          ...prev,
          {
            id: `auto_${Date.now()}_1`,
            channel: 'standup',
            sender: 'Alex Chen (Mentor)',
            avatar: '👨💻',
            time: '10:00 AM',
            content: 'Standup Update: Yesterday worked on indexing staging tables. Today reviewing Vedika PR and helping with PySpark ETL filters. No blockers.'
          },
          {
            id: `auto_${Date.now()}_2`,
            channel: 'standup',
            sender: 'Priya Sharma',
            avatar: '👩💻',
            time: '10:01 AM',
            content: 'Standup Update: Yesterday finalized user cohort views. Today writing Cypress E2E regression tests. No blockers.'
          }
        ]);
      }

      // Auto dismiss toast after 6s
      setTimeout(() => setActiveToast(null), 6000);
    }
  }, [timeMinutes, firedEvents]);

  const switchRole = (roleId) => {
    if (ROLES_DATA[roleId]) {
      setSelectedRoleId(roleId);
      const newRoleData = ROLES_DATA[roleId];
      setTickets(newRoleData.initialTickets);
      setDayOneTasks(DAY_ONE_TASKS);
      setSlackMessages(INITIAL_SLACK_MESSAGES);
    }
  };

  const updateTicketStatus = (ticketId, newStatus) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: newStatus } : t));
  };

  const submitTicketSolution = (ticketId, solutionCode) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: "Done",
          submittedCode: solutionCode,
          feedback: `Manager Review (${roleData.manager.name}): Solution verified and merged to main branch!`
        };
      }
      return t;
    }));
  };

  const completeDayOneTask = (taskId) => {
    setDayOneTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: true } : t));
  };

  const sendSlackMessage = (channel, text) => {
    const evalResult = evaluateCommunication(text, channel === "manager" ? "manager" : "general");
    
    const userMsg = {
      id: `m_${Date.now()}`,
      channel,
      sender: `${userProfile.name} (You)`,
      avatar: userProfile.avatar,
      time: formatMinutesToTime(timeMinutes),
      content: text,
      evalResult
    };

    setSlackMessages(prev => [...prev, userMsg]);

    if (channel === "general" || channel === "team") {
      completeDayOneTask("send_intro");
    }

    setTimeout(() => {
      let personaName = "Sarah Jenkins (Manager)";
      if (channel === "mentor") personaName = "Alex Chen (Mentor)";
      if (channel === "client") personaName = "Robert Vance (Client)";
      if (channel === "hr") personaName = "Maya Lin (HR)";

      const replyText = generatePersonaResponse(text, personaName, roleData, tickets.find(t => t.status === "In Progress"));
      const replyMsg = {
        id: `r_${Date.now()}`,
        channel,
        sender: personaName,
        avatar: channel === "mentor" ? "👨💻" : channel === "client" ? "🏦" : channel === "hr" ? "👩💼" : "👩💼",
        time: formatMinutesToTime(timeMinutes),
        content: replyText
      };
      setSlackMessages(prev => [...prev, replyMsg]);
    }, 1000);

    return evalResult;
  };

  const sendEmail = (to, subject, body) => {
    const evalResult = evaluateCommunication(body, "manager");
    const newEmail = {
      id: `e_${Date.now()}`,
      sender: `${userProfile.name} <${userProfile.email}>`,
      to,
      subject,
      body,
      date: formatMinutesToTime(timeMinutes),
      read: true,
      evalResult
    };
    setEmails(prev => [newEmail, ...prev]);
    return evalResult;
  };

  const saveDoc = (newDoc) => {
    setDocs(prev => [newDoc, ...prev]);
  };

  const addGitCommit = (message) => {
    const newCommit = {
      hash: Math.random().toString(36).substring(2, 9),
      message,
      author: userProfile.name,
      date: 'Just now'
    };
    setGitState(prev => ({
      ...prev,
      commits: [newCommit, ...prev.commits]
    }));
  };

  const createPullRequest = (title, description) => {
    const newPR = {
      id: `PR-${Date.now().toString().slice(-4)}`,
      title,
      description,
      branch: gitState.currentBranch,
      author: userProfile.name,
      status: 'Open',
      reviewer: roleData.mentor.name
    };
    setGitState(prev => ({
      ...prev,
      pullRequests: [newPR, ...prev.pullRequests]
    }));
    return newPR;
  };

  const submitStandup = (entry) => {
    const evalResult = evaluateCommunication(`Yesterday: ${entry.yesterday}. Today: ${entry.today}. Blockers: ${entry.blockers}`, "standup");
    const newEntry = {
      ...entry,
      id: `std_${Date.now()}`,
      date: new Date().toLocaleDateString(),
      evalResult
    };
    setStandupHistory(prev => [newEntry, ...prev]);
    completeDayOneTask("attend_standup");
    return evalResult;
  };

  const completeScenario = (scenarioId, selectedOption) => {
    setCompletedScenarios(prev => ({
      ...prev,
      [scenarioId]: selectedOption
    }));
  };


  const overallReadinessScore = Math.round(
    (metrics.technical + metrics.communication + metrics.velocity + metrics.collaboration + metrics.softSkills) / 5
  );

  return (
    <WorkspaceContext.Provider value={{
      selectedRoleId,
      roleData,
      userProfile,
      tickets,
      dayOneTasks,
      slackMessages,
      emails,
      docs,
      gitState,
      standupHistory,
      completedScenarios,
      sprintDay,
      setSprintDay,
      timeMinutes,
      currentTimeFormatted: formatMinutesToTime(timeMinutes),
      clockSpeed,
      setClockSpeed,
      activeToast,
      setActiveToast,
      metrics,
      overallReadinessScore,
      switchRole,
      updateTicketStatus,
      submitTicketSolution,
      completeDayOneTask,
      sendSlackMessage,
      sendEmail,
      saveDoc,
      addGitCommit,
      createPullRequest,
      setGitState,
      submitStandup,
      completeScenario
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  return useContext(WorkspaceContext);
}
