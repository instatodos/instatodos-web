import _ from 'lodash'
import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Todo from './Todo'

export default class TodoList extends Component {
  constructor() {
    super()
  }

  remove(){
    console.log('removed')
  }

  renderTodos() {
    return this.props.todos.map((todo) => {
      return (<Todo key={todo.id} {...todo} onRemove={this.remove} />)
    })
  }

  render () {
    return(
      <div>
        <h2> Todo: {'Title'} </h2>

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
