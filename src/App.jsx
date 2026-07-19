import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

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
        <Dashboard onBack={() => setCurrentView('landing')} />
      )}
    </>
  );
}

export default App;
