import React, { useState, useEffect } from "react";
import { Form, Input, Select, Cascader, Button } from "antd";

// 导入获取所有讲师的方法
import { reqGetAllTeacherList } from '@api/edu/teacher'
import { reqALLSubjectList } from '@api/edu/subject'

import "./index.less";

const { Option } = Select;

function SearchForm () {
  const [form] = Form.useForm();
  //存储讲师列表
  const [teacherList, setTeacherList] = useState([])
  //存储一级分类
  const [subjectList, setSubjectList] = useState([])

  useEffect(() => {
    async function fetchData () {
      const [teachers, subjectList] = await Promise.all([
        reqGetAllTeacherList(),
        reqALLSubjectList()
      ])
      setTeacherList(teachers)
      setSubjectList(subjectList)
    }
    fetchData()
  }, [])


  const options = subjectList.map(subject => {
    return {
      value: subject._id,
      label: subject.title,
      isLeaf: false
    }
  })

  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  const loadData = selectedOptions => {
    // const targetOption = selectedOptions[selectedOptions.length - 1];
    // targetOption.loading = true;
    //#region 
    // load options lazily
    // setTimeout(() => {
    //   targetOption.loading = false;
    //   targetOption.children = [
    //     {
    //       label: `${targetOption.label} Dynamic 1`,
    //       value: "dynamic1"
    //     },
    //     {
    //       label: `${targetOption.label} Dynamic 2`,
    //       value: "dynamic2"
    //     }
    //   ];
    //   setOptions([...options]);
    // }, 1000);
    //#endregion
  };

  const resetForm = () => {
    form.resetFields();
  };

  return (
    <Form layout="inline" form={form}>
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
          options={options}
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

export default SearchForm
