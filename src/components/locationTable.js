import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Button, Form, Alert } from 'react-bootstrap';
import Total from '@components/total';

class locationTableComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quantity: 0,
            price: 0,
            isValid: true,
            message: '',
            selected: {},
            locations: {}
        }
    }
    validQuantity = (quantity, location) => {
        let validStatus = this.checkValidQuantity(quantity, location);
        this.props.setValidStatus(validStatus.status);
        this.props.getPrice(location, quantity, validStatus.status);
        this.setState({
            isValid: validStatus.status,
            message: validStatus.message
        })
    }

    checkValidQuantity = (quantity, location) => {
        console.log('hi there')
        if (quantity < 1 || quantity === '' || quantity === null || Number.isNaN(quantity)) {
            console.log('should be here');
            return {
                status: false,
                message: 'Quantity should be more than zero'
            };
        } else if (quantity > location.max_dist) {
            return {
                status: false,
                message: 'Quantity should not be more than maximum value'
            };;
        } else {
            return {
                status: true,
                message: ''
            };
        }
    }

    render() {
        const { locations, product, onRemove, getPrice,pLocations } = this.props;
        return (
                <div>
                    {
                        !this.state.isValid && (
                            <Alert variant={"danger"}>
                                {this.state.message}
                            </Alert>
                        )
                    }
                    
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Place</th>
                                <th>Unit</th>
                                <th>Cost</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                locations.map((location, index) => (
                                    <tr key={location.id}>
                                        <td>{index+1}</td>
                                        <td>{location.name}</td>
                                        <td>
                                            <Form.Control type = "number"
                                                placeholder = "quantity"
                                                onChange={(event) => {
                                                    this.validQuantity(event.target.value, location);
                                                    // getPrice(location, event.target.value)
                                                }}
                                                defaultValue = {
                                                    location.quantity
                                                }
                                            />
                                        </td>
                                        <td>
                                            {
                                                location.status ?
                                                (product.price_per_unit * location.quantity) + location.fee :
                                                'Calculating'
                                            }
                                        </td>
                                        <td>
                                            <Button onClick={() => onRemove(location)}>Remove</Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
        )
    }
}
locationTableComponent.propTypes = {
    locations: PropTypes.array.isRequired,
    product: PropTypes.object.isRequired,
    pLocations: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    getPrice: PropTypes.func.isRequired,
    setValidStatus: PropTypes.func.isRequired,

};

export default locationTableComponent;
