import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Tag, Avatar, Col, Pagination } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'
const tabSchema = {
  top: '置顶',
  good: '精华',
  share: '分享',
  ask: '问答',
  job: '招聘',
  dev: '测试'
}
class IndexList extends Component {
  constructor(arg) {
    super(arg)
    let path = this.props.location.pathname.split('/')
    this.state = {
      loading: this.props.loading,
      data: this.props.data,
      page: 1,
      tab: path[path.length - 1]
    }
  }

  componentDidMount() {
    const { tab, page } = this.state
    this.updata(tab, page)
  }
  componentWillReceiveProps(nextProps) {
    let path = nextProps.location.pathname.split('/')
    let tab = path[path.length - 1]
    if (tab !== this.state.tab) {
      this.setState({
        tab,
        page: 1
      })
      this.updata(tab, 1)
      return false
    }

    this.setState({
      loading: nextProps.loading,
      data: nextProps.data
    })
  }

  onpageChange = page => {
    this.setState({
      page: page
    })
    this.updata(this.state.tab, page)
  }

  updata(tab, page) {
    this.props.dispatch(function(dispatch, getState) {
      dispatch({
        type: 'TOPLIST_UPDATE'
      })
      axios
        .get(
          'https://cnodejs.org/api/v1/topics?tab=' +
            tab +
            '&limit=12&page=' +
            page
        )
        .then(function(res) {
          dispatch({
            type: 'TOPLIST_SUCC',
            data: res
          })
        })
        .catch(function(error) {
          dispatch({
            type: 'TOPLIST_ERROR'
          })
        })
    })
  }
  render() {
    const { loading, data } = this.state
    return (
      <Col md={18} xs={24}>
        <List
          loading={loading}
          dataSource={data.data}
          pagination={{
            position: 'bottom',
            defaultCurrent: this.state.page,
            defaultPageSize: 12,
            pageSize: 12,
            current: this.state.page,
            onChange: this.onpageChange,
            total: 1000
          }}
          renderItem={item => {
            let tabtxt = item.top ? 'top' : item.good ? 'good' : item.tab
            let tagcolor = item.top ? 'magenta' : item.good ? 'cyan' : 'purple'

            return (
              <List.Item
                key={item.id}
                className="indexListItem"
                extra={
                  <div className="indexListrReply">
                    {item.last_reply_at.split('T')[0]}
                  </div>
                }
              >
                <List.Item.Meta
                  avatar={
                    <Link to={'/user/' + item.author.loginname}>
                      <Avatar src={item.author.avatar_url} />
                    </Link>
                  }
                  title={
                    <div>
                      <span className="indexListspan">
                        {item.reply_count}/{item.visit_count}
                      </span>
                      <Tag color={tagcolor}>{tabSchema[tabtxt]}</Tag>
                      <div className="indextoplink">
                        <Link to={'/details/' + item.id}>{item.title}</Link>
                      </div>
                    </div>
                  }
                />
              </List.Item>
            )
          }}
        />
      </Col>
    )
  }
}

export default connect(state => state.topList)(IndexList)
