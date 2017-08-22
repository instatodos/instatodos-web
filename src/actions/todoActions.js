import axios from 'axios'

export function fetchTodos() {
  return function (dispatch) {
    const host = `http://${window.location.hostname}:3000`
    axios.get(`${host}/todo_lists/1`)
      .then(response => {
        const todos = response.data.todo_list.todos
        dispatch({ type: 'FETCH_TODOS_FULFILLED', todos })
      })
      .catch(err => {
        dispatch({ type: 'FETCH_TODOS_REJECTED', err })
      })
  }
}

export function fetchTodosRejected(err) {
  return { type: 'FETCH_TODOS_REJECTED', err }
}

export function fetchTodosFulfilled(todos) {
  return { type: 'FETCH_TODOS_FULFILLED', todos }
}

export function createTodo(title) {
  return { type: 'ADD_TODO', title }
}

export function removeTodo(id) {
  return { type: 'DELETE_TODO', id }
}

export function updateTodo(id, props) {
  return { type: 'UPDATE_TODO', id, props }
}

export function toggleTodo(id) {
  return { type: 'TOGGLE_TODO', id }
}
