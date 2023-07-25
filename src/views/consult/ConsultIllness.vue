<script setup lang="ts">
import type { FormDataType } from '@/types/consult.d.ts'
import { ref, computed, onMounted } from 'vue'
import cpradiobtns from '@/components/cp-radio-btns.vue'
// 导入pinia
import { useConsultStore } from '@/stores'
const useConsult = useConsultStore()
import { useRouter } from 'vue-router'
const router = useRouter()
// 导入 dialog
import { showConfirmDialog } from 'vant'
// 导入 API
import { uploadImage } from '@/apis/consultApi'
// 患病时间选项
const timeOptions = [
  { label: '一周内', value: 1 },
  { label: '一月内', value: 2 },
  { label: '半年内', value: 3 },
  { label: '大于半年', value: 4 }
]
// 是否就诊选项
const flagOptions = [
  { label: '就诊过', value: 0 },
  { label: '没就诊过', value: 1 }
]

// 表单数据
const formData = ref<FormDataType>({
  illnessDesc: '',
  illnessTime: undefined,
  consultFlag: undefined,
  pictures: []
})

// 判断是否禁用
const isDisabled = computed(() => {
  return (
    !formData.value.illnessDesc ||
    formData.value.illnessTime == undefined ||
    formData.value.consultFlag == undefined
  )
})
// 提交
const submitEvent = () => {
  console.log(formData.value)
  useConsult.setIllness(formData.value)
  // 跳转档案管理：选择患者，需要根据 isChange 实现选择功能
  router.push('/user/patient?isChange=1')
}

// 数据的回显
onMounted(() => {
  console.log(useConsult.consult)
  if (useConsult.consult.illnessDesc) {
    showConfirmDialog({
      title: '提示',
      message: '是否恢复之前填写的'
    })
      .then(() => {
        // on 确定
        formData.value.illnessDesc = useConsult.consult.illnessDesc
        formData.value.illnessTime = useConsult.consult.illnessTime
        formData.value.consultFlag = useConsult.consult.consultFlag
        // 回显图片
        // formData.value.pictures = useConsult.consult.pictures
      })
      .catch(() => {
        // on 取消
      })
  }
})

// 图片收集对象
const fileList = ref([])
const uploadImg = (item: any) => {
  item.status = 'uploading'
  item.message = '上传中...'
  uploadImage(item.file).then(
    (data) => {
      console.log(data)
    },
    (err) => {
      console.dir(err)
    }
  )
  // setTimeout(() => {
  //   // item.status = 'failed'
  //   item.status = 'done'
  //   item.message = '上传成功'
  // }, 1000)
}
</script>

<template>
  <div class="consult-illness-page">
    <cp-nav-bar title="图文问诊" />
    <!-- 1. 医生提示 -->
    <div class="illness-tip van-hairline--bottom">
      <img class="img" src="@/icons/consult/doctor.svg" />
      <div class="info">
        <p class="tit">在线医生</p>
        <p class="tip">请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助</p>
        <p class="safe"><cp-icon name="consult-safe" /><span>内容仅医生可见</span></p>
      </div>
    </div>
    <!-- 2. 病情描述-表单 -->
    <div class="illness-form">
      <!-- 病情描述-基本情况 -->
      <van-field
        type="textarea"
        rows="3"
        placeholder="请详细描述您的病情，病情描述不能为空"
        v-model="formData.illnessDesc"
      ></van-field>
      <div class="item">
        <p>本次患病多久了？</p>
        <cpradiobtns :options="timeOptions" v-model="formData.illnessTime" />
      </div>
      <div class="item">
        <p>此次病情是否去医院就诊过？</p>
        <cpradiobtns :options="flagOptions" v-model="formData.consultFlag" />
      </div>
      <!-- 病情描述-图片上传 -->
      <div class="illness-img">
        <van-uploader v-model="fileList" multiple :after-read="uploadImg"></van-uploader>
        <p class="tip">上传内容仅医生可见,最多9张图,最大5MB</p>
      </div>
    </div>
  </div>
  <van-button type="primary" :disabled="isDisabled" block @click="submitEvent">提交</van-button>
</template>

<style lang="scss" scoped>
.consult-illness-page {
  padding-top: 46px;
}
.illness-tip {
  display: flex;
  padding: 15px;
  .img {
    width: 52px;
    height: 52px;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 10px;
  }
  .info {
    flex: 1;
    padding-left: 12px;
    .tit {
      font-size: 16px;
      margin-bottom: 5px;
    }
    .tip {
      padding: 12px;
      background: var(--cp-bg);
      color: var(--cp-text3);
      font-size: 13px;
      margin-bottom: 10px;
    }
    .safe {
      font-size: 10px;
      color: var(--cp-text3);
      display: flex;
      align-items: center;
      .cp-icon {
        font-size: 12px;
        margin-right: 2px;
      }
    }
  }
}
.illness-form {
  padding: 15px;
  .van-field {
    padding: 0;
    &::after {
      border-bottom: none;
    }
  }
  .item {
    > p {
      color: var(--cp-text3);
      padding: 15px 0;
    }
  }
}
.illness-img {
  padding-top: 16px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  .tip {
    font-size: 12px;
    color: var(--cp-tip);
  }
  ::v-deep() {
    .van-uploader {
      &__preview {
        &-delete {
          left: -6px;
          top: -6px;
          border-radius: 50%;
          background-color: var(--cp-primary);
          width: 20px;
          height: 20px;
          &-icon {
            transform: scale(0.9) translate(-22%, 22%);
          }
        }
        &-image {
          border-radius: 8px;
          overflow: hidden;
        }
      }
      &__upload {
        border-radius: 8px;
      }
      &__upload-icon {
        color: var(--cp-text3);
      }
    }
  }
}
.van-button {
  font-size: 16px;
  margin-bottom: 30px;
  &.disabled {
    opacity: 1;
    background: #fafafa;
    color: #d9dbde;
    border: #fafafa;
  }
}
</style>
