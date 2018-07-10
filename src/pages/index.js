/**
 * @Date:   2018-07-08T19:14:17+08:00
 * @Last modified time: 2018-07-09T08:31:42+08:00
 */
import wepy from 'wepy';
import API from '@/const/api';
import Carousel from '../components/Carousel';

export default class Index extends wepy.page {
  config = {
    navigationBarTitleText: '首页',
    navigationBarBackgroundColor: '#75c2f6',
    navigationBarTextStyle: '#FFF'
  }

  components = {
    carousel: Carousel
  }

  data = {
    carouselList: [],
    carouselActiveIndex: 0
  }

  events = {
    'carousel-click': (id, $event) => {
      wx.navigateTo({
        url: `/pages/news?id=${ id }`
      })
    }
  }

  getLatestNews () {
    return wepy.request(API.LATEST)
  }

  async onLoad () {
    console.log('Index onLoad')
    let latest = await this.getLatestNews()
    this.carouselList = latest.data.top_stories
    this.$apply();
  }
}