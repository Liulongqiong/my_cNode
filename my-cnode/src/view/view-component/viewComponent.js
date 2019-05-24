import React, { Component } from 'react'
import { Card } from 'antd'

class ViewComponent extends Component {
  render() {
    return (
      <div className="wrap">
        <Card title={this.props.title} type="inner">
          {this.props.data.map((item, index) => {
            return (
              <Card
                title={item.title}
                key={index}
                className={item.className ? item.className : ''}
              >
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              </Card>
            )
          })}
        </Card>
      </div>
    )
  }
}

export default ViewComponent
