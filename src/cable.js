// TODO: This belongs to its own class
/*
import ActionCable from 'actioncable'
const host = `${window.location.hostname}:3000`
const cable = ActionCable.createConsumer(`ws://${host}/cable`)
const subscription = createCableSubscription(cable, store, todoListId)
const connection = subscription.consumer.connection

function createCableSubscription (cable, dispatch, todoListId) {
  return cable.subscriptions.create({ channel: 'TodoChannel', room: todoListId }, {
    create (params) { this.perform('create', { todo_params: params }) },
    update (params) { this.perform('update', { todo_params: params }) },
    remove (id) { this.perform('delete', { id }) },

    received: (data) => {
      let todo = {}

      // Am i calling actions twice? Or actually calling them?
      switch (data['action']) {
        case 'create':
          todo = data['todo']
          dispatch('ADD_TODO', todo)
          break
        case 'update':
          todo = data['todo']
          // let foundTodo = todos.todos.find(t => t.id === todo.id)
          // Object.assign(foundTodo, todo)
          dispatch('UPDATE_TODO', todo.id, todo)
          break
        case 'delete':
          todo = data['todo']
          let index = todos.todos.findIndex(t => t.id === todo.id)
          dispatch('DELETE_TODO', todo.id)
          break
      }
    }
  })
}
*/
