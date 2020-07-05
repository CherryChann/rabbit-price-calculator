import React from 'react';
import { shallow, mount } from 'enzyme';
import SelectByProduct from '../components/selectByProduct';

const onClick = (value) => { 
    console.log(value, 'mock function');
}
const props = {
    products: [
        {
            id: 1,
            name: "Flyer - One Sided",
            max_production: {
                "1": 5000,
                "2": 8000,
                "3": 12000
            },
            price_per_unit: 0.01
        }, {
            id: 2,
            name: "Flyer - Two Sided",
            max_production: {
                "1": 3000,
                "2": 6000,
                "3": 9000
            },
            price_per_unit: 0.017
        }
    ],
    onClick: onClick
}

describe('Shallow rendered select by product component ', () => {
    const container = shallow(
        <SelectByProduct
            products={props.products}
            selectedProduct={props.products[1]}
            onClick={props.onClick}
        />);
    it('should render select box with products', () => {
        expect(container.html()).toMatchSnapshot();
    });

    it('should have correct props, called props function and fire selected product', () => {
        expect(container.find('.product-selection').prop('as')).toEqual('select');
        expect(container.find('option').length).toEqual(3); // including placeholder option and products
        container.find('.product-selection').simulate('change', {
            target: {
                value: 2
            }
        })
        expect(container.find('.product-selection').prop('value')).toEqual(2);
    })

    it('should select placeholder if selected product is not fired', () => {
        const container = shallow(
        <SelectByProduct
            products={props.products}
            onClick={props.onClick}
        />);
        expect(container.find('.product-selection').prop('value')).toEqual('placeholder');
    })
});