/* eslint-disable react/button-has-type */
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

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
      {/* 左上角 GIF */}
      <img
        src="/techny-email-marketing-and-newsletter-with-new-message.gif"
        alt="Homepage Animation"
        style={{
          position: 'absolute',
          top: '2%',
          left: '2%',
          width: '25vw',
          maxWidth: '280px',
          transform: 'rotate(-15deg)',
          borderRadius: '8px',
          zIndex: 1000,
        }}
      />

      {/* 主要标题 */}
      <h1
        style={{
          fontSize: '5vw', // 缩小一点
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
        Golden Guardians
      </h1>

      {/* 副标题 */}
      <h3
        style={{
          fontSize: '2.2vw', // 缩小一点
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
          fontSize: '1.6vw', // 缩小字号
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
        Get Started
      </button>

      {/* 右下角 GIF */}
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
    </div>
  );
};

export default Welcome;
