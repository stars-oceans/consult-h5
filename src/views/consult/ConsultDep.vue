<script setup lang="ts">
import type { DepType, Child } from '@/types/consult.d.ts'
import { getDepAPI } from '@/apis//consultApi'
import { onMounted } from 'vue'
// 导入pinia
import { useConsultStore } from '@/stores'
const useConsult = useConsultStore()
// 最开始选则的那一个
const active = ref(1)
// 数据的列表
const depList = ref([] as DepType[])
const childList = ref([] as Child[])
// 获取我们这个 depList 数据的回调函数
const getDep = async () => {
  const { data: res } = await getDepAPI()
  console.log(res)
  depList.value = res
  // 将第一项的值赋给下一菜单
  childList.value = res[active.value].child
}
// 点击一级菜单获取下一级菜单的回调函数
const depEvent = (value: any) => {
  console.log(value.child)
  childList.value = value.child
}
onMounted(() => {
  getDep()
})

// 获取选择的 二级科室的 id
const depEventChild = (id: string) => {
  console.log(id)
  // 存pinia
  useConsult.setDep(id)
}
import { ref } from 'vue'
</script>

<template>
  <!-- 2. 极速问诊-选择科室 -->
  <div class="consult-dep-page">
    <cp-nav-bar title="选择科室" />
    <div class="wrapper">
      <!-- 一级科室 -->
      <van-sidebar v-model="active">
        <van-sidebar-item
          :title="item.name"
          v-for="item in depList"
          :key="item.id"
          @click="depEvent(item)"
        />
      </van-sidebar>
      <!-- 二级科室 -->
      <div class="sub-dep">
        <router-link
          to="/consult/illness"
          v-for="i in childList"
          :key="i.id"
          @click="depEventChild(i.id)"
          >{{ i.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.van-sidebar {
  width: 114px;
  &-item {
    padding: 14px;
    color: var(--cp-tag);
    &--select {
      color: var(--cp-main);
      font-weight: normal;
      &::before {
        display: none;
      }
    }
  }
}
.consult-dep-page {
  padding-top: 46px;
}

.wrapper {
  height: calc(100vh - 46px);
  overflow: hidden;
  display: flex;
  .sub-dep {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    > a {
      display: block;
      padding: 14px 30px;
      color: var(--cp-dark);
    }
  }
}
</style>
