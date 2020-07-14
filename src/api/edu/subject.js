import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";


// 获取一级分类
export function reqGetSubjectList (page, limit) {
    return request({
        url: `${BASE_URL}/${page}/${limit}`,
        method: "GET",
    });
}


// 获取二级分类课程菜单
export function reqGetSecSubjectList (parentId) {
    console.log(parentId);
    return request({
        url: `${BASE_URL}/get/${parentId}`,
        method: "GET",
    });
}

// 添加课程分类
export function reqAddSubjectList (title, parentId) {
    console.log(title, parentId)
    // request返回一个promise
    return request({
        url: `${BASE_URL}/save`,
        method: 'POST',
        data: {
            title,
            parentId
        }
    })
}

//更新课程列表
export function reqUpdateSubjectList (title, id) {
    console.log(title, id)
    // request返回一个promise
    return request({
        url: `${BASE_URL}/update`,
        method: 'PUT',
        data: {
            title,
            id
        }
    })
}
//删除分类
export function reqDelSubject (id) {
    // request返回一个promise
    return request({
        url: `${BASE_URL}/remove/${id}`,
        method: 'DELETE'
    })
}