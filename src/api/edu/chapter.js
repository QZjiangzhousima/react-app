import request from "@utils/request";

const BASE_URL = "/admin/edu/chapter";


// 获取一级分类
export function reqGetChapterList ({ page, limit, courseId }) {
    return request({
        url: `${BASE_URL}/${page}/${limit}`,
        method: "GET",
        params: {
            courseId
        }
    });
}