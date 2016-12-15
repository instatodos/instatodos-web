import React from 'react'
import { shallow } from 'enzyme'
import TaskList from '../../src/components/task-list'

describe('(Container) TaskList', () => {
  it('renders as a <div>', () => {
    const wrapper = shallow(<TaskList />)
    expect(wrapper.type()).to.eql('div')
  })

  it('contains a header with the list title', () => {
    const wrapper = shallow(<TaskList />)
    expect(wrapper.find('h2')).to.have.length(1)
  })
});
