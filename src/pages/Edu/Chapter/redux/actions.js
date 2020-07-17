import { GET_CHAPTER_LIST, GET_LESSON_LIST, BATCH_DEL_LESSON, BATCH_DEL_CHAPTER } from './constant'
import { reqGetChapterList, reqBatchDelChapter } from '@api/edu/chapter'
import { reqGetLessonList, reqBatchDelLesson } from '@api/edu/lesson'

//1.章节同步action
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

//2.获取课时列表同步action
function getLessonListSync (data) {
    return { type: GET_LESSON_LIST, data }
}

//获取课时列表异步action
export function getLessonList (chapterId) {
    return dispatch => {
        return reqGetLessonList(chapterId).then(res => {
            dispatch(getLessonListSync(res))
            console.log(res);
            return res
        })
    }
}

//3.删除章节列表同步action
function batchDelChapterSync (data) {
    return { type: BATCH_DEL_CHAPTER, data }
}

//删除章节列表异步action
export function batchDelChapter (chapterIds) {
    return dispatch => {
        return reqBatchDelChapter(chapterIds).then(res => {
            dispatch(batchDelChapterSync(chapterIds))
            return res
        })
    }
}


//4.批量删除课时
function batchDelLessonSync (data) {
    return { type: BATCH_DEL_LESSON, data }
}

//删除课时列表异步action
export function batchDelLesson (lessonIds) {
    return dispatch => {
        return reqBatchDelLesson(lessonIds).then(res => {
            dispatch(batchDelLessonSync(lessonIds))
            return res
        })
    }
}