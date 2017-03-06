import React from 'react'
import { shallow } from 'enzyme';
import TodoListStatuses from '../../src/components/TodoListStatuses'

const setup = propOverrides => {
  const props = Object.assign({ }, propOverrides)
  const wrapper = shallow(<TodoListStatuses {...props} />)
  return { props, wrapper }
}

describe('TodoListStatuses', () => {
  it('renders as li', () => {
    const { wrapper } = setup()
    expect(wrapper.type()).toBe('div')
  })
})
