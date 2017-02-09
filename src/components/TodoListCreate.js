import React, { Component } from 'react'

export default class TodoListCreate extends Component {
  handleSubmit(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div className='row'>
        <div className='col-sm-6 col-sm-offset-3'>
          <form className='todo-form' onSubmit={this.handleSubmit.bind(this)}>
            <div className='form-group'>
              <div className='input-group'>
                <input id='title' className='form-control'/>
                <span className='input-group-btn'>
                  <button type='submit' className='btn btn-primary todo-create'>
                    Create
                  </button>
                </span>
              </div>
            </div>
            <a href='x'> { 'todo list' } </a>
          </form>
        </div>
      </div>
    )
  }
}
