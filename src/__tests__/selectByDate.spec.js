import React from 'react';
import { shallow, mount } from 'enzyme';
import SelectByDate from '../components/selectByDate';

const onChange = () => { console.log('Mock Function')}
const props = {
    startDate: new Date(),
    minDate: new Date(),
    maxDate: new Date(),
    onChange: onChange
}

describe('Shallow rendered select by date component', () => {
    const container = shallow(
        <SelectByDate 
            startDate={props.startDate}
            minDate={props.minDate}
            maxDate={props.maxDate}
            onChange={props.onChange}
        />);
    it('should render date picker', () => {
        expect(container.html()).toMatchSnapshot();
    });
    it('should have correct props, called props function and fire selected date', () => {
        expect(container.find('.custom-date-picker').length).toEqual(1);
        expect(container.find('.custom-date-picker').prop('minDate')).toEqual(props.minDate);
        expect(container.find('.custom-date-picker').prop('maxDate')).toEqual(props.maxDate);
        expect(container.find('.custom-date-picker').prop('selected')).toEqual(props.startDate);
        container.find('.custom-date-picker').simulate('change', {
            target: {
                value: props.maxDate
            }
        })
        expect(container.find('.custom-date-picker').prop('selected')).toEqual(props.maxDate);
    })
});