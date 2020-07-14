import { GET_CHAPTER_LIST, GET_LESSON_LIST } from './constant'
import { reqGetChapterList } from '@api/edu/chapter'
import { reqGetLessonList } from '@api/edu/lesson'

//章节同步action
function getChapterListSync (data) {
    return { type: GET_CHAPTER_LIST, data }
}

//章节异步action
export function getChapterList ({ page, limit, courseId }) {
    return dispatch => {
        console.log(courseId);
        return reqGetChapterList({ page, limit, courseId }).then(res => {
            dispatch(getChapterListSync(res))
            console.log(res);
            return res
        })
    }
}

//课时列表同步action
function getLessonListSync (data) {
    return { type: GET_LESSON_LIST, data }
}

//课时列表异步action
export function getLessonList (chapterId) {
    return dispatch => {
        return reqGetLessonList(chapterId).then(res => {
            dispatch(getLessonListSync(res))
            console.log(res);
            return res
        })
    }
}