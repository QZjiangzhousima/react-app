import { GET_CHAPTER_LIST, GET_LESSON_LIST, BATCH_DEL_CHAPTER, BATCH_DEL_LESSON } from './constant'
const initChapterList = {
    total: 0,
    items: []
}

export default function chapterList (prevState = initChapterList, action) {
    switch (action.type) {
        case GET_CHAPTER_LIST:
            action.data.items.forEach(item => {
                item.children = []
            })
            return action.data
        case GET_LESSON_LIST:
            if (action.data.length > 0) {
                const chapterId = action.data[0].chapterId
                prevState.items.forEach(chapter => {
                    if (chapter._id === chapterId) {
                        chapter.children = action.data
                    }
                })
            }
        case BATCH_DEL_CHAPTER:
            const chapterIds = action.data
            const newChapters = prevState.items.filter(chapter => {
                if (chapterIds.indexOf(chapter._id) > -1) {
                    return false
                }
                return true
            })
            return {
                ...prevState,
                items: newChapters
            }
        case BATCH_DEL_LESSON:
            let lessonIds = action.data
            let chapterList = prevState.items
            chapterList.forEach(chapter => {
                const newChildren = chapter.children.filter(lesson => {
                    if (lessonIds.indexOf(lesson._id) > -1) {
                        console.log('课时');
                        return false
                    }
                    return true
                })
                chapter.children = newChildren
            })
            return {
                ...prevState,
                items: chapterList
            }
        default:
            return prevState
    }
}