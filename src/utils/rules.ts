// 表单校验
const mobileRules = [
  { required: true, message: '请输入手机号' },
  { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
]

const passwordRules = [
  { required: true, message: '请输入密码' },
  { pattern: /^\w{8,24}$/, message: '密码需8-24个字符' }
]

const codeRules = [
  { required: true, message: '请输入验证码' },
  { pattern: /^\w{1,8}$/, message: '密码需1-8个字符' }
]

export { mobileRules, passwordRules, codeRules }
