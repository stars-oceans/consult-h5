<script setup lang="ts">
import { ref } from 'vue'
// 接收的数据
defineProps<{
  modelValue: number
}>()
// 传出取的数据
const emits = defineEmits<{
  (e: 'update:modelValue', data: number): void
}>()
// 男女的数据
const options = ref([
  {
    lable: '女',
    value: 0
  },
  {
    lable: '男',
    value: 1
  }
])
// 点击选中的事件
const selectInto = (val: any) => {
  console.log(val)
  emits('update:modelValue', val)
}
</script>

<template>
  <div class="cp-radio-btn">
    <a
      v-for="item in options"
      :key="item.value"
      class="item"
      @click="selectInto(item.value)"
      href="javascript:;"
      :class="{ active: modelValue === item.value }"
      >{{ item.lable }}</a
    >
  </div>
</template>

<style lang="scss" scoped>
.cp-radio-btn {
  display: flex;
  flex-wrap: wrap;
  .item {
    height: 32px;
    min-width: 70px;
    line-height: 30px;
    padding: 0 14px;
    text-align: center;
    border: 1px solid var(--cp-bg);
    background-color: var(--cp-bg);
    margin-right: 10px;
    box-sizing: border-box;
    color: var(--cp-text2);
    margin-bottom: 10px;
    border-radius: 4px;
    transition: all 0.3s;
    &.active {
      border-color: var(--cp-primary);
      background-color: var(--cp-plain);
    }
  }
}
</style>
