// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getBreachCountByGroup GET /api/breachlog/group */
export async function getBreachCountByGroupUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListBreachLogVO_>('/api/breachlog/group', {
    method: 'GET',
    ...(options || {}),
  });
}
