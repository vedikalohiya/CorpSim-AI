import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Mic, Play, Sparkles, Send, Award, Presentation } from 'lucide-react';

export default function PresentationSimulator() {
  const { roleData } = useWorkspace();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [qaHistory, setQaHistory] = useState([
    {
      questioner: `${roleData.manager.name} (VP of Data)`,
      question: 'How does your PySpark pipeline handle unexpected null customer IDs during peak ingestion hours?'
    }
  ]);
  const [evalScore, setEvalScore] = useState(null);

  const slides = [
    { title: 'Customer Analytics ETL Architecture', bullet1: 'Raw JSON Ingestion via Azure Blob Storage', bullet2: 'PySpark Data Cleaning & Filtering Rules', bullet3: 'PostgreSQL Staging Table DDL' },
    { title: 'Sprint Delivery & Benchmark Results', bullet1: 'Query Execution Latency: 120ms (Target <500ms)', bullet2: 'Data Reconciliation: 100% Match with ABC Bank', bullet3: 'Zero Data Loss under 10k req/sec load' }
  ];

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    setEvalScore(88);
    setQaHistory(prev => [
      ...prev,
      { questioner: 'Vedika Lohiya (You)', question: userAnswer, isAnswer: true },
      { questioner: `${roleData.client.name} (ABC Bank)`, question: 'Excellent technical presentation! The 120ms query latency meets our SLA requirements perfectly.' }
    ]);
    setUserAnswer('');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: 'calc(100vh - 120px)' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Presentation size={22} color="#8B5CF6" />
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>Sprint Review Presentation & Q&A Simulator</h2>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Stakeholder Presentation & Audience Defense</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '16px', flex: 1, overflow: 'hidden' }}>
        {/* Slide Deck Screen */}
        <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'linear-gradient(135deg, #0F172A, #1E1B4B)' }}>
          <div>
            <span className="badge badge-violet" style={{ marginBottom: '12px' }}>Slide {currentSlide + 1} of {slides.length}</span>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'white', marginBottom: '20px' }}>
              {slides[currentSlide].title}
            </h1>
            <ul style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: 2, paddingLeft: '24px' }}>
              <li>{slides[currentSlide].bullet1}</li>
              <li>{slides[currentSlide].bullet2}</li>
              <li>{slides[currentSlide].bullet3}</li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button disabled={currentSlide === 0} onClick={() => setCurrentSlide(0)} className="btn-secondary">Previous Slide</button>
            <button disabled={currentSlide === 1} onClick={() => setCurrentSlide(1)} className="btn-primary">Next Slide</button>
          </div>
        </div>

        {/* Live Audience Q&A Panel */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', background: 'rgba(17, 24, 39, 0.8)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white' }}>Stakeholder Q&A Defense</h3>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {qaHistory.map((item, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '10px', background: item.isAnswer ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.03)' }}>
                <div style={{ fontWeight: 700, color: '#F59E0B', fontSize: '0.75rem', marginBottom: '2px' }}>{item.questioner}</div>
                <div style={{ fontSize: '0.825rem', color: 'white' }}>{item.question}</div>
              </div>
            ))}
          </div>

          {evalScore && (
            <div className="badge badge-emerald" style={{ padding: '6px 12px' }}>
              Presentation Defense Score: {evalScore}/100 (Strong Technical Clarity)
            </div>
          )}

          <form onSubmit={handleAnswerSubmit} style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              placeholder="Present your answer to Manager Sarah..."
              className="input-field"
            />
            <button type="submit" className="btn-primary"><Send size={14} /></button>
          </form>
        </div>
      </div>
    </div>
  );
}
