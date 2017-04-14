import React, { Component } from 'react'
import ActionCable from 'actioncable'

import TodoListStatuses     from './TodoListStatuses';
import TodoList             from './TodoList';
import TodoCreate           from './TodoCreate';

export default class TodoListContainer extends Component {
  constructor (props) {
    super(props)
    const cable = ActionCable.createConsumer(`ws://${window.location.hostname}:3000/cable`)
    const todoListId = 1
    this.state = {
      todos: [],
      user: Math.floor((Math.random() * 100000) + 1),
      subscription: this.createCableSubscription(cable, todoListId)
    }
  }

  render () {
    const disconnected = this.state.subscription.consumer.connection.disconnected
    return (
      <div className="todoListContainer">
        <TodoListStatuses />
        <h2>Some list</h2>
        <TodoCreate
          todos={ this.state.todos }
          create={ this.create.bind(this) } />
        {disconnected && <span>No connection</span>}
        <TodoList
          todos={ this.state.todos}
          user={ this.state.user}
          update={ this.update.bind(this) }
          remove={ this.remove.bind(this) }
        />
        <span>{`username: ${this.state.user}`}</span>
      </div>
    )
  }

  create(params) { this.state.subscription.create(arguments[0]) }
  update(params) { this.state.subscription.update(arguments[0]) }
  remove(id)     { this.state.subscription.remove(arguments[0]) }

  createCableSubscription(cable, todoListId) {
    return cable.subscriptions.create({ channel:  "TodoChannel", room: todoListId }, {
      create(params) {
        this.perform('create', { todo_params: params })
      },
      update(params) {
        this.perform('update', { todo_params: params })
      },
      remove(id) {
        this.perform('delete', { id })
      },

      received: (data) => {
        let todo={}
        switch (data['action']) {
          case 'index':
            this.state.todos = data['todos']
            break
          case 'create':
            todo = JSON.parse(data['todo'])
            this.state.todos.push(todo)
            break
          case 'update':
            todo = data['todo']
            let foundTodo = this.state.todos.find(t => t.id === todo.id)
            Object.assign(foundTodo, todo)
            break
          case 'delete':
            todo = data['todo']
            let index = this.state.todos.findIndex(t => t.id === todo.id)
            delete this.state.todos[index]
            break
        }
        this.forceUpdate()
      }
    })
  }
}

TodoListContainer.propTypes = {
  todoListId: React.PropTypes.string.isRequired
}
