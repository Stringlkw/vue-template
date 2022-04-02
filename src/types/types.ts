interface registerType {
  account: string
  username: string
  password: string
  type: number
}

interface loginType {
  account: string
  password: string
  type: number
}

interface userInfoType {
  avatar: string
  email: string
  id: number
  username: string
}

export { registerType, loginType, userInfoType }
