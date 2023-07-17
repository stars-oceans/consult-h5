/**
 * 创建 pinia实例
 */
import { createPinia } from 'pinia'
// pinia 持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 创建pinia 实例
const pinia = createPinia()
// 导入 pinia 持久化
pinia.use(piniaPluginPersistedstate)
// 导出
export default pinia

// 在index.ts对module中的 stroe 仓库做统一导出
export * from './modules/useUser'
