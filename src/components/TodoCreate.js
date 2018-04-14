import React, { Component } from 'react'
import classNames from 'classnames'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'

export default class TodoCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }

  renderError() {
    if (!this.state.error) return null
    return <div className="form-control-feedback"> {this.state.error} </div>
  }

  render () {
    let formGroupClass = classNames({
      'form-group': true,
      'has-danger': this.state.error
    })
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className={formGroupClass}>

          <div className="input-group">
            <input
              className="form-control"
              placeholder="What to do?"
              ref='createInput'
            />

          <span className="input-group-append">
            <button type="submit" className="btn btn-primary hand-on-hover">
              <FontAwesomeIcon icon={faPlus} />
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
    this.props.create({ title })
    this.refs.createInput.value = ''
  }

  validateInput(title){
    const foundTodo =this.props.todos.find(t => t.title === title)
    let message = ''
    if (!title) {
      message = 'Please enter a todo'
    }
    else if(foundTodo) {
      message = 'Todo already exists'
    }
    return message
  }
}
