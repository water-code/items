// pages/self/self.js
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    password: ''
  },
  inputChange(e) {
    this.setData({
      value: e.detail.value
    })
  },
  wordChange(e) {
    this.setData({
      password: e.detail.value
    })
  },
  goTomine() {
    if (this.data.value == '' || this.data.password == '') {
      Toast.fail("用户名或密码输入不能为空")
    }
    if (this.data.value == 'admin' && this.data.password == '000000') {
      wx.setStorage({
        key: 'token',
        data: 'Bear xxx',
        success: function(res) {
          Toast.success("登录成功")
          wx.navigateTo({
            url: '/pages/mine/mine',
          })
        }
      })
    }
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