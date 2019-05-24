import React, { Component } from 'react'
import { List, Avatar, Card } from 'antd'
import { Link } from 'react-router-dom'

class UserCard extends Component {
  render() {
    let { title, loading, data } = this.props
    return (
      <Card title={title} type="inner">
        <List
          loading={loading}
          size="small"
          dataSource={data}
          renderItem={item => {
            return (
              <List.Item
                key={item.id}
                extra={<div>{item.last_reply_at.split('T')[0]}</div>}
              >
                <List.Item.Meta
                  avatar={
                    <div>
                      <Avatar src={item.author.avatar_url} />
                    </div>
                  }
                  description={<div />}
                  title={<Link to={'/details/' + item.id}>{item.title}</Link>}
                />
              </List.Item>
            )
          }}
        />
      </Card>
    )
  }
}
export default UserCard
