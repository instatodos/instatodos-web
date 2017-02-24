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
      { 'completed': completed },
    )

    return(
      <input
        className={titleClassNames}
        value={title}
        onClick={this.onTitleClick.bind(this)}
        onBlur={this.onTitleBlur.bind(this)}
        onChange={this.onTitleChange.bind(this)}
      />
    )
  }

  render () {
    const { id, completed, toggleCompleted } = this.props

    let FormGroupClassNames = classNames(
      'form-group',
      { 'has-warning': this.state.isEditing },
    )

    return (
      <li className='todo'>
        <div className={FormGroupClassNames}>
          <div className='input-group'>
            <span
              onClick={toggleCompleted.bind(this, id)}
              className='input-group-addon hand-on-hover'>
              <input type="checkbox" checked={completed} />
            </span>

            { this.renderTitle() }

            <span className='input-group-btn'>
              <button
                className="btn btn-danger hand-on-hover"
                onClick={this.onRemoveClick.bind(this)} >
                <i className="fa fa-minus"></i>
              </button>
            </span>

          </div>
      </div>
    </li>
    )
  }

  onTitleClick() {
    this.setState({isEditing: true})
  }

  onTitleBlur(event) {
    this.setState({isEditing: false})
    let title = event.target.value.trim()
    if(title.length == 0)
      this.props.removeTodo(this.props.id)
  }

  onTitleChange(event) {
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
