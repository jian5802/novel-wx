// store一些常用方法

import configStore from './index';

const store = configStore();

/**
 * 返回store的所有数据
 * @return {*}
 */
export function getState() {
  return store.getState();
}

/**
 * 返回登录信息
 * @return {*}
 */
export function getLoginInfo() {
  const state = getState();
  return state.loginInfo;
}

