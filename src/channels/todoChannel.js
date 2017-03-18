class todoChannel = App.cable.subscriptions.create("TodoChannel", {
  connected() {
    this.perform('follow', { todo_id: 1 })
  },

  createTodo(todo) {
    this.perform('create_todo', { todo: todo })
  },

  updateTask: updateTask(task) => {
    this.perform('update_task', { task: task })
  },

  destroyTask: destroyTask(id) => {
    this.perform('destroy_task', { id: id })
  },

  received: received(data) => {
    let task = JSON.parse(data['task'])
    switch (data['action']) {
      case 'create_task':
        TodoServerActionCreators.receiveCreatedTask(task)
        break
      case 'update_task':
        TodoServerActionCreators.receiveUpdatedTask(task)
        break
      case 'destroy_task':
        TodoServerActionCreators.receiveDeletedTask(task)
        break
    }
  }
})
