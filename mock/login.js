const Mock = require('mockjs');

module.exports = {
  ['GET /novel-wx/login']: (req, res) => {
    return res.json(Mock.mock({
      'body': {
        pwd: '123456',
        name: 'admin',
      },
      'head': {
        'code': '00000000',
        'msg': '成功',
        'status': 'Y',
        'time': '2018-12-12 19:00:00'
      }
    }));
  }
};
