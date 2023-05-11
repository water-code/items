// Searcher/searchDetails/searchDetails.js
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品的id信息
    id: 0,
    // 详细商品信息对象
    detailsInfo:{},
    info: 0,
    state: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id
    })
    this._getDetailsList()

  },
  // 请求对应id商品的信息
  async _getDetailsList() {
    const {data: res} = await wx.p.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',
      method: 'GET',
      data: {
        goods_id: this.data.id
      }
    })
    if (res.meta.status == 200) {
      this.setData({
        detailsInfo: res.message
      })
    }
  },


  // 点击加入购物车后触发该事件
  addGoods() {
    wx.getStorage({
      key: 'token',
      success: ()=> {
        this._changeInfo()
      },
      fail: ()=> {
        Toast.fail("当前处于未登录状态,请先登录哦~")
      }
    })
    
  },
  _changeInfo() {
    wx.getStorage({
      key: 'goodsList',
      success: (res)=> {
        let list = res.data
        if (list.length == 0) {
          list.unshift(this.data.detailsInfo)
          wx.setStorage({
            key: 'goodsList',
            data: list,
          })
          this._changeBadge()
          Toast.success('加入购物车成功')
        } else {
          // 判断该商品是否已经在goodsList里面了
          const istrue = list.some(item => {
            return item.goods_id === this.data.detailsInfo.goods_id
          })
          if (istrue) {
            // 商品在购物车里面,将按钮禁用
            this.data.state = true
            Toast('该商品已经在购物车了哦~')
          } else {
            // 商品不在购物车则进行添加
            list.unshift(this.data.detailsInfo)
            wx.setStorage({
              key: 'goodsList',
              data: list
            })
            // localStorage.setItem('goodsList', JSON.stringify(this.goodsList))
            Toast.success('加入购物车成功')
            // 点击加入购物车之后禁掉按钮
            this.data.state = true
            // 将badge数据存入本地浏览器
            this._changeBadge()
          }
        }
      }
    })
  },
  _changeBadge() {
        // 购物车右上角角标数字的修改
        wx.setStorage({
          key: 'info',
          data: this.data.info*1 + 1,
          success: ()=> {
            wx.getStorage({
              key: 'info',
              success: (res)=> {
                // res.data 是本地存储中的数据
                this.setData({
                  info: res.data
                })
              }
            })
          }
        })
  },
  goShopping() {
    wx.getStorage({
      key: 'token',
      success: (res)=> {
        wx.navigateTo({
          url: '/pages/shopping/shopping',
        })
      },
      fail: ()=> {
        wx.navigateTo({
          url: '/pages/empty/empty',
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.getStorage({
      key: 'token',
      success: ()=> {
            // 初始化一个空数组
    wx.getStorage({
      key: 'goodsList',
      fail: ()=> {
        wx.setStorage({
          key: 'goodsList',
          data:[]
        })
      }
    })
    wx.getStorage({
      key: 'info',
      success: (res)=> {
        this.setData({
          info: res.data
        })
      }
    })
      },
      fail: ()=> {
      
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