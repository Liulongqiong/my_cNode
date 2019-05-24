import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
class Nav extends Component {
  render() {
    return (
      <Menu mode={this.props.mode} id={this.props.id} defaultSelectedKeys={'0'}>
        <Menu.Item key={0}>
          <Link to="/index">
            {' '}
            <Icon type="home" />
            首页
          </Link>
        </Menu.Item>
        <Menu.Item key={1}>
          <Link to="/book">
            <Icon type="book" />
            新手入门
          </Link>
        </Menu.Item>
        <Menu.Item key={2}>
          <Link to="/about">
            <Icon type="mail" />
            关于
          </Link>
        </Menu.Item>
      </Menu>
    )
  }
}
export default Nav
