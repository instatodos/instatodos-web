import React from 'react'
import { shallow } from 'enzyme';
import TodoListContainer from '../../src/components/TodoListContainer'

const setup = propOverrides => {
  const props = Object.assign({ todoListId: 'uuid' }, propOverrides)
  const wrapper = shallow(<TodoListContainer {...props} />)
  return { props, wrapper }
}

describe('TodoListContainer', () => {
  it('renders as div', () => {
    const { wrapper } = setup()
    expect(wrapper.type()).toBe('div')
    expect(wrapper.hasClass('todoListContainer')).toBeTruthy
  })

  it('contains the list title', () => {
    const { wrapper } = setup()
    expect(wrapper.find(<h2>Some list</h2>)).toBeDefined
  })

  it('contains the todo list statuses selector', () => {
    const { wrapper } = setup()
    expect(wrapper.find('TodoListStatuses')).toBeDefined
  })

  it('contains the todo creation component', () => {
    const { wrapper } = setup()
    expect(wrapper.find('TodoCreate')).toBeDefined
  })

  it('contains the todo list', () => {
    const { wrapper } = setup()
    expect(wrapper.find('TodoList')).toBeDefined
  })
})
