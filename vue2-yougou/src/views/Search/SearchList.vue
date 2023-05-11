<template>
  <div class="searchList-container">
    <!-- 标题栏 -->
    <ArrowHeader></ArrowHeader>
    <!-- 商品列表信息 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :disabled="finished">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-swipe-cell>
          <van-card v-for="item in productsList" :key="item.goods_id" :num="item.goods_number" :price="parseInt(item.goods_price).toFixed(2)" :title="item.goods_name" class="goods-card" :thumb="item.goods_big_logo" @click="goDetail(item.goods_id)" />
        </van-swipe-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getDataWithParams } from '@/api/getData.js'
import ArrowHeader from '@/components/Header/ArrowHeader.vue'
export default {
  components: {
    ArrowHeader
  },
  data() {
    return {
      // 商品信息列表
      productsList: [],
      // 页码值
      page: 1,
      // 每页显示多少条数据
      limit: 10,
      // 每当下一页数据请求回来之后，要把loading从true改成false
      loading: true,
      // // 所有数据加载完成之后，如果没有更多数据了，要把finished改成false
      finished: false,
      isLoading: false
    }
  },
  methods: {
    // 获取文章列表数据
    async initList(isRefresh) {
      console.log(this.$route.query.cat_id)
      let obj = {}
      if (this.$route.query.cat_id) {
        obj = {
          params: {
            cid: this.$route.query.cat_id
          }
        }
      } else {
        obj = {
          params: {
            query: this.$route.query.search_val,
            pagenum: this.page,
            pagesize: this.limit
          }
        }
      }
      console.log(obj)

      const res = await getDataWithParams('/search', obj)
      if (isRefresh) {
        // this.productsList = [新数据在前,旧数据在后]
        this.productsList = [...res.goods, ...this.productsList]
        this.isLoading = false
      } else {
        // 如果是上拉加载更多,那么应该是:
        // this.artlist = [旧数据在前,新数据在后]
        this.productsList = [...this.productsList, ...res.goods]
        this.loading = false
      }
      // 证明没有下一页数据了，直接把finished改成true,表示数据加载完了
      if (res.goods.length === 0) {
        this.finished = true
      }
      console.log(this.productsList)
    },
    // 请求下一页数据
    onLoad() {
      console.log('触发')
      // 页码值+1
      this.page++
      // 重新请求接口
      this.initList(false)
    },
    // 下拉刷新的处理函数
    onRefresh() {
      this.page++
      this.initList(true)
    },
    goDetail(id) {
      this.$router.push({
        path: '/details',
        query: {
          goods_id: id
        }
      })
    }
  },
  created() {
    this.initList()
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-swipe-cell__wrapper {
  margin-top: 46px;
}
</style>
