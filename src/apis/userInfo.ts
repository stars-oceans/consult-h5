import { http } from '@/utils/http'
import type { UserInfo } from '@/types/user.d.ts'
/**
 * 获取个人信息
 */
export const getUserInfoAPI = () => {
  return http<UserInfo>({
    url: '/patient/myUser'
  })
}
