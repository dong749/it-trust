// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getAiResponse POST /api/quiz/feedback */
export async function getAiResponseUsingPost(
  body: API.UserQuizBatchSubmitDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/api/quiz/feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getAiResponseWithMQ POST /api/quiz/feedbackMq */
export async function getAiResponseWithMqUsingPost(
  body: API.UserQuizBatchSubmitDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/api/quiz/feedbackMq', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** judgeQuiz POST /api/quiz/judge */
export async function judgeQuizUsingPost(
  body: API.UserQuizSubmitDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserQuizSubmitVO_>('/api/quiz/judge', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getQuestionByType GET /api/quiz/quizByType */
export async function getQuestionByTypeUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionByTypeUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListQuestionVO_>('/api/quiz/quizByType', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getAnalysisResult GET /api/quiz/result */
export async function getAnalysisResultUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListAiAnalysisResultVO_>('/api/quiz/result', {
    method: 'GET',
    ...(options || {}),
  });
}
