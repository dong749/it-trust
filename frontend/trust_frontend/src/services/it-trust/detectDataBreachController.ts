// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** detectBreach GET /api/detect */
export async function detectBreachUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.detectBreachUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListHIBPBreachDTO_>('/api/detect', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** hello GET /api/detect/hello */
export async function helloUsingGet(options?: { [key: string]: any }) {
  return request<string>('/api/detect/hello', {
    method: 'GET',
    ...(options || {}),
  });
}
