import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { login } from 'api';
import { changeIsLogin, updateLoginInfo } from '../../actions';
import './index.scss';

@connect(({ isLogin, loginInfo }) => ({
  isLogin,
  loginInfo
}), (dispatch) => ({
  changeIsLogin (isLogin) {
    dispatch(changeIsLogin(isLogin));
  },
  updateLoginInfo (loginInfo) {
    dispatch(updateLoginInfo(loginInfo));
  }
}))
class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  };

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps);
    console.log('initinitinit', this.props.isLogin, this.props.loginInfo);
  }

  componentWillUnmount () { }

  componentDidShow () {
  }

  componentDidHide () { }

  showStore = () => {
    console.log('showStorev', this.props.isLogin, this.props.loginInfo);
  };

  handleLogin = () => {
    login({
      name: 'dj',
      pwd: '123',
    }).then(res => {
      this.props.changeIsLogin(true);
      this.props.updateLoginInfo(res.body);
      console.log(res);
    });
  };

  render () {
    return (
      <View className='index'>
        <View><Text>Hello, World dj</Text></View>
        <Button onClick={this.handleLogin}>登录</Button>
        <Button onClick={this.showStore}>查看store</Button>
      </View>
    );
  }
}

export default Index;
