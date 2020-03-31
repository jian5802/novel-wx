const HOST_MAP = {
  dev: process.env.DEV_IP,
  test: '',
  release: '',
  pre: '',
  prod: '',
};

// config
const config = {
  wxAppId: process.env.WX_APPID,
  host: HOST_MAP[process.env.BUILD_ENV],
};

export default config;
