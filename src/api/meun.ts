import request from '@/service'

export const menuList = () => {
  return request({
    url: 'menus',
    method: 'GET'
  })
}
