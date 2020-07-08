import React, { Component } from "react";
import { Button, Table } from 'antd';
import { PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import './index.less'


const columns = [
  { title: '课程分类', dataIndex: 'address', key: 'address' },
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

const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: '小仙女的终极闪光biubiu',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Not Expandable',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];

export default class Subject extends Component {
  render () {
    return (
      <div className='subject-btn'>
        <Button type="primary" className='pri-btn'><PlusOutlined />新建</Button>

        <Table
          className='table-btn'
          columns={columns}
          expandable={{
            expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
            rowExpandable: record => record.name !== 'Not Expandable',
          }}
          dataSource={data}
        />
      </div>
    )
  }
}
