import '@/assets/styles/index.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'element-plus/es/components/message/style/css'
import 'vite-plugin-svg-icons/register'

const pinia = createPinia()

const app = createApp(App)
app.use(router).use(pinia)

app.mount('#app')
