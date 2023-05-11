// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    gridList: [],
    floorList: []
  },
  // 获取页面数据
  async getSwiperList() {
    const {data: res} = await wx.p.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      method: 'GET'
    })
    if (res.meta.status == 200) {
      this.setData({
        swiperList: res.message
      })
    }
  },
  async getGridList() {
    const {data: res} = await wx.p.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
      method: 'GET'
    })
    if (res.meta.status == 200) {
      this.setData({
        gridList: res.message
      })
    }
  },
  async getFloorList() {
    const {data: res} = await wx.p.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
      method: 'GET'
    })
    if (res.meta.status == 200) {
      this.setData({
        floorList: res.message
      })
    }
  },
  // 搜索框焦点触发时页面跳转
  goSearchList() {
    wx.navigateTo({
      url: '/Searcher/searchList/searchList',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSwiperList()
    this.getGridList()
    this.getFloorList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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