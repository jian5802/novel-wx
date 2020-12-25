import Taro, { Component } from '@tarojs/taro';
import {
  View,
  Icon,
  Text,
  Image,
} from '@tarojs/components';
import moment from 'moment';
import './book-city.scss';

class BookCity extends Component {
  config = {
    navigationBarTitleText: '读者阅书'
  };

  constructor(props) {
    super(props);
    this.state = {
      db: null, // 数据库
      topName: '凡人修仙传',
      sex: '1',
      hotBooks: [], // 热销轮播
      hotList: [],  // 热销列表
      trianglePosition: 0, // 小三角位置
      countDown: '', // 倒计时
      todayList: [], // 今日福利
    };
    this.interval = null; // 轮播计时器
    this.countInterval = null; // 倒计时计时器
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount () {
    clearInterval(this.interval);
    this.interval = null;
    clearInterval(this.countInterval);
    this.countInterval = null;
  }

  componentDidShow () {
    const db = Taro.cloud.database({ env: 'test-meeuu' });
    this.setState({ db }, () => {
      this.queryHot();
      this.timerInit();
      this.queryToday();
    });
  }

  componentDidHide () { }

  // 定时器初始化
  timerInit = () => {
    const { trianglePosition } = this.state;
    this.interval = setInterval(() => {
      this.setState({
        trianglePosition: (trianglePosition + 1) % 3
      });
    }, 2000);
    this.countInterval = setInterval(() => {
      const start = moment();
      let hours = 23 - start.hour();
      hours = String(hours).length === 1 ? `0${hours}` : hours;
      let minutes = 59 - start.minute();
      minutes = String(minutes).length === 1 ? `0${minutes}` : minutes;
      let seconds = 59 - start.second();
      seconds = String(seconds).length === 1 ? `0${seconds}` : seconds;
      this.setState({
        countDown: `${hours}:${minutes}:${seconds}`
      });
    }, 1000);
  };

  // 查询热销
  queryHot = () => {
    const { sex, db } = this.state;
    db.collection('books').where({
      sex,
      type: 'hot',
    }).limit(7).get().then(res => {
      this.setState({
        hotBooks: res.data.slice(0, 3) || [],
        hotList: res.data.slice(3) || [],
      });
    }).catch(console.error);
  };

  // 查询今日福利
  queryToday = () => {
    const { sex, db } = this.state;
    db.collection('books').where({
      sex,
      type: 'today'
    }).limit(4).get().then(res => {
      this.setState({
        todayList: res.data || []
      });
    }).catch(console.error);
  };

  // 切换频道
  handleChangeSex = type => {
    if (type === 'man') {
      this.setState({ sex: '1' }, () => {
        this.queryHot();
      });
    } else {
      this.setState({ sex: '0' }, () => {
        this.queryHot();
      });
    }
  };

  //跳转到搜索页
  gotoSearch = () => {
    Taro.navigateTo({ url: '/pages/search/search' });
  };

  render () {
    const {
      topName,
      sex,
      hotBooks,
      hotList,
      trianglePosition,
      countDown,
      todayList,
    } = this.state;
    return (
      <View className='book-city'>
        <View className='head' onClick={this.gotoSearch}>
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
                      <View key={item._id} className='hot-item'>
                        <Text className={trianglePosition === index ? 'triangle' : 'hover'} />
                        <Text className='hot-title'>{ index + 1 }.{ item.title }</Text>
                        <Text className='hot-author'>{ item.author }</Text>
                      </View>
                    );
                  } else {
                    return;
                  }
                })
              }
              <View className='hot-cover'>
                {
                  hotBooks.map((item, index) => {
                    return (
                      <Image
                        key={item._id}
                        className={trianglePosition === index ? 'book-cover top' : ((trianglePosition + 1) % 3 === index ? 'book-cover mid' : 'book-cover bottom')}
                        src={item.cover}/>
                    );
                  })
                }
              </View>
            </View>
            <View className='hot-list'>
              {
                hotList.map((item) => {
                  return (
                    <View key={item._id} className='hot-list-container'>
                      <Image className='cover' src={item.cover}/>
                      <View className='title-text'>{item.title}</View>
                      <View className='author-text'>{item.author}</View>
                    </View>
                  );
                })
              }
            </View>
          </View>
          <View className='today-welfare'>
            <Text className='body-title'>今日福利</Text>
            <View className='count-down'>
              <View className='time'>{countDown}</View>
              <View className='tips'/>
            </View>
            <View className='today-container'>
              {
                todayList.map((item) => {
                  return (
                    <View key={item._id} className='today-item'>
                      <Image className='cover' src={item.cover}/>
                      <View className='title-text'>{item.title}</View>
                      <View className='author-text'>{item.author}</View>
                    </View>
                  );
                })
              }
            </View>
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
