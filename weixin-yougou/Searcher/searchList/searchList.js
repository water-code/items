// Searcher/searchList/searchList.js
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    searchList: [],
    historyList: []
  },  
  onChange(e) {
    this.setData({
      value: e.detail,
    })
    this.getSearchList()
  },
  // 获取搜索列表数据
  async getSearchList() {
    const {data: res} = await wx.p.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch',
      method: 'GET',
      data: {
        query: this.data.value
      }
    })
    if (res.meta.status == 200) {
      this.setData({
        searchList: res.message
      })
    }
  },
  // 确定搜索时触发
  onSearch() {
    this.getSearch()
  },
  getSearch() {
    if (this.data.value === '') {
      Toast('请输入搜索内容')
      return false
    } else {
      // 没有搜索记录，把搜索值push进数组首位，存入本地
      let list = this.data.historyList
      if (!list.includes(this.data.value)) {
        list.unshift(this.data.value)
        wx.setStorage({
          key: 'historyList',
          data: JSON.stringify(list),
          success: (res)=> {
            this.setData({
              historyList: list
            })
          }
        })
        // localStorage.setItem('historyList', JSON.stringify(this.historyList))
      } else {
        // 有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
        const i = list.indexOf(this.data.value)
        list.splice(i, 1)
        list.unshift(this.data.value)
        wx.setStorage({
          key: 'historyList',
          data: JSON.stringify(list),
          success: (res)=> {
            this.setData({
              historyList: list
            })
          }
        })
        // localStorage.setItem('historyList', JSON.stringify(this.historyList))
      }
      // 跳转到搜索结果页
      wx.navigateTo({
        url: `../searchShow/searchShow?query=${this.data.value}`,
      })
    }

  },
  empty() {
    wx.removeStorage({
      key: 'historyList',
      success: ()=> {
        Toast('清空历史记录成功')
        this.setData({
          historyList: []
        })
      }
    })
  },
  gotoSearch(e) {
    wx.navigateTo({
      url: `../searchShow/searchShow?query=${e.target.dataset.item}`,
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 如果本地存储的数据historyList有值，直接赋值给data中的historyList
    wx.getStorage({
      key: 'historyList',
      success: (res)=> {
        this.setData({
          historyList: JSON.parse(res.data)
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})