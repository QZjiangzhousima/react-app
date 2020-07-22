import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  GlobalOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'
import SiderMenu from '../SiderMenu'

import './index.less'

import logo from '@assets/images/logo.png'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu


@withRouter
@connect(state => ({ user: state.user }))
class PrimaryLayout extends Component {
  state = {
    collapsed: false
  }

  onCollapse = collapsed => {
    console.log(collapsed)
    this.setState({ collapsed })
  }
  render () {
    let { name, avatar, permissionList } = this.props.user

    //获取浏览器地址栏地址
    const path = this.props.location.pathname
    //利用正则匹配提取路径，最后加g，表示全局，会提取所有符合条件的
    const reg = /[/][a-z]*/g
    //match()方法，在字符串内检索指定的值，并返回匹配到的值
    const matchArr = path.match(reg)
    //获取一级path
    const firstPath = matchArr[0]
    //获取二级path的第一个
    const secPath = matchArr[1]
    //获取二级path的第二个,当matchArr[2]不存在时，为und,利用||初始为空
    const thirdPath = matchArr[2] || ''

    //遍历数组，查找对应的一级菜单和二级菜单名称

    let firstName
    let secName
    permissionList.forEach(item => {
      if (item.path === firstPath) {
        firstName = item.name
        item.children.forEach(secItem => {
          if (secItem.path === secPath + thirdPath) {
            secName = secItem.name
          }
        })
      }
    })
    return (
      <Layout className='layout'>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className='logo'>
            <img src={logo} alt='' />
            {/* <h1>硅谷教育管理系统</h1> */}
            {!this.state.collapsed && <h1>硅谷教育管理系统</h1>}
          </div>
          <SiderMenu></SiderMenu>

        </Sider>

        <Layout className='site-layout'>
          <Header className='layout-header'>
            <img src={logo} alt='' />
            <span>用户名</span>
            <GlobalOutlined />
          </Header>
          <Content>
            <div className='layout-nav'>
              {firstName === undefined ? ('首页') : (<>
                <Breadcrumb>
                  <Breadcrumb.Item>{firstName}</Breadcrumb.Item>
                  <Breadcrumb.Item>{secName}</Breadcrumb.Item>
                </Breadcrumb>
                <h4>{secName}</h4>
              </>)}
            </div>

            <div className='layout-content'>Bill is a bord.</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default PrimaryLayout