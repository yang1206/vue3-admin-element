import request from '@/service'

export const UserList = (data) => {
  return request({
    url: `/users?query=${data.query}&pagenum=${data.pagenum}&pagesize=${data.pagesize}`,
    method: 'Get',
    data
  })
}
export const addUserInfo = (data) => {
  return request({
    url: '/users',
    method: 'Post',
    data
  })
}
export const UserChangeStatus = (data) => {
  return request({
    url: `users/${data.id}/state/${data.mg_state}`,
    method: 'Put'
  })
}

export const getUserinfo = (id) => {
  return request({
    url: `users/${id}`,
    method: 'Get'
  })
}

export const editUser = (id, data) => {
  return request({
    url: `users/${id}`,
    method: 'Put',
    data
  })
}

export const userDelete = (id) => {
  return request({
    url: `users/${id}`,
    method: 'delete'
  })
}

export const getRoleList = () => {
  return request({
    url: 'roles',
    method: 'Get'
  })
}

export const setRole = (id, data) => {
  return request({
    url: `users/${id}/role`,
    method: 'Put',
    data
  })
}
