import React from 'react'
import { shallow } from 'enzyme';
import TodoCreate from '../../src/components/TodoCreate'

const setup = propOverrides => {
  const props = Object.assign({
    todos: [],
    createTodo: jest.fn(),
  }, propOverrides)
  const wrapper = shallow(<TodoCreate {...props} />)
  return { props, wrapper }
}

describe('TodoCreate', () => {
  it('renders as form', () => {
    const { wrapper } = setup()
    expect(wrapper.type()).toBe('form')
  })
})
