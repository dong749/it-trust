import React, { useRef, useState } from 'react';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';

const DataVisualizationPage: React.FC = () => {
  const navigate = useNavigate();
  const analyticsRef = useRef<any>(null);
  const dashboardRef = useRef<any>(null);
  const [hovering, setHovering] = useState({ analytics: false, dashboard: false });

  return (
    <div
      style={{
        padding: '60px 20px',
        textAlign: 'center',
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        color: '#ffffff',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1
        style={{
          fontSize: '64px',
          fontWeight: 'bold',
          marginTop: '60px',
          marginBottom: '20px',
        }}
      >
        Data Visualization
      </h1>

      <p style={{ fontSize: '18px', color: '#ccc', marginBottom: '40px' }}>
        This page presents visualized insights into data security.
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '40px',
        }}
      >
        {/* 动图 1：添加点击跳转 */}
        <div
          style={{ width: 300, cursor: 'pointer', textAlign: 'center' }}
          onMouseEnter={() => {
            analyticsRef.current?.play();
            setHovering((prev) => ({ ...prev, analytics: true }));
          }}
          onMouseLeave={() => {
            analyticsRef.current?.pause();
            setHovering((prev) => ({ ...prev, analytics: false }));
          }}
          onClick={() => navigate('/visualization/statistics')}
        >
          <Lottie
            lottieRef={analyticsRef}
            animationData={require('../../public/DataVisualization/DataLeaked.json')}
            autoplay={false}
            loop
            style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)' }}
          />
          <p style={{ marginTop: 12, fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>
            Data Breach Statistics by State
          </p>
        </div>

        {/* 动图 2 */}
        <div
          style={{ width: 300, cursor: 'pointer', textAlign: 'center' }}
          onMouseEnter={() => {
            dashboardRef.current?.play();
            setHovering((prev) => ({ ...prev, dashboard: true }));
          }}
          onMouseLeave={() => {
            dashboardRef.current?.pause();
            setHovering((prev) => ({ ...prev, dashboard: false }));
          }}
          onClick={() => navigate('/visualization/privacy')} // ✅ 跳转到新页面
        >
          <Lottie
            lottieRef={dashboardRef}
            animationData={require('../../public/DataVisualization/DataSecurityPie.json')}
            autoplay={false}
            loop
            style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)' }}
          />
          <p style={{ marginTop: 12, fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>
            Privacy Breach Distribution
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataVisualizationPage;
