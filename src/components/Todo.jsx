import React from 'react'
import { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Todo extends Component {
  constructor() {
    super()
    this.state = { isEditing: false }
  }

  renderTitle() {
    const { id, title, completed } = this.props
    let titleClass = classNames({
      'todo-title': true,
      'form-control': true,
      'completed': completed
    })

    return(
      <input
        className={titleClass}
        value={title}
        onClick={this.onTitleClick.bind(this)}
        onBlur={this.onTitleBlur.bind(this)}
        onChange={this.onTitleChange.bind(this)}
      />
    )
  }

  render () {
    const { id, completed, toggleCompleted, user_editing } = this.props

    let FormGroupClass = classNames({
      'form-group': true,
      'has-warning': this.state.isEditing
    })

    let editingMessage = user_editing ? `${user_editing} is editing...` : ''

    return (
      <li className='todo'>
        <div className={ FormGroupClass }>
          <div className='input-group'>
            <div className='input-group-prepend hand-on-hover'
              onClick={ this.onCompletedChange.bind(this) } >
              <div className="input-group-text">
                <input type="checkbox"
                  checked={ completed }
                  onChange={ this.onCompletedChange.bind(this) }
                />
              </div>
            </div>

            { this.renderTitle() }

            <span className='input-group-append'>
              <button
                className="btn btn-danger hand-on-hover"
                onClick={ this.onRemoveClick.bind(this) } >
                <i className="fa fa-minus"></i>
              </button>
            </span>
          </div>
      </div>
      <p className='todo-editing text-right'> { editingMessage } </p>
    </li>
    )
  }

  onTitleClick() {
    this.setState({isEditing: true})
  }

  onTitleChange(event) {
    let title = event.target.value
    this.props.update( this.props.id, {title, user_editing: this.props.user})
  }

  onTitleBlur(event) {
    this.setState({isEditing: false})
    let title = event.target.value
    if(title.length == 0)
      this.props.remove(this.props.id)

    this.props.update(this.props.id, {title})
  }

  onCompletedChange() {
    this.props.complete(this.props.id)
  }

  onRemoveClick(){
    this.props.remove(this.props.id)
  }
}

Todo.propTypes = {
  user: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
}
