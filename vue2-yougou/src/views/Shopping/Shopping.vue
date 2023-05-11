<template>
  <div class="shopping-container">

    <!-- 标题栏 -->
    <NormalHeader></NormalHeader>

    <!-- 收货地址编辑 -->
    <van-contact-card v-if="flag === 0" type="add" @click="onAdd" class="address" />
    <van-contact-card v-else type="edit" :name="currentContact.name" :tel="currentContact.tel" @click="onEdit" class="edit" />

    <!-- 弹框：弹出输入信息 -->
    <van-dialog v-model="show" title="修改联系人信息" @confirm="onConfirm">
      <van-contact-edit is-edit :contact-info="editingContact" @save="onSave" @delete="onDelete" />
    </van-dialog>
    <!-- 加入购物车的商品信息栏 -->
    <div class="goodsInfo">
      <Goods v-for="item in goodsList" :key="item.goods_id" :title="item.goods_name" :price="item.goods_price" :id="item.goods_id" :image="item.goods_small_logo" :allState="checked" @stateChange="getNewState" @countChange="getNewCount"></Goods>
    </div>

    <!-- SUbmitBar提交订单栏 -->

    <van-submit-bar :price="amt*100" :button-text="'提交订单('+ total +')'" @submit="onSubmit">
      <van-checkbox v-model="checked" checked-color="#c00000" @click="onClick">全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送,<span @click="onClickEditAddress">修改地址</span>
      </template>
    </van-submit-bar>

    <!-- 底部区域 -->
    <Footer></Footer>
  </div>
</template>

<script>
import NormalHeader from '@/components/Header/NormalHeader.vue'
import Footer from '@/components/Footer/NormalFooter.vue'
import Goods from '@/components/Goods/Goods.vue'
import { Toast } from 'vant'

import bus from '@/eventBus'
export default {
  data() {
    return {
      currentContact: {
        name: '张三',
        tel: '13000000000'
      },
      editingContact: {},
      // 设置地址编辑栏的状态
      flag: 0,
      // 购物车上标商品数量个数
      num: 0,
      // 存放加入购物车的商品
      goodsList: [],
      // 全选框的勾选状态
      checked: false,
      // 显示弹框的状态
      show: false
    }
  },
  components: {
    NormalHeader,
    Footer,
    Goods
  },
  methods: {
    // 点击添加之后更换地址编辑栏的状态
    onAdd() {
      this.flag = 1
      localStorage.setItem('state', this.flag)
    },
    onEdit() {
      Toast('编辑')
      this.show = true
    },
    onSubmit() {
      Toast('提交订单')
    },
    onClickEditAddress() {
      Toast('修改地址')
    },
    // 获取对应id商品最新勾选框的状态
    getNewState(e) {
      this.goodsList.some(item => {
        if (item.goods_id === e.id) {
          item.goods_state = e.state
          return true
        }
        return false
      })
      // 这个事件被触发说明有商品的勾选状态发生了变化，就要去重新渲染全选按钮的勾选状态
      this.checked = this.fullState
    },
    // 获取对应id商品的件数
    getNewCount(e) {
      this.goodsList.some(item => {
        if (item.goods_id === e.id) {
          item.goods_count = e.count
          return true
        }
        return false
      })
    },
    // 点击之后传递全选复选框的勾选状态
    onClick() {
      bus.$emit('share', this.checked)
    },
    // 点击保存之后把相应的值存入浏览器中
    onSave(contactInfo) {
      Toast('保存信息成功')
      const obj = { name: contactInfo.name, tel: contactInfo.tel }
      localStorage.setItem('contactInfo', JSON.stringify(obj))
    },
    // 点击删除之后，清除浏览器中存储的值
    onDelete(contactInfo) {
      Toast('清除成功')
      const obj = { name: '', tel: '' }
      localStorage.setItem('contactInfo', JSON.stringify(obj))
    },
    // 点击确认之后，把对应的值同步修改在信息栏中
    onConfirm() {
      Toast('确认修改')
      const info = JSON.parse(localStorage.getItem('contactInfo'))
      this.currentContact.name = info.name
      this.currentContact.tel = info.tel
    }
  },
  mounted() {
    // 从浏览器中获取购物车上标商品数量个数
    this.num = localStorage.getItem('badge')
    const list = JSON.parse(this.$route.query.goodsInfo)
    // 给返回回来的商品信息添加复选框的勾选状态信息和商品数量
    const newList = []
    for (let i = 0; i < list.length; i++) {
      const obj = { goods_state: true, goods_count: 1 }
      const newobj = Object.assign(list[i], obj)
      newList.push(newobj)
    }
    localStorage.setItem('goodsList', JSON.stringify(newList))
    this.goodsList = newList
    // 从浏览器中获取flag信息状态
    this.flag = localStorage.getItem('state')
    // 渲染全选复选框的勾选状态
    this.checked = this.fullState
    // 渲染用户信息栏
    if (JSON.parse(localStorage.getItem('contactInfo'))) {
      const obj = JSON.parse(localStorage.getItem('contactInfo'))
      this.currentContact.name = obj.name
      this.currentContact.tel = obj.tel
    }
  },
  computed: {
    // 根据每个商品复选框的勾选状态来确定全选复选框的勾选状态
    fullState() {
      return this.goodsList.every(item => item.goods_state === true)
    },
    // 计算商品的总价
    amt() {
      return this.goodsList.filter(item => item.goods_state === true).reduce((amt, item) => (amt += item.goods_price * item.goods_count), 0)
    },
    // 计算商品的件数
    total() {
      return this.goodsList.filter(item => item.goods_state === true).reduce((t, item) => (t += item.goods_count), 0)
    }
  },
  created() {
    console.log(this.goodsList)
    window.addEventListener('setItem', () => {
      this.goodsList = JSON.parse(localStorage.getItem('goodsList'))
    })
    console.log(this.goodsList)
  }
}
</script>

<style lang="less" scoped>
// 添加联系人
.address,
.edit {
  margin-top: 46px;
}
// 提交订单
.submit {
  margin-bottom: 50px;
}
.van-submit-bar {
  bottom: 50px;
}
// 商品信息栏
.goodsInfo {
  margin-bottom: 134px;
  margin-top: 20px;
}
// 弹窗提示信息
/deep/ .van-contact-edit__buttons {
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
