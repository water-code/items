<template>
  <div class="classification-container">
    <!-- 标题栏 -->
    <NormalHeader></NormalHeader>
    <!-- 1.顶部搜索框 -->
    <Search></Search>
    <div class="navBar">
      <!-- 2.Sidebar左侧边导航 -->
      <van-sidebar v-model="activeKey">
        <van-sidebar-item v-for="(item,index) in productList" :key="item.cat_id" :title="item.cat_name" :to="'/class/show/'+ index" />
      </van-sidebar>
      <!-- 3.右侧商品展示区域 -->
      <router-view :list="productList"></router-view>
    </div>

    <!-- 4.底部TabBar区域 -->
    <Footer></Footer>
  </div>
</template>

<script>
import NormalHeader from '@/components/Header/NormalHeader.vue'
import { getData } from '@/api/getData.js'
import Search from '@/components/Search/Search.vue'
import Footer from '@/components/Footer/NormalFooter.vue'
export default {
  data() {
    return {
      activeKey: 0,
      productList: []
    }
  },
  components: {
    Search,
    NormalHeader,
    Footer
  },
  methods: {
    async initSide() {
      this.productList = await getData('https://api-hmugo-web.itheima.net/api/public/v1/categories')
    }
  },
  created() {
    this.initSide()
  }
}
</script>

<style lang="less" scoped>
.navBar {
  width: 100%;
  display: flex;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 100px 0 50px 0;
  height: 520px;
  overflow: hidden;
  overscroll-behavior-y: contain;
}
.van-sidebar {
  overflow: auto;
  overscroll-behavior-y: contain;
}
.van-sidebar-item {
  padding: 20px 10px;
}
.van-sidebar-item--select::before {
  background-color: #c00000;
  width: 3px;
  height: 25px;
}
</style>
