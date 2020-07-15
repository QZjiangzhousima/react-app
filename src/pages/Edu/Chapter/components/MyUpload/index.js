import React, { Component } from 'react'
import { Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { reqGetQiniuToken } from '@api/edu/lesson'

// 引入
import * as qiniu from 'qiniu-js'
//nanoid用来生成唯一id
import { nanoid } from 'nanoid'


const MAX_VIDEO_SIZE = 20 * 1024 * 1024
export default class MyUpload extends Component {

    constructor() {
        super()
        //1.先从本地缓存中获取upload_token
        const str = localStorage.getItem('upload_token')
        //2.判断缓存中是否有数据，有数据表示已经上传过
        if (str) {
            //3.当有数据时先用JSON.parse()将其转化为对象
            const res = JSON.parse(str)
            //3-1将缓存中的expires,uploadToken属性值赋值给expries,uploadToken
            //已方便接下来判断使用
            this.state = {
                expires: res.expires,
                uploadToken: res.uploadToken
            }
        } else {
            //当无数据时，初始化
            this.state = {
                expires: 0,
                uploadToken: ''
            }
        }
    }


    //上传视频前调用
    handleBeforeUpload = (file, fileList) => {
        return new Promise(async (resolve, reject) => {
            //判断视频大小是否过大
            if (file.size > MAX_VIDEO_SIZE) {
                message.error('视频体积太大不能上传')
                reject()
                return
            }
            //在请求之前，只需要判断token是否过期
            if (Date.now() > this.state.expires) {
                //如果过期了就重新获取
                const { uploadToken, expires } = await reqGetQiniuToken()
                //将新数据存储
                this.saveUploadToken(uploadToken, expires)
            }

            resolve(file)

        })
    }


    //
    saveUploadToken = (uploadToken, expires) => {
        //
        const targetTime = Date.now() + expires * 1000
        expires = targetTime
        const upload_token = JSON.stringify({ uploadToken, expires })
        localStorage.setItem('upload_token', upload_token)

        this.setState({
            uploadToken,
            expires
        })
    }


    //真正上传视频调用
    handleCustomRequest = (value) => {
        console.log('上传111');
        // 创建putExtra对象
        const putExtra = {
            fname: '小仙女的终极闪光', //文件原名称
            params: {}, // 用来放置自定义变量
            mimeType: ['video/mp4'] //用来限定上传文件类名
        }
        // 创建config对象
        const config = {
            region: qiniu.region.z2 // 选择上传域名区域 z2表示华南
        }
        //要上传的文件对象
        const file = value.file
        //新定义的文件名
        const key = nanoid(10) //生成一个长度为10的id,保证是唯一的

        // token 需要给本地服务器发送请求获取 (时效两个小时)
        const token = this.state.uploadToken

        const observable = qiniu.upload(
            file, // 上传的文件
            key, //最终上传之后的文件资源名 (保证唯一) 使用nanoid库,生成这个key
            token, //上传验证信息，前端通过接口请求后端获得
            putExtra,
            config
        )
        // 创建上传过程触发回调函数的对象
        const observer = {
            //上传过程中触发的回调函数
            next (res) { console.log('上传中'); value.onProgress(res.total) },
            //上传失败触发的回调函数
            error (err) { console.log('失败'); value.onError(err) },
            // 上传成功触发的回调函数
            complete: (res) => {
                value.onSuccess(res)
                this.props.onChange('http://qdghy5t4w.bkt.clouddn.com/' + res.key);
            }
        }
        // 上传开始
        this.subscription = observable.subscribe(observer)
        // 上传取消
        //subscription.unsubscribe()
    }


    componentWillUnmount () {
        // 上传取消
        this.subscription && this.subscription.unsubscribe()
    }


    render () {
        return (
            <div>
                <Upload
                    beforeUpload={this.handleBeforeUpload}
                    customRequest={this.handleCustomRequest}
                    accept='video/*'
                >
                    <Button>
                        <UploadOutlined /> 上传视频
                    </Button>
                </Upload>
            </div>
        )
    }
}
