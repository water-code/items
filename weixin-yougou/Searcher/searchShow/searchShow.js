// Searcher/searchShow/searchShow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    // 传递过来的关键字参数
    query: "",
    // 页码值
    page: 1,
    // 每页显示多少条数据
    limit: 10,
    // 搜索到的商品总数量
    total: 0,
    // 定义节流阀
    // 该值等于false说明可以发起请求
    // 如果等于true说明当前正在请求数据
    isloading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      query: options.query
    })
    // 获取商品数据列表
    this._getGoodsList()
  },
  // 请求商品列表数据
  async _getGoodsList(cb) {
    // 表示可以发起请求
    this.setData({
      isloading: true
    })
    // 展示loading效果
    wx.showLoading({
      title: '数据加载中...',
    })
    const {data: res} = await wx.p.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
      method: 'GET',
      data: {
        query: this.data.query,
        pagesize: this.data.limit
      }
    })
    if (res.meta.status == 200) {
      this.setData({
        total: res.message.total - 0,
        goodsList: [...this.data.goodsList,...res.message.goods]
      })
        // 隐藏loading效果
        wx.hideLoading()
        this.setData({
          isloading: false
        })

        // wx.stopPullDownRefresh()
        cb && cb()
    }
  },
  // 点击跳转到商品详情页
  gotoDetails(e) {
    wx.navigateTo({
      url: `../searchDetails/searchDetails?id=${e.target.dataset.id}`,
    })
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
      // 需要重置关键的数据
      this.setData({
        page: 1,
        goodsList: [],
        total: 0
      })
      this._getGoodsList(()=>{
        // 关闭下拉刷新的效果
        wx.stopPullDownRefresh()
      })
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.page * this.data.limit >= this.data.total) {
      // 证明没有下一页数据了
      return wx.showToast({
        title: '数据加载完毕',
        // 表示不显示任何图标
        icon: 'none'
      })
    }
    if (this.data.isloading) return
    this.setData({
      page: this.data.page + 1
    })
    this._getGoodsList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})