import React from 'react'
import ReactDOM from 'react-dom'
import { whyDidYouUpdate } from 'why-did-you-update'

if (process.env.NODE_ENV !== 'production') {
  whyDidYouUpdate(React)
}

import TodoListContainer from './components/TodoListContainer'
import './scss/base.scss'

const todoListId = '6cea4495-9318-4b9b-b05f-c8d19791e550'
const rootElement = document.getElementById('root')

ReactDOM.render(<TodoListContainer todoListId={todoListId} />, rootElement)
