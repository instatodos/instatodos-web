import React, { Component } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import _ from 'lodash'

import Todo from './Todo'

export default class TodoList extends Component {
  renderTodos() {
    const props = _.omit(this.props, 'todos')

    return this.props.todos.map((todo, i) => (
      <CSSTransition
        key={i}
        classNames='fade'
        timeout={{ enter: 500, exit: 300 }} >
        <Todo key={todo.id} {...todo} {...props} />
      </CSSTransition>
    ))
  }

  render () {
    return(
      <ol className='todo-list'>
        {!this.props.todos.length && <span>No todos yet</span>}

        <TransitionGroup>
          { this.renderTodos() }
        </TransitionGroup>
      </ol>
    )
  }
}
