<template>
  <div class="home-container">
    <!-- 标题栏 -->
    <NormalHeader></NormalHeader>
    <!-- 顶部搜索框 -->
    <Search></Search>
    <!-- 1.Swiper轮播 -->
    <van-swipe :autoplay="3000" indicator-color="#000">
      <van-swipe-item v-for="(item,index) in swiperList" :key="index">
        <img v-lazy="item.image_src" />
      </van-swipe-item>
    </van-swipe>

    <!-- 2.中间grid栏 -->
    <van-grid :border="false" :column-num="4">
      <van-grid-item v-for="(item,index) in gridList" :key="index">
        <van-image :src="item.image_src" />
      </van-grid-item>
    </van-grid>

    <!-- 3.楼层区域 -->
    <Floor v-for="(item,index) in floorList" :key="index" :floor_title="item.floor_title" :product_list="item.product_list"></Floor>

    <!-- 底部区域 -->
    <Footer></Footer>
  </div>
</template>

<script>
import NormalHeader from '@/components/Header/NormalHeader.vue'
import { getData } from '@/api/getData.js'
import Floor from '@/components/Floor/Floor.vue'
import Search from '@/components/Search/Search.vue'
import Footer from '@/components/Footer/NormalFooter.vue'

export default {
  components: {
    Floor,
    Search,
    NormalHeader,
    Footer
  },
  data() {
    return {
      swiperList: [],
      gridList: [],
      floorList: []
    }
  },
  methods: {
    async initSwiper() {
      this.swiperList = await getData('/swiperdata')
    },
    async initGrid() {
      this.gridList = await getData('/catitems')
    },
    async initFloor() {
      this.floorList = await getData('/floordata')
    }
  },
  created() {
    this.initSwiper()
    this.initGrid()
    this.initFloor()
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding: 46px 0 50px 0;
  // margin: auto;
}
img[data-v-6d720fe5] {
  width: 100%;
  height: 170px;
}
.van-swipe-item {
  margin-top: 54px;
}
/deep/ .van-swipe__indicator {
  background: rgba(0, 0, 0, 0.8);
}
/deep/ .van-nav-bar__content {
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}
</style>
