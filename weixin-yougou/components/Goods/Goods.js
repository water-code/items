// components/Goods/Goods.js
import Toast from '@vant/weapp/toast/toast';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsList: Object,
    state: Boolean
  },


  /**
   * 组件的初始数据
   */
  data: {
    checked: true,
    // 计数器的值
    count: 1
  },
  observers: {
    'state': function(value) {
      this.setData({
        checked: value
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      this.setData({
        checked: event.detail,
      })
      this.triggerEvent('sync',{ id: this.properties.goodsList.goods_id, state: event.detail })
    },
    onStepperChange(e) {
      this.setData({
        count: e.detail
      })
      this.triggerEvent('step',{ id: this.properties.goodsList.goods_id, count: this.data.count })

    },
    del() {
      // 从本地存储中删除对应数据
      wx.getStorage({
        key: 'goodsList',
        success: (res)=> {
          let arr = res.data
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].goods_id === this.properties.goodsList.goods_id) {
              arr.splice(i, 1)
            }
          }
          // 把对应商品删除之后存入goodsList数据列表里面，方便后面监听数据的变化
          wx.setStorage({
            key: 'goodsList',
            data: arr
          })

          // 更改本地存储中购物车角标值
          wx.getStorage({
            key: 'info',
            success: (res)=> {
              let goodsNum = res.data - 1
              goodsNum = goodsNum < 0 ? 0 : goodsNum
              wx.setStorage({
                key: 'info',
                data: goodsNum
              })
              this.triggerEvent('del',{ list: arr, badge: goodsNum })
            },
          })
          Toast('删除成功')
        }
      })



    }
  }
})
