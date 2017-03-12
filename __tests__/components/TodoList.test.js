import React from 'react'
import { shallow } from 'enzyme';
import TodoList from '../../src/components/TodoList'

const setup = propOverrides => {
  const props = Object.assign({
    todos: [],
  }, propOverrides)
  const wrapper = shallow(<TodoList {...props} />)
  return { props, wrapper }
}

describe('TodoList', () => {
  it('renders as li', () => {
    const { wrapper } = setup()
    expect(wrapper.type()).toBe('div')
  })
})
