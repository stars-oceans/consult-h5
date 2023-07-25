import { http } from '@/utils/http'
import type { UserInfo, PatientList, AddUser, Edituser } from '@/types/user.d.ts'
/**
 * 获取个人信息
 */
export const getUserInfoAPI = () => {
  return http<UserInfo>({
    url: '/patient/myUser'
  })
}

/**
 * 查询患者列表变信息
 * @returns {*}
 */
export const getPatientListAPI = () => {
  return http<PatientList>({
    url: '/patient/mylist'
  })
}

/**
 *新增患者档案的接口
 * @param
 * @returns
 */
export const addUserInfoAPI = (data: AddUser) => {
  console.log(data)
  return http({
    method: 'post',
    url: 'patient/add',
    data
  })
}

/**
 * 修改患者信息的接口
 * @param data
 * @returns
 */
export const editUserAPI = (data: Edituser) => {
  return http<Edituser>({
    method: 'put',
    url: 'patient/update',
    data
  })
}

/**
 *查询用户信息接口
 * @param id
 * @returns
 */
export const getUserAPI = (id: string) => {
  console.log(id)

  return http({
    url: `/patient/info/${id}`
  })
}

/**
 * 删除患者的接口
 * @param id
 * @returns
 */
export const delUserAPI = (id: string) => {
  return http({
    method: 'delete',
    url: `/patient/del/${id}`
  })
}
