import React, { Component } from 'react'
import { Menu, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import RouterList from '../../router/router'
const TABARR = [
  {
    txt: '全部',
    val: 'all'
  },
  {
    txt: '精华',
    val: 'good'
  },
  {
    txt: '分享',
    val: 'share'
  },
  {
    txt: '问答',
    val: 'ask'
  },
  {
    txt: '招聘',
    val: 'job'
  },
  {
    txt: '测试',
    val: 'dev'
  }
]

class Index extends Component {
  render() {
    return (
      <Row className="wrap">
        <Col md={6}>
          <Menu className="indexMenu" defaultSelectedKeys={'0'}>
            {TABARR.map((item, index) => {
              return (
                <Menu.Item key={index}>
                  <Link to={'/index/' + item.val}>{item.txt}</Link>
                </Menu.Item>
              )
            })}
          </Menu>
        </Col>
        <RouterList />
      </Row>
    )
  }
}

export default Index
