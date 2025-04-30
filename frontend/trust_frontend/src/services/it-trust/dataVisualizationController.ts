// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** searchDataWithDataLeaked POST /api/statistics/leaked */
export async function searchDataWithDataLeakedUsingPost(
  body: API.DataLeakedByStateDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseDataLeakedByStateResponseVO_>('/api/statistics/leaked', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
