import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Card, Select, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons'

import { reqGetSubjectList, reqAddSubjectList } from '@api/edu/subject'

// import Subject from '../..';

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



// 获取Option组件
const Option = Select.Option

class AddSubject extends Component {
    state = {
        subjectList: {
            total: 0,
            items: []
        }
    }
    page = 1
    //直接请求分类数据
    async componentDidMount () {
        const res = await reqGetSubjectList(this.page++, 10)
        this.setState({
            subjectList: res
        })
    }

    //加载更多一级分类课程数据
    handleloadMore = async () => {
        const res = await reqGetSubjectList(this.page++, 10)

        const newItems = [...this.state.subjectList.items, ...res.items]
        this.setState({
            subjectList: {
                total: res.total,
                items: newItems
            }
        })
    }


    // 点击添加按钮,表单校验成功之后的回调函数
    onFinish = async values => {
        try {
            await reqAddSubjectList(values.subjectname, values.parentid)
            message.success('添加课程成功')
            console.log(values);

            this.props.history.push('/edu/subject/list')
        } catch {
            message.error('添加课程失败')
        }
    }

    render () {
        return (
            <Card
                title={
                    <>
                        <Link to='/edu/chapter/list'>
                            <ArrowLeftOutlined />
                        </Link>
                        <span className='title'>新增课程</span>
                    </>
                }
            >
                <Form
                    {...layout}
                    name='subject'
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        label='课程分类名称'
                        name='subjectname'
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
                        label='父级分类id'
                        name='parentid'
                        rules={[
                            {
                                required: true,
                                message: '请选择分类id'
                            }
                        ]}
                    >
                        <Select
                            //下拉列表
                            dropdownRender={menu => {
                                return (
                                    <>
                                        {menu}
                                        {this.state.subjectList.total >
                                            this.state.subjectList.items.length && (
                                                <Button type='link' onClick={this.handleloadMore}>
                                                    加载更多分类数据
                                                </Button>)
                                        }
                                    </>
                                )
                            }}
                        >
                            <Option value={0} key={0}>
                                {'一级分类菜单'}
                            </Option>
                            {this.state.subjectList.items.map(subject => {
                                return (
                                    <Option value={subject._id} key={subject._id}>{subject.title}</Option>
                                )
                            })}
                        </Select>
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

export default AddSubject

