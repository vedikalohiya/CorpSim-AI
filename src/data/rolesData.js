export const ROLES_DATA = {
  data_engineer: {
    id: "data_engineer",
    title: "Junior Data Engineer",
    department: "Data & Analytics",
    teamName: "Customer Analytics Engineering",
    company: "TechNova Solutions",
    description: "Build robust ingestion pipelines, transform raw transaction payloads, and power high-throughput analytics dashboards for enterprise clients.",
    manager: {
      name: "Sarah Jenkins",
      title: "VP of Data Engineering",
      avatar: "👩💼",
      personality: "Direct, metric-driven, appreciates concise status updates with clear timelines."
    },
    mentor: {
      name: "Alex Chen",
      title: "Senior Data Architect",
      avatar: "👨💻",
      personality: "Encouraging, technical expert, loves clean SQL/Python architecture and unit testing."
    },
    client: {
      name: "Robert Vance",
      company: "ABC Global Bank",
      title: "Head of Digital Operations",
      avatar: "🏦",
      personality: "Exacting, values accuracy in transaction reports, sensitive to downtime."
    },
    hr: {
      name: "Maya Lin",
      title: "People & Culture Specialist",
      avatar: "👩💼",
      personality: "Supportive, focused on workplace etiquette, work-life balance, and clear communication."
    },
    teammates: [
      { name: "Priya Sharma", role: "Mid Data Engineer", avatar: "👩💻" },
      { name: "David Kim", role: "Analytics Engineer", avatar: "👨💼" },
      { name: "Elena Rostova", role: "Data Ops Specialist", avatar: "👩🔬" }
    ],
    initialTickets: [
      {
        id: "TICK-101",
        title: "Design Customer Transaction Schema & Staging Tables",
        description: "Define raw JSON payload schemas for customer transaction logs (purchases, refunds, failed payments). Create PostgreSQL/Snowflake staging tables with primary keys and indexed timestamps.",
        priority: "High",
        status: "Done",
        assignee: "Sarah Jenkins",
        dueDate: "Day 1",
        category: "Database Design",
        solutionTemplate: `CREATE TABLE staging_transactions (\n  transaction_id VARCHAR(64) PRIMARY KEY,\n  customer_id VARCHAR(32) NOT NULL,\n  amount DECIMAL(10, 2) NOT NULL,\n  status VARCHAR(20) CHECK (status IN ('COMPLETED', 'FAILED', 'PENDING')),\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP\n);`,
        submissionRequirement: "Provide DDL script for staging tables."
      },
      {
        id: "TICK-102",
        title: "Build Ingestion & Cleaning ETL Script for Daily Logs",
        description: "Write a PySpark or SQL script to parse raw JSON logs from Azure Blob Storage, filter out corrupted records (missing customer_id or negative amounts), and load into staging.",
        priority: "Critical",
        status: "In Progress",
        assignee: "You (Junior Data Engineer)",
        dueDate: "Day 3",
        category: "ETL / Data Pipeline",
        solutionTemplate: `def clean_transactions(df):\n    # Filter negative amounts & missing customer IDs\n    cleaned_df = df.filter(\n        (df["amount"] > 0) & \n        (df["customer_id"].isNotNull())\n    ).withColumn("cleaned_at", current_timestamp())\n    return cleaned_df`,
        submissionRequirement: "Submit PySpark clean_transactions logic and record count verification."
      },
      {
        id: "TICK-103",
        title: "Aggregate Revenue Cohorts & Failed Transaction Metrics",
        description: "Create an aggregated view grouping transaction totals by customer region, status, and day. Calculate daily failure rate percentage.",
        priority: "High",
        status: "To Do",
        assignee: "You (Junior Data Engineer)",
        dueDate: "Day 4",
        category: "SQL Analytics",
        solutionTemplate: `SELECT \n  DATE(created_at) as trans_date,\n  COUNT(*) as total_count,\n  SUM(CASE WHEN status = 'FAILED' THEN 1 ELSE 0 END) * 100.0 / COUNT(*) as failure_rate_pct\nFROM staging_transactions\nGROUP BY 1 ORDER BY 1 DESC;`,
        submissionRequirement: "Write SQL aggregate view query."
      },
      {
        id: "TICK-104",
        title: "Integrate Real-Time Executive Dashboard Feed",
        description: "Expose pipeline aggregations to BI tool endpoint. Ensure latency is under 500ms and numbers reconcile 100% with ABC Bank internal audits.",
        priority: "Medium",
        status: "To Do",
        assignee: "You (Junior Data Engineer)",
        dueDate: "Day 5",
        category: "BI Integration",
        solutionTemplate: `// API Endpoint config for dashboard sync`,
        submissionRequirement: "Verify API response contract and publish dashboard dataset."
      }
    ]
  },
  fullstack_dev: {
    id: "fullstack_dev",
    title: "Software Developer",
    department: "Core Platform",
    teamName: "Merchant Portal Engineering",
    company: "TechNova Solutions",
    description: "Develop high-performance REST APIs, integrate OAuth authentication, and build responsive web applications using React and Node/Python.",
    manager: {
      name: "Marcus Vance",
      title: "Engineering Manager",
      avatar: "👨💼",
      personality: "Agile evangelist, values TDD, clean PR descriptions, and zero breaking changes."
    },
    mentor: {
      name: "Jessica Wu",
      title: "Principal Engineer",
      avatar: "👩💻",
      personality: "Code review enthusiast, architectural minimalist, passionate about performance."
    },
    client: {
      name: "Robert Vance",
      company: "ABC Global Bank",
      title: "Head of Digital Operations",
      avatar: "🏦",
      personality: "Wants fast loading UI and 99.99% uptime."
    },
    hr: {
      name: "Maya Lin",
      title: "People & Culture Specialist",
      avatar: "👩💼",
      personality: "Workplace culture champion."
    },
    teammates: [
      { name: "Jordan Reed", role: "Senior Frontend Engineer", avatar: "👨💻" },
      { name: "Samira Ali", role: "Backend Developer", avatar: "👩💼" }
    ],
    initialTickets: [
      {
        id: "DEV-201",
        title: "Implement JWT Authentication Endpoint & Middleware",
        description: "Create /api/v1/auth/login route with password hashing (bcrypt) and issue signed JWTs valid for 8 hours.",
        priority: "Critical",
        status: "In Progress",
        assignee: "You (Software Developer)",
        dueDate: "Day 2",
        category: "Security & API",
        solutionTemplate: `app.post('/api/v1/auth/login', async (req, res) => {\n  const { email, password } = req.body;\n  // Verify & issue token\n});`,
        submissionRequirement: "Submit route handler and auth middleware snippet."
      },
      {
        id: "DEV-202",
        title: "Build Merchant Webhook Notification Service",
        description: "Handle incoming payment events and dispatch retryable webhooks with HMAC signature verification.",
        priority: "High",
        status: "To Do",
        assignee: "You (Software Developer)",
        dueDate: "Day 4",
        category: "Backend Architecture",
        solutionTemplate: ``,
        submissionRequirement: "Implement webhook retry queue handler."
      }
    ]
  },
  data_analyst: {
    id: "data_analyst",
    title: "Data Analyst",
    department: "Business Intelligence",
    teamName: "Revenue Insights",
    company: "TechNova Solutions",
    description: "Translate complex customer datasets into actionable business intelligence, executive summaries, and interactive dashboards.",
    manager: {
      name: "Sarah Jenkins",
      title: "VP of Data Engineering",
      avatar: "👩💼",
      personality: "Wants concise charts with executive key takeaways."
    },
    mentor: {
      name: "Alex Chen",
      title: "Senior Data Architect",
      avatar: "👨💻",
      personality: "Loves SQL optimization and clear data stories."
    },
    client: {
      name: "Robert Vance",
      company: "ABC Global Bank",
      title: "Head of Digital Operations",
      avatar: "🏦",
      personality: "Demands accurate quarterly churn statistics."
    },
    hr: { name: "Maya Lin", title: "People Specialist", avatar: "👩💼", personality: "Friendly." },
    teammates: [ { name: "Taylor Swift", role: "BI Lead", avatar: "👩💼" } ],
    initialTickets: [
      {
        id: "ANA-301",
        title: "Quarterly Churn & Customer Lifetime Value (LTV) Breakdown",
        description: "Analyze customer cohort retention over 12 months. Calculate LTV by region and identify top churn indicators.",
        priority: "High",
        status: "In Progress",
        assignee: "You (Data Analyst)",
        dueDate: "Day 3",
        category: "Cohort Analysis",
        solutionTemplate: `SELECT cohort_month, retention_rate_month_3, avg_ltv FROM cohorts;`,
        submissionRequirement: "Submit SQL queries and executive takeaway summary."
      }
    ]
  }
};

export const DEFAULT_ROLE = "data_engineer";

export const DAY_ONE_TASKS = [
  {
    id: "info_read",
    title: "Read Company Handbook & Hierarchy",
    subtitle: "Understand organizational structure, working hours, and communication rules.",
    completed: false
  },
  {
    id: "send_intro",
    title: "Send Team Introduction Message",
    subtitle: "Introduce yourself in `#general` or team chat with a professional intro.",
    completed: false
  },
  {
    id: "attend_standup",
    title: "Attend Daily Stand-up",
    subtitle: "Submit your 10:00 AM status update (Yesterday, Today, Blockers).",
    completed: false
  }
];

export const WORKPLACE_SCENARIOS = [
  {
    id: "scenario_missed_deadline",
    title: "🚨 Looming Deadline & Impending Delay",
    category: "Time Management & Communication",
    context: "It is Thursday 3:00 PM. Your ticket TICK-102 (ETL Clean Pipeline) is due tomorrow at 10:00 AM. However, you encountered an unexpected schema error with null customer IDs that will take 4-5 hours to debug.",
    question: "What is the most professional action to take right now?",
    options: [
      {
        text: "A. Say nothing, work late into the night, and hope you fix it before the morning standup without alerting anyone.",
        isCorrect: false,
        scoreDelta: -10,
        feedback: "❌ Risking a silent miss creates panic if you fail. In corporate settings, unexpected silent delays destroy trust faster than asking for help early."
      },
      {
        text: "B. Immediately inform your manager Sarah via Slack: explain the specific blocker, what you've investigated so far, and request a brief 15-min sync or realistic deadline adjustment.",
        isCorrect: true,
        scoreDelta: +15,
        feedback: "✅ Perfect! Managers appreciate early visibility ('No surprises rule'). Presenting the issue alongside what you've tried demonstrates initiative and accountability."
      },
      {
        text: "C. Mark the ticket as 'Done' in Jira to keep sprint metrics green, then fix the code silently after deployment.",
        isCorrect: false,
        scoreDelta: -25,
        feedback: "❌ Falsifying ticket status is a severe compliance infraction and breaks production pipelines."
      },
      {
        text: "D. Blame the upstream data source in the team chat and wait until Monday to work on it.",
        isCorrect: false,
        scoreDelta: -15,
        feedback: "❌ Finger-pointing without proactive problem solving damages team collaboration."
      }
    ]
  },
  {
    id: "scenario_angry_client",
    title: "🏦 Discrepancy Escalate by Client",
    category: "Client Relationship & Crisis Management",
    context: "Robert Vance (Head of Ops, ABC Bank) sends a high-priority message: 'Your transaction dashboard shows 540 failed transactions today, but our internal bank audit counted 548! This is unacceptable—explain this immediately!'",
    question: "How should you respond to the client?",
    options: [
      {
        text: "A. Reply immediately: 'Your audit numbers must be wrong, our PySpark code doesn't make mistakes.'",
        isCorrect: false,
        scoreDelta: -20,
        feedback: "❌ Never argue combatively with a client without investigating. It escalates tension and hurts company reputation."
      },
      {
        text: "B. Acknowledge professionally: 'Hi Robert, thank you for flagging this. I am investigating the 8-transaction discrepancy right now with our Data Engineering team and will provide a root cause analysis within 1 hour.' Notify your manager Sarah immediately.",
        isCorrect: true,
        scoreDelta: +15,
        feedback: "✅ Outstanding! You acknowledged urgency, set a realistic time frame for an update, remain calm, and loop in internal stakeholders."
      },
      {
        text: "C. Ignore the message and wait for your manager Sarah to return from vacation next week.",
        isCorrect: false,
        scoreDelta: -15,
        feedback: "❌ Ignoring urgent client escalations damages enterprise SLA agreements."
      }
    ]
  },
  {
    id: "scenario_production_error",
    title: "🔥 Production Pipeline Null Pointer Crash",
    category: "Incident Response & Accountability",
    context: "You just pushed a quick fix to the staging data transformation query, but accidentally committed a syntax error that broke the live morning ingestion pipeline.",
    question: "What is your immediate step?",
    options: [
      {
        text: "A. Post immediately in `#data-ops-incidents`: acknowledge the issue, revert the bad commit immediately, and share the mitigation status.",
        isCorrect: true,
        scoreDelta: +15,
        feedback: "✅ Great incident management! Fast acknowledgment, immediate rollback, and clear incident comms are gold standard engineering practices."
      },
      {
        text: "B. Delete your Git commit history and act like you don't know why the pipeline broke.",
        isCorrect: false,
        scoreDelta: -25,
        feedback: "❌ Hiding errors is dishonest and Git logs will reveal the origin anyway."
      }
    ]
  }
];

export const INITIAL_SLACK_MESSAGES = [
  {
    id: "m1",
    channel: "general",
    sender: "Sarah Jenkins (Manager)",
    avatar: "👩💼",
    time: "9:00 AM",
    content: "Good morning team! Please welcome our new team member who joined TechNova Solutions today! 🎉 Take some time to introduce yourselves in this channel."
  },
  {
    id: "m2",
    channel: "general",
    sender: "Alex Chen (Mentor)",
    avatar: "👨💻",
    time: "9:05 AM",
    content: "Welcome aboard! Excited to collaborate with you. Let me know if you need help setting up your dev workspace or understanding ticket #101!"
  },
  {
    id: "m3",
    channel: "general",
    sender: "Priya Sharma",
    avatar: "👩💻",
    time: "9:12 AM",
    content: "Welcome! Feel free to ping me anytime if you get stuck on the PySpark pipelines!"
  }
];

export const roles = Object.values(ROLES_DATA).map(r => ({
  id: r.id,
  title: r.title,
  department: r.department,
  icon: r.id === 'data_engineer' ? '📊' : r.id === 'fullstack_dev' ? '💻' : r.id === 'data_analyst' ? '📈' : r.id === 'qa_engineer' ? '🧪' : r.id === 'ui_ux' ? '🎨' : '📋'
}));
