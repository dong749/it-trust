/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'umi';
import { getQuestionByTypeUsingGet, judgeQuizUsingPost } from '../services/it-trust/quizController';
import { motion, AnimatePresence } from 'framer-motion';

type QuestionVO = {
  questionId: number;
  questionDetails: string;
  questionType: number;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
};

type JudgeResult = {
  isCorrect: boolean;
  explanation: string;
  rightAnswer: string;
};

const QuizStepPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<QuestionVO[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [judgeResult, setJudgeResult] = useState<JudgeResult | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    getQuestionByTypeUsingGet({ category })
      .then((res) => {
        let dataArray: any;
        if (Array.isArray(res)) {
          dataArray = res;
        } else if (Array.isArray((res as any).data)) {
          dataArray = (res as any).data;
        } else if (Array.isArray((res as any).data?.data)) {
          dataArray = (res as any).data.data;
        }
        setQuestions(Array.isArray(dataArray) ? dataArray : []);
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
    return <div style={{ padding: 24, color: 'red' }}>⚠️ No questions found for category: {category}</div>;
  }

  const currentQuestion = questions[currentIndex];

  if (!currentQuestion) {
    return <div style={{ padding: 24 }}>⚠️ No current question available.</div>;
  }

  const handleSubmitAnswer = async () => {
    if (!selectedOption) {
      alert('Please select an option first.');
      return;
    }

    try {
      const res = await judgeQuizUsingPost({
        questionId: currentQuestion.questionId,
        userSelectedOption: selectedOption,
      });
      if (res && res.data) {
        setJudgeResult(res.data);
        setHasSubmitted(true);
        if (res.data.isCorrect) {
          setCorrectCount((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.error('Judge failed:', error);
      alert('⚠️ Failed to submit answer. Please try again.');
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption('');
      setJudgeResult(null);
      setHasSubmitted(false);
    } else {
      navigate(`/quiz/result?correct=${correctCount}&total=${questions.length}`);
    }
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      
      {/* ✅ 水印背景 */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: `${index * 16}%`,
              width: '200%',
              whiteSpace: 'nowrap',
              fontSize: 80,
              fontWeight: 'bold',
              color: '#ffffff',
              opacity: 0.06,
              transform: 'rotate(-20deg)',
              animation: `${index % 2 === 0 ? 'scrollLeft' : 'scrollRight'} 40s linear infinite`,
            }}
          >
            QUIZ SYSTEM —— QUIZ SYSTEM —— QUIZ SYSTEM —— QUIZ SYSTEM —— QUIZ SYSTEM —— QUIZ SYSTEM —— 
          </div>
        ))}
      </div>

      {/* 主内容 */}
      <div style={{ position: 'relative', zIndex: 1, padding: 24 }}>
        <h2>Q{currentIndex + 1}:</h2>

        {/* ✅ 动态渲染题目，有切题滑动动画 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.questionId}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 20 }}
          >
            {currentQuestion.questionType === 0 ? (
              currentQuestion.questionDetails
                .split('//')
                .map((sentence, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.25 }}
                    style={{ marginBottom: 8, fontSize: 18 }}
                  >
                    {sentence}
                  </motion.p>
                ))
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ fontSize: 18 }}
              >
                {currentQuestion.questionDetails}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* 选项 */}
        <div>
          {(['A', 'B', 'C', 'D'] as const).map((opt) => {
            const key = (`option${opt}`) as 'optionA' | 'optionB' | 'optionC' | 'optionD';
            return (
              <label key={opt} style={{ display: 'block', marginBottom: 12 }}>
                <input
                  type="radio"
                  name="option"
                  value={opt}
                  checked={selectedOption === opt}
                  disabled={hasSubmitted}
                  onChange={() => setSelectedOption(opt)}
                />
                {opt}. {currentQuestion[key]}
              </label>
            );
          })}
        </div>

        {/* 提交按钮 / 下一题按钮 */}
        {!hasSubmitted ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={!selectedOption}
            style={{
              marginTop: 20,
              padding: '8px 16px',
              fontSize: 16,
              cursor: selectedOption ? 'pointer' : 'not-allowed',
            }}
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            style={{
              marginTop: 20,
              padding: '8px 16px',
              fontSize: 16,
            }}
          >
            {currentIndex === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        )}

        {/* 判题结果显示 */}
        {judgeResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              marginTop: 24,
              padding: 16,
              background: judgeResult.isCorrect ? '#e0ffe0' : '#ffe0e0',
              borderRadius: 8,
            }}
          >
            <h3 style={{ color: judgeResult.isCorrect ? 'green' : 'red' }}>
              {judgeResult.isCorrect
                ? '✅ You are correct!'
                : `❌ You are incorrect. The correct answer is ${judgeResult.rightAnswer}`}
            </h3>
            <p style={{ marginTop: 8 }}>{judgeResult.explanation}</p>
          </motion.div>
        )}
      </div>

      {/* ✅ 背景滚动动画 */}
      <style>
        {`
          @keyframes scrollLeft {
            0% { transform: translateX(0) rotate(-20deg); }
            100% { transform: translateX(-50%) rotate(-20deg); }
          }
          @keyframes scrollRight {
            0% { transform: translateX(-50%) rotate(-20deg); }
            100% { transform: translateX(0) rotate(-20deg); }
          }
        `}
      </style>
    </div>
  );
};

export default QuizStepPage;
