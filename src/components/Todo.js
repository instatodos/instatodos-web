import React, { Component } from 'react'
import classNames from 'classnames'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faMinus from '@fortawesome/fontawesome-free-solid/faMinus'

export default class Todo extends Component {
  constructor() {
    super()
    this.state = { isEditing: false }
  }

  renderTitle() {
    const { title, completed } = this.props
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
        onChange={this.onTitleChange.bind(this)}
      />
    )
  }

  render () {
    const { completed, user_editing } = this.props

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
                <FontAwesomeIcon icon={faMinus} />
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
    this.setState({isEditing: false})
    let title = event.target.value

    if(title.length === 0)
      this.props.remove(this.props.id)

    this.props.update({id: this.props.id, title})
  }

  onCompletedChange() {
    this.props.update({id: this.props.id, completed: !this.props.completed})
  }

  onRemoveClick(){
    this.props.remove(this.props.id)
  }
}
