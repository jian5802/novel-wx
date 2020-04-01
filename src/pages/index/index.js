import Taro, { Component } from '@tarojs/taro';
import { View, Input, Icon  } from '@tarojs/components';
import './index.scss';

class BookCity extends Component {
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
      <View className='book-city'>
        <View className='head'>
          <Icon
            size='16'
            className='head-search'
            type='search'/>
          <Input
            className='head-input'
            type='text'
            placeholder='凡人修仙传'/>
        </View>
      </View>
    );
  }
}

export default BookCity;
