/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'umi';
import { getQuestionByTypeUsingGet } from '../services/it-trust/quizController';

// —— 本地定义 QuestionVO —— 
type QuestionVO = {
  questionId: number;
  questionDetails: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
};

const QuizStepPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';

  const [questions, setQuestions] = useState<QuestionVO[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    console.log('🚀 Fetch questions for category:', category);

    getQuestionByTypeUsingGet({ category })
      .then((res) => {
        console.log('📦 FULL RESPONSE:', res);
        // 尝试多种可能的字段
        // 1. res 本身就是数组
        // 2. res.data 是数组
        // 3. res.data.data 是数组（某些 wrapper 结构）
        let dataArray: any = undefined;

        if (Array.isArray(res)) {
          dataArray = res;
          console.log('⚡️ taken from res');
        } else if (Array.isArray((res as any).data)) {
          dataArray = (res as any).data;
          console.log('⚡️ taken from res.data');
        } else if (Array.isArray((res as any).data?.data)) {
          dataArray = (res as any).data.data;
          console.log('⚡️ taken from res.data.data');
        } else {
          console.warn('❗️ Cannot find an array in response');
        }

        if (Array.isArray(dataArray)) {
          setQuestions(dataArray);
        } else {
          setQuestions([]); // 保底
        }
      })
      .catch((err) => {
        console.error('❌ API error:', err);
        setQuestions([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return <div style={{ padding: 24 }}>⏳ Loading questions...</div>;
  }

  if (!questions.length) {
    return (
      <div style={{ padding: 24, color: 'red' }}>
        ⚠️ No questions found for category: {category}
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption('');
    } else {
      alert('🎉 Quiz completed!');
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>
        Q{currentIndex + 1}: {currentQuestion.questionDetails}
      </h2>
      <div style={{ marginTop: 16 }}>
        {(['A', 'B', 'C', 'D'] as const).map((opt) => {
          const key = (`option${opt}`) as 'optionA' | 'optionB' | 'optionC' | 'optionD';
          return (
            <label key={opt} style={{ display: 'block', marginBottom: 12 }}>
              <input
                type="radio"
                name="option"
                value={opt}
                checked={selectedOption === opt}
                onChange={() => setSelectedOption(opt)}
              />
              {opt}. {currentQuestion[key]}
            </label>
          );
        })}
      </div>
      <button
        onClick={handleNext}
        disabled={!selectedOption}
        style={{
          marginTop: 20,
          padding: '8px 16px',
          fontSize: 16,
          cursor: selectedOption ? 'pointer' : 'not-allowed',
        }}
      >
        {currentIndex === questions.length - 1 ? 'Finish' : 'Next'}
      </button>
    </div>
  );
};

export default QuizStepPage;
