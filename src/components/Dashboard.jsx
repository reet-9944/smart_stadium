import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Menu, X, Key } from 'lucide-react';
import Sidebar from './Sidebar';
import FanAssistant from './FanAssistant';
import OperationsDashboard from './OperationsDashboard';
import './Dashboard.css';

const Dashboard = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('fan');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am your Smart Stadium GenAI Assistant. I can help you with navigation, food, and translation in real-time.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [apiKey, setApiKey] = useState(sessionStorage.getItem('gemini_api_key') || '');
  const [showSettings, setShowSettings] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [actionStates, setActionStates] = useState({
    deploy: 'idle',
    map: 'idle',
    log: 'idle'
  });
  const chatEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const handleAction = useCallback((type) => {
    if (actionStates[type] !== 'idle') return;
    setActionStates(prev => ({ ...prev, [type]: 'loading' }));
    setTimeout(() => {
      setActionStates(prev => ({ ...prev, [type]: 'success' }));
      setTimeout(() => {
        setActionStates(prev => ({ ...prev, [type]: 'idle' }));
      }, 3000);
    }, 1200);
  }, [actionStates]);

  const handleSaveKey = useCallback((e) => {
    const key = e.target.value;
    setApiKey(key);
    sessionStorage.setItem('gemini_api_key', key);
  }, []);

  const runDemoMode = useCallback((userMsg) => {
    setTimeout(() => {
      setIsTyping(false);
      let aiResponse = "I'm processing your request. Please hold on.";
      const lowerInput = userMsg.toLowerCase().trim();
      
      if (lowerInput.includes('bathroom') || lowerInput.includes('restroom') || lowerInput.includes('toilet') || lowerInput.includes('bathrooms')) {
        aiResponse = "The nearest restroom is 50 meters to your left, near Section 104. We have verified it is accessible for all fans.";
      } else if (lowerInput.includes('food') || lowerInput.includes('hungry') || lowerInput.includes('eat') || lowerInput.includes('khana') || lowerInput.includes('hotdog')) {
        aiResponse = lowerInput.includes('hindi') || lowerInput.includes('khana') ? 
          "सेक्शन 102 में 2 मिनट की दूरी पर एक फूड स्टैंड है। अभी वहां भीड़ कम है। क्या मैं आपको वहां जाने का रास्ता बताऊं?" : 
          "There is a food stand 2 minutes away at Section 102. Current wait time is under 5 minutes. Would you like me to guide you there?";
      } else if (lowerInput.includes('seat') || lowerInput.includes('ticket')) {
        aiResponse = "To get to your seat, please take the nearest escalator to Level 2. Your route is currently clear of heavy crowds.";
      } else if (lowerInput.includes('spanish') || lowerInput.includes('hola') || lowerInput.includes('español')) {
        aiResponse = "¡Hola! Soy tu asistente inteligente del estadio. ¿En qué puedo ayudarte hoy? (Puedes preguntarme sobre comida, asientos o direcciones).";
      } else if (lowerInput.includes('hindi') || lowerInput.includes('namaste')) {
        aiResponse = "नमस्ते! मैं आपका स्मार्ट स्टेडियम सहायक हूँ। कृपया मुझे बताएं कि आप क्या खोज रहे हैं (जैसे: खाना, बाथरूम, या अपनी सीट), और मैं आपको हिंदी में पूरी जानकारी दूंगा।";
      } else if (lowerInput.includes('french') || lowerInput.includes('bonjour')) {
        aiResponse = "Bonjour ! Je suis votre assistant de stade intelligent. Comment puis-je vous aider aujourd'hui ?";
      } else if (lowerInput === 'hi' || lowerInput === 'hello' || lowerInput === 'hey') {
        aiResponse = "Hello! Welcome to the Smart Stadium. How can I help you make the most of the tournament today? I can help with directions, food, or translation!";
      } else {
        aiResponse = "I can certainly help with that! I am currently optimized to assist with stadium navigation, food options, seating directions, crowd management, and translation. What can I find for you?";
      }

      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    }, 1000);
  }, []);

  const handleSend = useCallback(async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInputValue('');
    setIsTyping(true);

    if (apiKey) {
      try {
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(apiKey);
        const prompt = `You are a Smart Stadium GenAI Assistant for the FIFA World Cup 2026. You help fans with navigation, food, crowd avoidance, and translation. You have access to real-time mock data: East Gate is crowded, West Gate is clear, hotdogs are at Section 102, restrooms at Section 104. Keep responses concise (1-3 sentences), friendly, and in the language the user requests. User asks: "${userMsg}"`;
        
        try {
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const text = response.text();
          
          setIsTyping(false);
          setMessages(prev => [...prev, { role: 'ai', content: text }]);
        } catch (flashErr) {
          console.warn("gemini-1.5-flash failed, trying gemini-1.0-pro...");
          try {
            const backupModel = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
            const result = await backupModel.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            
            setIsTyping(false);
            setMessages(prev => [...prev, { role: 'ai', content: text }]);
          } catch {
            throw new Error(flashErr.message); 
          }
        }
      } catch (err) {
        console.warn("Gemini API Error, falling back to seamless demo mode:", err);
        runDemoMode(userMsg);
      }
    } else {
      runDemoMode(userMsg);
    }
  }, [inputValue, apiKey, runDemoMode]);

  return (
    <div 
      className="dashboard-container"
      onMouseMove={(e) => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
      }}
    >
      <div className="stadium-bg"></div>
      <header className="mobile-header">
        <h2>Command Center</h2>
        <button aria-label="Toggle mobile menu" className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        onBack={onBack}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />

      <main className="main-content">
        {showSettings && (
          <div className="api-settings-panel glass-panel">
            <h3><Key size={20} /> GenAI Configuration</h3>
            <p>Enter your Gemini API Key to enable real-time, dynamic AI responses instead of the demo mock mode. Your key is stored locally in your browser.</p>
            <input 
              type="password" 
              placeholder="Enter Gemini API Key (AIzaSy...)" 
              value={apiKey}
              onChange={handleSaveKey}
            />
            {apiKey ? <span className="status-success">✓ Key Saved Locally</span> : <span className="status-warning">Demo Mode Active</span>}
          </div>
        )}

        {activeTab === 'fan' ? (
          <FanAssistant 
            apiKey={apiKey}
            messages={messages}
            isTyping={isTyping}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSend={handleSend}
            chatEndRef={chatEndRef}
          />
        ) : (
          <OperationsDashboard 
            activeTab={activeTab}
            actionStates={actionStates}
            handleAction={handleAction}
          />
        )}
      </main>
    </div>
  );
};

export default React.memo(Dashboard);
