import React from 'react';
import { Send } from 'lucide-react';

const FanAssistant = ({ apiKey, messages, isTyping, inputValue, setInputValue, handleSend, chatEndRef }) => {
  return (
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
        <button aria-label="Send message" type="submit" className="send-btn">
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default React.memo(FanAssistant);
