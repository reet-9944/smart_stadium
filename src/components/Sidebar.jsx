import React from 'react';
import { ArrowLeft, MessageSquare, Settings, Key, Accessibility, Users, Bus, Battery } from 'lucide-react';

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen, onBack, activeTab, setActiveTab, showSettings, setShowSettings }) => {
  return (
    <aside className={`sidebar glass-panel ${isMobileMenuOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={20} /> Back
        </button>
        <h2>Command Center</h2>
      </div>
      
      <nav className="sidebar-nav">
        <div className="sidebar-section">
          <span className="sidebar-section-title">Fan Experience</span>
          <button 
            className={`nav-btn ${activeTab === 'fan' ? 'active' : ''}`}
            onClick={() => { setActiveTab('fan'); setIsMobileMenuOpen(false); }}
          >
            <MessageSquare size={20} />
            GenAI Assistant
          </button>
          <button 
            className={`nav-btn ${activeTab === 'accessibility' ? 'active' : ''}`}
            onClick={() => { setActiveTab('accessibility'); setIsMobileMenuOpen(false); }}
          >
            <Accessibility size={20} />
            Accessibility Services
          </button>
        </div>

        <div className="sidebar-section">
          <span className="sidebar-section-title">Operations</span>
          <button 
            className={`nav-btn ${activeTab === 'staff' ? 'active' : ''}`}
            onClick={() => { setActiveTab('staff'); setIsMobileMenuOpen(false); }}
          >
            <Users size={20} />
            Crowd Intelligence
          </button>
          <button 
            className={`nav-btn ${activeTab === 'transport' ? 'active' : ''}`}
            onClick={() => { setActiveTab('transport'); setIsMobileMenuOpen(false); }}
          >
            <Bus size={20} />
            Transport & Logistics
          </button>
          <button 
            className={`nav-btn ${activeTab === 'sustainability' ? 'active' : ''}`}
            onClick={() => { setActiveTab('sustainability'); setIsMobileMenuOpen(false); }}
          >
            <Battery size={20} />
            Sustainability Engine
          </button>
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="settings-btn" onClick={() => setShowSettings(!showSettings)}>
          <Settings size={20} /> API Settings
        </button>
      </div>
    </aside>
  );
};

export default React.memo(Sidebar);
