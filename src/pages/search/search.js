import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './search.scss';

class Search extends Component {
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
      <View className='search-page'>
        <View>搜索页</View>
      </View>
    );
  }
}

export default Search;
