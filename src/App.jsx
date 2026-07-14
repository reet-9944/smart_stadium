import { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'

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
