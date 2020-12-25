import Taro, { Component } from '@tarojs/taro';
import {View, Button, Image, Text} from '@tarojs/components';
import './index.scss';

class Login extends Component {
  config = {
    navigationBarTitleText: '登录'
  };

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount () { }

  componentDidShow () {
    Taro.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          Taro.switchTab({ url: '/pages/book-city/book-city' });
        }
      }
    });
  }

  componentDidHide () { }

  bindGetUserInfo = (e) => {
    if (e.detail.userInfo) {
      Taro.switchTab({ url: '/pages/book-city/book-city' });
    }
  };

  render () {
    return (
      <View className='login-page'>
        <View className='login-log'>
          <Image
            className='log-img'
            src='//wx.qlogo.cn/mmhead/Q3auHgzwzM7ZnscH3ctl2bOYcicnNibSV3unYmdRGdqKupw9IImFbZMw/0'
          />
          <Text className='log-text'>读者阅书</Text>
          <View className='log-info'>请先授权后使用</View>
        </View>
        <Button
          type='primary'
          openType='getUserInfo'
          onGetUserInfo={this.bindGetUserInfo}
        >授权</Button>
      </View>
    );
  }
}

export default Login;
