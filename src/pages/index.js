/**
 * @Date:   2018-07-08T19:14:17+08:00
 * @Last modified time: 2018-07-09T08:31:42+08:00
 */
import wepy from 'wepy';
import API from '@/const/api';
import Carousel from '../components/Carousel';
import Loading from '../components/Loading';

export default class Index extends wepy.page {
  config = {
    navigationBarTitleText: '首页',
    navigationBarBackgroundColor: '#75c2f6',
    navigationBarTextStyle: '#FFF'
  }

  components = {
    carousel: Carousel,
    loading: Loading
  }

  data = {
    carouselList: [],
    carouselActiveIndex: 0,
    latestNews: [],
    beforeNews: [],
    loadMore: false,
    before: 0
  }

  events = {
    'carousel-click': (id, $event) => {
      this.goNews(id)
    }

  }

  methods = {
    navigateNews (id) {
      this.goNews(id)
    }
  }

  goNews (id) {
    wx.navigateTo({
      url: `/pages/news?id=${ id }`
    })
  }

  getLatestNews () {
    return wepy.request(API.LATEST)
  }

  getBeforeNews (date) {
    return wepy.request(API.BEFORENEWS + date)
  }

  getDate (n) {
    let date = Date.now()
    let before = date - 24 * 60 * 60 * 1000 * n
    before = new Date(before)

    let year = before.getFullYear()
    let month = before.getMonth() + 1
    month = month >= 10 ? month : '0' + month
    let day = before.getDate()
    day = day >= 10 ? day : '0' + day

    return [year, month, day].join('')
  }

  async onReachBottom () {
    this.loadMore = true

    let date = this.getDate(this.before)
    this.before = this.before + 1

    let beforeNews = await this.getBeforeNews(date)
    this.beforeNews.push({
      date: beforeNews.data.date,
      stories: beforeNews.data.stories
    })
    this.$apply()
    console.log(this.beforeNews)

    this.loadMore = false
  }

  async onLoad () {
    console.log('Index onLoad')
    let latest = await this.getLatestNews()
    this.carouselList = latest.data.top_stories
    this.latestNews = latest.data.stories
    this.$apply();
  }
}
