// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** testMethod GET /api/quiz */
export async function testMethodUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListQuestionBody_>('/api/quiz', {
    method: 'GET',
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
