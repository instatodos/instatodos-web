import React, { Component } from 'react'
import classNames from 'classnames'

export default class Todo extends Component {
  constructor() {
    super()
    this.state = {isEditing: false}
  }

  renderTitle() {
    const { title, completed } = this.props
    let titleClassNames = classNames(
      'todo-title form-control',
      { 'editing': this.state.isEditing },
      { 'completed': completed },
    )

    if (this.state.isEditing) {
      return(
        <input
          className={titleClassNames}
          value={title}
          autoFocus
          onClick={this.onTitleClick.bind(this)}
          onChange={this.onTitleChange.bind(this)}
        />
      )
    }

    return(
      <span
        className={titleClassNames}
        onClick={this.onTitleClick.bind(this)}
      > {title}
      </span>
    )
  }

  render () {
    const { id, completed, toggleCompleted } = this.props

    return (
      <li className='todo'>
        <div className='input-group'>

          <span className='input-group-addon'>
            <input
              type="checkbox"
              checked={completed}
              onChange={toggleCompleted.bind(this, id)} />
          </span>

          { this.renderTitle() }

          <span className='input-group-btn'>
            <button
              className="btn btn-danger"
              onClick={this.onRemoveClick.bind(this)} >
              <i className="fa fa-minus"></i>
            </button>
          </span>

        </div>
      </li>
    )
  }

  onTitleClick() {
    this.setState({isEditing: true})
  }

  onTitleChange(event) {
    this.setState({isEditing: false})
    let title = event.target.value.trim()
    this.props.saveTodo(this.props.id, title)
  }

  onRemoveClick(){
    this.props.removeTodo(this.props.id)
  }
}

Todo.propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  completed: React.PropTypes.bool.isRequired
}
