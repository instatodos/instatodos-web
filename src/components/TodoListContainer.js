import React, { Component } from 'react'
import axios from 'axios'
import ActionCable from 'actioncable'

import TodoList from './TodoList'
import TodoCreate from './TodoCreate'

export default class TodoListContainer extends Component {
  componentWillMount() {
    const cable = ActionCable.createConsumer(
      `ws://${window.location.hostname}:3000/cable`
    )

    this.setState({
      todos: [],
      subscription: this.createCableSubscription(cable, this.props.todoListId),
      fetching: false,
      fetched: false,
      error: null
    })

    this.fetchTodos()
  }

  render () {
    const user = Math.floor((Math.random() * 100000) + 1)

    return (
      <div className="todo-list-container">
        <h2>Some list</h2>

        <TodoCreate todos={ this.state.todos } create={ this.create.bind(this) } />

        <TodoList
          todos={ this.state.todos}
          user={ user }
          update={ this.update.bind(this) }
          remove={ this.remove.bind(this) }
        />

      <span>{`username: ${user}`}</span>
    </div>
    )
  }

  fetchTodos() {
    const host = `http://${window.location.hostname}:3000`

    axios
      .get(`${host}/todo_lists/1`)
      .then(response => {
        const todos = response.data.todo_list.todos
        this.setState({todos})
      })
      .catch(err => { })
  }

  create(params)   { this.state.subscription.create(arguments[0]) }
  update(params)   { this.state.subscription.update(arguments[0]) }
  remove(id)       { this.state.subscription.remove(arguments[0]) }

  createCableSubscription(cable, todoListId) {
    return cable.subscriptions.create({ channel:  "TodoChannel", room: todoListId }, {
      create(todo_params) {
        this.perform('create', { todo_params })
      },
      update(todo_params) {
        this.perform('update', { todo_params })
      },
      remove(id) {
        this.perform('delete', { id })
      },

      received: (data) => {
        let todo={}
        let foundTodo={}
        switch (data['action']) {
          case 'create':
            todo = data['todo']
            this.state.todos.push(todo)
            break
          case 'update':
            todo = data['todo']
            foundTodo = this.state.todos.find(t => t.id === todo.id)
            Object.assign(foundTodo, todo)
            break
          case 'delete':
            todo = data['todo']
            let index = this.state.todos.findIndex(t => t.id === todo.id)
            delete this.state.todos[index]
            break
          default:
            break
        }
        this.forceUpdate()
      }
    })
  }
}
