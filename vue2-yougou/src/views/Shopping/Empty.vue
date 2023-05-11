<template>
  <div class="empty-container">
    <!-- 标题栏 -->
    <NormalHeader></NormalHeader>
    <van-empty image="error" description="未登录状态,无法查看购物车" image-size="300px" class="error" />
    <!-- 底部页面导航栏 -->
    <Footer></Footer>
  </div>
</template>

<script>
import NormalHeader from '@/components/Header/NormalHeader.vue'

import Footer from '@/components/Footer/NormalFooter.vue'
export default {
  components: {
    NormalHeader,
    Footer
  }
}
</script>

<style lang="less" scoped>
.error {
  margin-top: 100px;
}
</style>
