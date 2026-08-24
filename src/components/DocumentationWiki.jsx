import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { BookOpen, Plus, Save, FileText, CheckCircle2 } from 'lucide-react';

export default function DocumentationWiki() {
  const { docs, saveDoc, userProfile } = useWorkspace();
  const [selectedDoc, setSelectedDoc] = useState(docs[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('Customer Analytics Ingestion Pipeline Spec');
  const [newContent, setNewContent] = useState(`# Technical Architecture Specification\n\n## Overview\nDocumentation for data ingestion pipelines and database schemas.\n\n## Database Schema\n- \`staging_transactions\` table with columns: \`transaction_id\`, \`customer_id\`, \`amount\`, \`status\`, \`created_at\`.`);

  const handleSave = () => {
    const docObj = {
      id: `doc_${Date.now()}`,
      title: newTitle,
      category: 'Engineering Spec',
      author: userProfile.name,
      lastUpdated: 'Just now',
      content: newContent
    };
    saveDoc(docObj);
    setSelectedDoc(docObj);
    setIsEditing(false);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: 'calc(100vh - 120px)' }}>
      <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BookOpen size={22} color="#F59E0B" />
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>Confluence Documentation Wiki</h2>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Technical Specifications & Architecture Docs</div>
          </div>
        </div>
        <button onClick={() => setIsEditing(true)} className="btn-primary">
          <Plus size={16} /> Create Technical Doc
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '16px', flex: 1, overflow: 'hidden' }}>
        {/* Doc Navigation */}
        <div className="glass-panel" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', fontWeight: 700, textTransform: 'uppercase', padding: '4px 8px' }}>
            Knowledge Base ({docs.length})
          </div>

          {docs.map(doc => (
            <div
              key={doc.id}
              onClick={() => { setSelectedDoc(doc); setIsEditing(false); }}
              className="glass-panel glass-panel-hover"
              style={{
                padding: '12px',
                cursor: 'pointer',
                background: selectedDoc?.id === doc.id ? 'rgba(245, 158, 11, 0.15)' : 'rgba(31, 41, 55, 0.4)',
                border: selectedDoc?.id === doc.id ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border-color)'
              }}>
              <div style={{ fontWeight: 700, color: 'white', fontSize: '0.85rem', marginBottom: '4px' }}>{doc.title}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>By {doc.author} • {doc.lastUpdated}</div>
            </div>
          ))}
        </div>

        {/* Editor / Viewer */}
        <div className="glass-panel" style={{ padding: '24px', overflowY: 'auto' }}>
          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="input-field"
                style={{ fontSize: '1.2rem', fontWeight: 800 }}
              />
              <textarea
                value={newContent}
                onChange={e => setNewContent(e.target.value)}
                rows={14}
                className="input-field"
                style={{ fontFamily: 'monospace', resize: 'vertical' }}
              />
              <button onClick={handleSave} className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                <Save size={16} /> Publish to Confluence Wiki
              </button>
            </div>
          ) : selectedDoc ? (
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '8px' }}>{selectedDoc.title}</h1>
              <div style={{ fontSize: '0.75rem', color: '#F59E0B', marginBottom: '20px' }}>
                Author: {selectedDoc.author} • Updated {selectedDoc.lastUpdated}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                {selectedDoc.content}
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--text-muted)' }}>Select a document to read.</div>
          )}
        </div>
      </div>
    </div>
  );
}
