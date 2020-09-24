import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../../utilities/utils';

import Header from './Header.tsx';

Enzyme.configure({ adapter: new EnzymeAdapter() })

const setup = (props = {}) => {
    return shallow(<Header {...props} />)
}

test('Header component renders without errors', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "page-header")
    expect(component.length).toBe(1)
})