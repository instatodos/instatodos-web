import _ from 'lodash'
import React, { Component } from 'react'
import ActionCable from 'actioncable'

import TodoListStatuses     from './TodoListStatuses';
import TodoList             from './TodoList';
import TodoCreate           from './TodoCreate';

export default class TodoListContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      todos: [],
      cable: ActionCable.createConsumer(`ws://${window.location.hostname}:3000/cable`)
    }
  }

  componentWillMount() {
    let component = this
    const subscription = this.state.cable.subscriptions.create("TodoChannel", {
      connected()         { this.perform('follow', { todo_list_id: 1 }) },
      create(todo_params) { this.perform('create', { todo_params }) },
      update(todo_params, persist) {
        this.perform('update', { todo_params, persist })
      },
      delete(id)          { this.perform('delete', { id }) },
      received(data) {
        let todo={}
        switch (data['action']) {
          case 'follow':
            component.state.todos = data['todos']
            component.setState({ todos: component.state.todos })
            break
          case 'create':
            todo = JSON.parse(data['todo'])
            component.state.todos.push(todo)
            component.setState({ todos: component.state.todos })
            break
          case 'update':
            todo = data['todo']
            let foundTodo = component.state.todos.find(t => t.id === todo.id)
            Object.assign(foundTodo, todo)
            component.setState({ todos: component.state.todos })
            break
          case 'delete':
            todo = data['todo']
            _.remove(component.state.todos, t => t.id === todo.id)
            component.setState({ todos: component.state.todos })
            break
        }
      }
    })
    this.setState({ subscription: subscription })
  }

  componentWillUnMount() {
    this.state.cable.subscriptions.remove("TodoChannel")
  }

  render () {
    return (
      <div className="todoListContainer">
        <TodoListStatuses />
        <br/>
        <h2>Some list</h2>
        <br/>
        <TodoCreate
          todos={this.state.todos}
          createTodo={this.create.bind(this)} />
        <br/>
        <TodoList
          todos={this.state.todos}
          toggleCompleted={this.toggleCompleted.bind(this)}
          updateTodo={this.update.bind(this)}
          removeTodo={this.remove.bind(this)}
        />
      </div>
    )
  }

  toggleCompleted(id){
    let foundTodo = component.state.todos.find(t => t.id === todo.id)
    this.update({ id: id, completed: !foundTodo.completed })
  }

  update(params, persist){ this.state.subscription.update(params, persist) }

  create(params) { this.state.subscription.create(params) }

  remove(id){ this.state.subscription.delete(id) }
}

TodoListContainer.propTypes = {
  todoListId: React.PropTypes.string.isRequired
}
