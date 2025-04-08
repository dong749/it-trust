/* eslint-disable react/button-has-type */
import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 引入导航函数

const Welcome: React.FC = () => {
  const navigate = useNavigate(); // ✅ 初始化导航器

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <img
        src="/techny-email-marketing-and-newsletter-with-new-message.gif"
        alt="Homepage Animation"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '300px',
          transform: 'rotate(-15deg)',
          borderRadius: '8px',
          zIndex: 1000,
        }}
      />

      <div style={{ textAlign: 'center', marginTop: '150px' }}>
        <h1
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: '#4A90E2',
            textShadow: '3px 3px 5px rgba(0, 0, 0, 0.3), 0 0 10px rgba(74, 145, 226, 0.51)',
            fontFamily: 'Verdana, Geneva, sans-serif',
            letterSpacing: '2px',
          }}
        >
          Golden Guardians
        </h1>
      </div>

      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#4A90E2',
          }}
        >
          We will help you improve your awareness of Data Security
        </h3>

        <button
          style={{
            marginTop: '60px',
            padding: '10px 20px',
            fontSize: '25px',
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
          onClick={() => navigate('/learning')} // ✅ 点击跳转
        >
          Get Started
        </button>
      </div>

      {/* GIF 动图 右下角 */}
      <img
        src="/techny-kanban-planning-board-on-tablet.gif"
        alt="Homepage Animation"
        style={{
          position: 'absolute',
          bottom: '50px',
          right: '20px',
          width: '300px',
          transform: 'rotate(30deg)',
          borderRadius: '8px',
          zIndex: 1000,
        }}
      />
    </div>
  );
};

export default Welcome;
