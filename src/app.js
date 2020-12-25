import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';
import Index from './pages/index';
import configStore from './store';
import './app.scss';

const store = configStore();
Taro.cloud.init({
  env: 'test-meeuu'
});

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/book-city/book-city',
      'pages/recommend/recommend',
      'pages/book-shelf/book-shelf',
      'pages/search/search'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '读者阅书',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#333',
      backgroundColor: '#fff',
      selectedColor: '#f00',
      list: [
        {
          pagePath: 'pages/recommend/recommend',
          text: '推荐',
          iconPath: 'assets/images/tuijian.png',
          selectedIconPath: 'assets/images/tuijian-active.png',
        },
        {
          pagePath: 'pages/book-city/book-city',
          text: '书城',
          iconPath: 'assets/images/book.png',
          selectedIconPath: 'assets/images/book-active.png',
        },
        {
          pagePath: 'pages/book-shelf/book-shelf',
          text: '书架',
          iconPath: 'assets/images/bshelf.png',
          selectedIconPath: 'assets/images/bshelf-active.png',
        }
      ]
    }
  };

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
