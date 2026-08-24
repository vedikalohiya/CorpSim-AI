/**
 * Real-Time Workday Clock & Automated Corporate Event Trigger Engine
 */

export const WORKDAY_SCHEDULE = [
  { time: '09:00 AM', event: 'MORNING_BROADCAST', title: '☀️ Workday Started', desc: 'Sarah Jenkins posted morning announcements in Slack #general.' },
  { time: '10:00 AM', event: 'STANDUP_SYNC', title: '🔔 10:00 AM Daily Standup', desc: 'Teammates Alex Chen & Priya Sharma posted their daily updates.' },
  { time: '11:30 AM', event: 'SPRINT_PLANNING', title: '📅 Sprint Planning Sync', desc: 'Manager Sarah scheduled Sprint Backlog story point grooming.' },
  { time: '02:00 PM', event: 'CLIENT_AUDIT_PING', title: '🏦 ABC Bank Audit Alert', desc: 'Robert Vance sent an urgent message regarding telemetry precision.' },
  { time: '04:00 PM', event: 'PR_REVIEW_APPROVED', title: '✅ PR Approved by Mentor', desc: 'Alex Chen reviewed and approved your latest Git pull request.' },
  { time: '05:00 PM', event: 'WORKDAY_END', title: '🌆 Workday Complete', desc: 'Core hours completed. Review your performance metrics in the report.' }
];

export function formatMinutesToTime(totalMinutes) {
  let hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  if (hours > 12) hours -= 12;
  if (hours === 0) hours = 12;
  const strHours = hours < 10 ? `0${hours}` : `${hours}`;
  const strMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${strHours}:${strMinutes} ${period}`;
}
