// pages/classification/classification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initList: [],
    // 控制左边选中项
    activeIndex: 0,
    navItems: [],
    contentItems: [],
  },
  onNavTap (event) {
    const index = event.target.dataset.index
    this.setData({
      activeIndex: index
    })
    this.setData({
      active:false
    })
  },
  async _getInitList() {
    const {data: res} = await wx.p.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
      method: 'GET'
    })
    if (res.meta.status == 200) {
      this.setData({
        initList: res.message
      })
      let arr1 = []
      let arr2 = [] 
      for (let i = 0; i < this.data.initList.length; i++) {
        arr1.push(this.data.initList[i].cat_name)
        arr2.push(this.data.initList[i].children)
      }
      this.setData({
        navItems: arr1,
        contentItems: arr2
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
    this._getInitList()
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