import React, { Component } from 'react'

export default class TodoCreate extends Component {
  constructor(props) {
    super(props)
    // let todoId = document.getElementById('todo_id').value
    // this.state = { title: '', todo_id: todoId }
    this.state = { title: '' }
  }

  render () {
    return (
      <form onSubmit={this.handleCreate.bind(this)}>
        <div className='form-group'>
          <div className="input-group">
            <input
              className="form-control"
              placeholder="What to do?"
              ref='createInput'
            />

            <span className="input-group-btn">
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-plus"></i>
              </button>
            </span>

          </div>
        </div>
      </form>
    )
  }

  handleCreate(event) {
    let title = this.refs.createInput.value.trim()
    event.preventDefault()
    this.props.createTask(title)
    this.refs.createInput.value = ''
  }
}
