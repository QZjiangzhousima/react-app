//导入请求数据的方法
import { getInfo, getMenu } from '@api/acl/login'
import { GET_USER_INFO, GET_USER_MENU } from './constants'

//1.第一个action 获取用户信息
//同步请求
function GetUserInfoSync (data) {
  return { type: GET_USER_INFO, data }
}

//异步请求
export function getUserInfo () {
  return dispatch => {
    return getInfo().then(res => {
      dispatch(GetUserInfoSync(res))
      return res
    })
  }
}

//第二个action 获取菜单列表
function GetUserMenuSync (data) {
  return { type: GET_USER_MENU, data }
}

//异步请求
export function getUserMenu () {
  return dispatch => {
    return getMenu().then(res => {
      dispatch(GetUserMenuSync(res.permissionList))
      return res.permissionList
    })
  }
}
