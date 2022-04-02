import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/useUserStore'
import { isCheckTimeout } from '@/utils/auth'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
})

// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    // 统一注入token
    const store = useUserStore()
    if (store.token) {
      if (isCheckTimeout()) {
        // 退出登录
        store.logout()
        return Promise.reject(new Error('token 失效'))
      }
      config.headers.token = store.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 判断当前请求是否成功
    if (res.code === 200 || res.error_code === 0) {
      // 成功后返回解析后的数据
      return response.data
    } else {
      // 失败（请求成功，业务失败）
      ElMessage.error(res.message)
      return Promise.reject(new Error(res.message))
    }
  },
  (error) => {
    const msg = error.response.data.msg
    if (typeof msg === 'string') {
      ElMessage.error({ message: msg, duration: 2000 })
    } else {
      let index = 0
      for (let key in msg) {
        ElMessage.error({ message: msg[key][0], offset: index * 50 + 20, duration: 2000 })
        index = index + 1
      }
    }
    return Promise.reject(new Error(error.response.data))
  }
)

export default service
