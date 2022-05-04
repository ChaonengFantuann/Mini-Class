// @ts-ignore

/* eslint-disable */
import { request } from 'umi';

/** 获取规则列表 GET /api/rule */
export async function affair(params, options) {
  return request('/api/affair', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 新建规则 PUT /api/rule */

export async function updateAffair(data, options) {
  return request('/api/affair', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}
/** 新建规则 POST /api/rule */

export async function addAffair(data, options) {
  return request('/api/affair', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}
/** 删除规则 DELETE /api/rule */

export async function removeAffair(data, options) {
  return request('/api/affair', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function getSelectItem() {
  return request('/api/selectItem');
}
