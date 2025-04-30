// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

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
