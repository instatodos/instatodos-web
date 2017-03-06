import _ from 'lodash'
import React, { Component } from 'react'

import TodoListStatuses     from './TodoListStatuses';
import TodoList             from './TodoList';
import TodoCreate           from './TodoCreate';

const todos = [{
  id: '0cdcf0e9-3a92-4459-b7b3-40087b010cb0',
  title: 'Walk dog',
  completed: true
}, {
  id: 'e5f0a108-ead8-4da7-829a-45d1ab4c9372',
  title: 'Cook dinner',
  completed: false
}, {
  id: '2f71710c-f0fc-495a-a3c8-ba07d9b935d9',
  title: 'Buy some groceries',
  completed: false
}]

export default class TodoListContainer extends Component {
  constructor (props) {
    super(props)
    this.state = { todos }
  }

  render () {
    return (
      <div className="todoListContainer">
        <TodoListStatuses />

        <h2>Some list</h2>

        <TodoCreate
          todos={this.state.todos}
          createTodo={this.createTodo.bind(this)} />

        <TodoList
          todos={this.state.todos}
          toggleCompleted={this.toggleCompleted.bind(this)}
          saveTodo={this.saveTodo.bind(this)}
          removeTodo={this.removeTodo.bind(this)}
        />
      </div>
    )
  }

  toggleCompleted(id){
    const foundTodo = _.find(this.state.todos, todo => todo.id === id)
    foundTodo.completed = !foundTodo.completed
    this.setState({ todos: this.state.todos })
  }

  saveTodo(id, title){
    const foundTodo = _.find(this.state.todos, todo => todo.id === id)
    foundTodo.title = title
    this.setState({ todos: this.state.todos })
  }

  createTodo(title) {
    let id = (this.state.todos.length + 1).toString()
    this.state.todos.push({
      id,
      title,
      completed: false
    })
    this.setState({ todos: this.state.todos })
  }

  removeTodo(id){
    _.remove(this.state.todos, todo => todo.id === id)
    this.setState({ todos: this.state.todos })
  }
}

TodoListContainer.propTypes = {
  todoListId: React.PropTypes.string.isRequired
}
