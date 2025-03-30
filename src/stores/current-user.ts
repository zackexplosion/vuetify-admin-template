import { defineStore } from 'pinia'
import request from '@/utils/request'
interface CurrentUserInfo {
  id: number | null
  name: string
  email: string
  roles: Array<string> | []
}

const REFRESH_TOKEN_KEY: string = import.meta.env.REFRESH_TOKEN_KEY ||  'refreshToken'
const ACCESS_TOKEN_KEY: string = import.meta.env.ACCESS_TOKEN_KEY || 'accessToken'

const DEFAULT_STATE = {
  refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
  accessToken: sessionStorage.getItem(ACCESS_TOKEN_KEY),
  info: <CurrentUserInfo>{
    email: '',
    roles: [],
  },
}

export const useCurrentUserStore = defineStore('currentUser', {
  state: () => {
    return {
      ...DEFAULT_STATE
    }
  },
  actions: {
    setRefreshToken(newToken: string) {
      localStorage.setItem(REFRESH_TOKEN_KEY, newToken)
      this.refreshToken = newToken
    },
    setAccessToken(newToken: string) {
      sessionStorage.setItem(ACCESS_TOKEN_KEY, newToken)
      this.accessToken = newToken
    },
    async renewTokens() {
      const refreshToken = this.refreshToken
      if(!refreshToken) {
        throw new Error('No refresh token')
      }

      const res = await request.post('/auth/renew-tokens', {
        refreshToken,
      })

      this.setAccessToken(res.accessToken)
      this.setRefreshToken(res.refreshToken)
    },
    async setCurrentUserInfo(me) {
      this.info = {
        ...this.info,
        ...me
      }
    },
    async verityToken() {
      // Should have refresh token now
      if(!this.accessToken){
        await this.renewTokens()
      }

      const me = await request.get('/users/me')
      this.setCurrentUserInfo(me)
    },
    logout() {
      this.$state = {
        ...DEFAULT_STATE
      }
    }
  },
})
