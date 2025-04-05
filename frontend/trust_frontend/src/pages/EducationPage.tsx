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
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', // 5列网格
        gap: '12px',
        padding: '20px',
        justifyItems: 'center',
      }}
    >
      {/* 第一排：卡片1-3，放在 1,3,5 列 */}
      {cardData.slice(0, 3).map((item, index) => (
        <div
          key={index}
          onClick={() => navigate(item.route)}
          style={{
            gridColumn: (index + 1) * 2 - 1, // 放在1,3,5列
            maxWidth: '220px',
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
          <div style={{ fontSize: '25px', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>
            {item.title}
          </div>
          <div style={{ fontSize: '14px', color: '#e0e0e0' }}>{item.description}</div>
        </div>
      ))}

      {/* 第二排：卡片4-5，放在 2,4 列 */}
      {cardData.slice(3).map((item, index) => (
        <div
          key={index + 3}
          onClick={() => navigate(item.route)}
          style={{
            gridColumn: index === 0 ? 2 : 4,
            maxWidth: '220px',
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
          <div style={{ fontSize: '25px', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>
            {item.title}
          </div>
          <div style={{ fontSize: '14px', color: '#e0e0e0' }}>{item.description}</div>
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
