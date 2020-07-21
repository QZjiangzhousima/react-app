import { GET_COURSE_LIMIT_LIST } from './constant'
import { reqGetCourseLimitList } from '@api/edu/course'


//同步action
function getCourseListSync (data) {
    return { type: GET_COURSE_LIMIT_LIST, data }
}

//异步action
export function getCourseList (data) {
    return dispatch => {
        //发送异步请求
        return reqGetCourseLimitList(data).then(res => {
            //调用同步action
            dispatch(getCourseListSync(res))
            return res
        })
    }
}