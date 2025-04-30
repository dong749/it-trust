/* eslint-disable react/button-has-type */
import React from 'react';
import { useNavigate } from 'umi';

const PrivateDataPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz'); // 正确跳转到 QuizPage
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
            src="/PrivatePageTitle.png"
            alt="Private Data Visual"
            style={{
              width: '70%',
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
            What is Private Data and Why it Matters in Today’s Digital World
          </h1>
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
              style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '8px' }}
            >
              🔐 Protect Your Data
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
          <div
            style={{
              backgroundColor: '#dbeafe',
              padding: '16px 20px',
              borderRadius: '12px',
              margin: '24px 0',
              display: 'flex',
              alignItems: 'center',
              fontSize: '16px',
              fontWeight: 500,
              color: '#0f172a',
            }}
          >
            <span style={{ fontSize: '24px', marginRight: '12px' }}>❝</span>
            Want to understand what difference between private data and public data?
            <a
              href="https://www.companysights.com/resources/private-data-vs-public-data-how-to-calibrate-the-difference"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#2563eb',
                marginLeft: '6px',
                textDecoration: 'underline',
              }}
            >
              Learn more
            </a>
          </div>

          <h2 style={{ fontSize: '30px' }}>Introduce</h2>
          <p style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
            The term ‘personal information’ encompasses a broad range of information.
          </p>
          <br />
          <p style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
            A number of different types of information are explicitly recognised as constituting personal information under the Privacy Act.
          </p>

          <ol style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
            <li style={{ marginBottom: '10px' }}>
              1. Sensitive information (racial/ethnic origin, political opinion, religious beliefs, sexual orientation, etc.)
            </li>
            <li style={{ marginBottom: '10px' }}>
              2. Health information (also considered sensitive)
            </li>
            <li style={{ marginBottom: '10px' }}>3. Credit information</li>
            <li style={{ marginBottom: '10px' }}>
              4. Employee record information, and tax file number information.
            </li>
          </ol>

          <div style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#fff' }}>
              Watch: Understanding Private Data
            </h2>
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
                src="https://www.youtube.com/embed/MjPpG2e71Ec"
                title="Understanding Private Data"
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
          </div>

          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#fff' }}>Conclusion</h2>
            <p style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
              Personal data is any information that identifies an individual, making it a vital aspect of privacy and security in today's digital world. As technology advances and data collection becomes more widespread, protecting personal data has become increasingly important.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateDataPage;
