import React, { useRef, useEffect, useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import ScenariosHub from './ScenariosHub';
import ProductionWarRoom from './ProductionWarRoom';
import PresentationSimulator from './PresentationSimulator';
import Feedback360 from './Feedback360';
import confetti from 'canvas-confetti';
import { Award, Download, AlertTriangle, Flame, Presentation, Star } from 'lucide-react';

export default function PerformanceReport() {
  const { roleData, metrics, overallReadinessScore, tickets, completedScenarios } = useWorkspace();
  const [subTab, setSubTab] = useState('cert');
  const canvasRef = useRef(null);

  const doneCount = tickets.filter(t => t.status === "Done").length;
  const scenarioCount = Object.keys(completedScenarios).length;

  useEffect(() => {
    if (subTab === 'cert') {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      drawCertificate();
    }
  }, [subTab, roleData, overallReadinessScore]);

  const drawCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = 900;
    canvas.height = 600;

    const grad = ctx.createLinearGradient(0, 0, 900, 600);
    grad.addColorStop(0, '#0F172A');
    grad.addColorStop(1, '#1E1B4B');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 900, 600);

    ctx.strokeStyle = '#6366F1';
    ctx.lineWidth = 6;
    ctx.strokeRect(20, 20, 860, 560);

    ctx.strokeStyle = '#8B5CF6';
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, 840, 540);

    ctx.fillStyle = '#818CF8';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('TECHNOVA SOLUTIONS • VIRTUAL CORPORATE SIMULATOR', 450, 80);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px serif';
    ctx.fillText('Corporate Readiness Certificate', 450, 140);

    ctx.fillStyle = '#9CA3AF';
    ctx.font = '16px sans-serif';
    ctx.fillText('This certifies that', 450, 190);

    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 38px sans-serif';
    ctx.fillText('Vedika Lohiya', 450, 250);

    ctx.fillStyle = '#E2E8F0';
    ctx.font = '18px sans-serif';
    ctx.fillText(`has successfully completed the Virtual Workplace Simulation as`, 450, 310);

    ctx.fillStyle = '#F59E0B';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(`${roleData.title} (${roleData.department})`, 450, 350);

    ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
    ctx.fillRect(320, 390, 260, 50);
    ctx.strokeStyle = '#10B981';
    ctx.strokeRect(320, 390, 260, 50);

    ctx.fillStyle = '#34D399';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(`Readiness Score: ${overallReadinessScore}%`, 450, 422);

    ctx.fillStyle = '#9CA3AF';
    ctx.font = '14px sans-serif';
    ctx.fillText(`Issued: ${new Date().toLocaleDateString()} • Verification ID: CORP-${Date.now().toString().slice(-6)}`, 450, 500);

    ctx.fillStyle = '#CBD5E1';
    ctx.font = 'italic 16px serif';
    ctx.fillText(`Sarah Jenkins (VP of Data)`, 250, 540);
    ctx.fillText(`Alex Chen (Senior Architect)`, 650, 540);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = `Corporate_Readiness_Certificate_Vedika.png`;
    link.click();
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Sub Navigation Bar */}
      <div className="glass-panel" style={{ padding: '8px 16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button
          onClick={() => setSubTab('cert')}
          className={subTab === 'cert' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
          <Award size={14} /> Certificate & Radar Score
        </button>
        <button
          onClick={() => setSubTab('scenarios')}
          className={subTab === 'scenarios' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
          <AlertTriangle size={14} /> Crisis Scenarios
        </button>
        <button
          onClick={() => setSubTab('presentation')}
          className={subTab === 'presentation' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
          <Presentation size={14} /> Presentation Review
        </button>
        <button
          onClick={() => setSubTab('feedback360')}
          className={subTab === 'feedback360' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
          <Star size={14} /> 360° Manager Feedback
        </button>
      </div>

      {subTab === 'scenarios' && <ScenariosHub />}
      {subTab === 'presentation' && <PresentationSimulator />}
      {subTab === 'feedback360' && <Feedback360 />}

      {subTab === 'cert' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Header */}
          <div className="glass-panel" style={{ padding: '28px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(99, 102, 241, 0.1))', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Award size={28} color="#34D399" />
              <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white' }}>
                Corporate Readiness & Performance Report
              </h1>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
              Measurable evaluation of your technical execution, workplace communication, and crisis management skills.
            </p>
          </div>

          {/* Metrics & Badges Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '16px' }}>
                Skill Matrix Breakdown
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Technical Execution</span>
                    <span style={{ color: 'white', fontWeight: 700 }}>{metrics.technical}%</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${metrics.technical}%`, height: '100%', background: '#6366F1' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Professional Communication</span>
                    <span style={{ color: 'white', fontWeight: 700 }}>{metrics.communication}%</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${metrics.communication}%`, height: '100%', background: '#8B5CF6' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Task Velocity (Jira)</span>
                    <span style={{ color: 'white', fontWeight: 700 }}>{metrics.velocity}%</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${metrics.velocity}%`, height: '100%', background: '#3B82F6' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Soft Skills & Crisis Handling</span>
                    <span style={{ color: 'white', fontWeight: 700 }}>{metrics.softSkills}%</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${metrics.softSkills}%`, height: '100%', background: '#10B981' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '16px' }}>
                Earned Workplace Badges
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="glass-panel" style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(99, 102, 241, 0.15)' }}>
                  <span style={{ fontSize: '1.5rem' }}>🏅</span>
                  <div>
                    <div style={{ fontWeight: 700, color: 'white', fontSize: '0.85rem' }}>Workplace Ready</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Day 1 Orientation Completed</div>
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(139, 92, 246, 0.15)' }}>
                  <span style={{ fontSize: '1.5rem' }}>🏅</span>
                  <div>
                    <div style={{ fontWeight: 700, color: 'white', fontSize: '0.85rem' }}>Pro Communicator</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Slack Tone Score &gt; 80</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Canvas Certificate Showcase */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>Verifiable Corporate Certificate</h3>
              <button onClick={handleDownload} className="btn-primary">
                <Download size={16} /> Download PNG Certificate
              </button>
            </div>

            <div style={{ width: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
              <canvas
                ref={canvasRef}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--border-color)'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
