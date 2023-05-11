<template>
  <div class="product-show-container">
    <div class="column" v-for="good in list[id].children" :key="good.cat_id" @click="goGoodsList(good.cat_id)">
      <span class="title">/ {{ good.cat_name }} /</span>
      <van-grid :column-num="3" :border="false">
        <van-grid-item :icon="image.cat_icon" :text="image.cat_name" v-for="image in good.children" :key="image.cat_id" />
      </van-grid>
    </div>

  </div>

</template>

<script>
export default {
  props: {
    list: {
      type: Array
    },
    id: {
      type: Number,
      default: 0
    }
  },
  methods: {
    goGoodsList(id) {
      this.$router.push({
        path: '/list',
        query: {
          cat_id: id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.product-show-container {
  grid-column: 2/5;
  overflow: auto;
  overscroll-behavior-y: contain;
}
.title {
  display: block;
  width: 100%;
  text-align: center;
  margin: 15px 0;
  font-size: 14px;
  font-weight: 700;
}
/deep/ .van-grid-item__icon {
  font-size: 54px;
}
</style>
