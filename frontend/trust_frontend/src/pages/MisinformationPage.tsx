/* eslint-disable react/button-has-type */
import React from 'react';
import { useNavigate } from 'umi';

const MisinformationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div style={{ padding: '60px' }}>
      {/* 顶部横幅区 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          alignItems: 'center',
          gap: '40px',
          flexWrap: 'wrap',
          marginBottom: '60px',
        }}
      >
        <img
          src="/MisinformationTitle.png"
          alt="Misinformation"
          style={{
            flex: '1 1 400px',
            maxWidth: '500px',
            borderRadius: '12px',
            width: '100%',
            objectFit: 'cover',
          }}
        />
        <div style={{ flex: '1 1 300px' }}>
          <h1 style={{ fontSize: '48px', color: '#fff', marginBottom: '12px' }}>Misinformation</h1>
          <h2 style={{ color: '#ccc', fontWeight: 400 }}>
            Understand how misinformation spreads, its consequences, and how to identify reliable information.
          </h2>
        </div>
      </div>

      {/* 主体内容 + 右侧提示卡片 */}
      <div
        style={{
          display: 'flex',
          gap: '40px',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {/* 正文内容（左侧） */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <section>
            <h2 style={{ fontSize: '28px', color: '#fff', marginBottom: '16px' }}>
              What Is Misinformation?
            </h2>
            <p style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
              Misinformation refers to false or inaccurate information that is spread, regardless of intent to deceive.
              It can take many forms, including rumors, conspiracy theories, or manipulated content shared on social media or websites.
            </p>
          </section>

          <hr style={{ borderColor: '#444', margin: '40px 0' }} />

          <section>
            <h2 style={{ fontSize: '28px', color: '#fff' }}>Common Sources of Misinformation</h2>
            <ol style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
              <li>Social media posts shared without fact-checking.</li>
              <li>Satirical or parody content taken seriously.</li>
              <li>Manipulated images or videos.</li>
              <li>Clickbait headlines or sensationalized articles.</li>
              <li>False claims by public figures or influencers.</li>
            </ol>
          </section>

          <div style={{ marginTop: '40px', borderRadius: '12px', overflow: 'hidden' }}>
            <iframe
              src="https://www.youtube.com/embed/UAy6PI5UtSU"
              title="How Misinformation Spreads"
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
            <h2 style={{ fontSize: '28px', color: '#fff' }}>Impacts of Misinformation</h2>
            <p style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
              Misinformation can lead to confusion, mistrust, and even harm. During crises, it may cause people to make unsafe decisions. 
              It can undermine democracy, public health, and social stability by spreading fear, division, and distrust in institutions.
            </p>
          </section>

          <hr style={{ borderColor: '#444', margin: '40px 0' }} />

          <section>
            <h2 style={{ fontSize: '28px', color: '#fff' }}>How to Protect Yourself</h2>
            <ol style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
              <li>Always check the source before sharing information.</li>
              <li>Use reputable fact-checking sites like Snopes, PolitiFact, or FactCheck.org.</li>
              <li>Be cautious with emotional or sensational content.</li>
              <li>Report misleading posts on social media platforms.</li>
            </ol>
          </section>

          <hr style={{ borderColor: '#444', margin: '40px 0' }} />

          <section>
            <h2 style={{ fontSize: '28px', color: '#fff' }}>Conclusion</h2>
            <p style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
              Misinformation is a serious challenge in the digital age. By developing critical thinking skills 
              and verifying the information we consume and share, we can help build a more informed and resilient society.
            </p>
          </section>
        </div>

        {/* 提示卡片（右侧） */}
        <div style={{ position: 'sticky', top: '80px', minWidth: '260px' }}>
          <div
            style={{
              backgroundColor: '#fef3c7',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#92400e' }}>
              🧠 Test Your Misinformation Awareness
            </div>
            <p style={{ fontSize: '14px', color: '#78350f', margin: '8px 0 16px' }}>
              Take a short quiz to test how well you can spot misinformation online.
            </p>
            <button
              onClick={handleStartQuiz}
              style={{
                padding: '10px 18px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: '#f59e0b',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Get Started →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisinformationPage;
