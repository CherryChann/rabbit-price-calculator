import React from 'react';
import { shallow, mount } from 'enzyme';
import Total from '../components/total';
import { addDays } from 'date-fns';

const onClick = (value) => { 
    console.log(value, 'mock function');
}
const props = {
    totalCost: 3480,
    totalUnits: 1200,
    product: {
        id: 1,
        name: "Flyer - One Sided",
        max_production: {
            "1": 5000,
            "2": 8000,
            "3": 12000
        },
        price_per_unit: 0.01
    },
    days: 4,
    date: addDays(new Date(), 4),
    onClick: onClick
}

describe('Shallow rendered total component ', () => {
    const container = shallow(
        <Total 
            totalCost={props.totalCost}
            totalUnits={props.totalUnits} 
            days={props.days}
            date={props.date}
            product={props.product}
        ></Total>);
    it('should render select box with products', () => {
        expect(container.html()).toMatchSnapshot();
    });

    it('should have correct props', () => {
        let totalUnit = container.find('#total-unit-badge')
        expect(totalUnit.text()).toEqual("1200")
        let totalCost = container.find('#total-cost-badge')
        expect(totalCost.text()).toEqual("3480")
    })

    it('should show the alert box if quantity is more than max production of product according to date', () => {
        const container = shallow(
            <Total 
                totalCost={10000}
                totalUnits={100000} 
                days={props.days}
                date={props.date}
                product={props.product}
            ></Total>);
        expect(container.find('#total-units-error').length).toEqual(1);
    })
});