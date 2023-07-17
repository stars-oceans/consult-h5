import { http } from '@/utils/http'
import type { User } from '@/types/user.d.ts'

// 账号密码登录的接口
export const loginByPasswordAPI = (mobile: string, password: string) => {
  return http<User>({
    method: 'post',
    url: '/login/password',
    data: {
      mobile: mobile,
      password: password
    }
  })
}

// 验证码登录的接口

export const getCodeAPI = (mobile: string) => {
  console.log(mobile)
  return http<any>({
    method: 'get',
    url: '/code',
    params: {
      mobile: mobile,
      type: 'register'
    }
  })
}

// 手机号验证码登录
export const loginCodeAPI = (mobile: string, code: string) => {
  console.log(mobile, code)
  return http({
    method: 'post',
    url: '/login',
    data: {
      mobile,
      code
    }
  })
}
