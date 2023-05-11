// components/normalFooter/normalFooter.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    badge: Number,
    act: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    info: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      this.setData({ active: event.detail });
    },
    goHome() {
      wx.navigateTo({
        url: '/pages/home/home',
      })
      this.setData({
        active: 0
      })
    },
    goClass() {
      wx.navigateTo({
        url: '/pages/classification/classification',
      })
      this.setData({
        active: 1
      })
    },
    goCar() {
      wx.getStorage({
        key: 'token',
        success: ()=> {
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
      this.setData({
        active: 2
      })
    },
    goSelf() {
      wx.getStorage({
        key: 'token',
        success: ()=> {
          wx.navigateTo({
            url: '/pages/mine/mine',
          })  
        },
        fail: ()=> {
          wx.navigateTo({
            url: '/pages/self/self',
          })  
        }
      })
 
      this.setData({
        active: 3
      })   
    }
  },
  // 组件的生命周期
  lifetimes: {
    // 组件一加载就取本地存储中的info值
    attached() {
      wx.getStorage({
        key: 'token',
        success: ()=> {
          if(this.properties.act) {
            this.setData({
              active: this.properties.act
            })
          }
          wx.getStorage({
            key: 'info',
            success: (res)=> {
              this.setData({
                info: res.data
              })
            }
          })
        }
      })

    },

  },
  observers: {
    'badge' : function(newValue) {
      this.setData({
        info: newValue
      })
    }
  }
})
