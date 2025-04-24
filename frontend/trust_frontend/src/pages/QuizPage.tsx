import React, { useRef } from 'react';
import Lottie from 'lottie-react';
import animationData from '../../public/QuizPage/QuizPageTitle.json';
import privateData from '../../public/QuizPage/PrivateDataQuiz.json';
import dataSecurity from '../../public/QuizPage/DataSecurityQuiz.json';
import misinformation from '../../public/QuizPage/MisinformationQuiz.json';
import dangerOfDataBreach from '../../public/QuizPage/DangerOfDataBreachQuiz.json';
import protectData from '../../public/QuizPage/ProtectDataQuiz.json';

const QuizPage: React.FC = () => {
  const privateRef = useRef<any>(null);
  const dataSecurityRef = useRef<any>(null);
  const misinformationRef = useRef<any>(null);
  const dangerOfDataBreachRef = useRef<any>(null);
  const protectDataRef = useRef<any>(null);

  return (
    <>
      {/* ✅ 动态字体动画规则内联写入 */}
      <style>
        {`
          @keyframes gradient-move {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <div
        style={{
          position: 'relative',
          minHeight: '100vh',
          backgroundColor: 'transparent',
          padding: '16px',
        }}
      >
        {/* 顶部标题 + 动画 */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '300px', height: '300px' }}>
            <Lottie animationData={animationData} loop />
          </div>
          <div style={{ marginLeft: '16px' }}>
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 700,
                background: 'linear-gradient(90deg, #00e0ff, #ff5df9, #00e0ff)',
                backgroundSize: '300% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradient-move 3s ease infinite',
              }}
            >
              Scenario Game
            </h1>
            <h2 style={{ fontSize: '18px', fontWeight: 400, color: 'white', marginTop: '4px' }}>
              Explore challenges of data security and misinformation in a digital world.
            </h2>
          </div>
        </div>

        {/* 五个动图排版紧凑统一 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            marginTop: '48px',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
          }}
        >
          {[
            {
              title: 'PRIVATE DATA',
              ref: privateRef,
              animation: privateData,
            },
            {
              title: 'DATA SECURITY',
              ref: dataSecurityRef,
              animation: dataSecurity,
            },
            {
              title: 'MISINFORMATION',
              ref: misinformationRef,
              animation: misinformation,
            },
            {
              title: 'DANGER of DATA BREACH',
              ref: dangerOfDataBreachRef,
              animation: dangerOfDataBreach,
            },
            {
              title: 'HOW TO PROTECT DATA',
              ref: protectDataRef,
              animation: protectData,
            },
          ].map(({ title, ref, animation }) => (
            <div
              key={title}
              style={{
                position: 'relative',
                textAlign: 'center',
                width: '240px',
                marginTop: '60px',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  left: '50%',
                  transform: 'translateX(-50%) rotate(-6deg)',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  letterSpacing: '1.5px',
                  textShadow: '0px 1px 2px rgba(0, 0, 0, 0.6)',
                  fontFamily: 'sans-serif',
                  whiteSpace: 'nowrap',
                }}
              >
                {title}
              </div>
              <div
                style={{ width: '240px', height: '240px', cursor: 'pointer' }}
                onMouseEnter={() => ref.current?.play()}
                onMouseLeave={() => ref.current?.stop()}
              >
                <Lottie lottieRef={ref} animationData={animation} loop autoplay={false} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuizPage;
