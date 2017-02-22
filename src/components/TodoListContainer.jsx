import React, { Component } from 'react'
import TodoList from './TodoList';
import TodoCreate from './TodoCreate';

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
        <div className='text-center'>
          <div className="btn-group">
            <button className="btn btn-default active"> All </button>
            <button className="btn btn-default"> Incomplete </button>
            <button className="btn btn-default"> Completed </button>
          </div>
        </div>
        <br/>
        <TodoCreate createTask={this.createTask.bind(this)} />
        <TodoList todos={this.state.todos} />
      </div>
    )
  }

  createTask(title) {
    let id = (this.state.todos.length + 1).toString()
    this.state.todos.push({
      id,
      title,
      completed: false
    })
    this.setState({ todos: this.state.todos })
  }
}

TodoListContainer.propTypes = {
  todoListId: React.PropTypes.string.isRequired
}
