<template>
  <div class="productDetails-container">
    <!-- 1.标题栏 -->
    <ArrowHeader></ArrowHeader>

    <!-- 2.轮播 -->
    <div class="swiper">
      <van-swipe :autoplay="3000" indicator-color="#000">
        <van-swipe-item v-for="(image,index) in images" :key="image.goods_id" @click="preview(index)">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>

      <!-- 3.商品信息展示 -->
      <div class="show">
        <sapn class="price">￥{{detailList.goods_price  }}</sapn>
        <sapn class="name">{{detailList.goods_name  }}</sapn>
      </div>
    </div>

    <!-- 4.详细介绍 -->
    <div v-html="detailList.goods_introduce" class="introduce"></div>

    <!-- 5.底部商品导航栏 -->
    <Footer :goods_info="detailList" class="footer"></Footer>
  </div>
</template>
<script>
import Footer from '@/components/Footer/GoodsFooter.vue'
import ArrowHeader from '@/components/Header/ArrowHeader.vue'
import { getDataWithParams } from '@/api/getData.js'
import { ImagePreview } from 'vant'
import { getImage } from '@/api/getImages'
export default {
  data() {
    return {
      detailList: {},
      images: []
    }
  },
  components: {
    ArrowHeader,
    Footer
  },
  methods: {
    async initDetail() {
      const obj = {
        params: {
          goods_id: this.$route.query.goods_id
        }
      }
      this.detailList = await getDataWithParams('/detail', obj)
      console.log(this.detailList)
      this.images = getImage(this.detailList.pics)
    },
    preview(index) {
      ImagePreview({ images: this.images, startPosition: index })
    }
  },
  created() {
    this.initDetail()
  }
}
</script>

<style lang="less" scoped>
.swiper {
  margin-top: 46px;
}
/deep/ .van-swipe__indicator {
  background: rgba(0, 0, 0, 0.8);
}
.show {
  display: flex;
  flex-direction: column;
}
.price {
  color: #c00000;
  font-size: 20px;
  margin-bottom: 10px;
}
.name {
  font-size: 14px;
}
.introduce {
  margin-bottom: 50px;
}
.footer {
  z-index: 2;
}
</style>
