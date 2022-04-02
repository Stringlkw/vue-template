import { defineStore } from 'pinia'
import { getUserInfo, login, register } from '@/api/sys'
import { getItem, removeAllItem, setItem } from '@/utils/storage'
import { TOKEN } from '@/utils/constant'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth'
import { ElMessage } from 'element-plus'
import type { userInfoType, loginType, registerType } from '@/types/types'

const userInfo: userInfoType = {
  id: -1,
  email: '',
  username: '',
  avatar: 'http://127.0.0.1:5000/image/China.png',
}

const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: userInfo,
  }),
  getters: {
    /*
     * return true 表示用户信息已存在
     * */
    hasUserInfo: (state) => {
      return state.userInfo.id !== -1
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(userInfo: userInfoType) {
      this.userInfo = userInfo
    },

    /*
     * 获取用户信息
     * */
    async getUserInfo() {
      const res = await getUserInfo()
      this.setUserInfo(res.data)
      return res
    },

    /*
     * 注册请求动作
     * */
    register(userInfo: registerType) {
      const { account, username, password, type } = userInfo
      return new Promise((resolve: any, reject) => {
        register({
          account: account,
          username: username,
          password: password,
          type: type,
        })
          .then((response) => {
            router.push('/login').then(() => {
              ElMessage.success({
                message: '注册成功',
                duration: 1000,
              })
              resolve()
            })
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    /*
     * 登录请求动作
     * */
    login(userInfo: loginType) {
      const { account, password, type } = userInfo
      return new Promise((resolve: any, reject) => {
        login({
          account: account,
          password: password,
          type: type,
        })
          .then((response) => {
            this.setToken(response.data.token)
            router.push('/').then(() => {
              ElMessage.success({
                message: '登录成功',
                duration: 1000,
              })
            })
            // 保存登录时间
            setTimeStamp()
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    /*
     * 退出登录
     * */
    logout() {
      // 删除state里的数据
      this.setToken('')
      this.setUserInfo(userInfo)
      // 删除本地缓存
      removeAllItem()
      // TODO 清理权限相关配置
      router.push('/login')
    },
  },
})

export default useUserStore
