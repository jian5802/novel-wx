import * as types from '../actions';

export default function (state = {
  isLogin: false, // 是否登录
  redirectUrl: '', // 重定向地址
  loginInfo: { // 登录信息
    name: '',
    pwd: '',
  },
}, action) {
  switch (action.type) {
    // 更新登录状态
    case types.CHANGE_IS_LOGIN:
      return {
        ...state,
        isLogin: action.isLogin
      };

    // 更新重定向地址
    case types.UPDATE_REDIRECT_URL:
      return {
        ...state,
        redirectUrl: action.redirectUrl
      };

    // 更新登录信息
    case types.UPDATE_LOGIN_INFO:
      return {
        ...state,
        loginInfo: {
          ...state.loginInfo,
          ...action.loginInfo
        }
      };

    default:
      return state;
  }
}
