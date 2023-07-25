import './assets/main.css'
// 带入 sass 变量
import '@/styles/main.scss'
// 导入 vant  轻提示
import { Toast } from 'vant'
// 2. 引入组件样式
import 'vant/lib/index.css'
// 这里需要单独引入这个样式
import 'vant/es/toast/style'
import { createApp } from 'vue'
// 导入 pinia
import pinia from '@/stores'

import App from './App.vue'
import router from './router'
// 注册雪碧图图标
import 'virtual:svg-icons-register'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(Toast)

app.mount('#app')
