import React from 'react'
import ReactDOM from 'react-dom'

import TodoListContainer from './components/TodoListContainer'
import './scss/base.scss'

const todoListId = '6cea4495-9318-4b9b-b05f-c8d19791e550'
const rootElement = document.getElementById('root')

ReactDOM.render(<TodoListContainer todoListId={todoListId} />, rootElement)
