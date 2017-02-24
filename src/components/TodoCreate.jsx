import _ from 'lodash'
import React, { Component } from 'react'

export default class TodoCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }

  renderError() {
    if (!this.state.error) return null
    return <div style={{color: 'red'}}> {this.state.error} </div>
  }

  render () {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className='form-group'>
          <div className="input-group">
            <input
              className="form-control"
              placeholder="What to do?"
              ref='createInput'
            />

            <span className="input-group-btn">
              <button type="submit" className="btn btn-primary hand-on-hover">
                <i className="fa fa-plus"></i>
              </button>
            </span>

          </div>

          {this.renderError()}

        </div>
      </form>
    )
  }

  onSubmit(event) {
    event.preventDefault()

    const title = this.refs.createInput.value.trim()
    const validateInput = this.validateInput(title)

    if(validateInput) {
      return this.setState({ error: validateInput })
    }

    this.setState({ error: null })
    this.props.createTodo(title)
    this.refs.createInput.value = ''
  }

  validateInput(title){
    if (!title) {
      return 'Please enter a todo'
    }
    else if(_.find(this.props.todos, todo => todo.title === title)) {
      return 'Todo already exists'
    }
    else{
      return null
    }

  }
}
