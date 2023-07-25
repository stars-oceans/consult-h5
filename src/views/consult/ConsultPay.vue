<script setup lang="ts">
import { showToast } from 'vant'
import { showConfirmDialog } from 'vant'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useConsultStore } from '@/stores'
import {
  getPayListAPI,
  getPatientDetailAPI,
  getConsultOrderPayUrl,
  createConsultOrder
} from '@/apis/consultApi'
const router = useRouter()
// pinia存的数据
const useConsult = useConsultStore()
// 患者支付信息的 id
const patientId = ref<string>('')
// 支付订单信息
const payList = ref<any>({})
// 患者信息
const patientDetailList = ref<any>({})

// 获取支付订单的信息对象的方法
const getPayList = async (params: any) => {
  try {
    const { data: res } = await getPayListAPI(params)
    payList.value = res
  } catch (error) {
    // 报错处理
    router.push('/home')
  }
}
// 患者信息获取方法
const getPatientDetail = async (id: any) => {
  try {
    const { data: res } = await getPatientDetailAPI(id)
    patientDetailList.value = res
    console.log(res)
    console.log('------++')
  } catch (error) {
    console.log('------++---')

    router.push('/home')
  }
}
const createConsultMsd = async () => {
  const { data: res } = await createConsultOrder(useConsult.consult)
  console.log(res.id)
  // 把 id 保存
  patientId.value = res.id
}
// 生命周期钩子
onMounted(() => {
  // 调用我们的获取订单的方法
  getPayList(useConsult.consult)
  // 调用我们的获取患者信息的方法
  getPatientDetail(useConsult.consult.patientId)
  createConsultMsd()
})

// 是否同意协议的选择框
const checked = ref(true)
// 支付弹窗
const show = ref(false)
const paymentMethod = ref<0 | 1>()
const submit = async () => {
  if (!checked.value) {
    await showToast('请勾选我已同意支付协议')
    return
  }
  // 打开
  show.value = true
  // 清除 pinia 数据
  useConsult.clear()
}
//支付的接口
const getConsultOrder = async (data: any) => {
  const { data: res } = await getConsultOrderPayUrl(data)
  console.log(res)
  return res
}
const isDisabledZhFun = ref(true)
// 微信支付的回调
const wxEvent = () => {
  isDisabledZhFun.value = true
  paymentMethod.value = 0
  showToast('微信支付开发中请选择支付宝...')
}
const dataPayList = ref({})
// 支付宝的回调
const zfbEvent = () => {
  isDisabledZhFun.value = false
  paymentMethod.value = 1

  console.log(patientId.value)
}

// 支付窗口的打开后,订单创建成功
onBeforeRouteLeave(() => {
  if (patientId.value) return false
})

// 控制是否关闭支付窗口
const onClose = () => {
  return showConfirmDialog({
    title: '关闭支付',
    message: '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？',
    cancelButtonText: '仍要关闭',
    confirmButtonText: '继续支付',
    confirmButtonColor: 'var(--cp-primary)'
  })
    .then(() => {
      return false
    })
    .catch(() => {
      patientId.value = '' // 清空后才能跳转页面
      router.push('/home')
      return true
    })
}

const zfEvent = async () => {
  dataPayList.value = {
    paymentMethod: paymentMethod.value,
    orderId: patientId.value,
    payCallback: 'http://localhost/room'
  }
  // 把订单发给后台
  const res = await getConsultOrder(dataPayList.value)
  console.log(res.payUrl.payUrl)

  window.location.href = res.payUrl
}
</script>

<template>
  <div class="consult-pay-page">
    <cp-nav-bar title="支付" />
    <!-- 1. 支付信息 -->
    <div class="pay-info">
      <p class="tit">{{ payList.actualPayment }}</p>
      <img class="img" src="@/icons/consult/doctor.svg" />
      <p class="desc">
        <span>极速问诊</span>
        <span>自动分配医生</span>
      </p>
    </div>
    <van-cell-group>
      <van-cell title="优惠券" :value="payList.couponDeduction" />
      <van-cell title="积分抵扣" :value="payList.pointDeduction" />
      <van-cell title="实付款" :value="payList.actualPayment" class="pay-price" />
    </van-cell-group>
    <div class="pay-space"></div>
    <!-- 2. 患者信息  -->
    <van-cell-group>
      <van-cell
        title="患者信息"
        :value="`${patientDetailList.name} | ${patientDetailList.age} | ${patientDetailList.genderValue} `"
      ></van-cell>
      <van-cell title="病情描述" :label="useConsult.consult.illnessDesc"></van-cell>
    </van-cell-group>
    <div class="pay-schema">
      <van-checkbox v-model="checked">我已同意 <span class="text">支付协议</span></van-checkbox>
    </div>
    <!-- 3. 打开支付弹层并创建问诊订单 -->
    <van-submit-bar
      button-type="primary"
      :price="payList.actualPayment * 100"
      button-text="立即支付"
      text-align="left"
      @click="submit"
    />

    <!-- 支付弹层 -->
    <van-action-sheet
      v-model:show="show"
      title="选择支付方式"
      :before-close="onClose"
      :close-on-popstate="false"
    >
      <div class="pay-type">
        <p class="amount">￥{{ payList.actualPayment }}</p>
        <van-cell-group>
          <van-cell title="微信支付" @click="wxEvent">
            <template #icon><cp-icon name="consult-wechat" /></template>
            <template #extra><van-checkbox :checked="paymentMethod === 0" /></template>
          </van-cell>
          <van-cell title="支付宝支付" @click="zfbEvent">
            <template #icon><cp-icon name="consult-alipay" /></template>
            <template #extra><van-checkbox :checked="paymentMethod === 1" /></template>
          </van-cell>
        </van-cell-group>
        <div class="btn">
          <van-button type="primary" round block :disabled="isDisabledZhFun" @click="zfEvent"
            >立即支付</van-button
          >
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<style lang="scss" scoped>
.consult-pay-page {
  padding: 46px 0 50px 0;
  .pay-info {
    display: flex;
    padding: 15px;
    flex-wrap: wrap;
    align-items: center;
    .tit {
      width: 100%;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .img {
      margin-right: 10px;
      width: 38px;
      height: 38px;
      border-radius: 4px;
      overflow: hidden;
    }
    .desc {
      flex: 1;
      > span {
        display: block;
        color: var(--cp-tag);
        &:first-child {
          font-size: 16px;
          color: var(--cp-text2);
        }
      }
    }
  }
  .pay-price {
    ::v-deep() {
      .vam-cell__title {
        font-size: 16px;
      }
      .van-cell__value {
        font-size: 16px;
        color: var(--cp-price);
      }
    }
  }
  .pay-space {
    height: 12px;
    background-color: var(--cp-bg);
  }
  .pay-schema {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      color: var(--cp-primary);
    }
  }
  ::v-deep() {
    .van-submit-bar__button {
      font-weight: normal;
      width: 160px;
    }
  }
}
// 支付弹层样式
.pay-type {
  .amount {
    padding: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .btn {
    padding: 15px;
  }
  .van-cell {
    align-items: center;
    .cp-icon {
      margin-right: 10px;
      font-size: 18px;
    }
    .van-checkbox :deep(.van-checkbox__icon) {
      font-size: 16px;
    }
  }
}
</style>
