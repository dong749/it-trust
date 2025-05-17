/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'umi';
import {
  getQuestionByTypeUsingGet,
  judgeQuizUsingPost,
  getAiResponseWithMqUsingPost, // ✅ 使用 MQ 异步分析接口
} from '../services/it-trust/quizController';
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

  const [userAnswers, setUserAnswers] = useState<
    { questionId: number; userSelectedOption: string }[]
  >([]);

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

  const currentQuestion = questions[currentIndex];

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

        setUserAnswers((prev) => [
          ...prev,
          {
            questionId: currentQuestion.questionId,
            userSelectedOption: selectedOption,
          },
        ]);
      }
    } catch (error) {
      console.error('Judge failed:', error);
      alert('⚠️ Failed to submit answer. Please try again.');
    }
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption('');
      setJudgeResult(null);
      setHasSubmitted(false);
    } else {
      // ✅ 最后一题，调用 MQ 异步分析接口
      try {
        await getAiResponseWithMqUsingPost({ quizList: userAnswers });
      } catch (e) {
        console.warn('⚠️ MQ feedback submission failed:', e);
      } finally {
        navigate(
          `/quiz/result?correct=${correctCount}&total=${questions.length}&feedback=${encodeURIComponent(
            'AI is analyzing your results, please check back shortly.',
          )}`,
        );
      }
    }
  };

  if (loading) return <div style={{ padding: 24 }}>⏳ Loading questions...</div>;
  if (!questions.length)
    return (
      <div style={{ padding: 24, color: 'red' }}>
        ⚠️ No questions found for category: {category}
      </div>
    );

  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', paddingBottom: 100 }}>
      <div style={{ position: 'relative', zIndex: 1, padding: 24 }}>
        <h2>Q{currentIndex + 1}:</h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.questionId}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 20 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ fontSize: 18 }}
            >
              {currentQuestion.questionDetails}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        <div>
          {(['A', 'B', 'C', 'D'] as const).map((opt) => {
            const key = `option${opt}` as keyof QuestionVO;
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
            <p style={{ marginTop: 8, color: 'black' }}>{judgeResult.explanation}</p>
          </motion.div>
        )}
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: 32,
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        {!hasSubmitted ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={!selectedOption}
            style={{
              backgroundColor: selectedOption ? '#1890ff' : '#a0c4e8',
              color: '#fff',
              padding: '12px 32px',
              fontSize: 18,
              fontWeight: 'bold',
              border: 'none',
              borderRadius: 6,
              cursor: selectedOption ? 'pointer' : 'not-allowed',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              transition: 'background-color 0.3s',
            }}
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            style={{
              backgroundColor: '#1890ff',
              color: '#fff',
              padding: '12px 32px',
              fontSize: 18,
              fontWeight: 'bold',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              transition: 'background-color 0.3s',
            }}
          >
            {currentIndex === questions.length - 1 ? 'Finish & Get Feedback' : 'Next'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizStepPage;
