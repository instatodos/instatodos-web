import _ from 'lodash'
import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Todo from './Todo'

export default class TodoList extends Component {
  constructor() {
    super()
  }

  renderTodos() {
    const props = _.omit(this.props, 'todos')

    return this.props.todos.map((todo) => {
      return (
        <Todo key={todo.id} {...todo} {...props} />
      )
    })
  }

  render () {
    return(
      <div>
        {!this.props.todos.length && <span>No todos yet</span>}

        <ReactCSSTransitionGroup
          component="ol"
          className="todo-list"
          transitionName= "example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          { this.renderTodos() }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

TodoList.propTypes = {
  user: React.PropTypes.object.isRequired,
  todos: React.PropTypes.array.isRequired,
  update: React.PropTypes.func.isRequired,
  remove: React.PropTypes.func.isRequired
}
