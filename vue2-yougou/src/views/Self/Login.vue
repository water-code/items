<template>
  <div class="self">
    <!-- 标题栏 -->
    <NormalHeader></NormalHeader>

    <!-- login登录界面 -->
    <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" class="icon" size="150" />
    <van-form @submit="onSubmit" class="form">
      <van-field v-model="username" name="用户名" label="用户名" placeholder="请填写用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="password" type="password" name="密码" label="密码" placeholder="请填写密码" :rules="[{ required: true, message: '请填写密码' }]" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" color="#c00000" @click="login">一键登录</van-button>
      </div>
    </van-form>
    <!-- 底部页面导航栏 -->
    <Footer></Footer>
  </div>
</template>

<script>
import NormalHeader from '@/components/Header/NormalHeader.vue'
import Footer from '@/components/Footer/NormalFooter.vue'
import { Toast } from 'vant'
export default {
  data() {
    return {
      buttonState: false,
      username: '',
      password: ''
    }
  },
  components: {
    NormalHeader,
    Footer
  },
  methods: {
    login() {
      this.buttonState = true
      if (this.username === 'admin' && this.password === '000000') {
        Toast('登录成功')
        // 登陆成功
        // 1.存储token
        localStorage.setItem('token', 'Bearer xxxx')
        // 跳转到后台主页
        this.$router.push('/self')
      } else {
        // 登录失败
        localStorage.removeItem('token')
      }
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
// 表单样式
.icon {
  // font-size: 50px;
  margin: 50px 0 0 120px;
}
</style>
