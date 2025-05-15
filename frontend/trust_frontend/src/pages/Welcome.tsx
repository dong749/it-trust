/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { chatBotResponseUsingGet } from '../services/it-trust/aiChatAndDetectController'; // 替换为你的 API 文件路径

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ from: 'user' | 'bot'; text: string }[]>([
    { from: 'bot', text: '👋 Hi! How can I help you with data security?' },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const input = userInput.trim();
    const userMessage = { from: 'user' as const, text: input };
    setChatHistory((prev) => [...prev, userMessage]);
    setUserInput('');
    setLoading(true);

    try {
      const res = await chatBotResponseUsingGet({ userInput: input }, input);
      const botReply = res?.data || '🤖 Sorry, I did not understand that.';
      setChatHistory((prev) => [...prev, { from: 'bot', text: botReply }]);
    } catch (err) {
      console.error('Chatbot error:', err);
      setChatHistory((prev) => [
        ...prev,
        { from: 'bot', text: '❌ Failed to get response from AI.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        padding: '20px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 顶部图 */}
      <div
        style={{
          position: 'absolute',
          top: '2%',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 2%',
          zIndex: 1000,
        }}
      >
        <img
          src="/techny-email-marketing-and-newsletter-with-new-message.gif"
          alt="Left Animation"
          style={{
            width: '25vw',
            maxWidth: '280px',
            transform: 'rotate(-15deg)',
            borderRadius: '8px',
          }}
        />
        <img
          src="/old-man-listening-songs-on-a-phone.svg"
          alt="Right Animation"
          style={{
            width: '25vw',
            maxWidth: '280px',
            transform: 'rotate(10deg)',
            borderRadius: '8px',
          }}
        />
      </div>

      {/* 主标题 */}
      <h1
        style={{
          fontSize: '5vw',
          maxWidth: '90%',
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#4A90E2',
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.25), 0 0 6px rgba(74, 145, 226, 0.4)',
          fontFamily: 'Verdana, Geneva, sans-serif',
          letterSpacing: '1px',
          margin: '0 0 20px 0',
        }}
      >
        Safe Seniors
      </h1>

      <h3
        style={{
          fontSize: '2.2vw',
          maxWidth: '90%',
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#4A90E2',
          margin: 0,
        }}
      >
        We will help you improve your awareness of Data Security
      </h3>

      {/* 开始按钮 */}
      <button
        style={{
          marginTop: '6vh',
          padding: '12px 24px',
          fontSize: '1.6vw',
          fontWeight: 'bold',
          color: '#fff',
          backgroundColor: '#4A90E2',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s',
          boxShadow: '0 0 10px rgba(74, 145, 226, 0.7)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2A5DA8')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4A90E2')}
        onClick={() => navigate('/learning')}
      >
        Lets Protect Your Data
      </button>

      {/* 右下角图 */}
      <img
        src="/techny-kanban-planning-board-on-tablet.gif"
        alt="Homepage Animation"
        style={{
          position: 'absolute',
          bottom: '2%',
          right: '2%',
          width: '25vw',
          maxWidth: '280px',
          transform: 'rotate(30deg)',
          borderRadius: '8px',
          zIndex: 1000,
        }}
      />

      {/* 左下角聊天图标 */}
      <img
        src="/chatbot.gif"
        alt="Chatbot Icon"
        style={{
          position: 'absolute',
          bottom: '2%',
          left: '2%',
          width: '80px',
          height: '80px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
        onClick={() => setShowChat(!showChat)}
      />

      {/* 聊天框 */}
      {showChat && (
        <div
          style={{
            position: 'absolute',
            bottom: '90px',
            left: '2%',
            width: '700px',
            height: '400px',
            backgroundColor: '#fff',
            border: '2px solid #4A90E2',
            borderRadius: '8px',
            padding: '10px',
            zIndex: 1001,
            boxShadow: '0 0 12px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#4A90E2' }}>
            Chatbot Assistant
          </div>

          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              marginBottom: '8px',
              border: '1px solid #eee',
              padding: '5px',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          >
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '8px',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#f1f1f1',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    maxWidth: '75%',
                    color: '#000',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  <b>{msg.from === 'user' ? 'You' : 'Bot'}:</b> {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ fontStyle: 'italic', color: '#888' }}>Bot is typing...</div>
            )}
          </div>

          <div style={{ display: 'flex' }}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: '6px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '14px',
                marginRight: '5px',
              }}
            />
            <button
              onClick={handleSend}
              disabled={loading}
              style={{
                padding: '6px 12px',
                backgroundColor: '#4A90E2',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;
