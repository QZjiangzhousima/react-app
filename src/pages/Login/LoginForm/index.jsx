import React, { Component, useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, Tabs } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  GithubOutlined,
  WechatOutlined,
  QqOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { login, mobileLogin } from "@redux/actions/login";

import { reqGetverifyCode } from '@api/acl/oauth'

import "./index.less";


const { TabPane } = Tabs;


function LoginForm (props) {

  const [form] = Form.useForm()
  const [isShowDownCount, setIsShowDownCount] = useState(false)
  let [downCount, setDownCount] = useState(5)
  const [activeKey, setActiveKey] = useState('user')


  const onFinish = () => {
    if (activeKey === 'user') {
      form.validateFields(['username', 'password']).then(res => {
        let { username, password } = res

        props.login(username, password).then(token => {
          localStorage.setItem('user_token', token)
          props.history.replace('/')
        })
      })
    } else {
      form.validateFields(['phone', 'verifyCode']).then(res => {
        let { phone, verifyCode } = res
        console.log(verifyCode);
        props.mobileLogin(phone, verifyCode).then(token => {
          localStorage.setItem('user_token', token)
          props.history.replace('/')
        })
      })
    }

  };


  const validator = (rules, value) => {

    return new Promise((resolve, reject) => {
      if (!value) {
        return reject('必须添加')
      }
      if (value.length < 4) {
        return reject('长度大于4个字符')
      }
      if (value.length > 16) {
        return reject('长度小于16个字符')
      }
      if (!/^[0-9a-zA-Z_]+$/) {
        return reject('必须为数据，字母下划线')
      }
      resolve()
    })
  }

  const getVerifyCode = async () => {
    const res = await form.validateFields(['phone'])

    await reqGetverifyCode(res.phone)
    console.log('成功');
    setIsShowDownCount(true)

    let timeId = setInterval(() => {
      setDownCount(--downCount)
      if (downCount <= 0) {
        clearInterval(timeId)

        setIsShowDownCount(false)

        setDownCount(5)
      }
    }, 1000)
  }
  //点击切换标签，修改activeKey的值
  const handleTabChange = activeKey => {
    setActiveKey(activeKey)
  }

  const gitLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=2ec5bffcc098a3dba894`
  }

  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
      >
        <Tabs
          defaultActiveKey="user"
          tabBarStyle={{ display: "flex", justifyContent: "center" }}
          onChange={handleTabChange}
        >
          <TabPane tab="账户密码登陆" key="user">
            <Form.Item name="username"
              rules={[
                {
                  required: true,
                  message: '必须输入用户名'
                },
                {
                  min: 4,
                  message: '最少4个'
                },
                {
                  max: 16,
                  message: '最多16个'
                },
                {
                  pattern: /^[0-9a-zA-Z_]+$/,
                  message: 'zmm'
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className="form-icon" />}
                placeholder="用户名: admin"
              />
            </Form.Item>
            <Form.Item name="password"
              rules={[{ validator }]}
            >
              <Input
                prefix={<LockOutlined className="form-icon" />}
                type="password"
                placeholder="密码: 111111"
              />
            </Form.Item>
          </TabPane>
          <TabPane tab="手机号登陆" key="phone">
            <Form.Item name="phone"
              rules={[
                {
                  required: true,
                  message: '请输入手机号'
                },
                {
                  pattern: /^1[3456789]\d{9}$/,
                  message: '你输入不是手机号'
                }
              ]}
            >
              <Input
                prefix={<MobileOutlined className="form-icon" />}
                placeholder="手机号"
              />
            </Form.Item>

            <Row justify="space-between">
              <Col span={16}>
                <Form.Item name="verifyCode">
                  <Input
                    prefix={<MailOutlined className="form-icon" />}
                    placeholder="验证码"
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Button className="verify-btn" onClick={getVerifyCode}
                  disabled={isShowDownCount}
                >{isShowDownCount ? `${downCount}秒后获取` : '获取验证码'}</Button>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        <Row justify="space-between">
          <Col span={7}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>自动登陆</Checkbox>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Button type="link">忘记密码</Button>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            // htmlType="submit"
            onClick={onFinish}
            className="login-form-button"
          >
            登陆
            </Button>
        </Form.Item>
        <Form.Item>
          <Row justify="space-between">
            <Col span={16}>
              <span>
                其他登陆方式
                  <GithubOutlined className="login-icon" onClick={gitLogin} />
                <WechatOutlined className="login-icon" />
                <QqOutlined className="login-icon" />
              </span>
            </Col>
            <Col span={3}>
              <Button type="link">注册</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );

}

export default withRouter(connect(null, { login, mobileLogin })(LoginForm));

