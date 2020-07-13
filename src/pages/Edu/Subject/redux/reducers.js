import { GET_SUBJECT_LIST, GET_SECSUBJECT_LIST } from "./constants";

const initSubjectList = {
  total: 0, // 总数
  items: [], // 详细user数据
};

export default function subjectList (prevState = initSubjectList, action) {
  switch (action.type) {
    case GET_SUBJECT_LIST:

      action.data.items.forEach(items => {
        items.children = []
        console.log(11);
      });
      return action.data
    case GET_SECSUBJECT_LIST:
      if (action.data.items.length > 0) {
        const parentId = action.data.items[0].parentId
        prevState.items.forEach(items => {
          if (items._id === parentId) {
            items.children = action.data.items
          }
        })
      }
      return { ...prevState }
    default:
      return prevState
  }
}





