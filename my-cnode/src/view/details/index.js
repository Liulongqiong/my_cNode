import React, { Component } from 'react'
import { Card, List, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

class Details extends Component {
  constructor(arg) {
    super(arg)
    let id = this.props.match.params.id

    this.state = {
      loading: this.props.loading,
      id,
      data: this.props.data.data
    }
  }

  componentDidMount() {
    let { id } = this.state
    this.updetaildata(id)
  }

  componentWillReceiveProps(nextProps) {
    let id = nextProps.data.data.id
    if (id !== this.state.id) {
      this.setState({
        id
      })
      this.updetaildata(id)
      return false
    }
    this.setState({
      loading: nextProps.loading,
      data: nextProps.data.data
    })
  }

  updetaildata(id) {
    this.props.dispatch(function(dispatch) {
      dispatch({
        type: 'DETAIL_UPDATE'
      })
      axios
        .get('https://cnodejs.org/api/v1/topic/' + id)
        .then(function(res) {
          dispatch({
            type: 'DETAIL_SUCC',
            data: res
          })
        })
        .catch(function(err) {
          dispatch({
            type: 'DETAIL_ERROR'
          })
        })
    })
  }

  render() {
    let { loading, data } = this.state
    return (
      <div className="wrap">
        <Card
          loading={loading}
          title={
            <div>
              <h1>{data.title}</h1>
              <p>
                发布于 {data.create_at ? data.create_at.split('T')[0] : ''} ·
                作者{' '}
                {
                  <Link to={'/user/' + data.author.loginname}>
                    {data.author.loginname}
                  </Link>
                }
              </p>
            </div>
          }
        >
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </Card>
        <Card type="inner" title={<div>{data.replies.length} 回复</div>}>
          {
            <List
              dataSource={data.replies}
              renderItem={item => (
                <List.Item
                  extra={
                    <span>
                      {item.ups.length > 0 ? '点赞' + item.ups.length : ''}
                    </span>
                  }
                >
                  <List.Item.Meta
                    avatar={
                      <Link to={'/user/' + item.author.loginname}>
                        <Avatar src={item.author.avatar_url} />
                      </Link>
                    }
                    title={
                      <Link to={'/user/' + item.author.loginname}>
                        {item.author.loginname}
                      </Link>
                    }
                    description={
                      <div dangerouslySetInnerHTML={{ __html: item.content }} />
                    }
                  />
                </List.Item>
              )}
            />
          }
        </Card>
      </div>
    )
  }
}

export default connect(state => state.detail)(Details)
