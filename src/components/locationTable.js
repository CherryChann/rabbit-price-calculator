import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Form, Alert } from 'react-bootstrap';
import utils from '@utils/index';
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
        let validStatus = utils.checkValidQuantity(quantity, location);
        this.props.setValidStatus(validStatus.status);
        this.props.getPrice(location, quantity, validStatus.status);
        this.setState({
            isValid: validStatus.status,
            message: validStatus.message
        })
    }

    render() {
        const { locations, product, onRemove } = this.props;
        return (
                <div>
                    {
                        !this.state.isValid && (
                            <Alert variant={"danger"}
                                id='quantity-erorr'>
                                {this.state.message}
                            </Alert>
                        )
                    }
                    
                    <Table responsive="sm" striped bordered className="table-margin-top">
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
                                                className = "text-align-right mobile-device-input"
                                                onChange={(event) => {
                                                    this.validQuantity(event.target.value, location);
                                                }}
                                                defaultValue = {
                                                    location.quantity
                                                }
                                            />
                                        </td>
                                        <td className = "text-align-right" >
                                            {
                                                location.status ?
                                                (product.price_per_unit * location.quantity) + location.fee :
                                                'Calculating'
                                            }
                                        </td>
                                        <td>
                                            <Button onClick={() => onRemove(location)} type="button" disabled={!location.status} className="btn-remove">Remove</Button>
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
    locations: PropTypes.array.isRequired, /* selected location from map */
    product: PropTypes.object.isRequired, /* selected product from product selection */
    onRemove: PropTypes.func.isRequired, /* action when remove button is clicked */
    getPrice: PropTypes.func.isRequired, /* action when quantity of particular location is changed */
    setValidStatus: PropTypes.func.isRequired, /* action to set valid status of quantity of particular location to parent component*/

};

export default locationTableComponent;
