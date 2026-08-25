/**
 * CorpSim AI Copilot Engine
 * A comprehensive workplace AI assistant that answers questions across:
 * - Corporate / workplace skills
 * - Programming (SQL, Python, PySpark, JavaScript, React)
 * - Career advice & job hunting
 * - Soft skills & communication
 * - Agile / Scrum / Jira workflows
 * - General knowledge & tech
 */

// ─── Knowledge Base ─────────────────────────────────────────────────────────

const KB = {
  // SQL
  sql: {
    patterns: ['sql', 'query', 'select', 'join', 'group by', 'order by', 'where', 'having', 'subquery', 'index', 'database', 'table'],
    responses: {
      join: `**SQL JOINs Explained** 🗄️

There are 4 main types of JOINs:

\`\`\`sql
-- INNER JOIN: only matching rows
SELECT u.name, o.amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN: all from left + matching right
SELECT u.name, o.amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- RIGHT JOIN: all from right + matching left
-- FULL OUTER JOIN: all rows from both tables
\`\`\`

💡 **Tip:** Use LEFT JOIN when you want to keep all records from the primary table even if there's no match.`,

      groupby: `**GROUP BY & Aggregations** 📊

\`\`\`sql
SELECT 
  department,
  COUNT(*) as employee_count,
  AVG(salary) as avg_salary,
  MAX(salary) as top_salary
FROM employees
GROUP BY department
HAVING COUNT(*) > 5   -- filter after grouping
ORDER BY avg_salary DESC;
\`\`\`

**Key rules:**
- Every non-aggregated column in SELECT must be in GROUP BY
- WHERE filters *before* aggregation, HAVING filters *after*
- Common aggregate functions: COUNT, SUM, AVG, MIN, MAX`,

      index: `**Database Indexes** ⚡

Indexes speed up reads but slow down writes:

\`\`\`sql
-- Create a basic index
CREATE INDEX idx_user_email ON users(email);

-- Composite index (order matters!)
CREATE INDEX idx_orders_status_date ON orders(status, created_at);

-- Check if your query uses an index
EXPLAIN SELECT * FROM orders WHERE user_id = 123;
\`\`\`

💡 **Index when:**
- Columns used in WHERE, JOIN ON, or ORDER BY
- High-cardinality columns (many unique values)
- Don't index columns with only 2-3 distinct values`,

      default: `**SQL Quick Reference** 🗄️

I can help with: JOINs, GROUP BY, subqueries, window functions, indexes, CTEs, and query optimization.

**Common patterns:**

\`\`\`sql
-- CTE (Common Table Expression)
WITH monthly_revenue AS (
  SELECT DATE_TRUNC('month', created_at) as month,
         SUM(amount) as revenue
  FROM orders GROUP BY 1
)
SELECT * FROM monthly_revenue WHERE revenue > 10000;

-- Window Function
SELECT name, salary,
  RANK() OVER (PARTITION BY dept ORDER BY salary DESC) as rank
FROM employees;
\`\`\`

What specific SQL topic would you like help with?`
    }
  },

  // Python
  python: {
    patterns: ['python', 'def ', 'function', 'list', 'dict', 'pandas', 'dataframe', 'numpy', 'pyspark', 'lambda', 'class', 'import', 'pip', 'error', 'exception', 'async', 'decorator'],
    responses: {
      pandas: `**Pandas Essentials** 🐍

\`\`\`python
import pandas as pd

# Read data
df = pd.read_csv("data.csv")
df = pd.read_parquet("data.parquet")

# Explore
df.head(), df.info(), df.describe()
df.shape  # (rows, cols)

# Filter
df[df['age'] > 25]
df.query("age > 25 and city == 'Mumbai'")

# Group & Aggregate
df.groupby('department')['salary'].agg(['mean', 'max', 'count'])

# Handle nulls
df.dropna(subset=['email'])
df['age'].fillna(df['age'].median(), inplace=True)
\`\`\``,

      pyspark: `**PySpark Quick Reference** ⚡

\`\`\`python
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, sum, count, avg, current_timestamp

spark = SparkSession.builder.appName("ETL").getOrCreate()

# Read
df = spark.read.parquet("s3://bucket/path/")
df = spark.read.json("s3://bucket/raw/")

# Transform
df_clean = df.filter(
    (col("amount") > 0) & col("customer_id").isNotNull()
).withColumn("processed_at", current_timestamp())

# Aggregate
df.groupBy("product_id").agg(
    sum("amount").alias("total"),
    count("*").alias("tx_count")
).show()

# Partition fix (your ETL issue)
df.repartition(200, "customer_id").write.parquet("s3://output/")
\`\`\``,

      default: `**Python at a Glance** 🐍

\`\`\`python
# List comprehensions
squares = [x**2 for x in range(10) if x % 2 == 0]

# Lambda & map
double = lambda x: x * 2
result = list(map(double, [1, 2, 3]))

# Error handling
try:
    df = pd.read_csv("file.csv")
except FileNotFoundError as e:
    print(f"File missing: {e}")
finally:
    print("Done")

# Decorators
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"Took {time.time()-start:.2f}s")
        return result
    return wrapper
\`\`\`

Ask me about: Pandas, PySpark, Django, FastAPI, decorators, async/await, or anything!`
    }
  },

  // JavaScript / React
  javascript: {
    patterns: ['javascript', 'react', 'usestate', 'useeffect', 'const', 'let', 'var', 'async', 'await', 'promise', 'fetch', 'api', 'component', 'props', 'hook', 'typescript', 'node', 'express'],
    responses: {
      hooks: `**React Hooks Explained** ⚛️

\`\`\`jsx
// useState - local state
const [count, setCount] = useState(0);
const [user, setUser] = useState({ name: '', email: '' });

// useEffect - side effects (API calls, timers)
useEffect(() => {
  fetch('/api/user')
    .then(r => r.json())
    .then(data => setUser(data));
}, []); // [] = run once on mount

// useEffect with cleanup
useEffect(() => {
  const timer = setInterval(() => tick(), 1000);
  return () => clearInterval(timer); // cleanup!
}, []);

// useCallback - memoize functions
const handleClick = useCallback(() => {
  doSomething(userId);
}, [userId]);

// useMemo - memoize expensive calculations
const sortedData = useMemo(() => 
  data.sort((a, b) => a.date - b.date), 
[data]);
\`\`\``,

      default: `**JavaScript / React Quick Ref** ⚛️

\`\`\`js
// Async/Await
const fetchData = async () => {
  try {
    const res = await fetch('/api/data');
    const json = await res.json();
    return json;
  } catch (err) {
    console.error(err);
  }
};

// Destructuring
const { name, age = 25, ...rest } = user;
const [first, ...others] = array;

// Optional chaining
const city = user?.address?.city ?? 'Unknown';

// Array methods
const filtered = arr.filter(x => x > 0);
const mapped = arr.map(x => x * 2);
const total = arr.reduce((sum, x) => sum + x, 0);
\`\`\`

What JavaScript topic can I help with?`
    }
  },

  // Git
  git: {
    patterns: ['git', 'github', 'commit', 'branch', 'merge', 'pull request', 'rebase', 'clone', 'push', 'stash', 'conflict', 'checkout', 'reset'],
    responses: {
      default: `**Git Workflow Cheatsheet** 🔀

\`\`\`bash
# Daily workflow
git status                        # see what changed
git pull origin main              # sync latest
git checkout -b feature/my-task   # new branch
git add .                         # stage changes
git commit -m "feat: add ETL fix" # commit
git push origin feature/my-task   # push

# Fixing mistakes
git stash                         # save unfinished work
git reset HEAD~1                  # undo last commit (keep changes)
git reset --hard HEAD~1           # undo last commit (DISCARD changes)

# Merge conflicts
git merge main                    # merge main into your branch
# Edit conflicting files, then:
git add . && git commit -m "resolve: merge conflict"

# Good commit message format
feat: add customer segmentation query
fix: resolve partition skew in Spark job
docs: update onboarding wiki
refactor: clean ETL pipeline logic
\`\`\``
    }
  },

  // Career advice
  career: {
    patterns: ['career', 'interview', 'resume', 'job', 'salary', 'negotiate', 'first job', 'fresher', 'linkedin', 'portfolio', 'skills', 'promotion', 'appraisal'],
    responses: {
      interview: `**Cracking Tech Interviews** 💼

**DSA Round:**
- Practice LeetCode Easy/Medium daily (Arrays, Strings, HashMaps first)
- Learn: Two Pointers, Sliding Window, BFS/DFS, DP basics

**System Design (for Senior roles):**
- Practice designing: URL shortener, Rate limiter, Messaging queue
- Know: CAP theorem, SQL vs NoSQL, caching (Redis), load balancing

**Behavioral (STAR method):**
- **S**ituation: Set the context
- **T**ask: What was your responsibility
- **A**ction: What you did specifically
- **R**esult: Measurable outcome

**Questions to ask the interviewer:**
- "What does success look like in the first 90 days?"
- "What are the biggest technical challenges the team faces?"
- "How does the team handle on-call and incidents?"`,

      resume: `**Resume Tips for Tech Roles** 📄

✅ **Do:**
- Lead each bullet with a strong verb: *Built, Designed, Optimized, Reduced, Increased*
- Quantify everything: "Reduced ETL pipeline latency by 40%" beats "Improved pipeline"
- Keep it to 1 page for < 3 years experience
- Use ATS-friendly format (no tables, no graphics)
- Tailor keywords to the job description

❌ **Avoid:**
- Objective statements ("Seeking a challenging role...")
- Listing every technology you've touched
- Generic bullets ("Worked on backend tasks")

**For freshers — what to show:**
- Capstone / final year projects with GitHub links
- Internship work (even unpaid counts)
- Contributions to open source
- Certifications (AWS, GCP, Azure, Databricks)`,

      salary: `**Salary Negotiation Guide** 💰

1. **Never give the first number.** Say: *"I'd love to understand the full compensation package before discussing a number."*

2. **Research market rates:** Check Glassdoor, Levels.fyi, LinkedIn Salary, Ambitionbox for your city and role.

3. **When they ask your expectation:**
   *"Based on my research and skills, I'm targeting ₹X–Y. Is that in the ballpark for this role?"*

4. **After receiving an offer:**
   *"Thank you for the offer! I'm genuinely excited about this opportunity. Based on my research and the value I'd bring, could we explore ₹X?"*

5. **Negotiate beyond salary:** joining bonus, stock options, remote work flexibility, learning budget, early appraisal.

💡 **Key insight:** Companies almost always have a negotiation buffer. The first offer is rarely the best offer.`,

      default: `**Career Growth in Tech** 🚀

**Junior → Mid (Year 1-3):**
- Master your core tech stack deeply
- Learn to write clean, maintainable code
- Take ownership of small features end-to-end
- Build relationships with senior engineers (mentors like Alex Chen!)

**Mid → Senior (Year 3-6):**
- Design systems, not just implement features
- Mentor juniors, do code reviews
- Understand business context behind tech decisions
- Speak up in architecture discussions

**Skills that compound:**
- Communication (write clearly, concisely)
- System design thinking
- Data literacy (understand your metrics)
- Leadership without authority

What specific career question do you have?`
    }
  },

  // Workplace soft skills
  workplace: {
    patterns: ['email', 'slack', 'communicate', 'manager', 'deadline', 'miss', 'escalate', 'conflict', 'meeting', 'standup', 'feedback', 'review', 'appraisal', 'boss', 'colleague', 'team', 'professional', 'office', 'etiquette', 'client', 'presentation', 'speak up', 'introvert', 'networking'],
    responses: {
      deadline: `**How to Handle a Missed Deadline** ⏰

**Do this immediately:**

1. **Communicate early** (never hide it)
2. **Own it** — no excuses, take responsibility
3. **Present a solution**, not just the problem

**Email template:**

> Hi Sarah,
>
> I wanted to flag proactively that I'm tracking behind on TICK-102 — I'm running into some edge cases in the PySpark filter logic that are taking longer than estimated.
>
> I expect to complete it by tomorrow EOD. I've already asked Alex to help review the logic tonight.
>
> I'll keep you updated. Apologies for the delay.
>
> — Vedika

💡 **Key:** Managers don't panic when you flag early. They panic when they discover it at the last minute.`,

      client: `**Handling Difficult Clients** 🏦

When a client like Robert Vance escalates:

**Step 1: Acknowledge, don't defend**
> "I understand your concern — a discrepancy in the audit numbers is serious and I want to get this resolved immediately."

**Step 2: Set clear expectations**
> "I'll personally investigate the pipeline output within the next 2 hours and send you a detailed reconciliation report by 3:00 PM."

**Step 3: Loop in your manager**
— Always keep Sarah informed when clients escalate. Never go silent.

**Step 4: Follow up in writing**
Send a brief email summarizing what happened, what was done, and how it's prevented going forward.

💡 **Principle:** Clients don't want perfection. They want to feel heard and reassured.`,

      standup: `**Perfect Daily Standup Formula** 📅

Keep it under 60 seconds using this structure:

**✅ Yesterday:** What I completed
**🔄 Today:** What I'm working on
**🚧 Blockers:** What's stopping me (if anything)

**Example:**
> "Yesterday, I finished the schema design for the staging tables and got it reviewed by Alex. Today, I'm starting the PySpark ETL script for TICK-102 — specifically the filter logic for invalid customer IDs. No blockers right now, but I might need Alex's help with the Spark partitioning strategy later today."

**Common mistakes to avoid:**
- Going into long technical detail (save it for 1:1s)
- Saying "same as yesterday" with no specifics
- Forgetting to mention blockers (this costs the whole team time)`,

      email: `**Writing Professional Emails** 📧

**Structure:**
1. Subject line: specific and scannable
2. Opening: why you're writing (1 sentence)
3. Body: key info in bullet points
4. Ask: clear call to action
5. Sign off: professional, brief

**Example — Status update:**
> **Subject:** TICK-102 ETL Progress Update — On Track for EOD Thursday
>
> Hi Sarah,
>
> Quick update on the ETL cleaning script:
> - Filter logic for invalid records: ✅ Complete
> - Unit tests for edge cases: 🔄 In progress (70%)
> - Expected completion: Thursday EOD
>
> Let me know if you need anything before the 2PM review.
>
> Best, Vedika

💡 **Tips:** 
- Be direct, not wordy. Managers read 100+ emails/day.
- Always have one clear ask per email.
- Subject line = the answer (not the question)`,

      default: `**Workplace Communication Tips** 💬

**1. Default to over-communicating**
When in doubt, send the update. Silence is always interpreted as bad news.

**2. Write messages like your manager is busy**
Get to the point. Use bullet points. Bold the key info.

**3. Ask good questions**
Instead of: *"I don't understand TICK-102"*
Say: *"For TICK-102, I understand I need to filter invalid records — I'm unsure whether to drop rows with null customer_id or flag them. Which approach should I take?"*

**4. Give status updates proactively**
Don't wait to be asked. On Fridays, send: *"EOW update: completed X, Y in progress, blocked on Z"*

**5. Disagree professionally**
*"I see where you're coming from. One concern I have is [X]. Could we also consider [Y]?"*

What workplace situation can I help you navigate?`
    }
  },

  // Agile / Scrum
  agile: {
    patterns: ['agile', 'scrum', 'sprint', 'jira', 'backlog', 'grooming', 'retrospective', 'retro', 'velocity', 'story point', 'kanban', 'ticket', 'epic', 'story', 'bug', 'task', 'definition of done'],
    responses: {
      default: `**Agile / Scrum in a Real Company** 🔄

**Sprint Structure (2-week cycle):**

| Day | Event | Duration |
|---|---|---|
| Mon Sprint 1 | Sprint Planning | 2-4 hrs |
| Daily | Standup | 15 min |
| Week 2 Mid | Sprint Review | 1 hr |
| Week 2 Fri | Retrospective | 1 hr |
| Ongoing | Backlog Grooming | 1 hr/week |

**Jira Ticket Statuses:**
- **To Do** → ready to be picked up
- **In Progress** → you're actively working on it
- **In Review** → PR raised, waiting for review
- **Done** → merged, tested, deployed

**Story Points (Fibonacci: 1, 2, 3, 5, 8, 13):**
- 1-2: Trivial change (config update, small fix)
- 3-5: Medium feature (requires design + testing)
- 8-13: Large/complex (split into sub-tasks)

**Retrospective formats:**
- "What went well / What didn't / Action items"
- "Start / Stop / Continue"
- "Mad / Sad / Glad"`
    }
  },

  // General tech
  tech: {
    patterns: ['cloud', 'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'microservice', 'api', 'rest', 'graphql', 'kafka', 'redis', 'postgresql', 'mongodb', 'nosql', 'machine learning', 'ai', 'data science', 'etl', 'data pipeline', 'warehouse', 'snowflake', 'databricks', 'spark'],
    responses: {
      cloud: `**Cloud Platforms Overview** ☁️

**AWS (Amazon):** Most mature, widest service range
- S3 (storage), EC2 (compute), RDS (database), Lambda (serverless), Redshift (DW)

**Azure (Microsoft):** Best for enterprises with Microsoft stack
- Blob Storage, Azure SQL, Azure Data Factory, Synapse Analytics, Databricks

**GCP (Google):** Best for data/ML workloads
- BigQuery (best-in-class DW), Dataflow, Vertex AI, Cloud Storage

**For a Data Engineer like you (Vedika):**
\`\`\`
AWS: S3 → Glue → Redshift
Azure: Blob → ADF → Synapse
GCP: GCS → Dataflow → BigQuery
\`\`\`

💡 Learn one deeply rather than surface-level all three.`,

      api: `**REST API Fundamentals** 🔌

**HTTP Methods:**
- \`GET\` — Read data
- \`POST\` — Create data
- \`PUT/PATCH\` — Update data
- \`DELETE\` — Delete data

**Status Codes:**
- 200 OK, 201 Created, 204 No Content
- 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found
- 500 Internal Server Error

**Best practices:**
\`\`\`
GET    /api/users           → list users
GET    /api/users/{id}      → get one user
POST   /api/users           → create user
PUT    /api/users/{id}      → update user
DELETE /api/users/{id}      → delete user
\`\`\`

Always version your API: \`/api/v1/users\``,

      default: `**Modern Tech Stack Overview** 🛠️

**Data Engineering Stack:**
\`\`\`
Ingestion: Kafka, Fivetran, Airbyte
Storage:   S3, GCS, Azure Blob
Transform: PySpark, dbt, Pandas
Warehouse: Snowflake, BigQuery, Redshift
Viz:       Looker, Tableau, Power BI
\`\`\`

**Web Dev Stack:**
\`\`\`
Frontend: React, Next.js, Vue
Backend:  Node.js, FastAPI, Django
DB:       PostgreSQL, MongoDB, Redis
Deploy:   Docker, Kubernetes, Vercel, AWS
\`\`\`

What tech topic would you like to explore?`
    }
  },

  // General knowledge / off-topic
  general: {
    patterns: [],
    responses: {
      default: null // handled by generateGeneral()
    }
  }
};

// ─── Pattern Matching Engine ─────────────────────────────────────────────────

function findBestResponse(query, roleData, tickets) {
  const q = query.toLowerCase().trim();

  // Workspace-aware: questions about "my ticket", "my task", "current sprint"
  if (q.includes('my ticket') || q.includes('my task') || q.includes('what should i work on') || q.includes('current sprint') || q.includes('my jira')) {
    const activeTicket = tickets?.find(t => t.status === 'In Progress');
    const todoTickets = tickets?.filter(t => t.status === 'To Do') || [];
    return {
      text: `**Your Current Sprint Tasks** 📋

**🔄 In Progress:**
${activeTicket ? `• **${activeTicket.id}** — ${activeTicket.title}
  Priority: ${activeTicket.priority} | Due: ${activeTicket.dueDate}
  ${activeTicket.description}` : 'No active ticket — pick one from To Do!'}

**📥 To Do Next:**
${todoTickets.length ? todoTickets.map(t => `• **${t.id}** — ${t.title} (${t.priority} priority, due ${t.dueDate})`).join('\n') : 'All caught up!'}

💡 **Suggested next action:** ${activeTicket ? `Focus on ${activeTicket.id} first — it's In Progress and needs your attention.` : 'Pick up the highest priority To Do ticket.'}`,
      suggestions: ['How do I write the ETL query?', 'How do I update my Jira ticket?', 'What should I say in standup today?']
    };
  }

  // My role / company questions
  if (q.includes('my role') || q.includes('what is my job') || q.includes('who am i') || q.includes('my position') || q.includes('technova')) {
    return {
      text: `**Your Role at TechNova Solutions** 👩‍💼

**Name:** Vedika Lohiya
**Role:** ${roleData.title}
**Department:** ${roleData.department}
**Team:** ${roleData.teamName}
**Employee ID:** #EMP-8942
**Email:** vedika.lohiya@technova.com

**Your Manager:** ${roleData.manager.name} — ${roleData.manager.title}
**Your Mentor:** ${roleData.mentor.name} — ${roleData.mentor.title}
**Key Client:** ${roleData.client.name} (${roleData.client.company})

**Your Mission:**
${roleData.description}`,
      suggestions: ['What does my manager expect?', 'Who is on my team?', 'What is my current sprint task?']
    };
  }

  // Standup prep
  if (q.includes('standup') || q.includes('stand up') || q.includes('what should i say') || q.includes('daily sync')) {
    const activeTicket = tickets?.find(t => t.status === 'In Progress');
    return {
      text: `**Your Standup Script for Today** 📅

Here's what to say in today's 10:00 AM standup:

---
**"Yesterday:**
I worked on ${activeTicket?.id || 'onboarding tasks'} — ${activeTicket ? activeTicket.title.toLowerCase() : 'getting familiar with the codebase and reviewing Confluence docs'}.

**Today:**
I'm continuing with ${activeTicket?.id || 'sprint setup'} — specifically ${activeTicket ? activeTicket.submissionRequirement?.toLowerCase() : 'reviewing team processes'}. I'll also be checking in with ${roleData.mentor.name} for guidance.

**Blockers:**
No blockers right now. I'll flag if anything comes up."**

---
💡 Keep it under **60 seconds**. Don't over-explain. Save technical detail for direct conversations.`,
      suggestions: ['How do I handle a blocker in standup?', 'What if my manager asks for more detail?']
    };
  }

  // SQL patterns
  if (KB.sql.patterns.some(p => q.includes(p))) {
    if (q.includes('join')) return { text: KB.sql.responses.join, suggestions: ['What is GROUP BY?', 'How do indexes work?'] };
    if (q.includes('group by') || q.includes('aggregate') || q.includes('sum') || q.includes('count')) return { text: KB.sql.responses.groupby, suggestions: ['Explain JOINs', 'What are window functions?'] };
    if (q.includes('index')) return { text: KB.sql.responses.index, suggestions: ['Explain query optimization', 'How do I use EXPLAIN?'] };
    return { text: KB.sql.responses.default, suggestions: ['Explain JOINs', 'What is GROUP BY?', 'How do indexes work?'] };
  }

  // Python / PySpark
  if (KB.python.patterns.some(p => q.includes(p))) {
    if (q.includes('pandas') || q.includes('dataframe')) return { text: KB.python.responses.pandas, suggestions: ['Explain PySpark', 'How do I handle missing data?'] };
    if (q.includes('pyspark') || q.includes('spark')) return { text: KB.python.responses.pyspark, suggestions: ['How to fix partition skew?', 'PySpark vs Pandas?'] };
    return { text: KB.python.responses.default, suggestions: ['Explain Pandas', 'How does PySpark work?'] };
  }

  // JavaScript / React
  if (KB.javascript.patterns.some(p => q.includes(p))) {
    if (q.includes('hook') || q.includes('usestate') || q.includes('useeffect')) return { text: KB.javascript.responses.hooks, suggestions: ['What is useCallback?', 'How does useReducer work?'] };
    return { text: KB.javascript.responses.default, suggestions: ['Explain React hooks', 'How does async/await work?'] };
  }

  // Git
  if (KB.git.patterns.some(p => q.includes(p))) {
    return { text: KB.git.responses.default, suggestions: ['How do I resolve a merge conflict?', 'What is rebase vs merge?'] };
  }

  // Career
  if (KB.career.patterns.some(p => q.includes(p))) {
    if (q.includes('interview')) return { text: KB.career.responses.interview, suggestions: ['How to negotiate salary?', 'Resume tips?'] };
    if (q.includes('resume') || q.includes('cv')) return { text: KB.career.responses.resume, suggestions: ['Interview tips', 'How to get promoted?'] };
    if (q.includes('salary') || q.includes('negotiate') || q.includes('ctc') || q.includes('package')) return { text: KB.career.responses.salary, suggestions: ['Interview tips', 'Resume tips'] };
    return { text: KB.career.responses.default, suggestions: ['Interview tips', 'Resume tips', 'Salary negotiation'] };
  }

  // Workplace soft skills
  if (KB.workplace.patterns.some(p => q.includes(p))) {
    if (q.includes('deadline') || q.includes('miss') || q.includes('late') || q.includes('delay')) return { text: KB.workplace.responses.deadline, suggestions: ['How to handle an angry client?', 'How to write a professional email?'] };
    if (q.includes('client') || q.includes('escalat') || q.includes('angry')) return { text: KB.workplace.responses.client, suggestions: ['How to handle a missed deadline?', 'How to write a status update email?'] };
    if (q.includes('standup') || q.includes('stand up')) return { text: KB.workplace.responses.standup, suggestions: ['What should I say if I have blockers?', 'How to handle missing a deadline?'] };
    if (q.includes('email') || q.includes('message') || q.includes('write')) return { text: KB.workplace.responses.email, suggestions: ['How to handle client escalation?', 'Tips for Slack communication?'] };
    return { text: KB.workplace.responses.default, suggestions: ['How to handle a missed deadline?', 'How to write a professional email?'] };
  }

  // Agile
  if (KB.agile.patterns.some(p => q.includes(p))) {
    return { text: KB.agile.responses.default, suggestions: ['What are story points?', 'How do sprint retros work?'] };
  }

  // Tech / Cloud
  if (KB.tech.patterns.some(p => q.includes(p))) {
    if (q.includes('cloud') || q.includes('aws') || q.includes('azure') || q.includes('gcp')) return { text: KB.tech.responses.cloud, suggestions: ['What is Docker?', 'How does Kafka work?'] };
    if (q.includes('api') || q.includes('rest') || q.includes('endpoint')) return { text: KB.tech.responses.api, suggestions: ['What is GraphQL?', 'How do I secure an API?'] };
    return { text: KB.tech.responses.default, suggestions: ['Tell me about cloud platforms', 'How does Kafka work?'] };
  }

  // Greetings
  if (q.match(/^(hi|hello|hey|sup|yo|good morning|good afternoon)\b/)) {
    return {
      text: `Hey Vedika! 👋 I'm your AI Workplace Copilot — think of me as a ChatGPT built specifically for your corporate journey at TechNova.

I can help you with:
- 💻 **Coding:** SQL, Python, PySpark, React, Git
- 📋 **Work tasks:** Understanding your tickets, standup prep, emails
- 🏢 **Workplace navigation:** Handling managers, clients, deadlines
- 🚀 **Career growth:** Interviews, resume, salary negotiation
- ☁️ **Tech concepts:** Cloud, APIs, Agile, system design

**What's on your mind?**`,
      suggestions: ['What are my current Jira tickets?', 'Help me prepare for standup', 'Explain SQL JOINs', 'How do I handle a missed deadline?']
    };
  }

  // Thank you
  if (q.includes('thank') || q.includes('thanks') || q.includes('awesome') || q.includes('great') || q.includes('helpful')) {
    return {
      text: `You're welcome, Vedika! 😊 That's what I'm here for.

Keep pushing forward — every day in this virtual office is sharpening real corporate skills that will make a huge difference in your actual job.

Is there anything else you'd like to explore?`,
      suggestions: ['What should I work on next?', 'Help me write a professional email', 'Explain something technical']
    };
  }

  // Fallback — general intelligent response
  return generateGeneral(query, roleData);
}

function generateGeneral(query, roleData) {
  const q = query.toLowerCase();

  // Detect question type
  const isWhat = q.startsWith('what');
  const isHow = q.startsWith('how');
  const isWhy = q.startsWith('why');
  const isWhere = q.startsWith('where');
  const isWhen = q.startsWith('when');
  const isDiff = q.includes('difference') || q.includes('vs') || q.includes('versus');

  let text = `I understand you're asking about: **"${query}"**

As your AI Workplace Copilot, I'm optimized for corporate, technical, and career topics — but I'll do my best to help!

`;

  if (isDiff) {
    text += `When comparing two things, consider:
- **Purpose:** What problem does each solve?
- **Use case:** When would you pick one over the other?
- **Trade-offs:** Performance, complexity, cost, learning curve

Could you be more specific? For example: *"SQL vs NoSQL"*, *"REST vs GraphQL"*, *"Pandas vs PySpark"* — I have deep answers for these!`;
  } else if (isHow) {
    text += `For "how to" questions, I recommend:
1. Break it into smaller steps
2. Search with specific keywords (not vague ones)
3. Check official documentation first
4. Try it with a simple example before scaling up

**For corporate questions**, I can give you exact scripts and templates.
**For coding questions**, I can provide working code examples.

Can you give me more context about what you're trying to achieve?`;
  } else if (isWhat) {
    text += `I'd love to give you a precise definition! The more specific your question, the better I can help.

**Topics I know deeply:**
- Technical: SQL, Python, PySpark, React, Git, Cloud, APIs
- Corporate: emails, standups, client handling, deadlines
- Career: interviews, resumes, salary negotiation, growth
- Agile: Jira, sprints, retros, story points`;
  } else {
    text += `**Here's what I know I can help you with right now:**

🔧 **Technical:** SQL queries, Python/PySpark code, Git commands, React hooks, system design
📊 **Your work:** Current Jira tickets, standup prep, code reviews, documentation
🗣️ **Soft skills:** Emails, client calls, manager communication, feedback handling  
🚀 **Career:** Interviews, resume tips, salary negotiation, career planning

Just ask me anything in plain English!`;
  }

  return {
    text,
    suggestions: ['Explain SQL JOINs', 'Help me with my standup', 'How do I handle a difficult client?', 'Tell me about PySpark']
  };
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export function getCopilotResponse(query, roleData, tickets) {
  return findBestResponse(query, roleData, tickets);
}

export async function askCopilot(query, conversation, roleData, tickets) {
  const endpoint = import.meta.env.VITE_AI_API_URL;

  if (!endpoint) {
    return getCopilotResponse(query, roleData, tickets);
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: `You are a general-purpose AI assistant with broad knowledge. Answer any safe user question directly, clearly, and conversationally, including science, history, writing, coding, life advice, mathematics, and workplace topics. You are also the workplace copilot for ${roleData.title} at ${roleData.company}, so use the workspace context when relevant. Do not claim to have performed actions or know facts that are not provided. If a question needs current information, say that your knowledge may be incomplete and ask for a source or details.`
          },
          ...conversation.slice(-10).map(message => ({
            role: message.sender === 'Vedika (You)' ? 'user' : 'assistant',
            content: message.text
          })),
          { role: 'user', content: query }
        ],
        context: {
          role: roleData.title,
          company: roleData.company,
          tickets
        }
      })
    });

    if (!response.ok) throw new Error(`AI request failed with ${response.status}`);

    const data = await response.json();
    const text = data.message || data.content || data.answer || data.text;
    if (!text) throw new Error('AI response did not contain text');

    return { text, suggestions: [] };
  } catch (error) {
    console.error('AI endpoint unavailable.', error);
    if (endpoint) {
      throw new Error('The AI service is unavailable. Check the backend and AI provider configuration.');
    }
    return getCopilotResponse(query, roleData, tickets);
  }
}

export async function streamCopilot(query, conversation, roleData, tickets, onToken) {
  const endpoint = import.meta.env.VITE_AI_API_URL;
  if (!endpoint) return getCopilotResponse(query, roleData, tickets);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'text/event-stream',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'system',
          content: `You are a general-purpose AI assistant with broad knowledge. Answer any safe user question directly, clearly, and conversationally, including science, history, writing, coding, life advice, mathematics, and workplace topics. You are also the workplace copilot for ${roleData.title} at ${roleData.company}, so use the workspace context when relevant. Do not claim to have performed actions or know facts that are not provided. If a question needs current information, say that your knowledge may be incomplete and ask for a source or details.`
        },
        ...conversation.slice(-10).map(message => ({
          role: message.sender === 'Vedika (You)' ? 'user' : 'assistant',
          content: message.text
        })),
        { role: 'user', content: query }
      ],
      context: { role: roleData.title, company: roleData.company, tickets }
    })
  });

  if (!response.ok || !response.body) throw new Error(`AI request failed with ${response.status}`);

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let text = '';

  const processEvent = event => {
    const dataLine = event.split('\n').find(line => line.startsWith('data:'));
    if (!dataLine) return;
    const data = JSON.parse(dataLine.slice(5).trim());
    if (data.error) throw new Error(data.error);
    if (data.text) {
      text += data.text;
      onToken(data.text);
    }
  };

  while (true) {
    const { done, value } = await reader.read();
    buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
    const events = buffer.split('\n\n');
    buffer = events.pop() || '';
    events.forEach(processEvent);
    if (done) break;
  }
  if (buffer) processEvent(buffer);
  return { text, suggestions: [] };
}

// Quick suggestion prompts for the UI
export const QUICK_PROMPTS = [
  { icon: '📋', text: 'What are my current Jira tickets?' },
  { icon: '📅', text: 'Help me prepare for today\'s standup' },
  { icon: '🗄️', text: 'Explain SQL JOINs with examples' },
  { icon: '⏰', text: 'How do I handle a missed deadline?' },
  { icon: '🐍', text: 'Show me PySpark ETL best practices' },
  { icon: '💬', text: 'How to respond to an angry client?' },
  { icon: '💼', text: 'Interview tips for tech roles' },
  { icon: '💰', text: 'How to negotiate my salary?' },
  { icon: '🔀', text: 'Git workflow cheatsheet' },
  { icon: '⚛️', text: 'Explain React hooks' },
  { icon: '🚀', text: 'Career growth advice for freshers' },
  { icon: '☁️', text: 'AWS vs Azure vs GCP — which to learn?' },
];
