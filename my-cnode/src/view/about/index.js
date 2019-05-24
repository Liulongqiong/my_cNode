import React, { Component } from 'react'
import data from './data'
import ViewComponent from '../view-component/viewComponent'

class About extends Component {
  render() {
    return <ViewComponent title="关于" data={data} />
  }
}

export default About
