import React, { Component } from "react";
import { Button, Table, Card } from 'antd';

import { getSubjectList } from './redux'
import { PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import './index.less'

import { connect } from 'react-redux'

const columns = [
  { title: '课程分类', dataIndex: 'title', key: 'title' },
  {
    title: '操作',
    dataIndex: '',
    key: 'x',
    render: () => (<><Button type='primary' style={{ marginRight: 20 }}><FormOutlined />修改</Button>,
      <Button type='danger'><DeleteOutlined />删除</Button>,
    </>),
    width: 300
  },
];

// const data = [
//   {
//     key: 1,
//     name: 'John Brown',
//     age: 32,
//     address: 'JAVA',
//     description: '小仙女的终极闪光biubiu',
//   },
//   {
//     key: 2,
//     name: 'Jim Green',
//     age: 42,
//     address: 'Python',
//     description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
//   },
//   {
//     key: 3,
//     name: '小仙女',
//     age: 29,
//     address: '前端',
//     description: 'This not expandable',
//   },
//   {
//     key: 4,
//     name: 'Joe Black',
//     age: 32,
//     address: '大数据',
//     description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
//   },
// ];

@connect(
  state => ({ subjectList: state.subjectList }),
  { getSubjectList }
)
class Subject extends Component {
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

  render () {
    return (
      <Card>
        <div className='subject-btn'>
          <Button type="primary" className='pri-btn' onClick={this.handeleClick}><PlusOutlined />新建</Button>

          <Table
            className='table-btn'
            columns={columns}
            expandable={{
              expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
              rowExpandable: record => record.name !== 'Not Expandable',
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