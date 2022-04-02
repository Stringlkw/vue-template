export const validatePassword = () => {
  return (rule: string, value: string, callback: Function) => {
    if (value.length < 6) {
      callback(new Error('密码不能少于6位'))
    } else {
      callback()
    }
  }
}

/*
 * 判断是否为外部资源
 * */
export const isExternal = (path: string) => {
  return /^(https?:|mailto:|tel:)/.test(path)
}
