import React from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { WORKPLACE_SCENARIOS } from '../data/rolesData';
import { AlertTriangle, CheckCircle, XCircle, Award, Sparkles } from 'lucide-react';

export default function ScenariosHub() {
  const { completedScenarios, completeScenario } = useWorkspace();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel" style={{
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(99, 102, 241, 0.1))',
        border: '1px solid rgba(239, 68, 68, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <AlertTriangle size={24} color="#EF4444" />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>
            Workplace Crisis & Etiquette Simulator
          </h1>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '720px' }}>
          Colleges rarely teach how to handle an angry client, a broken production build, or a missed deadline. 
          Navigate these interactive scenarios to build real corporate judgment.
        </p>
      </div>

      {/* Scenarios Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {WORKPLACE_SCENARIOS.map(sc => {
          const result = completedScenarios[sc.id];

          return (
            <div key={sc.id} className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span className="badge badge-rose">{sc.category}</span>
                {result && (
                  <span className={`badge badge-${result.isCorrect ? 'emerald' : 'rose'}`}>
                    {result.isCorrect ? '✅ Handled Correctly' : '⚠️ Suboptimal Choice'}
                  </span>
                )}
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white', marginBottom: '10px' }}>
                {sc.title}
              </h3>

              <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', background: 'rgba(255,255,255,0.03)', padding: '14px 18px', borderRadius: 'var(--radius-md)', marginBottom: '16px', lineHeight: 1.5 }}>
                {sc.context}
              </div>

              <div style={{ fontWeight: 700, color: 'white', fontSize: '0.95rem', marginBottom: '12px' }}>
                {sc.question}
              </div>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {sc.options.map((opt, idx) => {
                  const isSelected = result && result.text === opt.text;

                  return (
                    <button
                      key={idx}
                      onClick={() => completeScenario(sc.id, opt)}
                      disabled={!!result}
                      style={{
                        textAlign: 'left',
                        padding: '14px 18px',
                        borderRadius: 'var(--radius-md)',
                        background: isSelected 
                          ? (opt.isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)')
                          : 'rgba(31, 41, 55, 0.5)',
                        border: isSelected
                          ? (opt.isCorrect ? '1px solid #10B981' : '1px solid #EF4444')
                          : '1px solid var(--border-color)',
                        color: 'white',
                        fontSize: '0.875rem',
                        cursor: result ? 'default' : 'pointer',
                        transition: 'all 0.15s ease'
                      }}>
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Explanation */}
              {result && (
                <div className="glass-panel animate-fade-in" style={{
                  marginTop: '16px',
                  padding: '16px',
                  background: result.isCorrect ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                  border: result.isCorrect ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
                }}>
                  <div style={{ fontSize: '0.9rem', color: 'white', lineHeight: 1.5 }}>
                    {result.feedback}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
