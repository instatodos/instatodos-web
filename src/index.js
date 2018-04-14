import React from 'react'
import ReactDOM from 'react-dom';
import './scss/base.css'
import TodoListContainer from './components/TodoListContainer'
import registerServiceWorker from './registerServiceWorker'

const todoListId = '6cea4495-9318-4b9b-b05f-c8d19791e550'

ReactDOM.render(
  <TodoListContainer todoListId={todoListId} />,
  document.getElementById('root')
)

registerServiceWorker();
