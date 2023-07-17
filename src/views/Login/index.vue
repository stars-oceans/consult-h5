<script setup lang="ts">
import cpIcon from '@/components/cp-icon.vue'
import { ref } from 'vue'
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
// 导入路由
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

// 导入 pinia
import { useUserStore } from '@/stores'
const UserStore = useUserStore()
// 导入类型声明
// 导入 vant 提示
import { showFailToast } from 'vant'
// 导入 API 接口
import { loginByPasswordAPI, getCodeAPI, loginCodeAPI } from '@/apis/login'
// 是否为密码登录
let isPwd = ref(true)
// 切换密码登录或者短信登录的事件
const changeIsPwd = () => {
  isPwd.value = !isPwd.value
  password.value = ''
  isShowPw.value = true
}

// 发送验证码的事件
const sending = async () => {
  const { data: res } = await getCodeAPI('13230000001')
  console.log(res)
  if (res) {
    console.log(res.code)
    password.value = res.code
  }
}
// 右侧的文字点击事件
const ClickRight = (data: string) => {
  console.log(data)
}
let account = ref<string>('13230000001')
// 密码输入框1内容
let password = ref<string>('abc12345')
// 是否显示密码的变量
const isShowPw = ref(false)
// 改变eye 图标和是否显示密码的事件
const changeEye = async () => {
  isShowPw.value = !isShowPw.value
}
// 表单
let agree = ref(false)

// 存储 user 数据的变量
let userData = ref()
// 密码登录的接口
const loginByPassword = async () => {
  // 发起请求
  if (isPwd.value) {
    const { data: res } = await loginByPasswordAPI(account.value, password.value)
    if (res) {
      userData.value = res
    }
  } else {
    console.log('验证码')
    console.log(account.value, password.value)
    const { data: resYan } = await loginCodeAPI(account.value, password.value)
    console.log(resYan)
    if (resYan) {
      // userData.value = resYan
      //存pinia
      // UserStore.setUserInfo(userData.value)
    }
  }
  // 存 pinia
  UserStore.setUserInfo(userData.value)
}
// 路由跳转
const onSubmit = async () => {
  if (!agree.value) {
    return showFailToast('请勾选协议!')
  }
  // 调用发起请求的 api
  await loginByPassword()
  // 判断是否返回了值
  if (userData.value) {
    console.log(route)
    router.push((route.query.returnUrl as string) || '/user')
  }
}
</script>

<template>
  <div class="login">
    <cp-nav-bar title="登录" rightText="6666" @click-right="ClickRight"></cp-nav-bar>
  </div>
  <div class="login">
    <div class="login-head">
      <h3>{{ isPwd == true ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;">
        <span @click="changeIsPwd">{{ isPwd == false ? '密码登录' : '短信验证码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- == form 表单 == -->
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field
        placeholder="请输入手机号"
        name="账号"
        type="tel"
        v-model="account"
        :rules="mobileRules"
      ></van-field>
      <!-- 布局 -->
      <van-field
        :placeholder="isPwd == true ? '请输入密码' : '请输入验证码'"
        name="密码"
        v-model="password"
        :rules="isPwd == true ? passwordRules : codeRules"
        :type="isShowPw == true ? 'text' : 'password'"
      >
        <!-- 插入图标 -->
        <template #button>
          <van-button v-show="!isPwd" size="small" type="primary" @click="sending"
            >发送验证码</van-button
          >
          <cpIcon
            v-show="isPwd"
            class="eye"
            @click="changeEye"
            :name="isShowPw == true ? 'login-eye-on' : 'login-eye-off'"
          ></cpIcon> </template
      ></van-field>

      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit">登 录</van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
  </div>
</template>

<style lang="scss" scoped>
.login {
  padding-top: 46px;
  &-head {
    padding: 30px 30px 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
    }
  }

  .van-form {
    padding: 0 14px;
    .cp-cell {
      height: 52px;
      padding: 14px 16px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .van-checkbox {
        a {
          color: var(--cp-primary);
          padding: 0 5px;
        }
      }
    }
  }
}

.eye {
  width: 20px;
  height: 20px;
  margin-top: 10px;
}
</style>
