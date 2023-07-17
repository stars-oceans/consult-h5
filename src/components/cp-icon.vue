<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <!-- 封装的图标组件 -->
  <svg :aria-hidden="true">
    <!-- #icon-文件夹名称-图片名称 -->
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<style scoped>
svg {
  width: 20px;
  height: 20px;
}
</style>
