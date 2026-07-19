import React, { useMemo } from 'react';
import { AlertTriangle, ShieldCheck, Map, Battery, Bus, Accessibility } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const OperationsDashboard = ({ activeTab, actionStates, handleAction }) => {
  const crowdData = useMemo(() => [
    { time: '12:00', predicted: 400, actual: 380 },
    { time: '13:00', predicted: 800, actual: 850 },
    { time: '14:00', predicted: 1200, actual: 1100 },
    { time: '15:00', predicted: 1500, actual: 1550 },
    { time: '16:00', predicted: 900, actual: 800 },
  ], []);

  const transportData = useMemo(() => [
    { name: 'North Gate', waitTime: 12 },
    { name: 'South Gate', waitTime: 5 },
    { name: 'Metro A', waitTime: 3 },
    { name: 'Metro B', waitTime: 15 },
    { name: 'Shuttles', waitTime: 8 },
  ], []);

  const energyData = useMemo(() => [
    { time: '12:00', usage: 500, saved: 50 },
    { time: '13:00', usage: 600, saved: 80 },
    { time: '14:00', usage: 800, saved: 120 },
    { time: '15:00', usage: 850, saved: 200 },
    { time: '16:00', usage: 700, saved: 150 },
  ], []);

  return (
    <div className="staff-dashboard">
      <div className="dashboard-header">
        <h3>
          {activeTab === 'staff' && 'Crowd Intelligence'}
          {activeTab === 'transport' && 'Transport & Logistics'}
          {activeTab === 'accessibility' && 'Accessibility Services'}
          {activeTab === 'sustainability' && 'Sustainability Engine'}
        </h3>
        <p>Real-time GenAI decision support</p>
      </div>

      <div className="metrics-grid">
        {activeTab === 'staff' && (
          <>
            <div className="chart-panel glass-panel">
              <h4>Crowd Density Analysis (Predicted vs Actual)</h4>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={crowdData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                    <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#0B1120', border: '1px solid #1E293B', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="actual" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} name="Actual Fans" />
                    <Line type="monotone" dataKey="predicted" stroke="#10B981" strokeWidth={3} strokeDasharray="5 5" name="GenAI Predicted" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="metric-card glass-panel">
              <div className="metric-header">
                <AlertTriangle className="warning-icon" />
                <h4>Crowd Bottleneck Predicted</h4>
              </div>
              <div className="metric-value">North Gate - Sector 4</div>
              <p className="metric-insight">GenAI suggests opening overflow doors in 10 mins to prevent 30% congestion increase.</p>
              <button 
                className={`action-btn ${actionStates.deploy === 'success' ? 'success' : ''}`}
                onClick={() => handleAction('deploy')}
                disabled={actionStates.deploy !== 'idle'}
              >
                {actionStates.deploy === 'idle' ? 'Deploy Staff' : 
                 actionStates.deploy === 'loading' ? 'Deploying...' : 'Staff Deployed ✓'}
              </button>
            </div>

            <div className="metric-card glass-panel">
              <div className="metric-header">
                <Map className="info-icon" />
                <h4>Transport Status</h4>
              </div>
              <div className="metric-value">Metro Line B Delayed</div>
              <p className="metric-insight">Auto-notifying fans leaving via West Gate to use alternative bus routes.</p>
              <button 
                className={`action-btn ${actionStates.map === 'success' ? 'success' : ''}`}
                onClick={() => handleAction('map')}
                disabled={actionStates.map !== 'idle'}
              >
                {actionStates.map === 'idle' ? 'View Routing Map' : 
                 actionStates.map === 'loading' ? 'Loading Map...' : 'Map Sent to Devices ✓'}
              </button>
            </div>

            <div className="metric-card glass-panel">
              <div className="metric-header">
                <ShieldCheck className="success-icon" />
                <h4>Accessibility Requests</h4>
              </div>
              <div className="metric-value">3 Active</div>
              <p className="metric-insight">All requests currently assigned. Average resolution time: 4 mins.</p>
              <button 
                className={`action-btn ${actionStates.log === 'success' ? 'success' : ''}`}
                onClick={() => handleAction('log')}
                disabled={actionStates.log !== 'idle'}
              >
                {actionStates.log === 'idle' ? 'View Log' : 
                 actionStates.log === 'loading' ? 'Fetching...' : 'Logs Exported ✓'}
              </button>
            </div>
          </>
        )}

        {activeTab === 'transport' && (
          <>
            <div className="chart-panel glass-panel">
              <h4>Current Wait Times (Minutes)</h4>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={transportData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                    <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#0B1120', border: '1px solid #1E293B', borderRadius: '8px' }} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                    <Bar dataKey="waitTime" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Wait Time (mins)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="metric-card glass-panel">
              <div className="metric-header">
                <Bus className="info-icon" />
                <h4>Metro Line B Status</h4>
              </div>
              <div className="metric-value">Delayed - 15 mins</div>
              <p className="metric-insight">GenAI rerouting 4,000 exiting fans to South Parking shuttle buses to prevent dangerous platform overcrowding.</p>
              <button className={`action-btn ${actionStates.deploy === 'success' ? 'success' : ''}`} onClick={() => handleAction('deploy')}>{actionStates.deploy === 'idle' ? 'Update Digital Signage' : actionStates.deploy === 'loading' ? 'Updating...' : 'Signage Updated ✓'}</button>
            </div>
          </>
        )}

        {activeTab === 'accessibility' && (
          <div className="metric-card glass-panel">
             <div className="metric-header">
               <Accessibility className="success-icon" />
               <h4>ASL Interpreters</h4>
             </div>
             <div className="metric-value">5 Deployed</div>
             <p className="metric-insight">GenAI matched Spanish-speaking fan with hearing impairment to bilingual medical volunteer in Sector 2.</p>
             <button className={`action-btn ${actionStates.log === 'success' ? 'success' : ''}`} onClick={() => handleAction('log')}>{actionStates.log === 'idle' ? 'View Deployment Log' : actionStates.log === 'loading' ? 'Fetching...' : 'Log Opened ✓'}</button>
          </div>
        )}

        {activeTab === 'sustainability' && (
          <>
            <div className="chart-panel glass-panel">
              <h4>Energy Optimization by GenAI (kW/h)</h4>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={energyData}>
                    <defs>
                      <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                    <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#0B1120', border: '1px solid #1E293B', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="saved" stroke="#10B981" fillOpacity={1} fill="url(#colorSaved)" name="Energy Saved" />
                    <Area type="monotone" dataKey="usage" stroke="#3B82F6" fill="transparent" name="Total Usage" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="metric-card glass-panel">
               <div className="metric-header">
                 <Battery className="warning-icon" />
                 <h4>Energy Optimization</h4>
               </div>
               <div className="metric-value">- 40 kW/h Saved</div>
               <p className="metric-insight">GenAI detected empty Sector 7. Automatically dimming lights and reducing HVAC power by 20% to optimize carbon footprint.</p>
               <button className={`action-btn ${actionStates.map === 'success' ? 'success' : ''}`} onClick={() => handleAction('map')}>{actionStates.map === 'idle' ? 'Approve Optimization' : actionStates.map === 'loading' ? 'Applying...' : 'Optimized ✓'}</button>
            </div>
          </>
        )}
      </div>

      <div className="live-feed glass-panel">
        <h4>GenAI Live Recommendations Feed</h4>
        <ul className="feed-list">
          <li><strong>14:02</strong> - Crowd Management: Sentiment analysis indicates frustration at Concession Stand 5. Suggesting deployment of mobile vendors.</li>
          <li><strong>13:58</strong> - Multilingual & Volunteers: Requests for 'medical' peaking in Sector 2. Alerting nearest volunteer medical team.</li>
          <li><strong>13:45</strong> - Sustainability: High energy usage detected in empty Sector 7. GenAI automatically dimming lights to optimize carbon footprint.</li>
        </ul>
      </div>
    </div>
  );
};

export default React.memo(OperationsDashboard);
