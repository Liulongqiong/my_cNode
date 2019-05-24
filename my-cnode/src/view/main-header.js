import React, { Component } from 'react'
import { Layout, Row, Col, Dropdown, Button, Icon } from 'antd'
import Nav from './nav'
class MainHeader extends Component {
  render() {
    return (
      <Layout.Header>
        <Row className="wrap" id="headerRow">
          <Col md={6} xs={22}>
            {' '}
            <h1 id="logo">cNode</h1>
          </Col>
          <Col md={18} xs={0}>
            <Nav mode="horizontal" id="nav" />
          </Col>
          <Col xs={2} md={0}>
            <Dropdown
              overlay={<Nav id="xsNav" mode="vertical" />}
              placement="bottomRight"
              trigger={['click', 'touchend']}
            >
              <Button>
                <Icon type="bars" />
              </Button>
            </Dropdown>
          </Col>
        </Row>
      </Layout.Header>
    )
  }
}
export default MainHeader
