// pages/shopping/shopping.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: [],
    // 复选框的勾选状态
    checked: true,
    state: true,
    // 商品总数
    total: 0,
    // 商品总价
    amout: 0,
    badge: 0
  },
  onChange(event) {
    this.setData({
      checked: event.detail,
      state: event.detail
    })
    const newItems = this.data.goodsInfo.map(item => {
        item.goods_state = event.detail
        return item
    })
    this.setData({
      items: newItems
    })
    this.setData({
      total: this.getTotal(),
      amout: this.getAmt()
    })
  },
  // 更新goodsInfo里面对应id商品复选框的state状态
  syncState(e) {
    const newItems = this.data.goodsInfo.map(item => {
      if (item.goods_id === e.detail.id) {
        item.goods_state = e.detail.state
      }
      return item
    })
    this.setData({
      items: newItems
    })
    this.setData({
      checked: this.getFullState(),
      total: this.getTotal(),
      amout: this.getAmt()
    })
  },
  // 更新goodsInfo里面对应id商品的数量
  syncCount(e) {
    const newItems = this.data.goodsInfo.map(item => {
      if (item.goods_id === e.detail.id) {
        item.goods_count = e.detail.count
      }
      return item
    })
    this.setData({
      items: newItems
    })
    this.setData({
      total: this.getTotal(),
      amout: this.getAmt()
    })
  },
  // 删除对应id的组件
  syncDel(e) {
    this.setData({
      goodsInfo: e.detail.list,
      badge: e.detail.badge
    })
    this.setData({
      checked: this.getFullState(),
      total: this.getTotal(),
      amout: this.getAmt()
    })
  },
  // 计算全选复选框的state状态
  getFullState() {
    return this.data.goodsInfo.every(item => item.goods_state === true)
  },
  // 计算商品的总数
  getTotal() {
    return this.data.goodsInfo.filter(item => item.goods_state === true).reduce((t, item) => (t += item.goods_count), 0)
  },
  // 计算商品的总价
  getAmt() {
    return this.data.goodsInfo.filter(item => item.goods_state === true).reduce((amt, item) => (amt += item.goods_price * item.goods_count), 0)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.getStorage({
      key: 'goodsList',
      success: (res)=> {
        this.setData({
          goodsInfo: res.data
        })
        this.setData({
          total: this.getTotal(),
          amout: this.getAmt()
        })
      }
    })
    wx.getStorage({
      key: 'info',
      success: (res)=> {
        this.setData({
          badge: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    const list = this.data.goodsInfo
    // 给返回回来的商品信息添加复选框的勾选状态信息和商品数量
    const newList = []
    for (let i = 0; i < list.length; i++) {
      const obj = { goods_state: true, goods_count: 1 }
      const newobj = Object.assign(list[i], obj)
      newList.push(newobj)
    }
    wx.setStorage({
      key: 'goodsList',
      data: newList
    })
    this.setData({
      goodsInfo: newList
    })
    this.setData({
      checked: this.getFullState(),
      total: this.getTotal(),
      amout: this.getAmt()
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