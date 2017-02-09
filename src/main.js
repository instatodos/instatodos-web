import React from 'react'
import ReactDOM from 'react-dom'
// import { Navbar, Jumbotron, Button } from 'react-bootstrap'

import TaskList from './components/task-list';

import 'font-awesome/scss/font-awesome.scss'
import './scss/base.scss'

let tasks = [{
  id: 1,
  title: 'do',
  completed: true
}, {
  id: 2,
  title: 'du',
  completed: false
}]

ReactDOM.render(
  <TaskList tasks={tasks}/>,
  document.getElementById('root')
)
