import React from 'react';
import { shallow, mount } from 'enzyme';
import SelectByProduct from '../components/selectByProduct';
import { Row, Col, Form} from 'react-bootstrap';

const onClick = (value) => { 
    console.log(value, 'mock function');
}
const props = {
    products: [
        {
            id: 1,
            name: 'product 1'
        },
        {
            id: 2,
            name: 'product 2'
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