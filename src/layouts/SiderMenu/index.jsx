import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Breadcrumb } from 'antd'
import { Link, withRouter } from 'react-router-dom'
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
import { defaultRoutes } from '@conf/routes'
import Icons from '@conf/icons'

const { SubMenu } = Menu

@withRouter
@connect(state => ({ permissionList: state.user.permissionList }))
class SiderMenu extends Component {
  //定义函数，遍历数组，动态渲染菜单，有两个数组
  renderMenu = menus => {
    //1.遍历menu数组
    return menus.map(menu => {
      //先通过menu.hidden 属性判断是否要渲染这个菜单
      if (menu.hidden) return
      //通过icon字符串，找到对应的icon组件，Icon是自定义组件
      const Icon = Icons[menu.icon]
      if (menu.children && menu.children.length) {
        //当menu有子节点且子节点数组长度大于0时，展示
        return (
          <SubMenu key={menu.path} icon={<Icon />} title={menu.name}>
            {menu.children.map(secMenu => {
              //二级菜单不展示
              if (secMenu.hidden) return
              return (
                <Menu.Item key={menu.path + secMenu.path}>
                  {/* menu.path + secMenu.path为二级菜单的路径 */}
                  <Link to={menu.path + secMenu.path}>{secMenu.name}</Link>
                </Menu.Item>
              )
            })}
          </SubMenu>
        )
      } else {
        //进入这里的循环只有一级菜单，return一个新的菜单组件
        return (
          <Menu.Item key={menu.path} icon={<Icon />}>
            {/* 条件渲染，当路径只有'/'展示首页，不是则显示menu.name*/}
            {menu.path === '/' ? <Link to='/'>{menu.name}</Link> : menu.name}
          </Menu.Item>
        )
      }
    })
  }
  render () {

    const path = this.props.location.pathname
    //用正则匹配提取一级菜单的路径
    const reg = /[/][\w]*/
    //定义一级菜单路径
    const firstPath = path.match(reg)[0]

    return (
      <>
        <Menu theme='dark' defaultSelectedKeys={[path]} mode='inline'
          defaultOpenKeys={[firstPath]}
        >
          {this.renderMenu(defaultRoutes)}
          {this.renderMenu(this.props.permissionList)}
        </Menu>
      </>
    )
  }
}
export default SiderMenu