<template>
  <div class="normalFooter-container">
    <van-tabbar route>
      <van-tabbar-item to="/" replace icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/class" replace icon="qr">分类</van-tabbar-item>
      <van-tabbar-item @click="goCart" replace icon="shopping-cart-o" :badge="badge" ref="cart">购物车</van-tabbar-item>
      <van-tabbar-item to="/self" replace icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      badge: 0,
      goodsList: []
    }
  },
  mounted() {
    const token = localStorage.getItem('token')
    // 先查看浏览器中是否有token值,如果有才能执行下面操作
    if (token) {
      // 从浏览器中获取购物车上标商品数量个数
      if (localStorage.getItem('badge')) {
        this.badge = localStorage.getItem('badge')
      }
      if (JSON.parse(localStorage.getItem('goodsList'))) {
        this.goodsList = JSON.parse(localStorage.getItem('goodsList'))
      }
    } else {
      this.badge = 0
    }
  },
  methods: {
    goCart() {
      const goods = JSON.stringify(this.goodsList)
      this.$router.push({
        path: '/shopping',
        query: {
          goodsInfo: goods
        }
      })
    }
  },
  created() {
    // 如果在另外一个路由(比如路由B)中，
    // 我们想根据changeData的变化来请求接口刷新页面数据的时候，
    // 可以在这个路由中created钩子函数中监听
    // 先查看浏览器中是否有token值
    const token = localStorage.getItem('token')
    if (token) {
      window.addEventListener('setItem', () => {
        this.badge = localStorage.getItem('badge')
      })
    } else {
      this.badge = 0
    }
  }
}
</script>

<style>
</style>
