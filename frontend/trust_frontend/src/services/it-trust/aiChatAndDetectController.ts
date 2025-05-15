// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** chatBotResponse GET /api/ai/chatbot */
export async function chatBotResponseUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.chatBotResponseUsingGETParams,
  body: string,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/api/ai/chatbot', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}
