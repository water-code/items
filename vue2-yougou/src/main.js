import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
// 导入Vant组件库
import Vant from '@/utils/vant.js'
import 'vant/lib/index.less'

// 导入需要的模块
import { Lazyload } from 'vant'

// 注册使用到的模块
Vue.use(Vant)
Vue.use(Lazyload)

Vue.config.productionTip = false

// 1.vue中本地储存实时监听 - badge
Vue.prototype.resetSetItem = function (key, newVal) {
  if (key === 'badge' || key === 'goodsList') {
    // 创建一个StorageEvent事件
    const newStorageEvent = document.createEvent('StorageEvent')
    const storage = {
      setItem: function (k, val) {
        localStorage.setItem(k, val)
        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null)
        // 派发对象
        window.dispatchEvent(newStorageEvent)
      }
    }
    return storage.setItem(key, newVal)
  }
}
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
