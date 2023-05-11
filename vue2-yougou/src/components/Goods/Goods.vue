<template>
  <div class="goods-container">

    <!-- 1.加入购物车的商品信息栏 -->
    <van-swipe-cell>
      <van-stepper v-model="value" />
      <van-checkbox v-model="checked" checked-color="#c00000" class="checkbox"></van-checkbox>
      <label class="info">
        <van-card :price="parseInt(price).toFixed(2)" :title="title" class="goods-card" :thumb="image" />
      </label>
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" @click="del" />
      </template>

    </van-swipe-cell>

  </div>
</template>

<script>
import { Toast } from 'vant'
import bus from '@/eventBus'
export default {
  props: {
    // 商品标题
    title: {
      type: String
    },
    // 商品价格
    price: {
      type: [Number, String]
    },
    // 商品id
    id: {
      required: true
    },
    // 商品缩略图
    image: {
      type: String,
      default: 'https://img01.yzcdn.cn/vant/cat.jpeg'
    },
    // 全选复选框的勾选状态
    allState: {
      type: Boolean
    }
  },
  data() {
    return {
      // 单个商品复选框的勾选状态
      checked: true,
      // 计数器里面的值
      value: 1,
      goodsList: [],
      // 购物车右上角商品数量
      badge: 0
    }
  },
  methods: {
    del() {
      Toast('删除')
      // 从本地存储中删除对应数据
      const arr = JSON.parse(localStorage.getItem('goodsList'))
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].goods_id === this.id) {
          arr.splice(i, 1)
        }
      }
      // 把对应商品删除之后存入goodsList数据列表里面，方便后面监听数据的变化
      // 重置本地存储中的goodsList值
      console.log(arr)
      // console.log(JSON.stringify(arr))
      this.resetSetItem('goodsList', JSON.stringify(arr))
      // 改变购物车右上角商品的数量
      let goodsNum = localStorage.getItem('badge') - 1
      goodsNum = goodsNum < 0 ? 0 : goodsNum
      // 触发resetSetItem函数 重置本地存储中的badge值
      this.resetSetItem('badge', goodsNum)
    }
  },

  watch: {
    // 监听商品复选框的勾选状态
    checked(newVal) {
      // 把最新的勾选状态同步到父组件里面 子→父
      const obj = { id: this.id, state: newVal }
      this.$emit('stateChange', obj)
    },
    // 监听计数器里面的值
    value(val) {
      const obj = { id: this.id, count: val }
      this.$emit('countChange', obj)
    }
  },
  created() {
    bus.$on('share', val => {
      this.checked = val
    })
  }
}
</script>

<style lang="less" scoped>
// 一、商品信息栏
// 删除图标信息
.delete-button {
  height: 100%;
}
// 每个商品信息的复选框
.checkbox {
  position: relative;
  top: 36px;
  left: 10px;
  z-index: 1;
}
// 复选框右边的商品卡片
.van-card {
  padding: 0px 16px 8px 40px;
  margin-top: -48px;
}
.info {
  width: 100%;
}
// 计数器
.van-stepper {
  position: relative;
  left: 270px;
  top: 66px;
  z-index: 2;
}
</style>
