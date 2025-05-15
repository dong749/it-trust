/* eslint-disable react/button-has-type */
import React from 'react';
import { useSearchParams, history } from 'umi';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

import successAnimation from '../../public/QuizPage/QuizGoodResult.json';
import failAnimation from '../../public/QuizPage/QuizBadResult.json';

const QuizResultPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const correct = parseInt(searchParams.get('correct') || '0', 10);
  const total = parseInt(searchParams.get('total') || '0', 10);
  const feedback = decodeURIComponent(searchParams.get('feedback') || ''); // ✅ 获取AI反馈

  const handleBack = () => {
    history.push('/quiz');
  };

  const pass = correct >= total / 2;

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1 style={{ fontSize: 36 }}>🎉 Quiz Completed!</h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: 200, height: 200, margin: '20px auto' }}
      >
        <Lottie
          animationData={pass ? successAnimation : failAnimation}
          loop
          autoplay
        />
      </motion.div>

      <h2 style={{ marginTop: 20 }}>
        You answered <span style={{ color: 'green' }}>{correct}</span> out of {total} questions correctly!
      </h2>

      <button
        onClick={handleBack}
        style={{
          marginTop: 40,
          padding: '10px 20px',
          fontSize: 18,
          cursor: 'pointer',
        }}
      >
        Back to Quiz Home
      </button>

      {/* ✅ AI反馈总结区域 */}
      {feedback && (
        <div
          style={{
            marginTop: 40,
            padding: 20,
            border: '1px solid #ddd',
            borderRadius: 8,
            backgroundColor: '#f9f9f9',
            textAlign: 'left',
            maxWidth: 800,
            marginInline: 'auto',
            whiteSpace: 'pre-wrap',
            fontSize: 16,
            lineHeight: 1.6,
            color: '#000', // ✅ 设置黑色字体
          }}
        >
          <h3 style={{ color: '#333', marginBottom: 12 }}>🧠 AI Feedback Summary</h3>
          <div>{feedback}</div>
        </div>
      )}
    </div>
  );
};

export default QuizResultPage;
