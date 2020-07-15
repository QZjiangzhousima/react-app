import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Card, message, Switch } from 'antd';
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons'

import MyUpload from '../MyUpload'

import { reqAddLesson } from '@api/edu/lesson'

import './index.less'


const layout = {
    // antd把一个宽度分为24份
    // 表单文字描述部分
    labelCol: {
        span: 3
    },
    // 表单项部分
    wrapperCol: {
        span: 6
    }
}



class AddLesson extends Component {
    state = {
        subjectList: {
            total: 0,
            items: []
        }
    }


    // 点击添加按钮,表单校验成功之后的回调函数
    onFinish = async values => {
        //获取chapterId
        const chapterId = this.props.location.state._id
        //将穿回来的values解构
        const data = {
            ...values,
            chapterId
        }
        //调用reqAddLesson接口，添加课时
        await reqAddLesson(data)
        message.success('添加课时成功')
        //添加成功后跳转页面
        this.props.history.push('/edu/chapter/list')
    }

    render () {
        return (
            <Card
                title={
                    <>
                        <Link to='/edu/subject/list'>
                            <ArrowLeftOutlined />
                        </Link>
                        <span className='title' style={{ marginLeft: 20 }}>新增课时</span>
                    </>
                }
            >
                <Form
                    {...layout}
                    //点击提交按钮，会触发onFinish
                    onFinish={this.onFinish}
                    initialValues={{
                        lesson: '小仙女的终极耳光',
                        free: true
                    }}
                >
                    <Form.Item
                        label='课时名称'
                        name='title'
                        //表单校验规格
                        rules={[
                            {
                                required: true,
                                message: '请输入课程分类!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='是否免费'
                        name='free'
                        rules={[
                            {
                                required: true,
                                message: '请选择是否免费'
                            }
                        ]}
                        // 默认表单控制表单项的属性值是value,但是switch的值不是value,是checked,所以要改成checked
                        valuePropName='checked'
                    >
                        <Switch
                            checkedChildren='开启'
                            unCheckedChildren='关闭'
                            defaultChecked
                        />
                    </Form.Item>

                    <Form.Item
                        label='上传视频'
                        name='video'
                        rules={[
                            {
                                required: true,
                                message: '请选择上传视频'
                            }
                        ]}
                    >
                        {/* 上传逻辑复杂,所以封装到MyUpload中 */}
                        <MyUpload></MyUpload>
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default AddLesson