import { GET_USER_INFO, GET_USER_MENU } from './constants'

const initUser = {
  name: '',  //用户名
  avatar: '',  //用户头像
  permissionValueList: [], //用户按钮级别权限
  permissionList: [] //用户菜单级别的权限/路由级别的权限
}

export default function user (pervState = initUser, action) {
  console.log(action.data);
  switch (action.type) {
    case GET_USER_INFO:
      return {
        //解构数据
        ...pervState,
        //解构新的数据，覆盖原来的数据
        ...action.data
      }
    case GET_USER_MENU:
      return {
        //解构原来的数据
        ...pervState,
        //解构新的数据，覆盖原来的数据
        permissionList: action.data
      }
    default: return pervState
  }
}