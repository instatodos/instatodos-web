import _ from 'lodash'
import React, { Component } from 'react'
import ActionCable from 'actioncable-esm'

import TodoListStatuses     from './TodoListStatuses';
import TodoList             from './TodoList';
import TodoCreate           from './TodoCreate';

export default class TodoListContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      todos: [],
      cable: ActionCable.createConsumer('ws://localhost:3000/cable'),
      subscription: {}
    }
  }

  componentWillMount() {
    let component = this
    this.fetchTodos()
    const subscription = this.state.cable.subscriptions.create("TodoChannel", {
      connected() {
        this.perform('follow', { todo_list_id: 1 })
      },
      createTodo(params) {
        this.perform('create_todo', { todo_params: params })
      },
      updateTodo(params) {
        this.perform('update_todo', { todo_params: params })
      },
      deleteTodo(id) {
        this.perform('delete_todo', { id })
      },
      received(data) {
        const todo = JSON.parse(data['todo'])
        switch (data['action']) {
          case 'createTodo':
            component.state.todos.push(todo)
            component.setState({ todos: component.state.todos })
            break
          case 'updateTodo':
            let foundTodo = _.find(component.state.todos, t => t.id === todo.id)
            foundTodo.title = todo.title
            foundTodo.completed = todo.completed
            component.setState({ todos: component.state.todos })
            break
          case 'deleteTodo':
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
          createTodo={this.createTodo.bind(this)} />
        <br/>
        <TodoList
          todos={this.state.todos}
          toggleCompleted={this.toggleCompleted.bind(this)}
          updateTodo={this.updateTodo.bind(this)}
          removeTodo={this.removeTodo.bind(this)}
        />
      </div>
    )
  }

  fetchTodos() {
    const url = 'http://localhost:3000/todo_lists/1'
    let component = this
    fetch(url, {id: 'blah'})
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        let todos = data['todos']
        component.setState({ todos: todos })
      })
      .catch(function(error) {
        console.log('Request failed', error)
      })
  }

  toggleCompleted(id){
    const foundTodo = _.find(this.state.todos, todo => todo.id === id)
    this.updateTodo({ id: id, completed: !foundTodo.completed })
  }

  updateTodo(params){
    this.state.subscription.updateTodo(params)
  }

  createTodo(params) {
    this.state.subscription.createTodo(params)
  }

  removeTodo(id){
    this.state.subscription.deleteTodo(id)
  }
}

TodoListContainer.propTypes = {
  todoListId: React.PropTypes.string.isRequired
}
