// 封装请求

import Taro from '@tarojs/taro';
import _config from 'src/config';
import configStore from 'store';
import { updateRedirectUrl } from 'actions';
import { toast, getPageUrl } from './utils';

// token头部字段名
const ACCESS_TOKEN_KEY = 'ucSessionId';
const store = configStore();

export const RESPONSE_CODE = {
  SUCCESS: '00000000', // 成功
  LOGIN_INVALID: '11111114', // 登录失效
};
/**
 * 检查登录是否失效
 * @param err
 * @return {boolean} true为失效
 */
function checkLoginInvalid(err) {
  if (err.statusCode === 200) {
    const head = err.data.head;
    if (head) {
      // 登录失效
      if (head.code === RESPONSE_CODE.LOGIN_INVALID) {
        store.dispatch(updateRedirectUrl(getPageUrl()));
        Taro.redirectTo({
          url: '/pages/index/index'
        });
        return true;
      }
    }
  }
  return false;
}

/**
 * 处理请求异常
 * @param err
 * @param noCatch 不处理异常，交给业务方自己处理
 */
function handleError(err, noCatch = false) {
  if (checkLoginInvalid(err)) {
    return;
  }
  if (noCatch) {
    return;
  }

  let message = '网络异常，请稍后重试';
  switch (err.statusCode) {
    case 200:
      const head = err.data.head;
      if (head) {
        message = head.msg || '服务器开小差了，请稍后重试';
      }
      break;
    case 404:
      message = '您访问的地址有误';
      break;
    default:
      if (/timeout/.test(err.errMsg)) {
        message = '请求超时，请检查网络';
      } else {
        message = '服务器开小差了，请稍后重试';
      }
  }

  setTimeout(() => {
    toast(message);
  });
}

/**
 * HTTP请求
 * @param url
 * @param data
 * @param method
 * @param config
 * @return {Promise<Taro.request.Promised<any> | never>}
 */
export default function request(url, data, method, config = {}) {
  let { responseType, dataType, header, noCatch = false } = config;

  if (!/^https?/.test(url)) {
    url = _config.host + url;
  }
  const { name, pwd } = store.getState().loginInfo;

  if (!(data instanceof Array)) {
    data = Object.assign({
      name,
      pwd
    }, data);
  }
  method = method && method.toUpperCase();
  header = Object.assign({
    'content-type': 'application/json',
    [ACCESS_TOKEN_KEY]: '',
  }, header);

  // 打印日志
  const _logParams = {
    url,
    data,
    method,
    header
  };
  console.log('【请求开始】', _logParams);

  return Taro
    .request({
      url,
      data,
      method,
      responseType,
      dataType,
      header
    })
    .then(res => {
      if (res.statusCode !== 200) {
        return Promise.reject(res);
      }

      console.log('【请求结束】', _logParams, res);

      if (res.data.head && res.data.head.code !== RESPONSE_CODE.SUCCESS) {
        return Promise.reject(res);
      }
      return res.data;
    })
    .catch(err => {
      console.error('【请求异常】', _logParams, err);

      handleError(err, noCatch);
      return Promise.reject(err);
    });
}

/**
 * GET 请求
 * @param url
 * @param data
 * @param config
 * @return {Promise<Taro.request.Promised<any>|never>}
 */
request.get = function (url, data, config) {
  return request(url, data, 'get', config);
};

/**
 * POST 请求
 * @param url
 * @param data
 * @param config
 * @return {Promise<Taro.request.Promised<any>|never>}
 */
request.post = function (url, data, config) {
  return request(url, data, 'post', config);
};

/**
 * 上传文件
 * @param url
 * @param filePath
 * @param data
 * @param config
 * @return {Promise<Taro.uploadFile.Promised | never>}
 */
request.upload = function (url, filePath, data, config) {
  let { header, noCatch = false } = config;

  if (!/^https?/.test(url)) {
    url = _config.host + url;
  }
  const { name, pwd } = store.getState().loginInfo;
  data = Object.assign({
    name,
    pwd
  }, data);
  header = Object.assign({
    [ACCESS_TOKEN_KEY]: '',
  }, header);

  // 打印日志
  const _logParams = {
    url,
    data,
    header
  };
  console.log('【上传文件开始】', _logParams);

  return Taro
    .uploadFile({
      url,
      filePath,
      name: 'file',
      formData: data,
      header
    })
    .then(res => {
      if (res.statusCode !== 200) {
        return Promise.reject(res);
      }

      // 解析json报文
      try {
        if (typeof res.data === 'string') {
          res.data = JSON.parse(res.data);
        }
      } catch (e) {
      }

      console.log('【上传文件结束】', _logParams, res);

      if (res.data.head && res.data.head.code !== RESPONSE_CODE.SUCCESS) {
        return Promise.reject(res);
      }
      return res.data;
    })
    .catch(err => {
      console.error('【上传文件异常】', _logParams, err);

      handleError(err, noCatch);
      return Promise.reject(err);
    });
};
