import React, { Component } from 'react'
import classNames from 'classnames'

export default class Todo extends Component {
  constructor() {
    super()
    this.state = {isEditing: false}
  }

  renderTitle() {
    let titleClassNames = classNames(
      'todo-title form-control',
      { 'editing': this.state.isEditing },
      { 'completed': this.props.completed },
    )

    if (this.state.isEditing) {
      return(
        <input
          className={titleClassNames}
          value={this.props.title}
          autoFocus
          onClick={this.onTitleClick.bind(this)}
          onBlur={this.onTitleBlur.bind(this)}
        />
      )
    }

    return(
      <span
        className={titleClassNames}
        onClick={this.onTitleClick.bind(this)}
      > {this.props.title}
      </span>
    )
  }

  render () {
    return (
      <li className='todo'>
        <div className='input-group'>

          <span className='input-group-addon'>
            <input
              type="checkbox"
              checked={this.props.completed}
              onChange={this.onCompletedChange.bind(this)} />
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

  onTitleBlur() {
    this.setState({isEditing: false})
  }

  onCompletedChange() {
    // return { id: this.props.task.id, completed: e.target.checked }
  }

  onRemoveClick(){
    // return this.props.onRemove(this.props.task)
  }
}

Todo.propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  completed: React.PropTypes.bool.isRequired
}
