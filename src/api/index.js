// 包装所有请求，以便于接口复用
import request from 'common/request';

export function login(data) {
  return request.get('/novel-wx/login', data);
}

export function query() {
  return request.post('/novel-wx/novel/list');
}
