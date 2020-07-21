import React, { useState, useEffect } from "react";
import { Form, Input, Select, Cascader, Button, message } from "antd";

// 导入获取所有讲师的方法
import { reqGetAllTeacherList } from '@api/edu/teacher'
import { reqALLSubjectList, reqGetSecSubjectList } from '@api/edu/subject'
import { getCourseList } from '../redux'
import { connect } from 'react-redux'

import "./index.less";

const { Option } = Select;

function SearchForm (props) {
  const [form] = Form.useForm();
  //存储讲师列表
  const [teacherList, setTeacherList] = useState([])

  // 定义存储所有一级课程分类的状态
  const [subjectList, setSubjectList] = useState([])


  // 利用useEffect,实现组件挂载获取数据
  useEffect(() => {
    async function fetchData () {
      const [teachers, subjectList] = await Promise.all([
        reqGetAllTeacherList(),
        reqALLSubjectList()
      ])
      // 由于使用了cascader组件,我们需要将subjectList中的数据结构,改成cascader组件要求的数据结构
      const options = subjectList.map(subject => {
        return {
          value: subject._id,
          label: subject.title,
          isLeaf: false // false表示有子数据, true表示没有子数据
        }
      })

      setSubjectList(options)
      setTeacherList(teachers)
    }

    fetchData()
  }, [])




  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  const loadData = async selectedOptions => {
    //获取一级课程分类列表
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    //发送异步请求
    //获取二级分类
    console.log('1213');
    let secSubject = await reqGetSecSubjectList(targetOption.value)
    secSubject = secSubject.items.map(item => {
      return {
        value: item._id,
        label: item.title
      }
    })
    targetOption.loading = false

    //数据长度大于1时，展示下级数据，否则只展示一级数据
    if (secSubject.length > 0) {
      targetOption.children = secSubject
    } else {
      targetOption.isLeaf = true
    }

    //更新数据
    setSubjectList([...subjectList])
  };

  const resetForm = () => {
    form.resetFields();
  };

  //点击查询按钮事件处理函数
  const finish = async value => {
    let subjectId
    let subjectparentId
    //有一级和二级id时
    if (value.sunject && value.subject.length > 1) {
      subjectId = value.subject[1]
      subjectparentId = value.subject[0]
    }
    //发送请求，获取课程分页数据
    const data = {
      page: 1,
      limit: 5,
      title: value.title,
      teacherId: value.teacherId,
      subjectId,
      subjectparentId
    }
    await props.getCourseList(data)
    message.success('获取课程数据成功')
    console.log('1213333');
  }

  return (
    <Form layout="inline" form={form} onFinish={finish}>
      <Form.Item name="title" label="标题">
        <Input placeholder="课程标题" style={{ width: 250, marginRight: 20 }} />
      </Form.Item>
      <Form.Item name="teacherId" label="讲师">
        <Select
          allowClear
          placeholder="课程讲师"
          style={{ width: 250, marginRight: 20 }}
        >
          {teacherList.map(item => (
            <Option value={item._id} key={item._id}>{item.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="subject" label="分类">
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={subjectList}
          loadData={loadData}
          onChange={onChange}
          changeOnSelect
          placeholder="课程分类"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          查询
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  );
}

export default connect(null, { getCourseList })(SearchForm)
