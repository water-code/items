import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入需要的组件
import Home from '@/views/Home/Home.vue'
import Classification from '@/views/Classification/Classification.vue'
import Shopping from '@/views/Shopping/Shopping.vue'
import Login from '@/views/Self/Login.vue'
import ProductShow from '@/views/Classification/Product/ProductShow.vue'
import SearchShow from '@/views/Search/SearchShow.vue'
import SearchList from '@/views/Search/SearchList.vue'
import ProductDetails from '@/views/Search/ProductDetails.vue'
import Self from '@/views/Self/Self.vue'
import Empty from '@/views/Shopping/Empty.vue'
import Adress from '@/views/Self/Adress.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    {
      path: '/class',
      redirect: '/class/show/0',
      component: Classification,
      children: [
        { path: 'show/:id', component: ProductShow, props: true }
      ]
    },
    { path: '/shopping', component: Shopping },
    { path: '/login', component: Login },
    { path: '/search', component: SearchShow },
    { path: '/list', component: SearchList },
    { path: '/details', component: ProductDetails },
    { path: '/self', component: Self },
    { path: '/empty', component: Empty },
    { path: '/adress', component: Adress }
  ]
})

// 设置全局导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/self' || to.path === '/adress') {
    const token = localStorage.getItem('token')
    if (token) {
      // 有token,直接放行
      next()
    } else {
      // 没有token,强制跳转到登陆页
      next('/login')
    }
  } else if (to.path === '/shopping') {
    const token = localStorage.getItem('token')
    if (token) {
      // 有token,直接放行
      next()
    } else {
      // 没有token,强制跳转到空白页
      next('/empty')
    }
  } else {
    // 访问的不是后台主页或者购物车界面,直接放行
    next()
  }
})

export default router
