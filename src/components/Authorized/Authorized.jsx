import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserInfo, getUserMenu } from './redux'
import Loading from '@comps/Loading'



@connect(null, { getUserInfo, getUserMenu })
class Authorized extends Component {
  state = {
    loading: true
  }

  async componentDidMount () {
    //发送请求
    const { getUserInfo, getUserMenu } = this.props
    await Promise.all([getUserInfo(), getUserMenu()])
    console.log('22');
    // this.props.getUserInfo()  //用户信息
    // this.props.getUserMenu()  //列表信息
    this.setState({
      loading: false
    }, () => {
      console.log(this.state.loading);
    })

  }
  render () {
    let { loading } = this.state
    return loading ? <Loading></Loading> : this.props.render()
  }
}
export default Authorized