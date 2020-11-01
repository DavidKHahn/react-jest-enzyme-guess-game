import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';


Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */

const setup = (props={}) => {
    props = { success: true }
    return shallow(<Congrats {...props} />)
};

test('renders without error', () => {

});
test('renders no text when `success` prop is false', () => {

});
test('renders non-empty congrats message when `success` prop is true', () => {

});
