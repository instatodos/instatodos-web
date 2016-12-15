import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Task from './task'

export default class TaskList extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    if(!this.props.tasks.length){
      return <span className="fa fa-refresh fa-spin"></span>
    }

    let taskNodes = this.props.tasks.map((task) => {
      return (<Task key={task.id} task={task} />)
    })

    return(
      <div>
        <h2> Todo: {'Title'} </h2>
        <ReactCSSTransitionGroup
          component="ul"
          className="list-group"
          transitionName= "example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          { taskNodes }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}
