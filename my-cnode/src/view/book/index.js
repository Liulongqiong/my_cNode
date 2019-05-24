import React, { Component } from 'react'
import data from './data'
import ViewComponent from '../view-component/viewComponent'

class Book extends Component {
  render() {
    return <ViewComponent title="入门" data={data} />
  }
}

export default Book
