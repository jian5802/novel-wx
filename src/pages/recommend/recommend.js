import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './recommend.scss';

class recommend extends Component {
  config = {
    navigationBarTitleText: '读者阅书'
  };

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='recommend'>
        <View>推荐</View>
      </View>
    );
  }
}

export default recommend;
