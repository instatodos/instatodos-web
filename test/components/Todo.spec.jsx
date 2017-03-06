import React from 'react'
import { shallow } from 'enzyme';
import Todo from '../../src/components/Todo'

const setup = propOverrides => {
  const props = Object.assign({
    id: 'abcdef',
    title: 'test todo',
    completed: false,
    toggleCompleted: jest.fn(),
    removeTodo: jest.fn(),
    saveTodo: jest.fn(),
  }, propOverrides)
  const wrapper = shallow(<Todo {...props} />)
  return { props, wrapper }
}

describe('Todo', () => {
  it('renders as li', () => {
    const { wrapper } = setup()
    expect(wrapper.type()).toBe('li')
    expect(wrapper.hasClass('todo')).toBeTruthy
  })
})
