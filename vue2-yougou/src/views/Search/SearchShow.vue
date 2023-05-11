<template>
  <div class="searchShow-container">
    <!-- 1.顶部NavBar导航栏 -->
    <ArrowHeader></ArrowHeader>
    <!-- 2.搜索框 -->
    <Search @inputChange="getValue" @historyChange="getHistory" @mateChange="getMate" @flagChange="getFlag"></Search>
    <!-- 3.历史记录 -->
    <div class="history" v-if="flag == 0 || value == ''">
      <div class="top">
        <span class="title">历史记录</span>
        <van-icon name="delete-o" alt="删除历史记录" class="del" @click="empty" size="25" />
      </div>
      <ul class="content">
        <li v-for="(item,index) in historyList" :key="index" @click="goSearchDetail(item)">{{item}}</li>
      </ul>
    </div>
    <!-- 4.下拉框 -->
    <van-list v-else>
      <van-cell v-for="item in mateList" :key="item.goods_id" :title="item.goods_name" :data-index="item.goods_id" />
    </van-list>
  </div>

</template>

<script>
import { Toast } from 'vant'
import ArrowHeader from '@/components/Header/ArrowHeader.vue'
import Search from '@/components/Search/Search.vue'
export default {
  components: {
    ArrowHeader,
    Search
  },
  data() {
    return {
      value: '',
      flag: 0,
      historyList: [],
      mateList: []
    }
  },
  methods: {
    getValue(val) {
      this.value = val
    },
    getHistory(val) {
      this.historyList = val
    },
    // 点击历史搜索，跳转搜索结果页
    goSearchDetail(val) {
      this.$router.push({
        path: '/list',
        query: {
          search_val: val
        }
      })
    },
    // 清空历史搜索记录
    empty() {
      Toast('清空历史记录成功')
      localStorage.removeItem('historyList')
      this.historyList = []
    },
    getMate(val) {
      this.mateList = val
      console.log(this.mateList)
    },
    getFlag(val) {
      this.flag = val
    }
  },
  props: {
    id: {
      required: true,
      type: [String, Number]
    }
  }
}
</script>

<style lang="less" scoped>
.history {
  margin-top: 100px;
}
.top {
  display: flex;
  justify-content: space-between;
}
.content {
  display: flex;
  /* 超出盒子宽度换行 */
  flex-wrap: wrap;
}
.content li {
  margin: 5px 10px;
  background-color: #f2f3f5;
  border-radius: 10px;
  padding: 5px;
}
.van-list {
  margin: 100px 0 50px 0;
}
</style>
