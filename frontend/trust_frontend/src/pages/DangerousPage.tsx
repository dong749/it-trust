/* eslint-disable react/button-has-type */
import React from 'react';
import { useNavigate } from 'umi';

const DangerousPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div style={{ padding: '40px 5vw', maxWidth: '1200px', margin: '0 auto' }}>
      {/* 顶部标题 + 图片 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: '60px',
          gap: '40px',
        }}
      >
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '48px', color: '#fff', marginBottom: '12px' }}>
            The Dangers of Data Breaches
          </h1>
          <h2 style={{ color: '#ccc', fontWeight: 400 }}>
            Discover how data breaches pose serious threats to individuals, businesses, and society
            as a whole.
          </h2>
        </div>
        <img
          src="/DangerTitle.png"
          alt="Data Breach Dangers"
          style={{
            flex: '1 1 400px',
            maxWidth: '500px',
            borderRadius: '12px',
            width: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '40px',
        }}
      >
        {/* 主内容区域 */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <section>
            <h2 style={{ fontSize: '28px', color: '#fff', marginBottom: '16px' }}>
              Why Data Breaches Are Dangerous
            </h2>
            <p style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
              Data breaches aren't just about leaked emails or stolen credit cards — they can lead
              to long-term consequences like identity theft, targeted scams, and even national
              security threats.
            </p>
          </section>

          <hr style={{ borderColor: '#444', margin: '40px 0' }} />

          <h2 style={{ fontSize: '28px', color: '#fff', marginBottom: '16px' }}>Relevant Cases</h2>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                backgroundColor: '#1f2937',
                borderRadius: '12px',
                padding: '20px',
                flex: '1 1 45%',
                minWidth: '260px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '10px' }}>
                Equifax Data Breach Affected 147 Million
              </h3>
              <p style={{ fontSize: '14px', color: '#ccc', marginBottom: '10px' }}>
                In 2017, one of the largest data breaches in U.S. history exposed the personal
                information of nearly half the U.S. population.
              </p>
              <a
                href="https://www.ftc.gov/enforcement/cases-proceedings/refunds/equifax-data-breach-settlement"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#3b82f6', textDecoration: 'underline', fontSize: '14px' }}
              >
                Read more →
              </a>
            </div>

            <div
              style={{
                backgroundColor: '#1f2937',
                borderRadius: '12px',
                padding: '20px',
                flex: '1 1 45%',
                minWidth: '260px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '10px' }}>
                Facebook's 2019 Data Leak Exposed Millions
              </h3>
              <p style={{ fontSize: '14px', color: '#ccc', marginBottom: '10px' }}>
                In 2019, hundreds of millions of user records were found exposed online due to
                Facebook's security missteps.
              </p>
              <a
                href="https://techcrunch.com/2019/04/03/facebook-users-data-exposed-amazon-servers/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#3b82f6', textDecoration: 'underline', fontSize: '14px' }}
              >
                Read more →
              </a>
            </div>
          </div>

          <hr style={{ borderColor: '#444', margin: '40px 0' }} />

          <section>
            <h2 style={{ fontSize: '28px', color: '#fff' }}>Real-World Threats</h2>
            <ul style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.8, paddingLeft: '20px' }}>
              <li>
                <strong>Identity Theft:</strong> Criminals can impersonate you and open accounts.
              </li>
              <li>
                <strong>Financial Fraud:</strong> Stolen bank data leads to monetary loss.
              </li>
              <li>
                <strong>Blackmail:</strong> Sensitive data can be used for extortion.
              </li>
              <li>
                <strong>Corporate Espionage:</strong> Trade secrets may be leaked.
              </li>
              <li>
                <strong>National Security Risks:</strong> Breaches can endanger entire nations.
              </li>
            </ul>
          </section>

          <div style={{ marginTop: '40px', borderRadius: '12px', overflow: 'hidden' }}>
            <iframe
              src="https://www.youtube.com/embed/S4j_x8jW8r4"
              title="Data Breach Dangers"
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
            <h2 style={{ fontSize: '28px', color: '#fff' }}>Take Action Now</h2>
            <p style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
              Secure your life with strong passwords, multi-factor authentication, and encrypted storage.
            </p>
          </section>

          <hr style={{ borderColor: '#444', margin: '40px 0' }} />

          <section>
            <h2 style={{ fontSize: '28px', color: '#fff' }}>Conclusion</h2>
            <p style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
              Data breaches are not abstract IT issues — they are deeply personal and dangerous.
              Proactively managing your digital security helps protect your identity and future.
            </p>
          </section>
        </div>

        {/* 右侧提示卡片 */}
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
              ⚠️ Are You Prepared?
            </h3>
            <p style={{ fontSize: '14px', color: '#333', marginBottom: '20px' }}>
              Test your knowledge about the dangers of data breaches and see how well protected you are.
            </p>
            <button
              onClick={handleStartQuiz}
              style={{
                padding: '10px 18px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: '#ef4444',
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

export default DangerousPage;
