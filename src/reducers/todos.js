const initialState = {
  todos: [],
  fetching: false,
  fetched: false,
  error: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_TODOS': {
      return {...state, fetching: true}
    }

    case 'FETCH_TODOS_REJECTED': {
      return {...state, false: false, error: action.error}
    }

    case 'FETCH_TODOS_FULFILLED': {
      return {...state, fetching: false, fetched: true, todos: action.todos}
    }

    case 'ADD_TODO': {
      const todo = {
        id: state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: false,
        title: action.title
      }
      return {...state,  todos: state.todos.concat(todo)}
    }

    case 'UPDATE_TODO': {
      const title = action.props.title
      const user_editing = action.props.user_editing
      const new_attributes = { title, user_editing }

      return state.map( todo =>
        todo.id === action.id ? { ...todo, new_attributes } : todo
      )
    }

    case 'TOGGLE_TODO': {
      const completed = !action.todo.completed

      return state.map( todo =>
        todo.id === action.id ? { ...todo, completed } : todo
      )
    }

    case 'DELETE_TODO':
      return state.todos.filter(todo => todo.id !== action.id)

    default:
      return state
  }
}
