import React from 'react';
import { shallow } from 'enzyme';
import Report from './index';


const setUp = (props) => {
  const component = shallow(<Report {...props}/>)
  return component;
}

describe('Report component', () => {
  let component;

  beforeEach(() => {
    component = setUp();
  })

  it('should render something', () => {
    expect(component).toBeTruthy()
  })

})