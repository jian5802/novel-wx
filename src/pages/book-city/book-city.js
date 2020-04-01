import Taro, { Component } from '@tarojs/taro';
import {View, Icon, Text} from '@tarojs/components';
import './book-city.scss';

class BookCity extends Component {
  config = {
    navigationBarTitleText: '读者阅书'
  };

  constructor(props) {
    super(props);
    this.state = {
      topName: '凡人修仙传',
      sex: '1',
      hotBooks: [
        {
          title: '第一本书',
          author: '小时爱红',
          cover: '',
        },
        {
          title: '第二本书',
          author: '个人的观个人的观点点',
          cover: '',
        },
        {
          title: '第3本书第3本书第3本书',
          author: '九十点',
          cover: '',
        },
        {
          title: '第4本书',
          author: '官方规划',
          cover: '',
        },
        {
          title: '第5本书',
          author: '敬爱个大V',
          cover: '',
        },
        {
          title: '第6本书',
          author: '地方是咋的',
          cover: '',
        },
        {
          title: '第7本书',
          author: '发货哈阿城',
          cover: '',
        },
      ],
    };
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleChangeSex = type => {
    if (type === 'man') {
      this.setState({ sex: '1' });
    } else {
      this.setState({ sex: '0' });
    }
  };

  render () {
    const { topName, sex, hotBooks } = this.state;
    return (
      <View className='book-city'>
        <View className='head'>
          <Icon
            size='16'
            className='head-search'
            type='search'/>
          <Text className='head-text'>{ topName }</Text>
        </View>
        <View className='city-body'>
          <View className='tabs'>
            <Text
              onClick={this.handleChangeSex.bind(this, 'man')}
              className='tabs-text'>男生</Text>
            <Text
              onClick={this.handleChangeSex.bind(this, 'women')}
              className='tabs-text'>女生</Text>
            {
              sex === '1' ? (
                <View className='man-line'/>
              ) : (
                <View className='women-line'/>
              )
            }
          </View>
          <View className='hot-books'>
            <Text className='body-title'>24小时热销</Text>
            <View className='hot-top'>
              {
                hotBooks.map((item, index) => {
                  if (index < 3) {
                    return (
                      <View className='hot-item'>
                        <Text className='hot-title'>{ index + 1 }.{ item.title }</Text>
                        <Text className='hot-author'>{ item.author }</Text>
                      </View>
                    );
                  } else {
                    return;
                  }
                })
              }
            </View>
          </View>
          <View className='today-welfare'>
            <Text className='body-title'>今日福利</Text>
          </View>
          <View className='classic-version'>
            <Text className='body-title'>经典完本</Text>
          </View>
          <View className='new-books'>
            <Text className='body-title'>口碑新书</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default BookCity;
