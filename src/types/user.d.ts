/**
 *用户的相关 ts 类型
 */
// 登录信息接口返回信息
export type User = {
  token: string
  id: string
  account: string
  mobile: string
  avatar: string
}

// 短信验证码类型
export type CodeType = 'login' | 'register'

// == add 个人信息 ==
type OmitUser = Omit<User, 'token'>
export type UserInfo = OmitUser & {
  token: string
  id: string
  account: string
  mobile: string
  avatar: string
  likeNumber: number
  collectionNumber: number
  score: number
  couponNumber: number
  orderInfo: {
    paidNumber: number
    receivedNumber: number
    shippedNumber: number
    finishedNumber: number
  }
}

export type UserInfoData = UserInfo & {
  id: string
  account: string
}
//
export type Patient = {
  /**
   * 年龄
   */
  age?: number
  /**
   * 是否设置为默认患者 0不是默认 1是默认患者
   */
  defaultFlag: number
  /**
   * 性别 1男 0女
   */
  gender?: number
  /**
   * 性别值
   */
  genderValue: string
  id: string
  /**
   * 患者身份证号
   */
  idCard: string
  /**
   * 患者姓名
   */
  name: string
}

// 查询患者列表信息
export type PatientList = Patient[]

// 增加患者的API 的 类型标识
export type AddUser = {
  /**
   * 是否设置为默认患者
   */
  defaultFlag: number
  /**
   * 性别，1：男，0：女
   */
  gender?: number
  /**
   * 患者身份证号
   */
  idCard: string
  /**
   * 患者姓名
   */
  name: string
}

export type Edituser = AddUser & {
  id: string
}
