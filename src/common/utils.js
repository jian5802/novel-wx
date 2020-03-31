import Taro from '@tarojs/taro';

const TOAST_DURATION = 3000;

/**
 * 文字toast提示
 * @param title
 */
export function toast(title) {
  setTimeout(() => {
    Taro.showToast({
      title,
      icon: 'none',
      duration: TOAST_DURATION
    });
  });
}

/**
 * 成功toast提示
 * @param title
 */
toast.success = (title) => {
  if (process.env.NODE_ENV === 'development') {
    if (title && title.length > 7) {
      console.error('');
    }
  }

  setTimeout(() => {
    Taro.showToast({
      title,
      icon: 'success',
      duration: TOAST_DURATION
    });
  });
};

/**
 * 显示全局loading
 * @param title
 */
export function showLoading(title) {
  Taro.showLoading({
    title,
    mask: true
  });
}

/**
 * 关闭全局loading
 */
export function hideLoading() {
  Taro.hideLoading();
}

/**
 * 返回到指定页面，如果指定的path不再路由堆栈则不操作
 * @example goBack('pages/index/index')
 * @param {string} url
 */
export function navigateBackTarget(url) {
  const pages = Taro.getCurrentPages();
  const pageIndex = pages.findIndex(page => page.route === url);
  const currentIndex = pages.length - 1;

  if (url == null) {
    Taro.navigateBack();
  } else if (pageIndex !== -1) {
    Taro.navigateBack({
      delta: currentIndex - pageIndex
    });
  } else {
    console.error('路由堆栈中不存在指定的path');
  }
}

/**
 * 数字转千分位金额
 * @param val
 * @param precision
 * @return {(string)|*}
 */
export function toThousands(val, precision) {
  // eslint-disable-next-line no-restricted-globals
  if (val == null || val === '' || isNaN(val)) {
    return val;
  }

  const pattern = /^(-?\d+)(\d{3})(\.?\d*)/;
  if (precision != null) {
    val = Number(val).toFixed(precision);
  }
  while (pattern.test(val)) {
    val = String(val).replace(pattern, '$1,$2$3');
  }

  return val;
}

/**
 * 获取当前页面url
 * @return {string}
 */
export function getPageUrl() {
  let url = '';
  const pages = Taro.getCurrentPages();
  if (pages.length > 0) {
    const router = pages[pages.length - 1].$component.$router;
    let params = Object.keys(router.params).map(key => {
      let value = router.params[key];
      if (value === undefined) {
        value = '';
      }
      return `${key}=${value}`;
    }).join('&');
    if (params) {
      params = `?${params}`;
    }
    url = router.path + params;
  }
  return url;
}

/**
 * 空值
 * @param val
 * @return {boolean}
 */
export function isEmpty(val) {
  return val == null || val === '';
}
