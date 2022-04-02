import router from '@/router'
import useUserStore from '@/store/modules/useUserStore'

// 鉴权解决方案是使用路由守卫
// 白名单
const whiteList = ['/login', '/register', '/']
/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  const store = useUserStore()
  if (store.token) {
    // 用户已登录， 则不允许进入login
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户信息是否存在，如果不存在则获取用户信息
      if (!store.hasUserInfo) {
        await store.getUserInfo()
      }
      next()
    }
  }
  // 用户未登录， 只允许进入login
  else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
