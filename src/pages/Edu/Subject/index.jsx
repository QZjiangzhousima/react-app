import React, { Component } from "react";
import { Button, Table, Card, Input, Tooltip, message, Modal } from 'antd';
//引入redux中的异步action请求
import { getSubjectList, getSecSubjectList, updateSubject, } from './redux'
import { PlusOutlined, DeleteOutlined, FormOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import './index.less'
import { reqDelSubject } from '@api/edu/subject'
import { connect } from 'react-redux'

const { confirm } = Modal

@connect(
  state => ({ subjectList: state.subjectList }),
  { getSubjectList, getSecSubjectList, updateSubject }
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
    this.pageSize = size
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
      subjectTitle: e.target.value.trim()
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
  handleClickA = async () => {
    let { subjectId, subjectTitle } = this.state
    if (subjectTitle.length === 0) {
      message.erroe('不能为空')
      return
    }

    if (this.oldSubjectTitle === subjectTitle) {
      message.error('不能相同')
      return
    }
    await this.props.updateSubject(subjectTitle, subjectId)
    message.success('更新成功')
    this.handleClickB()
  }
  //点击取消
  handleClickB = () => {
    this.setState({
      subjectId: '',
      subjectTitle: ''
    })
  }
  //删除
  handleDel = value => () => {
    confirm({
      title: (
        <>
          <div>
            确定要删除
            <span style={{ color: 'red', fontSize: 30 }}>{value.title}</span>
            嘛?
          </div>
        </>
      ),
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        // 真正去删除这条数据
        await reqDelSubject(value._id)
        message.success('删除成功了')

        // 重新请求获取最新的数据
        //如果当前页是最后一页,并且最后一页只有一条数据, 并且当前不是第一页,那么请求新数据的时候,应该请求的是上一页的数据

        // 1.如何判断当前是否是第一页 this.currentPage !== 1
        // 2. 如何判断当前页只剩下一条数据
        //   说明: 由于没有修改redux.所以redux中如果items.length为1,证明只有一条数据
        // 3. 如果判断是最后一页
        //  subjectList.total 表示所有数据
        //  currentPage 表示 当前页
        // pageSize 表示 一页多少条

        const totalPage = Math.ceil(
          this.props.subjectList.total / this.pageSize
        )
        // 如果totalPage === currentPage 表示最后一页
        // console.log('currentPage', this.currentPage)
        // console.log('当前数据长度', this.props.subjectList.items.length)
        // console.log('totalpage', totalPage)
        if (
          this.currentPage !== 1 &&
          this.props.subjectList.items.length === 1 &&
          totalPage === this.currentPage
        ) {
          // console.log('请求上一页数据了')
          this.props.getSubjectList(--this.currentPage, this.pageSize)
          return
        }
        this.props.getSubjectList(this.currentPage, this.pageSize)
      }
    })
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
                <Button type='danger' onClick={this.handleDel(value)}>
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