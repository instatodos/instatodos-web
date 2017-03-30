import React, { Component } from 'react'
import classNames from 'classnames'

export default class Todo extends Component {
  constructor() {
    super()
    this.state = {isEditing: false}
  }

  renderTitle() {
    const { id, title, completed } = this.props
    let titleClass = classNames({
      'todo-title': true,
      'form-control': true,
      'completed': completed
    })

    return(
      <div className={titleClass}>
        <input
          value={title}
          onClick={this.onTitleClick.bind(this)}
          onBlur={this.onTitleBlur.bind(this)}
          onChange={this.onTitleChange.bind(this)}
        />
      </div>
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
            <span
              onClick={ this.onCompletedChange.bind(this) }
              className='input-group-addon hand-on-hover'>
              <input type="checkbox"
                checked={ completed }
                onChange={ this.onCompletedChange.bind(this) } />
            </span>

            { this.renderTitle() }

            <span className='input-group-btn'>
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
    this.props.update({ id: this.props.id, title, user_editing: this.props.userEditing})
  }

  onTitleBlur(event) {
    this.setState({isEditing: false})
    let title = event.target.value
    if(title.length == 0)
      this.props.remove(this.props.id)
    this.props.update({ id: this.props.id, title, user_editing: null})
  }

  onCompletedChange() {
    this.props.update({ id: this.props.id, completed: !this.props.completed })
  }

  onRemoveClick(){
    this.props.remove(this.props.id)
  }
}

Todo.propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  completed: React.PropTypes.bool.isRequired,
  remove: React.PropTypes.func.isRequired,
  update: React.PropTypes.func.isRequired
}
