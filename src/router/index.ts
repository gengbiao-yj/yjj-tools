import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import type { App } from 'vue'

/**
 * 路由切换进度条配置
 */
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 200, // 递增进度条的速度
  showSpinner: false, // 是否显示加载 icon
  trickleSpeed: 100, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
})

/**
 * 路由注册
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import(`@/layout/Index.vue`),
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import(`@/views/Index/Index.vue`),
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import(`@/views/Error/404.vue`),
  },
]
const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

/**
 * 路由全局拦截
 */
router.beforeEach((to, from, next) => {
  NProgress.start() // 进度条开始
  next()
})
router.afterEach(() => {
  NProgress.done() // 进度条结束
})

/**
 * 路由挂载
 * @param app
 */
export function setupRouter(app: App) {
  app.use(router)
}
export default router
