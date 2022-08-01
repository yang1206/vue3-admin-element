import request from '@/service'

export const login = (data) => {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}
