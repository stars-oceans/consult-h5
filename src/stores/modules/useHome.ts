import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { KnowledgeType } from '@/types/consult.d.ts'

export const useHomeStore = defineStore('useHome', () => {
  // home 选中的值
  const active = ref<KnowledgeType>('food')

  return { active }
})
