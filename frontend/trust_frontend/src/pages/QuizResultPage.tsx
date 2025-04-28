/* eslint-disable react/button-has-type */
import React from 'react';
import { useSearchParams, history } from 'umi';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react'; // ✅ 引入 Lottie

import successAnimation from '../../public/QuizPage/QuizGoodResult.json'; // ✅ 成功动画
import failAnimation from '../../public/QuizPage/QuizBadResult.json'; // ✅ 失败动画

const QuizResultPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const correct = parseInt(searchParams.get('correct') || '0', 10);
  const total = parseInt(searchParams.get('total') || '0', 10);

  const handleBack = () => {
    history.push('/quiz');
  };

  const pass = correct >= total / 2; // 判断及格

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1 style={{ fontSize: 36 }}>🎉 Quiz Completed!</h1>

      {/* ✅ 根据答题正确数动态渲染动画 */}
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

      {/* 正确数展示 */}
      <h2 style={{ marginTop: 20 }}>
        You answered <span style={{ color: 'green' }}>{correct}</span> out of {total} questions correctly!
      </h2>

      {/* 返回按钮 */}
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
    </div>
  );
};

export default QuizResultPage;
