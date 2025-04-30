/* eslint-disable react/button-has-type */
import React from 'react';
import { useNavigate } from 'umi';

const DataSecurityPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div style={{ padding: '60px' }}>
      {/* 顶部：图片 + 标题 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginBottom: '60px',
        }}
      >
        <div style={{ flex: '1', minWidth: '300px' }}>
          <img
            src="/DataSecurityTitle.png"
            alt="Private Data Visual"
            style={{
              width: '100%',
              borderRadius: '12px',
              objectFit: 'cover',
              maxHeight: '400px',
            }}
          />
        </div>

        <div style={{ flex: '1', paddingLeft: '40px', minWidth: '300px' }}>
          <h1
            style={{
              fontSize: '50px',
              lineHeight: 1.3,
              color: '#fff',
              marginBottom: '20px',
            }}
          >
            What Is Data Security?
          </h1>
          <h2 style={{ color: '#ccc' }}>
            Understand how data security enables individuals to protect information.
          </h2>
        </div>
      </div>

      {/* 下方：提示框 + 正文 */}
      <div
        style={{
          display: 'flex',
          gap: '40px',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {/* 左侧提示卡片 */}
        <div style={{ position: 'sticky', top: '80px', minWidth: '250px' }}>
          <div
            style={{
              backgroundColor: '#f0f0f0',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
          >
            <div
              style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '8px',
              }}
            >
              🔐 Data Security
            </div>
            <p style={{ fontSize: '14px', color: '#333', marginBottom: '20px' }}>
              Start a Small Game Quiz to Check Your Understanding
            </p>
            <button
              onClick={handleStartQuiz}
              style={{
                padding: '10px 18px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: '#f97316',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Get Started →
            </button>
          </div>
        </div>

        {/* 右侧文章正文 */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h2 style={{ fontSize: '30px' }}>Introduce</h2>
          <p style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
            Personal data security refers to the process and ability to protect personal sensitive
            information from being leaked, abused, tampered with or illegally accessed through a
            series of technical means, management measures and legal norms...
          </p>

          <h2 style={{ fontSize: '30px' }}>The Core Goal of Personal Data Security</h2>
          <ol style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
            <li style={{ marginBottom: '10px' }}>
              1. Confidentiality: Ensure that data is visible only to authorized users.
            </li>
            <li style={{ marginBottom: '10px' }}>
              2. Integrity: Ensure that data cannot be tampered with or forged.
            </li>
            <li style={{ marginBottom: '10px' }}>
              3. Availability: Ensure that data is accessible when needed.
            </li>
            <li style={{ marginBottom: '10px' }}>
              4. Control: Allow users to manage their own data access and rights.
            </li>
          </ol>

          <div
            style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: 0,
              overflow: 'hidden',
              borderRadius: '12px',
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/N8xEgSe5RwE"
              title="Understanding Data Security"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: '0',
              }}
            ></iframe>
          </div>

          <div style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '30px' }}>Defining Data Privacy and Data Security</h2>
            <p style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
              Data Privacy addresses the rights of individuals to control how and to what extent
              information about them is used.
            </p>
            <p style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
              Data Security is about ensuring the confidentiality, integrity, and availability of
              that information.
            </p>

            <img
              src="/DataSecurityDistinct.png"
              alt="Data Privacy vs Data Security"
              style={{
                maxWidth: '100%',
                height: 'auto',
                marginTop: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            />
          </div>

          <h2 style={{ fontSize: '30px', marginTop: '40px' }}>Data Security in Our Life</h2>
          <ol style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
            <li style={{ marginBottom: '10px' }}>
              1. Protecting personal details like emails and passwords from leaks and misuse.
            </li>
            <li style={{ marginBottom: '10px' }}>
              2. Securing online banking and payment systems from cyber theft.
            </li>
            <li style={{ marginBottom: '10px' }}>
              3. Ensuring fitness and health apps protect user privacy and data.
            </li>
            <li style={{ marginBottom: '10px' }}>
              4. Managing digital footprint and social media privacy settings.
            </li>
          </ol>

          <div
            style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: 0,
              overflow: 'hidden',
              borderRadius: '12px',
              marginTop: '20px',
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/se9i6b50jRI"
              title="Data Security in Life"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: '0',
              }}
            ></iframe>
          </div>

          <h2 style={{ fontSize: '30px', marginTop: '40px' }}>Conclusion</h2>
          <p style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
            Data security is no longer just an IT concern — it's a critical life skill. With more
            data being collected daily, it's essential to protect personal information through best
            practices and awareness.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataSecurityPage;
