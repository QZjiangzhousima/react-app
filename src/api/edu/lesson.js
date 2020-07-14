import request from '@utils/request'
const BASE_URL = '/admin/edu/lesson'

export function reqGetLessonList (chapterId) {
    return request({
        url: `${BASE_URL}/get/${chapterId}`,
        method: 'GET'
    })
}