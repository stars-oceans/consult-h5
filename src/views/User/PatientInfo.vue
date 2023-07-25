<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import {
  getPatientListAPI,
  addUserInfoAPI,
  editUserAPI,
  getUserAPI,
  delUserAPI
} from '@/apis/userInfo'
import type { PatientList } from '@/types/user.d.ts'
import CpNavBar from '@/components/cp-nav-bar.vue'
import CpRadioBtn from '@/components/CpRadioBtn.vue'
import { showToast } from 'vant'
import { showConfirmDialog } from 'vant'

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
// 导入 pinia
import { useConsultStore } from '@/stores'
const useConsult = useConsultStore()

// 是否为 编辑患者信息

let isEdit = ref(false)
// 患者的的 id
let patientId = ref('')
// 患者列表数据
const patientList = ref([] as PatientList)
// 获取患者列表数据的方法
const getPatientList = async () => {
  const { data: res } = await getPatientListAPI()
  // 赋值
  patientList.value = res
  // console.log(patientList.value)
  // 默认选择我们的默认患者
  patientList.value.forEach((item) => {
    if (item.defaultFlag == 1) {
      changeItemId.value = item.id
    }
  })
  // 如果有默认值就 解锁下一步的按钮
  if (changeItemId.value) {
    isDisabled.value = false
  }
}
// 生命周期钩子
onMounted(() => {
  getPatientList()
})

// 弹出层
const showBottom = ref(false)
// 用户姓名
let name = ref('')
// 用户身份身份证号
let idCard = ref('')
// 选则性别默认为男
const changeXinBie = ref(0)

// 是否为默认患者
const isChecked = ref(true)
// 点击新增的按钮
const addUserEvent = () => {
  // 是否为新编按钮 这里否
  isEdit.value = false
  // 将弹窗打开
  showBottom.value = true
}

const addUserInfo = async () => {
  // data 数据
  const data = {
    defaultFlag: isChecked.value == true ? 1 : 0,
    gender: changeXinBie.value,
    idCard: idCard.value,
    name: name.value
  }
  const { data: res } = await addUserInfoAPI(data)
  console.log(res)
  if (res) {
    showToast('添加成功!')
    showBottom.value = false
    // 重新刷新列表
    getPatientList()
  }
}
const editUser = async () => {
  // data 数据
  const data = {
    id: patientId.value,
    defaultFlag: isChecked.value == true ? 1 : 0,
    gender: changeXinBie.value,
    idCard: idCard.value,
    name: name.value
  }
  const { data: res } = await editUserAPI(data)
  console.log(res)
  if (res) {
    showToast('修改成功!')
    showBottom.value = false
    // 重新刷新列表
    getPatientList()
  }
}

// 查询用户信息的接口
const getUser = async (id: string) => {
  patientId.value = id
  const { data: res } = await getUserAPI(id)
  console.log(res)
  if (res) {
    name.value = res.name
    idCard.value = res.idCard
    isChecked.value = res.defaultFlag == 1 ? true : false
    changeXinBie.value = res.gender
    showToast('查询成功!')
  } else {
    console.log('用户异常!')
  }
}
// 点击新编按钮的事件回调
const EditEvent = (id: string) => {
  console.log(id)
  // 调用接口
  getUser(id)
  isEdit.value = true
  // 打开弹窗
  showBottom.value = true
}

// 保存 按钮的事件
const save = () => {
  if (isEdit.value) {
    console.log('新编')
    editUser()
  } else {
    addUserInfo()
  }
  name.value = ''
  idCard.value = ''
}

// 删除患者的方法
const delUser = async () => {
  const { data: res } = await delUserAPI(patientId.value)
  if (res) {
    showToast('删除成功!')
  } else {
    showToast('删除失败!')
  }
}
// 删除用户的回调
const delUserEvent = () => {
  showConfirmDialog({
    title: '标题',
    message: '是否删除!'
  })
    .then(async () => {
      // 确认按钮
      // 调用接口
      await delUser()
      // 关闭弹出层
      showBottom.value = false
      // 重新刷新列表
      await getPatientList()
    })
    .catch(() => {
      // 取消按钮
      showToast('取消了删除!')
    })
}

// 判断是否为选择患者
// params 是看动态路由信息的参数
// query 可以查看 ? 后面的值
const isSel = computed(() => {
  return route.query.isChange == '1'
})

// 选择的用户 id
const changeItemId = ref('')
const isDisabled = ref(true)

const changeEvent = (item: any) => {
  // 解锁下一步按钮
  isDisabled.value = false
  // 给我们的 id 赋值
  changeItemId.value = item.id
}

const submitEvent = () => {
  router.push('/consult/pay')
  // 存储pinia
  useConsult.setPatient(changeItemId.value)
}
</script>

<template>
  <div class="patient-page">
    <cp-nav-bar :title="isSel == true ? '选择患者' : '家庭档案'" />
    <!-- 头部选择提示 -->
    <div class="patient-change" v-if="isSel">
      <h3>请选择患者信息</h3>
      <p>以便医生给出更准确的治疗，信息仅医生可见</p>
    </div>
    <div class="patient-list">
      <div
        class="patient-item"
        v-for="item in patientList"
        :key="item.id"
        @click="changeEvent(item)"
        :class="{ selected: item.id == changeItemId }"
      >
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">{{ item.idCard.replace(/^(.{6})(?:\d+)(.{4})$/, '\$1******\$2') }}</span>
          <span>{{ item.genderValue }}</span>
          <span>{{ item.age }}岁</span>
        </div>
        <div class="icon" @click="EditEvent(item.id)"><cp-icon name="user-edit" /></div>
        <div class="tag" v-show="item.defaultFlag">默认</div>
      </div>

      <div class="patient-add" v-if="patientList.length < 6" @click="addUserEvent">
        <cp-icon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
    </div>
    <!-- 患者选择下一步 -->
    <div class="patient-next" v-if="isSel">
      <van-button type="primary" round block @click="submitEvent" :disabled="isDisabled"
        >下一步</van-button
      >
    </div>
  </div>
  <!-- 弹出层 -->
  <!-- 底部弹出 -->
  <van-popup v-model:show="showBottom" position="bottom" :style="{ height: '100%' }">
    <cp-nav-bar
      :title="isEdit == false ? '新增档案' : '编辑档案'"
      right-text="保存"
      @click-right="save"
    ></cp-nav-bar>
    <!-- 表单 -->
    <van-form autocomplete="off" style="margin-top: 60px">
      <van-field label="真实姓名" v-model="name" placeholder="请输入真实姓名" />
      <van-field label="身份证号" v-model="idCard" placeholder="请输入身份证号" />
      <van-field label="性别">
        <!-- 单选按钮组件 -->
        <template #input>
          <CpRadioBtn v-model="changeXinBie"></CpRadioBtn>
        </template>
      </van-field>

      <van-field label="默认就诊人">
        <template #input>
          <van-checkbox @click="isChecked = !isChecked" :checked="isChecked" />
        </template>
      </van-field>
      <van-button v-if="isEdit" class="btn" type="danger" round block @click="delUserEvent"
        >删除用户</van-button
      >
    </van-form>
  </van-popup>
</template>

<style lang="scss" scoped>
.btn {
  position: absolute;
  bottom: 50px;
}
.patient-page {
  padding: 46px 0 80px;
}
.patient-change {
  padding: 15px;
  > h3 {
    font-weight: normal;
    margin-bottom: 5px;
  }
  > p {
    color: var(--cp-text3);
  }
}
.patient-next {
  padding: 15px;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 35px;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
}
.patient-list {
  padding: 15px;
}
.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--cp-bg);
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--cp-bg);
  transition: all 0.3s;
  overflow: hidden;
  .info {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    span {
      color: var(--cp-tip);
      margin-right: 20px;
      line-height: 30px;
      &.name {
        font-size: 16px;
        color: var(--cp-text1);
        width: 80px;
        margin-right: 0;
      }
      &.id {
        color: var(--cp-text2);
        width: 180px;
      }
    }
  }
  .icon {
    color: var(--cp-tag);
    width: 20px;
    text-align: center;
  }
  .tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 30px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    background-color: var(--cp-primary);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.selected {
    border-color: var(--cp-primary);
    background-color: var(--cp-plain);
    .icon {
      color: var(--cp-primary);
    }
  }
}
.patient-add {
  background-color: var(--cp-bg);
  color: var(--cp-primary);
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;
  .cp-icon {
    font-size: 24px;
  }
}
.patient-tip {
  color: var(--cp-tag);
  padding: 12px 0;
}
</style>
