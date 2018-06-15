import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

test('should render Header correctly', () => {
    const wrapper = shallow( <Header startLogout={()=> {}}/> );
    expect(wrapper).toMatchSnapshot();
})

test('should call startlogout on click', ()=> {
  const onClickSpy= jest.fn();
  const wrapper = shallow( <Header startLogout={onClickSpy}/> );
  wrapper.find('button').simulate('click');
  expect(onClickSpy).toHaveBeenCalled();
});
