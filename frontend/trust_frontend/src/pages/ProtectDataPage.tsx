/* eslint-disable react/button-has-type */
import React from 'react';
import { useNavigate } from 'umi';

const ProtectDataPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div style={{ padding: '40px 5vw', maxWidth: '1200px', margin: '0 auto' }}>
      {/* 顶部横幅区域 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '40px',
          marginBottom: '60px',
        }}
      >
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '48px', color: '#fff', marginBottom: '12px' }}>
            How to Protect Your Data
          </h1>
          <h2 style={{ color: '#ccc', fontWeight: 400 }}>
            Learn practical steps to safeguard your personal and digital information in today’s online world.
          </h2>
        </div>
        <img
          src="/DataProtectTitle.gif"
          alt="Protect Data"
          style={{
            flex: '1 1 400px',
            maxWidth: '500px',
            borderRadius: '12px',
            width: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {/* 主内容区域 */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <section>
            <h2 style={{ fontSize: '28px', color: '#fff', marginBottom: '16px' }}>
              Why Personal Data Protection Matters
            </h2>
            <p style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
              Every online action — from signing up for an account to making a purchase — can expose your personal data. 
              Protecting that data prevents misuse, financial theft, identity fraud, and loss of privacy.
            </p>
          </section>

          <hr style={{ borderColor: '#444', margin: '40px 0' }} />

          <section>
            <h2 style={{ fontSize: '28px', color: '#fff' }}>Top Ways to Protect Your Data</h2>
            <ol style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
              <li>Use strong, unique passwords for every account and enable two-factor authentication.</li>
              <li>Avoid public Wi-Fi for sensitive transactions. Use a VPN when needed.</li>
              <li>Regularly review app permissions and revoke access when unnecessary.</li>
              <li>Back up important files and photos to secure cloud storage or encrypted drives.</li>
              <li>Keep your devices and software updated to patch security vulnerabilities.</li>
            </ol>
          </section>

          {/* 视频介绍 */}
          <div style={{ marginTop: '40px', borderRadius: '12px', overflow: 'hidden' }}>
            <iframe
              src="https://www.youtube.com/embed/BgisJMjMCqE"
              title="How to Protect Your Data"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                width: '100%',
                height: '400px',
                border: 'none',
              }}
            ></iframe>
          </div>

          <hr style={{ borderColor: '#444', margin: '40px 0' }} />

          <section>
            <h2 style={{ fontSize: '28px', color: '#fff' }}>Conclusion</h2>
            <p style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
              Protecting your data is not just about avoiding hacks — it's about maintaining control over your identity, finances, and digital reputation. 
              Start small, stay informed, and build habits that prioritize your privacy and security.
            </p>
          </section>
        </div>

        {/* 提示卡片 */}
        <div
          style={{
            flex: '0 0 300px',
            minWidth: '260px',
            position: 'sticky',
            top: '80px',
            alignSelf: 'flex-start',
          }}
        >
          <div
            style={{
              backgroundColor: '#f3f4f6',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <h3 style={{ fontSize: '18px', color: '#111', fontWeight: 600, marginBottom: '10px' }}>
              🔐 Ready to Test Yourself?
            </h3>
            <p style={{ fontSize: '14px', color: '#333', marginBottom: '20px' }}>
              Take our quick quiz to see how well you understand personal data protection.
            </p>
            <button
              onClick={handleStartQuiz}
              style={{
                padding: '10px 18px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: '#10b981',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Start Quiz →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectDataPage;
