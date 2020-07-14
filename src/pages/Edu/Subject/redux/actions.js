
import { GET_SUBJECT_LIST, GET_SECSUBJECT_LIST, UPDATE_SUBJECT } from './constants'

import { reqGetSubjectList, reqGetSecSubjectList, reqUpdateSubjectList } from '@api/edu/subject'
/**
 * 获取/搜索 用户分页数据
 */
const getSubjectListSync = (list) => ({
  type: GET_SUBJECT_LIST,
  data: list,
});

export const getSubjectList = (page, limit) => {
  return (dispatch) => {
    return reqGetSubjectList(page, limit).then((response) => {
      dispatch(getSubjectListSync(response));
      return response
    })
  }
}
//
const getSecSubjectListSync = (list) => ({
  type: GET_SECSUBJECT_LIST,
  data: list,
});

export const getSecSubjectList = (parentId) => {
  return (dispatch) => {
    return reqGetSecSubjectList(parentId).then((response) => {
      dispatch(getSecSubjectListSync(response));
      return response
    })
  }
}

//更新分类回调函数
const updateSubjectSync = data => ({
  type: UPDATE_SUBJECT,
  data
})

export const updateSubject = (title, id) => {
  return dispatch => {
    // 实现异步操作

    //这个return 是为了返回promise对象
    return reqUpdateSubjectList(title, id).then(res => {
      console.log('请求成功了')
      // 将redux里面的数据修改完成
      dispatch(updateSubjectSync({ title, id }))
      // 这个return 是为了让promise拿到响应的值
      return res
    })
  }
}

