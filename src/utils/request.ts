import axios from 'axios'
import { useCurrentUserStore } from '@/stores/current-user'
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 0,
})

request.interceptors.request.use(function (config) {
  const currentUser = useCurrentUserStore()

  if (currentUser.accessToken) {
    config.headers['Authorization'] = `Bearer ${currentUser.accessToken}`
  }

  return config
})

request.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  console.error('Request error', error)
  return Promise.reject(error)
})


export default request
