<template>
  <div class="search-container">
    <!-- 顶部搜索框 -->
    <van-search v-model.trim="value" shape="round" background="#C00000" placeholder="请输入搜索关键词" @search="onSearch" @focus="onFocus" @input="onInput" />
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getDataWithParams } from '@/api/getData.js'
export default {
  data() {
    return {
      value: '',
      flag: 0,
      historyList: [],
      mateList: []
    }
  },
  methods: {
    onSearch(val) {
      Toast(val)
      this.getSearch()
    },
    onFocus() {
      this.$router.push('/search')
    },
    onInput() {
      this.$emit('inputChange', this.value)
      if (this.value !== '') this.initList()
    },
    // 搜索
    getSearch() {
      if (this.value === '') {
        Toast('请输入搜索内容')
        return false
      } else {
        // 没有搜索记录，把搜索值push进数组首位，存入本地
        if (!this.historyList.includes(this.value)) {
          this.historyList.unshift(this.value)
          localStorage.setItem('historyList', JSON.stringify(this.historyList))
        } else {
          // 有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
          const i = this.historyList.indexOf(this.value)
          this.historyList.splice(i, 1)
          this.historyList.unshift(this.value)
          localStorage.setItem('historyList', JSON.stringify(this.historyList))
        }
        // 跳转到搜索结果页
        this.$router.push({
          path: '/list',
          query: {
            search_val: this.value
          }
        })
      }
    },
    async initList() {
      // 请求数据
      const obj = {
        params: { query: this.value }
      }
      this.success = true
      this.mateList = await getDataWithParams('/qsearch', obj)
      this.$emit('mateChange', this.mateList)
      // 判断请求回来的数据是否为空
      // 如果不为空,flag置1，并把该数据发给父组件
      this.flag = this.mateList.length > 0 ? 1 : 0
      this.$emit('flagChange', this.flag)
    }
  },
  mounted() {
    // 如果本地存储的数据historyList有值，直接赋值给data中的historyList
    if (JSON.parse(localStorage.getItem('historyList'))) {
      this.historyList = JSON.parse(localStorage.getItem('historyList'))
    }
  },

  watch: {
    historyList(newVal) {
      this.$emit('historyChange', newVal)
    }
  }
}
</script>

<style lang="less" scoped>
.van-search {
  width: 100%;
  top: 46px;
  position: fixed;
  z-index: 1;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}
</style>
