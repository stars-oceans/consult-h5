const routes = [
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/User/index.vue'),
    meta: {
      title: '我的'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home/index.vue'),
    meta: {
      title: '主页'
    }
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('@/views/article/index.vue'),
    meta: {
      title: '消息百科'
    }
  },
  {
    path: '/notify',
    name: 'notify',
    component: () => import('@/views/notify/index.vue'),
    meta: {
      title: '消息中心'
    }
  },
  // 订单
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/User/ConsultOrder.vue'),
    meta: {
      title: '订单'
    }
  },
  // 家庭档案
  {
    path: '/user/patient',
    name: 'patient',
    component: () => import('@/views/User/PatientInfo.vue')
  }
]

export default routes
