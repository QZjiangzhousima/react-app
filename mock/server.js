const express = require('express')
const app = express()
const Mock = require('mockjs')
const Random = Mock.Random
Random.ctitle()

// 解决跨域
// use是express中的一个中间件
app.use((req, res, next) => {
    //设置响应头
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Headers', 'content-type,token')
    res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
    //调用下一个中间件
    next()
})

app.get('/admin/edu/subject/:page/:limit', (req, res) => {
    let { page, limit } = req.params
    const data = Mock.mock({
        total: Random.integer(+limit + 2, limit * 2),
        [`items|${limit}`]: [{
            'id|+1': 1,
            title: '@ctitle(1,5)',
            parentId: 0
        }]
    })
    res.json({
        code: 20000,
        success: true,
        data,
        message: ''
    })
})

app.listen(8888, (err) => {
    if (err) {
        return console.log('请求失败')
    }
    console.log('端口8888请求成功')
})