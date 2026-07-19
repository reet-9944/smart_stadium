import React, { useState, useEffect, Suspense } from 'react';
import LandingPage from './components/LandingPage';
const Dashboard = React.lazy(() => import('./components/Dashboard'));

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'

  useEffect(() => {
    if (currentView === 'dashboard') {
      document.body.classList.add('dashboard-lock');
    } else {
      document.body.classList.remove('dashboard-lock');
    }
  }, [currentView]);

  return (
    <>
      {currentView === 'landing' ? (
        <LandingPage onLaunch={() => setCurrentView('dashboard')} />
      ) : (
        <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#fff', backgroundColor: '#0B1120' }}>Loading Command Center...</div>}>
          <Dashboard onBack={() => setCurrentView('landing')} />
        </Suspense>
      )}
    </>
  );
}

export default App;
