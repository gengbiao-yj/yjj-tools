import { createApp } from 'vue'
import router, { setupRouter } from './router'
import { createPinia } from 'pinia'
import { setupAllIcon } from './plugin/ElementPlus'
import './style.css'
import App from './App.vue'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'

async function bootstrap() {
  const app = createApp(App)
  setupRouter(app) // 挂载路由
  setupAllIcon(app) // 全量注册 element plus 图标
  app.use(createPinia()) // 注册状态管理插件
  await router.isReady() // 路由挂载完成再渲染页面
  app.mount('#app')
}
bootstrap()
