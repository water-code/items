<template>
  <div class="foor-container">
    <div class="top">
      <img :src="floor_title.image_src" alt="时尚女装" :title="floor_title.name">
    </div>
    <ul class="bottom">
      <li v-for="(item, index) in product_list" :key="index">
        <img :src="item.image_src" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    floor_title: {
      type: Object
    },
    product_list: {
      type: Array
    }
  }
}
</script>

<style lang="less" scoped>
.foor-container {
  display: flex;
  flex-direction: column;
}
.top {
  margin-top: 15px;
}
.top img {
  height: 30px;
}
.bottom {
  width: 100%;
  height: 280px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}
.bottom li:first-child {
  grid-row: 1 / 3;
}
.bottom li img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
