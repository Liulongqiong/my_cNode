import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Avatar, Row, Col, Card } from 'antd'
import UserCard from './userCard'

class User extends Component {
  constructor(arg) {
    super(arg)
    let loginname = this.props.match.params.id

    let { loading, data } = this.props
    this.state = {
      loading: loading,
      loginname,
      avatar: data.avatar_url,
      score: data.acore,
      create_at: data.create_at,
      recent_topics: data.recent_topics,
      recent_replies: data.recent_replies
    }
  }

  componentDidMount() {
    let { loginname } = this.state
    this.updata(loginname)
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps = ' + nextProps)
    let loginname = nextProps.data.loginname
    if (loginname !== this.state.loginname) {
      this.setState({
        loginname
      })
      this.updata(loginname)
      return false
    }
    let { loading, data } = nextProps
    this.setState({
      loading: loading,
      avatar: data.avatar_url,
      score: data.score,
      create_at: data.create_at,
      recent_topics: data.recent_topics,
      recent_replies: data.recent_replies
    })
  }
  updata(loginname) {
    this.props.dispatch(function(dispatch, getState) {
      dispatch({
        type: 'USER_UPDATE'
      })
      axios
        .get('https://cnodejs.org/api/v1/user/' + loginname)
        .then(function(res) {
          dispatch({
            type: 'USER_SUCC',
            data: res
          })
        })
        .catch(function(error) {
          dispatch({
            type: 'USER_ERROR'
          })
        })
    })
  }

  render() {
    let {
      loading,
      score,
      loginname,
      avatar,
      create_at,
      recent_topics,
      recent_replies
    } = this.state

    return (
      <div className="wrap">
        <Card title="主页" type="inner">
          <Row>
            <Col md={24}>
              <Avatar src={avatar} />
            </Col>
          </Row>

          <Row>
            <Col md={8}>
              <span>{loginname}</span>
            </Col>
            <Col md={8}>
              <span>{score}积分</span>
            </Col>
            <Col md={8}>
              <span>注册时间：{create_at ? create_at.split('T')[0] : ''}</span>
            </Col>
          </Row>
        </Card>
        <UserCard
          title="最近创建的话题"
          loading={loading}
          data={recent_topics}
        />
        <UserCard
          title="最近参与的话题"
          loading={loading}
          data={recent_replies}
        />
      </div>
    )
  }
}

export default connect(state => state.user)(User)
