<template>
  <div class="self-container">
    <!-- 标题栏 -->
    <NormalHeader></NormalHeader>

    <!-- 头像部分 -->
    <div class="top">
      <div class="selfImge">
        <van-image class="img" round width="6rem" height="6rem" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F13%2F20210613110106_f0776.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1685006072&t=43b8d40634a9317bdbb2282eee503226" />
        <span>Lin</span>
      </div>
    </div>
    <!-- 商品订单等信息 -->
    <div class="bottom">
      <div class="first-column">
        <van-grid :border="false" :column-num="4">
          <van-grid-item>
            <li>8</li>
            <li>收藏店铺</li>
          </van-grid-item>
          <van-grid-item>
            <li>14</li>
            <li>收藏的商品</li>
          </van-grid-item>
          <van-grid-item>
            <li>18</li>
            <li>关注的商品</li>
          </van-grid-item>
          <van-grid-item>
            <li>84</li>
            <li>足迹</li>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="second-column">
        <van-grid>
          <van-grid-item icon="todo-list-o" text="待付款" color="#c00000" />
          <van-grid-item icon="logistics" text="待收货" />
          <van-grid-item icon="after-sale" text="退款/退货" />
          <van-grid-item icon="description" text="全部订单" />
        </van-grid>
      </div>
      <div class="third-column">
        <van-cell-group>
          <van-cell title="收货地址" value=">" to="/adress" />
          <van-cell title="联系客服" value=">" />
          <van-cell title="退出登录" value=">" @click="onClick" />
        </van-cell-group>
      </div>
    </div>
    <!-- 底部页面导航栏 -->
    <Footer></Footer>
  </div>
</template>

<script>
import NormalHeader from '@/components/Header/NormalHeader.vue'
import Footer from '@/components/Footer/NormalFooter.vue'
import { Toast, Dialog } from 'vant'
export default {
  components: {
    NormalHeader,
    Footer
  },
  methods: {
    onClick() {
      Dialog.confirm({
        title: '退出登录',
        message: '是否退出登录'
      })
        .then(() => {
          // on confirm
          this.logout()
        })
        .catch(() => {
          // on cancel
          Toast('取消退出')
        })
    },
    logout() {
      // 1.清空token
      localStorage.removeItem('token')
      // 2.跳转到登陆页面
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.top {
  margin-top: 46px;
  background-color: #c00000;
  height: 240px;
}
.bottom {
  background-color: #f4f4f4;
  height: 330px;
}
// 头像
.selfImge {
  display: inline-block;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.selfImge span {
  display: block;
  text-align: center;
  color: #fff;
  font-weight: 700;
}
// 用户信息栏
li {
  width: 100%;
  font-size: 14px;
  list-style: none;
  text-align: center;
}
.first-column {
  position: relative;
  top: -10px;
  width: 95%;
  margin: 0 auto;
  border-radius: 5px;
  overflow: hidden;
}
/deep/ .van-grid-item__content {
  padding: 8px 0;
}
/deep/ .van-grid-item__icon {
  color: #c00000;
}
.second-column {
  width: 95%;
  margin: 0 auto;
  border-radius: 5px;
  overflow: hidden;
}
.third-column {
  width: 95%;
  margin: 0 auto;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 10px;
}
</style>
