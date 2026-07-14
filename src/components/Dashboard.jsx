import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, AlertTriangle, ShieldCheck, Map, MessageSquare, Activity, Settings, Key } from 'lucide-react';
import './Dashboard.css';

const Dashboard = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('fan'); // 'fan' | 'staff'
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am your Smart Stadium GenAI Assistant. I can help you with navigation, food, and translation in real-time.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
  const [showSettings, setShowSettings] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSaveKey = (e) => {
    const key = e.target.value;
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInputValue('');
    setIsTyping(true);

    if (apiKey) {
      // Real GenAI API Call (Gemini)
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ 
              parts: [{ 
                text: `You are a Smart Stadium GenAI Assistant for the FIFA World Cup 2026. You help fans with navigation, food, crowd avoidance, and translation. You have access to real-time mock data: East Gate is crowded, West Gate is clear, hotdogs are at Section 102, restrooms at Section 104. Keep responses concise (1-3 sentences), friendly, and in the language the user requests. User asks: "${userMsg}"` 
              }] 
            }]
          })
        });
        
        const data = await response.json();
        setIsTyping(false);
        
        if (data.error) {
           // Fallback to gemini-pro if 1.5-flash is restricted for their key
           if (data.error.message.includes('not found')) {
             const fallbackResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  contents: [{ parts: [{ text: `You are a Smart Stadium GenAI Assistant. Keep responses concise. User asks: "${userMsg}"` }] }]
                })
             });
             const fallbackData = await fallbackResponse.json();
             if (fallbackData.error) {
                setMessages(prev => [...prev, { role: 'ai', content: `API Error: ${fallbackData.error.message}.` }]);
             } else {
                const text = fallbackData.candidates[0].content.parts[0].text;
                setMessages(prev => [...prev, { role: 'ai', content: text }]);
             }
           } else {
             setMessages(prev => [...prev, { role: 'ai', content: `API Error: ${data.error.message}. Please check your API key.` }]);
           }
        } else {
           const text = data.candidates[0].content.parts[0].text;
           setMessages(prev => [...prev, { role: 'ai', content: text }]);
        }
      } catch (err) {
        setIsTyping(false);
        setMessages(prev => [...prev, { role: 'ai', content: "Network error connecting to Gemini API." }]);
      }
    } else {
      // Mock Fallback Logic
      setTimeout(() => {
        setIsTyping(false);
        let aiResponse = "I'm processing your request. Please hold on.";
        const lowerInput = userMsg.toLowerCase();
        
        if (lowerInput.includes('bathroom') || lowerInput.includes('restroom') || lowerInput.includes('toilet')) {
          aiResponse = "The nearest restroom is 50 meters to your left, near Section 104. We have verified it is accessible for all fans.";
        } else if (lowerInput.includes('food') || lowerInput.includes('hungry') || lowerInput.includes('eat') || lowerInput.includes('khana')) {
          aiResponse = lowerInput.includes('hindi') || lowerInput.includes('khana') ? 
            "सेक्शन 102 में 2 मिनट की दूरी पर एक फूड स्टैंड है। अभी वहां भीड़ कम है। क्या मैं आपको वहां जाने का रास्ता बताऊं?" : 
            "There is a food stand 2 minutes away at Section 102. Current wait time is under 5 minutes. Would you like me to guide you there?";
        } else if (lowerInput.includes('seat')) {
          aiResponse = "To get to your seat, please take the nearest escalator to Level 2. Your route is currently clear of heavy crowds.";
        } else if (lowerInput.includes('spanish') || lowerInput.includes('hola') || lowerInput.includes('español')) {
          aiResponse = "¡Hola! Soy tu asistente inteligente del estadio. ¿En qué puedo ayudarte hoy? (Puedes preguntarme sobre comida, asientos o direcciones).";
        } else if (lowerInput.includes('hindi') || lowerInput.includes('namaste')) {
          aiResponse = "नमस्ते! मैं आपका स्मार्ट स्टेडियम सहायक हूँ। कृपया मुझे बताएं कि आप क्या खोज रहे हैं (जैसे: खाना, बाथरूम, या अपनी सीट), और मैं आपको हिंदी में पूरी जानकारी दूंगा।";
        } else if (lowerInput.includes('french') || lowerInput.includes('bonjour')) {
          aiResponse = "Bonjour ! Je suis votre assistant de stade intelligent. Comment puis-je vous aider aujourd'hui ?";
        } else {
          aiResponse = `(Demo Mode) I heard: "${userMsg}". Add a Gemini API key in the settings for real-time AI responses!`;
        }

        setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
      }, 1000);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar glass-panel">
        <div className="sidebar-header">
          <button className="back-btn" onClick={onBack}>
            <ArrowLeft size={20} /> Back
          </button>
          <h2>Command Center</h2>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-btn ${activeTab === 'fan' ? 'active' : ''}`}
            onClick={() => setActiveTab('fan')}
          >
            <MessageSquare size={20} />
            Fan Assistant (GenAI)
          </button>
          <button 
            className={`nav-btn ${activeTab === 'staff' ? 'active' : ''}`}
            onClick={() => setActiveTab('staff')}
          >
            <Activity size={20} />
            Staff Intelligence
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="settings-btn" onClick={() => setShowSettings(!showSettings)}>
            <Settings size={20} /> API Settings
          </button>
        </div>
      </aside>

      {/* Main Content */}
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
          <div className="chat-interface glass-panel">
            <div className="chat-header">
              <h3>GenAI Fan Assistant</h3>
              <span className="status-indicator">
                <span className={`dot ${apiKey ? 'pulse' : ''}`}></span> {apiKey ? 'Live GenAI' : 'Demo Mode'}
              </span>
            </div>
            
            <div className="chat-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`message-wrapper ${msg.role}`}>
                  <div className={`message ${msg.role}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="message-wrapper ai">
                  <div className="message ai typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form className="chat-input-area" onSubmit={handleSend}>
              <input 
                type="text" 
                placeholder="Ask about navigation, food, or type in your language..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="submit" className="send-btn">
                <Send size={20} />
              </button>
            </form>
          </div>
        ) : (
          <div className="staff-dashboard">
            <div className="dashboard-header">
              <h3>Operational Intelligence</h3>
              <p>Real-time GenAI decision support</p>
            </div>

            <div className="metrics-grid">
              <div className="metric-card glass-panel">
                <div className="metric-header">
                  <AlertTriangle className="warning-icon" />
                  <h4>Crowd Bottleneck Predicted</h4>
                </div>
                <div className="metric-value">North Gate - Sector 4</div>
                <p className="metric-insight">GenAI suggests opening overflow doors in 10 mins to prevent 30% congestion increase.</p>
                <button className="action-btn">Deploy Staff</button>
              </div>

              <div className="metric-card glass-panel">
                <div className="metric-header">
                  <Map className="info-icon" />
                  <h4>Transport Status</h4>
                </div>
                <div className="metric-value">Metro Line B Delayed</div>
                <p className="metric-insight">Auto-notifying fans leaving via West Gate to use alternative bus routes.</p>
                <button className="action-btn">View Routing Map</button>
              </div>

              <div className="metric-card glass-panel">
                <div className="metric-header">
                  <ShieldCheck className="success-icon" />
                  <h4>Accessibility Requests</h4>
                </div>
                <div className="metric-value">3 Active</div>
                <p className="metric-insight">All requests currently assigned. Average resolution time: 4 mins.</p>
                <button className="action-btn">View Log</button>
              </div>
            </div>

            <div className="live-feed glass-panel">
              <h4>GenAI Live Recommendations Feed</h4>
              <ul className="feed-list">
                <li><strong>14:02</strong> - Sentiment analysis indicates frustration at Concession Stand 5. Suggesting deployment of mobile vendors.</li>
                <li><strong>13:58</strong> - Multilingual requests for 'medical' peaking in Sector 2. Alerting nearest medical team.</li>
                <li><strong>13:45</strong> - Weather forecast change detected. Roof closure sequence recommended in 45 mins.</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
