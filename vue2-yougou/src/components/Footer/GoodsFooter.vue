<template>
  <div class="goodsFooter-container">
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="badge" ref="cartRef" @click="goCart" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addCart" :disabled="state" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import { Toast } from 'vant'

export default {
  props: {
    goods_info: {
      type: Object
    },
    // 购物车上标商品数量个数
    num: {
      type: Number
    }
  },
  data() {
    return {
      // 设置购物车上标数量
      badge: 0,
      // 设置加入购物车按钮的状态
      state: false,
      // 加入购物车的商品信息
      goodsList: []
    }
  },
  methods: {
    addCart() {
      const token = localStorage.getItem('token')
      if (token) {
        this.getInfo()
      } else {
        Toast('当前处于未登录状态,清先登录之后再进行相关操作')
      }
    },
    getInfo() {
      // 判断该商品是否已经在goodsList里面了
      const istrue = this.goodsList.some(item => {
        return item.goods_id === this.goods_info.goods_id
      })
      if (istrue) {
        // 商品在购物车里面,将按钮禁用
        this.state = true
        Toast('该商品已经在购物车了哦~')
      } else {
        // 商品不在购物车则进行添加
        this.goodsList.unshift(this.goods_info)
        localStorage.setItem('goodsList', JSON.stringify(this.goodsList))
        // 把字符串转换成数字  *1
        this.badge = this.badge * 1 + 1
        Toast.success('加入购物车成功')
        // 点击加入购物车之后禁掉按钮
        this.state = true
        // 将badge数据存入本地浏览器
        localStorage.setItem('badge', this.badge)
      }
    },
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
  mounted() {
    const token = localStorage.getItem('token')
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
  }
}
</script>

<style lang="less" scoped>
</style>
