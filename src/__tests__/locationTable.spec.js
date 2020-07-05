import React from 'react';
import { shallow, mount } from 'enzyme';
import LocationTable from '@components/locationTable';

let [onRemove, getPrice, setValidStatus] = new Array(3).fill(jest.fn());

const props = {
    locations: [
        {
            id: 1,
            createdAt: "2020-06-29T18:20:23.578Z",
            lat: 13.7398994,
            long: 100.5391488,
            name: "Asoke",
            fee: 1000,
            status: true,
            quantity: 1000,
            max_dist: 1000
        }, {
            id: 2,
            createdAt: "2020-06-29T19:23:58.106Z",
            lat: 13.7398994,
            long: 100.5391488,
            name: "Nana",
            fee: 950,
            status: true,
            quantity: 1500,
            max_dist: 1500
        }, {
            id: 3,
            cratedAt: "2020-06-29T21:41:07.134Z",
            lat: 13.7423522,
            long: 100.5498083,
            name: "Chidlom",
            fee: 1200,
            status: true,
            quantity: 2000,
            max_dist: 2000
        },
    ],
    product: {
        id: 1,
        name: "Flyer - One Sided",
        max_production: {
            "1": 5000,
            "2": 8000,
            "3": 12000
        },
        price_per_unit: 0.01
    }
}

describe('Shallow renderen the table with seletcted locations', () => {
    const container = shallow(
        <LocationTable 
            locations = {props.locations}
            onRemove = {
                onRemove
            }
            product = {
                props.product
            }
            getPrice= {
                getPrice
            }
            setValidStatus= {
                setValidStatus
            }
        />    
    );
    it('should render table with locations', () => {
        expect(container.html()).toMatchSnapshot();
    });

    it('should render selected locations as table row', () => {
        expect(container.find('.table-margin-top').length).toEqual(1);
        expect(container.find('tbody').length).toEqual(1);
        expect(container.find('tbody tr').length).toEqual(3); // mock data of locations array lenght is 3
        let row = container.find('tbody tr').at(0);
        let col = row.find('td').at(1);
        expect(col.text()).toEqual('Asoke')
    });

    it('should accept input for quantity for each location', () => {
        let row = container.find('tbody tr').at(0);
        let col = row.find('td').at(2); // quantity column
        expect(col.find('.mobile-device-input').prop('type')).toEqual('number');
    })

    it('should show error message if quantity of location is less than one', () => {
        let row = container.find('tbody tr').at(0);
        let col = row.find('td').at(2); // quantity column
        let btnCol = row.find('td').at(4); // action column
        col.find('.mobile-device-input').simulate('change', {
            target: {
                value: 0
            }
        })
        expect(container.find('#quantity-erorr').length).toEqual(1); // error shows 
    });

    it('should show error message if quantity of location is more than maximum value of location', () => {
        let row = container.find('tbody tr').at(0);
        let col = row.find('td').at(2); // quantity column
        let btnCol = row.find('td').at(4); // action column
        col.find('.mobile-device-input').simulate('change', {
            target: {
                value: 2000
            }
        })
        expect(container.find('#quantity-erorr').length).toEqual(1); // error shows 
    });
    
    it('should show error message if quantity of location is ok to accept', () => {
        let row = container.find('tbody tr').at(0);
        let col = row.find('td').at(2); // quantity column
        let btnCol = row.find('td').at(4); // action column
        col.find('.mobile-device-input').simulate('change', {
            target: {
                value: 200
            }
        })
        expect(container.find('#quantity-erorr').length).toEqual(0); // no error shows 
    });
});