/* eslint-disable react/button-has-type */
import React from 'react';

const DataSecurityPage: React.FC = () => {
  return (
    <div style={{ padding: '60px' }}>
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
          <h2>Understand how data security enables individual to protect information.</h2>
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
              🔐 Data Security
            </div>
            <p style={{ fontSize: '14px', color: '#333', marginBottom: '20px' }}>
              Start a Small Game Quiz to Check Your Understanding
            </p>
            <button
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
            series of technical means, management measures and legal norms. Its core purpose is to
            protect personal privacy, safeguard personal rights and interests, and avoid risks such
            as identity theft, property loss and reputation damage.
          </p>

          <h2 style={{ fontSize: '30px' }}>The Core Goal of Personal Data Security</h2>

          <ol style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
            <li style={{ marginBottom: '10px' }}>
              1. Confidentiality: Ensure that data is visible only to authorized users to prevent
              information from being leaked or peeped.
            </li>
            <li style={{ marginBottom: '10px' }}>
              2. Integrity: Ensures that data cannot be tampered with or forged without
              authorization.
            </li>
            <li style={{ marginBottom: '10px' }}>
              3. Availability: Ensure that data can be legally accessed and used when needed.
            </li>
            <li style={{ marginBottom: '10px' }}>
              4. Control: Data subjects can control the use of their own data, such as viewing,
              modifying or deleting permissions.
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
              src="https://www.youtube.com/embed/N8xEgSe5RwE" // 👈 替换为你自己的视频链接 ID
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

          <div style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '30px' }}>Defining Data Privacy and Data Security</h2>
            <p style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
              Data Privacy addresses the rights of individuals to control how and to what extent
              information about them, their personal information, is collected and used within
              organizations with whom they choose to interact.
            </p>

            <br />

            <p style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
              Data Security is about assuring the confidentiality, integrity, and availability of
              information assets — in this case, personal information. 
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
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#fff' }}>
              Data Security in Our Life
            </h2>
            <ol style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
              <li style={{ marginBottom: '10px' }}>
                1. Protecting Personal Information: When we enter our names, emails, phone numbers,
                or payment details online, this data needs protection. Without proper security, it
                could fall into the hands of hackers or be sold without consent.
              </li>
              <li style={{ marginBottom: '10px' }}>
                2. Online Banking and Payments: Digital banking apps and mobile payments like Apple
                Pay or Google Wallet rely on encryption and authentication to keep transactions
                safe. A single data breach could result in major financial losses.
              </li>
              <li style={{ marginBottom: '10px' }}>
                3. Health & Fitness Data: Apps that track your steps, sleep, or medical history deal
                with sensitive personal data. If not secured properly, this information can be
                misused by third parties or insurers.
              </li>
              <li style={{ marginBottom: '10px' }}>
                4. Social Media Usage: Everything we post, like, or share builds a digital profile.
                Proper privacy settings and platform data handling policies ensure this information
                isn’t misused.
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
                src="https://www.youtube.com/embed/se9i6b50jRI" // 👈 替换为你自己的视频链接 ID
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

            <h2 style={{ fontSize: '30px' }}>Conclusion</h2>
            <p style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
              Data security is no longer just an IT issue — it’s a personal responsibility and a
              life skill. As we become more connected, the amount of personal data we generate will
              only increase. Understanding how data security works and taking proactive steps to
              protect ourselves ensures that we can safely enjoy the benefits of modern technology
              without compromising our privacy, identity, or safety.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSecurityPage;
