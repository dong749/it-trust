/* eslint-disable react/button-has-type */
import React from 'react';
import { useSearchParams, history } from 'umi';

const QuizResultPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const correct = parseInt(searchParams.get('correct') || '0', 10);
  const total = parseInt(searchParams.get('total') || '0', 10);

  const handleBack = () => {
    history.push('/quiz');
  };

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1 style={{ fontSize: 36 }}>🎉 Quiz Completed!</h1>
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
    </div>
  );
};

export default QuizResultPage;
