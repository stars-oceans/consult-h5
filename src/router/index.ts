import { createRouter, createWebHashHistory } from 'vue-router'
import trendsRoutes from './routes'
import { useUserStore } from '@/stores'
const routes: any = [
  // 静态路由
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/Layout/index.vue')
  }
]

// 创建路由器
const router = createRouter({
  // vue2 是mode:'history' | 'hash'
  // import.meta.env.BASE_URL 项目的 准基地址,默认是 '/'
  // TODO:
  //一般项目打包后，都部署到root根目录；但是公司可能会把项目部署到r0ot下某个文件夹里，
  //例如：部署到文件夹consult目录下，这时候需要在vite.config.ts配置base属性的值='/consult/'
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...routes]
})

// 动态路由
trendsRoutes.forEach((item) => {
  // console.log(item)
  router.addRoute('layout', item)
})

router.beforeEach((to, from, next) => {
  console.log(to.meta.title)
  // 设置我们的 title
  document.title = `在线问诊-${to.meta?.title || '页面'}`
  const UserStore = useUserStore()
  const token = UserStore.userInfo.token
  if (token) {
    // 有 token就都放行
    next()
  } else {
    // 如果没有 token 我访问 '/login' 放行
    if (to.path == '/login') {
      next()
    } else {
      // 如果不是访问 /login 那就重定向到  /login
      next('/login')
    }
  }
})
export default router
