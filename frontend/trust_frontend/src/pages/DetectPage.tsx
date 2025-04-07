/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { detectBreachUsingGet } from '../services/it-trust/detectDataBreachController'; 

const DetectPage: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSearch = async () => {
    if (!email) {
      alert('Please enter an email address.');
      return;
    }

    try {
      const res = await detectBreachUsingGet({ email });
      console.log('Breach result:', res);
      alert(`Result: ${res?.data?.length || 0} breach(es) found.`);
    } catch (err) {
      console.error('Error detecting breach:', err);
      alert('Failed to detect breach, please try again.');
    }
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}
    >
      {/* 顶部标题 */}
      <div
        style={{
          border: '2px solid #fff',
          borderRadius: '16px',
          padding: '40px 30px',
          maxWidth: '700px',
          textAlign: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <h1
          style={{
            fontSize: '35px',
            fontWeight: 'bold',
            color: '#fff',
            textShadow: '3px 3px 5px rgba(0, 0, 0, 0.3), 0 0 10px rgba(255, 255, 255, 0.5)',
            fontFamily: 'Verdana, Geneva, sans-serif',
            letterSpacing: '2px',
            margin: 0,
          }}
        >
          Check if your email address is in a data breach
        </h1>
      </div>

      {/* 搜索框区域 */}
      <div
        style={{
          marginTop: '40px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: '800px',
          justifyContent: 'center',
        }}
      >
        <input
          type="text"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: '9999px 0 0 9999px',
            border: '2px solid #fff',
            outline: 'none',
            fontSize: '16px',
            backgroundColor: 'transparent',
            color: '#fff',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '12px 24px',
            borderRadius: '0 9999px 9999px 0',
            border: '2px solid #fff',
            borderLeft: 'none',
            backgroundColor: '#3b82f6',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'transform 0.1s ease, background-color 0.2s',
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default DetectPage;
