import React, { Component } from "react";
import { Button, Table, Card, Input, Tooltip } from 'antd';
//引入redux中的异步action请求
import { getSubjectList, getSecSubjectList } from './redux'
import { PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import './index.less'

import { connect } from 'react-redux'

@connect(
  state => ({ subjectList: state.subjectList }),
  { getSubjectList, getSecSubjectList }
)
class Subject extends Component {
  //用来存放受控组件相关数据
  state = {
    subjectId: '',     //匹配当前点击项的Id
    subjectTitle: ''   //input框显示内容
  }

  currentPage = 1
  //在挂载时默认更新的页码和总条数
  componentDidMount () {
    this.props.getSubjectList(1, 10)
  }

  //点击页码，获取对应页码的数据
  handlePageChange = (page, pageSize) => {
    this.props.getSubjectList(page, pageSize)
    //保持当前页和实际页码数相同
    this.currentPage = page
  }

  //点击改变每页条数时，获取对应数据
  handleSizeChange = (current, size) => {
    this.props.getSubjectList(current, size)
    this.currentPage = current
  }

  //点击新建按钮跳转路由到新建页面
  handeleClickGoAdd = () => {
    this.props.history.push('/edu/subject/add')
  }

  //点击展开按钮
  //expanded:true表示展开，false关闭
  //record：对应点击这一行的数据
  handleClickExpand = (expanded, record) => {
    if (expanded) {
      //请求二级菜单数据，同时传入parentId来判断一级分类
      this.props.getSecSubjectList(record._id)
    }
  }

  //点击修改按钮时，展示框内的数据
  handleTitlechange = (e) => {
    console.log('dianji');
    this.setState({
      subjectTitle: e.target.value
    })

  }

  //点击更新按钮
  handleUpdateClick = value => {
    return () => {
      this.setState({
        subjectId: value._id,
        subjectTitle: value.title
      })
    }
  }

  //点击确认按钮，保存修改分类
  handleClickA = (value) => {
    console.log();
    this.setState({
      subjectTitle: value.title
    })
  }

  handleClickB = (expanded, subjectTitle) => {
    if (!expanded) {
      this.setState({
        subjectTitle
      })
    }
  }


  render () {
    const columns = [
      {
        title: '课程分类', key: 'title',
        render: value => {
          if (this.state.subjectId === value._id) {
            return (
              <Input value={this.state.subjectTitle}
                className='subject-input'
                onChange={this.handleTitlechange} />
            )
          }
          return <span>{value.title}</span>
        }
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: (value) => {
          if (this.state.subjectId === value._id) {
            return (<><Button type='primary' style={{ marginRight: 20 }} onClick={this.handleClickA}>确认</Button>,
              <Button type='danger' onClick={this.handleClickB}>取消</Button>,
            </>)
          }
          return (
            <>
              <Tooltip title='更新课程分类'>
                <Button
                  type='primary'
                  className='update-btn'
                  onClick={this.handleUpdateClick(value)}
                >
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip title='删除课程分类'>
                <Button type='danger'>
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </>
          )
        },
        width: 300
      },
    ];
    return (
      <Card>
        <div className='subject-btn'>
          <Button type="primary" className='pri-btn' onClick={this.handeleClickGoAdd}><PlusOutlined />新建</Button>

          <Table
            className='table-btn'
            columns={columns}
            expandable={{
              onExpand: this.handleClickExpand
            }}
            dataSource={this.props.subjectList.items}
            rowKey='_id'
            pagination={{
              showSizeChanger: true,
              showQuickJumper: true,
              pageSizeOptions: ['5', '10', '15', '20'],
              total: this.props.subjectList.total,
              onChange: this.handlePageChange,
              onShowSizeChange: this.handleSizeChange,
              current: this.currentPage
            }}

          />

        </div>
      </Card>
    )
  }
}
export default Subject