import React from 'react'
import {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as TodoActions from '../actions/todoActions'
import TodoList from '../components/TodoList'
import TodoCreate from '../components/TodoCreate'

export class TodoListContainer extends Component {
  componentWillMount() {
    this.props.actions.fetchTodos()
  }
  render() {
    const user = Math.floor((Math.random() * 100000) + 1)
    const { createTodo, updateTodo, completeTodo, removeTodo } = this.props.actions

    return (
      <div>
        <div className="todo-list-container">
          <h2>Some list</h2>
          <TodoCreate todos={this.props.todos} create={createTodo} />
          <TodoList
            todos={this.props.todos}
            user={user}
            update={updateTodo}
            complete={completeTodo}
            remove={removeTodo}
          />
          <span>{`username: ${user}`}</span>
        </div>
      </div>
    )
  }

}

const mapStoreToProps = store => {
  const { todos, fetched, fetching, error } = store.todos
  return { todos, fetched, fetching, error }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
})

// decorator to map state props to component props
export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(TodoListContainer)
