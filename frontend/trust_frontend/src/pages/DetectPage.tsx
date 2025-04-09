/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { detectBreachUsingGet } from '../services/it-trust/detectDataBreachController';
import { getBreachCountByGroupUsingGet } from '../services/it-trust/breachLogController';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#00C49F', '#FF8042'];

const DetectPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [breachStats, setBreachStats] = useState<{ name: string; value: number }[]>([]);
  const [breachCount, setBreachCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // 页面加载时请求饼图数据
  useEffect(() => {
    const fetchBreachStats = async () => {
      try {
        const res = await getBreachCountByGroupUsingGet();
        if (res?.data) {
          const pieData = res.data.map((item: any) => ({
            name: item.isBreach === '1' ? 'Breached' : 'Not Breached',
            value: parseInt(item.count, 10),
          }));
          setBreachStats(pieData);
        }
      } catch (error) {
        console.error('Failed to fetch breach stats:', error);
      }
    };

    fetchBreachStats();
  }, []);

  // 点击搜索按钮
  const handleSearch = async () => {
    setErrorMsg(''); // 清除旧的错误信息

    if (!email) {
      setErrorMsg('Please enter an email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setBreachCount(null);

    try {
      const res = await detectBreachUsingGet({ email });
      const count = res?.data?.length || 0;
      setBreachCount(count);
    } catch (err) {
      console.error('Error detecting breach:', err);
      setErrorMsg('Failed to detect breach, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
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

      {/* 错误提示信息区域 */}
      {errorMsg && (
        <div style={{ color: 'red', marginTop: '12px', fontWeight: 500 }}>
          {errorMsg}
        </div>
      )}

      {/* 加载动画 */}
      {loading && (
        <div style={{ marginTop: '20px' }}>
          <div
            style={{
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #3b82f6',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              animation: 'spin 1s linear infinite',
            }}
          />
        </div>
      )}

      {/* Danger / Safe 提示区域 */}
      {breachCount !== null && !loading && (
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <h2
            style={{
              color: breachCount > 0 ? 'red' : 'green',
              fontWeight: 'bold',
              fontSize: '32px',
            }}
          >
            {breachCount > 0 ? 'Dangerous!!!' : "You're Safe 👍"}
          </h2>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '20px',
              marginTop: '20px',
              marginBottom: '40px',
            }}
          >
            {[ 
              'Use strong, unique passwords for each site',
              'Enable Two-Factor Authentication (2FA)',
              'Avoid clicking suspicious links or attachments'
            ].map((tip, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: breachCount > 0 ? '#dc2626' : '#16a34a',
                  color: 'white',
                  padding: '20px',
                  borderRadius: '12px',
                  width: '280px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                  fontSize: '16px',
                  fontWeight: 500,
                  textAlign: 'center',
                }}
              >
                {tip}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 饼图区域 */}
      <div style={{ marginTop: '20px', width: '100%', maxWidth: '600px', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={breachStats}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
              {breachStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 动画样式 */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default DetectPage;
