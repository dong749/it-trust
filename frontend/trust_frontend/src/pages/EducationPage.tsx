import React from 'react';
import { useNavigate } from 'react-router-dom';

const cardData = [
  {
    img: '/Infor-data.svg',
    title: 'What is Private Data?',
    description: 'Understand What is the Private Data and Understand the Data Around You',
    route: '/learning/PrivateData',
  },
  {
    img: '/Infor-shield-database.svg',
    title: 'Data Security',
    description: 'Understand What Data Security is and Why it is Important',
    route: '/learning/DataSecurity',
  },
  {
    img: '/Infor-data-leak.svg',
    title: 'Data Breach',
    description: 'Understand What a Data Breach is',
    route: '/learning/DataBreach',
  },
  {
    img: '/Infor-hacking.svg',
    title: 'The Dangers of Data Breaches',
    description: 'The Trouble with Data Breaches',
    route: '/learning/Dangerous',
  },
  {
    img: '/Infor-antivirus.svg',
    title: 'How to Protect Our Data Security?',
    description: 'Protecting Our Data',
    route: '/learning/ProtectData',
  },
];

const CardGrid: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px 20px', textAlign: 'center' }}>
      {/* 大标题 */}
      <h1
        style={{
          fontSize: '40px',
          color: '#fff',
          fontWeight: 'bold',
          marginBottom: '12px',
        }}
      >
        Know More About Data and Data Security
      </h1>

      {/* 简介文字 */}
      <p
        style={{
          fontSize: '18px',
          color: '#d0d0d0',
          maxWidth: '800px',
          margin: '0 auto 40px',
          lineHeight: '1.6',
        }}
      >
        This website is dedicated to helping users understand what personal privacy data is, data
        security and its importance, as well as the risks and coping methods that may be faced in
        data leakage. Through the following content, you can systematically learn how to effectively
        protect your data security.
      </p>

      {/* 卡片区域 */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '24px',
        }}
      >
        {cardData.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.route)}
            style={{
              width: '220px',
              height: '280px',
              borderRadius: '10px',
              padding: '16px',
              cursor: 'pointer',
              textAlign: 'center',
              backgroundColor: 'transparent',
              boxShadow: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1.0)';
            }}
          >
            <img src={item.img} alt="card-img" style={{ width: '150px', marginBottom: '12px' }} />
            <div style={{ fontSize: '20px', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>
              {item.title}
            </div>
            <div style={{ fontSize: '14px', color: '#e0e0e0' }}>{item.description}</div>
          </div>
        ))}
      </div>
      <br />
      <br />
      <br />
      <br />
      <div>
        <p
          style={{
            fontSize: '18px',
            color: '#d0d0d0',
            maxWidth: '800px',
            margin: '0 auto 40px',
            lineHeight: '1.6',
          }}
        >
          According Your Requirement, You Can select One Part Above to learn
        </p>
      </div>
    </div>
  );
};

export default CardGrid;
