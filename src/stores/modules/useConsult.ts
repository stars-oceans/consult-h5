// 全局变量
// 1.=问诊记录数据，创建订单使用==
// /修改全局变量的方法
// 2.修改问诊类型type方法：1找医生2极速问诊3开药问诊
// 3.修改极速问诊类型illnessType方法：0普通 1三甲
// 4.修改科室1d方法
// 5.修改病情描述相关信息方法：illnessDesc、illnessTime、consultFlag、pictures
// 6,修改患者patientId的方法
// 7,修改优惠卷couponId的方法
// 8.清空问诊记录方法

import type { ConsultType } from '@/enums'
import type { PartialConsult } from '@/types/consult'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConsultStore = defineStore(
  'useConsult',
  () => {
    // 1. 问诊记录数据
    const consult = ref<PartialConsult>({})
    // 2. 设置问诊类型
    const setType = (type: ConsultType) => (consult.value.type = type)
    // 3. 设置极速问诊级别
    const setIllnessType = (type: 0 | 1) => (consult.value.illnessType = type)
    // 4. 设置科室
    const setDep = (id: string) => (consult.value.depId = id)
    // 5. 设置病情描述
    const setIllness = (
      illness: Pick<PartialConsult, 'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'>
    ) => {
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.illnessTime = illness.illnessTime
      consult.value.consultFlag = illness.consultFlag
      consult.value.pictures = illness.pictures
    }
    // 6. 设置患者
    const setPatient = (id: string) => (consult.value.patientId = id)
    // 7. 设置优惠券
    const setCunpon = (id?: string) => (consult.value.couponId = id)
    // 8. 清空记录
    const clear = () => (consult.value = {})

    return { consult, setType, setIllnessType, setDep, setIllness, setPatient, clear, setCunpon }
  },
  {
    persist: true
  }
)
