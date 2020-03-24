export const CHANGE_IS_LOGIN = 'CHANGE_IS_LOGIN';
export const UPDATE_REDIRECT_URL = 'UPDATE_REDIRECT_URL';
export const UPDATE_LOGIN_INFO = 'UPDATE_LOGIN_INFO';


export function changeIsLogin(isLogin) {
  return {
    type: CHANGE_IS_LOGIN,
    isLogin
  };
}

export function updateLoginInfo(loginInfo) {
  return {
    type: UPDATE_LOGIN_INFO,
    loginInfo
  };
}

export function updateRedirectUrl(redirectUrl) {
  return {
    type: UPDATE_REDIRECT_URL,
    redirectUrl,
  };
}
