/**
 * CorpSim AI Workplace Intelligence & Persona Simulator
 */

export function evaluateCommunication(message, contextType = "general") {
  const text = message.trim();
  let score = 70;
  const feedback = [];
  const suggestions = [];

  if (!text || text.length < 5) {
    return {
      score: 30,
      grade: "Needs Improvement",
      feedback: ["Message is too short or lacks content."],
      suggestion: "Always provide complete sentences when communicating in a corporate setting.",
      tone: "Too Casual"
    };
  }

  // Check casual / lazy greetings
  const casualRegex = /^(hey|yo|sup|k|ok|okay|yeah|nah)\b/i;
  if (casualRegex.test(text)) {
    score -= 15;
    feedback.push("Avoid starting professional messages with casual slang like 'Yo' or single-word answers like 'Ok'.");
    suggestions.push("Use professional greetings like 'Hi Sarah', 'Good morning team', or 'Hello Robert'.");
  } else {
    score += 5;
    feedback.push("Good professional opening.");
  }

  // Check length & substance
  if (text.length > 30) {
    score += 10;
    feedback.push("Clear and descriptive detail provided.");
  } else {
    score -= 5;
    feedback.push("Adding slightly more context (e.g. ETA or current status) makes your comms more actionable.");
  }

  // Context-specific checks
  if (contextType === "standup") {
    const hasYesterday = /yesterday|completed|worked on|finished/i.test(text);
    const hasToday = /today|plan|will work|task|focus/i.test(text);
    const hasBlockers = /blocker|issue|stuck|none|no blocker/i.test(text);

    if (hasYesterday && hasToday && hasBlockers) {
      score += 15;
      feedback.push("Excellent stand-up structure! Covered Yesterday, Today, and Blockers clearly.");
    } else {
      score -= 10;
      feedback.push("Missing core standup components. Be explicit about: 1. Yesterday 2. Today 3. Blockers.");
    }
  }

  if (contextType === "manager") {
    const hasTimeline = /by \d|today|tomorrow|eta|schedule|4 pm|5 pm|morning/i.test(text);
    if (hasTimeline) {
      score += 10;
      feedback.push("Great initiative! Including an explicit ETA gives your manager immediate confidence.");
    } else {
      suggestions.push("Tip: Always mention a specific timeframe (e.g. 'I will send the report by 4 PM').");
    }
  }

  if (contextType === "client") {
    const isPolite = /thank you|appreciate|flagging|investigating|regards/i.test(text);
    if (isPolite) {
      score += 10;
      feedback.push("Polite and reassuring tone suitable for client communication.");
    } else {
      score -= 10;
      feedback.push("Ensure client comms remain courteous and reassuring even under pressure.");
    }
  }

  const finalScore = Math.min(100, Math.max(35, score));
  let grade = "Professional";
  if (finalScore >= 85) grade = "Exceptional Corporate Quality";
  else if (finalScore >= 70) grade = "Good Corporate Standard";
  else grade = "Needs Refinement";

  return {
    score: finalScore,
    grade,
    feedback,
    suggestions: suggestions.length > 0 ? suggestions : ["Keep up the clear, structured communication!"],
    tone: finalScore > 75 ? "Professional & Clear" : "Slightly Casual"
  };
}

export function generatePersonaResponse(userMessage, personaName, roleData, activeTicket) {
  const query = userMessage.toLowerCase();

  if (personaName === "Sarah Jenkins (Manager)" || personaName === "Sarah") {
    if (query.includes("status") || query.includes("update") || query.includes("working on")) {
      return `Thanks for the update. Make sure you keep ${activeTicket ? activeTicket.id : 'your tickets'} updated on the Jira board. Let me know if you hit any blockers before 3 PM.`;
    }
    if (query.includes("delay") || query.includes("blocker") || query.includes("stuck") || query.includes("help")) {
      return `I appreciate you giving me early visibility on this blocker. What specific issue are you running into, and what's your estimated ETA to resolve it? Let's fix this together.`;
    }
    if (query.includes("hi") || query.includes("hello") || query.includes("morning")) {
      return `Good morning! How are things progressing with your sprint deliverables today?`;
    }
    return `Got it! Thanks for keeping me in the loop. Continue focusing on your current ticket priority.`;
  }

  if (personaName === "Alex Chen (Mentor)" || personaName === "Alex") {
    if (query.includes("code") || query.includes("sql") || query.includes("pipeline") || query.includes("how to")) {
      return `Hey! Great question. For ${activeTicket ? activeTicket.category : 'this task'}, I recommend structuring your query cleanly with explicit CTEs or filtering out null values first. Do you want me to review a code snippet?`;
    }
    return `Hey there! Remember: clean architecture, error logging, and writing automated test cases make your code production-ready. You're doing great!`;
  }

  if (personaName === "Robert Vance (Client)" || personaName === "Client") {
    if (query.includes("investigating") || query.includes("checking") || query.includes("report")) {
      return `Thank you for taking ownership of this investigation. We expect transaction reporting to be 100% accurate. Please send us your root cause summary once verified.`;
    }
    return `Hello. We are relying on TechNova Solutions to ensure our financial telemetry remains accurate. What is the latest update?`;
  }

  if (personaName === "Maya Lin (HR)" || personaName === "HR") {
    return `Hi! Remember that TechNova Solutions values healthy workplace boundaries, open feedback, and professional etiquette. Let me know if you ever need career guidance or conflict resolution tips!`;
  }

  return `Thanks for your message! Keep up the great work in your virtual team.`;
}

export function getAIMentorAnswer(question, roleData, activeTicket, sprintDay) {
  const q = question.toLowerCase();

  if (q.includes("standup") || q.includes("stand-up")) {
    return {
      answer: "A Daily Standup is a short 15-minute alignment meeting. Keep it structured:\n\n1. **Yesterday:** What you completed.\n2. **Today:** What you plan to work on.\n3. **Blockers:** Any impediments stopping you.",
      tips: ["Be concise", "Don't deep dive into technical details during standup", "Highlight blockers early"]
    };
  }

  if (q.includes("task") || q.includes("jira") || q.includes("ticket") || q.includes("don't understand")) {
    return {
      answer: `Looking at your current ticket **${activeTicket ? activeTicket.id + ': ' + activeTicket.title : 'assigned task'}**:\n\nKey Requirement: ${activeTicket ? activeTicket.description : 'Read the ticket description and acceptance criteria carefully.'}\n\nRecommended Action:\n1. Break down the task into small sub-steps.\n2. Check the solution template provided.\n3. Ask your mentor Alex Chen if you need technical guidance!`,
      tips: ["Check ticket priority", "Update status column as you work", "Add comments when stuck"]
    };
  }

  if (q.includes("deadline") || q.includes("delay") || q.includes("miss")) {
    return {
      answer: "If you're going to miss a deadline:\n\n1. **Don't stay silent.** Notify your manager as early as possible.\n2. **State the issue clearly.** (e.g. 'I encountered an unexpected schema error with null IDs').\n3. **State what you've done.** (e.g. 'I tried filtering CTEs, but need 2 more hours').\n4. **Propose a realistic new ETA.**",
      tips: ["Never wait until deadline hour", "Propose solutions, not just problems"]
    };
  }

  if (q.includes("client") || q.includes("angry") || q.includes("issue")) {
    return {
      answer: "When responding to an escalated client request:\n\n1. Acknowledge receipt calmly and professionally.\n2. Reassure them you are investigating.\n3. Give a clear commitment time for an update (e.g., 'within 1 hour').\n4. Loop in your manager Sarah immediately.",
      tips: ["Stay calm", "Don't make excuses", "Focus on resolution"]
    };
  }

  return {
    answer: `As a **${roleData.title}** at **${roleData.company}**, your main goal during Sprint Day ${sprintDay} is to balance technical task delivery with clear team communication. Feel free to ask me about Git workflows, Jira tickets, client communication, or corporate etiquette!`,
    tips: ["Stay proactive", "Maintain clean code standards", "Communicate early and clearly"]
  };
}
