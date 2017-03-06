import React, { Component } from 'react'

export default class TodoListStatuses extends Component {
  render () {
    return (
      <div className='text-center'>
        <div className="btn-group">
          <button className="btn btn-secondary active"> All </button>
          <button className="btn btn-secondary"> Incomplete </button>
          <button className="btn btn-secondary"> Completed </button>
        </div>
      </div>
    )
  }
}
