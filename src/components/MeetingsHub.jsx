import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Video, Calendar, Users, Mic, Play, Volume2, VolumeX, CheckCircle2, MessageSquare } from 'lucide-react';
import { speakText, stopSpeaking, startVoiceRecognition } from '../services/speechService';

export default function MeetingsHub() {
  const { roleData } = useWorkspace();
  const [activeMeeting, setActiveMeeting] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');

  const meetings = [
    {
      id: 'm1',
      title: 'Daily 10:00 AM Standup Sync',
      time: '10:00 AM - 10:15 AM',
      host: roleData.manager.name,
      type: 'Agile Sync',
      agenda: 'Quick 15-minute update: Yesterday, Today, Blockers.',
      transcript: [
        { speaker: roleData.manager.name, text: 'Good morning everyone! Let\'s go around the room. Vedika, how are things looking on TICK-101 and 102?' },
        { speaker: 'Vedika (You)', text: 'I finished the PostgreSQL staging DDL script and I am currently working on the PySpark clean_transactions logic.' },
        { speaker: roleData.mentor.name, text: 'Great! Make sure to write CTE filters for negative transaction amounts before pushing.' }
      ]
    },
    {
      id: 'm2',
      title: 'Sprint Planning & Story Point Estimation',
      time: '11:30 AM - 12:15 PM',
      host: roleData.manager.name,
      type: 'Agile Planning',
      agenda: 'Review sprint backlog items, assign story points, and commit to sprint scope.',
      transcript: [
        { speaker: roleData.manager.name, text: 'Welcome to Sprint Planning. We need to deliver the customer transaction analytics feed for ABC Bank by Friday.' },
        { speaker: 'Vedika (You)', text: 'I can take ownership of TICK-102 and TICK-103 for the SQL aggregate view.' }
      ]
    },
    {
      id: 'm3',
      title: 'ABC Bank Client Progress Sync',
      time: '2:00 PM - 2:30 PM',
      host: roleData.client.name,
      type: 'Client Sync',
      agenda: 'Present quarterly telemetry audit updates to Robert Vance.',
      transcript: [
        { speaker: roleData.client.name, text: 'Thank you for joining. We want to ensure that transaction failure alerts are published under 500ms latency.' },
        { speaker: 'Vedika (You)', text: 'We have optimized our staging database indexes to guarantee query execution within 120ms.' }
      ]
    }
  ];

  const handleSpeakLine = (text, speaker) => {
    setIsSpeaking(true);
    speakText(text, speaker.includes('Sarah') ? 'female' : 'male');
  };

  const handleStartMic = () => {
    setIsListening(true);
    startVoiceRecognition(
      (transcript) => {
        setSpokenText(transcript);
        setIsListening(false);
        if (activeMeeting) {
          activeMeeting.transcript.push({ speaker: 'Vedika (You)', text: transcript });
        }
      },
      (err) => {
        console.error('Speech recognition error:', err);
        setIsListening(false);
      }
    );
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: 'calc(100vh - 120px)' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Video size={22} color="#6366F1" />
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>Virtual Voice & Video Meeting Suite</h2>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Browser Web Speech API Voice Synthesis & Mic Input</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '16px', flex: 1, overflow: 'hidden' }}>
        {/* Calendar / Schedule */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', fontWeight: 700, textTransform: 'uppercase' }}>
            Today's Schedule
          </div>

          {meetings.map(m => (
            <div
              key={m.id}
              onClick={() => setActiveMeeting(m)}
              className="glass-panel glass-panel-hover"
              style={{
                padding: '14px',
                cursor: 'pointer',
                background: activeMeeting?.id === m.id ? 'rgba(99, 102, 241, 0.15)' : 'rgba(31, 41, 55, 0.4)',
                border: activeMeeting?.id === m.id ? '1px solid #6366F1' : '1px solid var(--border-color)'
              }}>
              <div style={{ fontSize: '0.725rem', color: '#F59E0B', fontWeight: 700, marginBottom: '4px' }}>{m.time}</div>
              <div style={{ fontWeight: 700, color: 'white', fontSize: '0.85rem', marginBottom: '4px' }}>{m.title}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Host: {m.host}</div>
            </div>
          ))}
        </div>

        {/* Meeting Screen */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', background: '#0B0F19' }}>
          {activeMeeting ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white' }}>{activeMeeting.title}</h2>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>{activeMeeting.time} • Agenda: {activeMeeting.agenda}</div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={handleStartMic}
                    className="btn-primary"
                    style={{ background: isListening ? '#EF4444' : 'var(--primary-indigo)', fontSize: '0.8rem' }}>
                    <Mic size={14} /> {isListening ? 'Listening...' : 'Speak via Mic'}
                  </button>
                  <button onClick={stopSpeaking} className="btn-secondary" style={{ padding: '6px 10px' }}>
                    <VolumeX size={14} /> Stop Voice
                  </button>
                </div>
              </div>

              {/* Video Grid Simulation */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <div className="glass-panel" style={{ height: '110px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(99, 102, 241, 0.1)' }}>
                  <span style={{ fontSize: '2rem' }}>👩💼</span>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'white', marginTop: '4px' }}>{roleData.manager.name}</div>
                </div>
                <div className="glass-panel" style={{ height: '110px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(16, 185, 129, 0.1)' }}>
                  <span style={{ fontSize: '2rem' }}>👨💻</span>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'white', marginTop: '4px' }}>{roleData.mentor.name}</div>
                </div>
                <div className="glass-panel" style={{ height: '110px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(139, 92, 246, 0.2)' }}>
                  <span style={{ fontSize: '2rem' }}>👩💻</span>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'white', marginTop: '4px' }}>Vedika Lohiya (You)</div>
                </div>
              </div>

              {/* Transcript Stream */}
              <div className="glass-panel" style={{ flex: 1, padding: '16px', background: 'rgba(17, 24, 39, 0.8)', overflowY: 'auto' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-subtle)', uppercase: true, marginBottom: '10px' }}>
                  Live Meeting Transcript & Voice Playback
                </div>
                {activeMeeting.transcript.map((line, idx) => (
                  <div key={idx} style={{ marginBottom: '12px', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontWeight: 700, color: line.speaker.includes('You') ? '#38BDF8' : '#F59E0B' }}>{line.speaker}: </span>
                      <span style={{ color: 'white' }}>{line.text}</span>
                    </div>
                    <button
                      onClick={() => handleSpeakLine(line.text, line.speaker)}
                      style={{ background: 'none', border: 'none', color: '#818CF8', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      title="Play Voice Audio">
                      <Volume2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '60px' }}>Select a meeting from the schedule to join.</div>
          )}
        </div>
      </div>
    </div>
  );
}
