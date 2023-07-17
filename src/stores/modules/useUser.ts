import { defineStore } from 'pinia'
import { ref } from 'vue'
// 必须要加个 type 的标识
import type { User } from '@/types/user'
/**
 * 用户的 store 信息
 */
export const useUserStore = defineStore(
  'useUser',
  () => {
    // use的store 里面的信息
    const userInfo = ref({} as User)

    // 获取用户信息的方法
    const getUserInfo = (userData: User) => {
      userInfo.value = userData
    }
    // 存储 userInfo 信息
    const setUserInfo = (userData: User) => {
      userInfo.value = userData
    }

    // 删除 userInfo 信息
    const delUserInfo = () => {
      userInfo.value = {} as User
    }
    // 返回变量和方法
    return { userInfo, getUserInfo, setUserInfo, delUserInfo }
  },
  // pinia 持久化
  {
    persist: {
      key: 'useUser-userInfo',
      paths: ['userInfo'] // 数组的存储需要存储的值
    }
  }
)
