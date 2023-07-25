<script lang="ts" setup>
import { getDocListAPI } from '@/apis/homeApi'
import { onMounted, ref } from 'vue'
import type { DocsType } from '@/types/consult.d.ts'
// 定义医生列表
const docsList = ref([] as DocsType[])

// 获取医生列表的 API 方法
const getDocList = async () => {
  const { data: res } = await getDocListAPI('1', '5')
  console.log(res)
  docsList.value = res.rows

  console.log(docsList.value)
}

// 生命周期钩子调用
onMounted(() => {
  getDocList()
})
</script>
<template>
  <div class="doctor-card" v-for="item in docsList" :key="item.id">
    <van-image round :src="item.avatar" />
    <p class="name">{{ item.name }}</p>
    <p>{{ item.hospitalName }} {{ item.depName }}</p>
    <p>{{ item.positionalTitles }}</p>
    <van-button round size="small" type="primary">+ 关注</van-button>
  </div>
</template>
<style scoped lang="scss">
.doctor-card {
  width: 135px;
  // height: 190px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 11px 0px rgba(229, 229, 229, 0.2);
  text-align: center;
  padding: 15px;
  margin-left: 15px;
  display: inline-block;
  box-sizing: border-box;
  > .van-image {
    width: 58px;
    height: 58px;
    vertical-align: top;
    border-radius: 50%;
    margin: 0 auto 8px;
  }
  > p {
    margin-bottom: 0;
    font-size: 11px;
    color: var(--cp-tip);
    &.name {
      font-size: 13px;
      color: var(--cp-text1);
      margin-bottom: 5px;
    }
  }
  > .van-button {
    padding: 0 12px;
    height: 28px;
    margin-top: 8px;
    width: 72px;
  }
}
</style>
