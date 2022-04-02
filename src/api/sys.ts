import request from '@/utils/request'
import type { loginType, registerType } from '@/types/types'

// 注册
export const register = (data: registerType) => {
  return request({
    url: 'client/user/register',
    method: 'POST',
    data,
  })
}

// 登录
export const login = (data: loginType) => {
  return request({
    url: 'user/login',
    method: 'POST',
    data,
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: 'user/info',
  })
}
