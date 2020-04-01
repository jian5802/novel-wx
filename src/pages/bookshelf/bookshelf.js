import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './bookshelf.scss';

class bookshelf extends Component {
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
      <View className='bookshelf'>
        <View>书架</View>
      </View>
    );
  }
}

export default bookshelf;
