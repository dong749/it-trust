// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getPrivacyBreachDistribution GET /api/statistics/byType */
export async function getPrivacyBreachDistributionUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPrivacyBreachDistributionUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListDataLeakByTypeReportVO_>('/api/statistics/byType', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

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
