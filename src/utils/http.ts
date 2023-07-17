import axios from 'axios'
import { useUserStore } from '@/stores/modules/useUser'
import router from '@/router'
// 导入 vant 提示
import { showFailToast } from 'vant'

// 创建 axios 实例
const http = axios.create({
  // 请求基地址
  baseURL: 'https://consult-api.itheima.net',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

// 请求拦截器 携带我们的 token
http.interceptors.request.use(
  (config) => {
    // 导入这个
    const useUser = useUserStore()
    if (useUser.userInfo.token) {
      config.headers['Authorization'] = `Bearer ${useUser.userInfo.token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 响应拦截器，剥离无效数据，401拦截
http.interceptors.response.use(
  (res) => {
    // 后台约定，响应成功，但是code不是10000，是业务逻辑失败
    if (res.data?.code !== 10000) {
      // 给出提示!
      showFailToast(res.data.message)
      return Promise.reject(res.data)
    }
    // 业务逻辑成功，返回响应数据，作为axios成功的结果
    return res.data
  },
  (err) => {
    if (err.response.status === 401) {
      // 删除用户信息
      const useUser = useUserStore()
      useUser.delUserInfo()
      // 跳转登录，带上接口失效所在页面的地址，登录完成后回跳使用,这里使用的是 router里面的属性
      router.push(`/login?returnUrl=${router.currentRoute.value.fullPath}`)
    }
    return Promise.reject(err)
  }
)

export { http }
