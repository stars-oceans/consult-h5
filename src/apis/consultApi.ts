import { http } from '@/utils/http'

/**
 *常规科室算一级科室,和对应的二级科室
 * @returns
 */
export const getDepAPI = () => {
  return http({
    url: '/dep/all'
  })
}

// 上传病情描述图片
export const uploadImage = (file: File) => {
  const fd = new FormData()
  // 说明：formData对象的key属性值后台定义
  fd.append('file', file)
  console.log(fd.get('file'))
  return http({
    method: 'post',
    url: '/upload',
    data: fd
  })
}

/**
 *当前接口：
useCoupon,默认值1，即使用优惠券
传0，不使用优惠券
不传，默认为是，使用后台选择的优惠券，
其中，不传优惠券id,默认按照最大优惠券使用，
传了优惠券id,表示使用指定的优惠券
 * @param params
 * @returns
 */
export const getPayListAPI = (params: any) => {
  console.log(params.type)

  return http({
    url: '/patient/consult/order/pre',
    params: {
      type: params.type
    }
  })
}

/**
 * 查询患者信息
 * @param id
 * @returns
 */
export const getPatientDetailAPI = (id: string) => {
  return http.get(`/patient/info/${id}`)
}

// 获取支付地址  0 是微信  1 支付宝
export const getConsultOrderPayUrl = (data: {
  paymentMethod: 0 | 1
  orderId: string
  payCallback: string
}) => http.post('/patient/consult/pay', data)

// 生成订单
export const createConsultOrder = (data: any) => http.post('/patient/consult/order', data)
