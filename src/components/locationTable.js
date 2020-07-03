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
    
    // calculateQuantity = (quantity, location, product) => {
    //     let validStatus = true;
    //     let message = '';
    //     let qty = 0;
    //     let result = {}
    //     let index = 0;
    //     if (quantity < 1) {
    //         validStatus = false;
    //         message = 'more than 1';
    //     } else if (quantity > location.max_dist) {
    //         validStatus = false;
    //         message = 'not be more than maximum value';
    //     } else {
    //         result = {
    //             locationId: location.id,
    //             quantity: quantity,
    //             price: (product.price_per_unit * quantity) + location.fee
    //         }
    //         this.state.locations[location.name] = result;
    //     }
    //     // console.log(typeof(this.state.locations), index, this.state.locations.length)
    //     this.setState({
    //         isValid: validStatus,
    //         message,
    //         quantity: qty
    //     })
    // }

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
                                        <td> {
                                            location.status
                                        } </td>
                                        <td>
                                            <Button onClick={() => onRemove(location)}>Remove</Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                     {/* {
                        locations.length !== 0 && product && (
                            <Total text="Total Units:" value={this.state.totalUnits}></Total>
                        )
                    }
                    {
                        locations.length !== 0 && product && (
                            <Total text="Total Cost:" value={this.state.totalCost}></Total>
                        )
                    } */}
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
// const locationTableComponent = ({locations, onRemove,product, getQuantity}) => {
//     const [quantity, setQuantity] = useState(0);

//     return (
//         <div>
//             <Table responsive="sm">
//                 <thead>
//                     <tr>
//                         <th>No</th>
//                         <th>Place</th>
//                         <th>Unit</th>
//                         <th>Cost</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         locations.map((location, index) => ( 
//                             <tr key={location.id}>
//                                 <td>{index+1}</td>
//                                 <td>{location.name}</td>
//                                 <td>
//                                     <Form.Control type = "number"
//                                     placeholder = "quantity"
//                                     onChange={(event) => {
//                                         console.log(event.target.value, typeof(quantity))
//                                         // getQuantity(location, event.target.value);
//                                         setQuantity(quantity+ parseInt(event.target.value))
//                                     }}
//                                     defaultValue = {
//                                         10
//                                     }
//                                     />
//                                 </td>
//                                 <td>
//                                     {(product.price_per_unit * quantity) + location.fee}
//                                 </td>
                                    
//                                 <td>
//                                     {
//                                         location.fee
//                                     }
//                                 </td>
//                                 <td>
//                                     <Button onClick={() => onRemove(location)}>Remove</Button>
//                                 </td>
//                             </tr>
//                         ))
//                     }
//                 </tbody>
//             </Table>
//             <Row>
//                 <Col lg="2" xs="12">
//                     <span>Total Units:</span>
//                 </Col>
//                 <Col lg="3" xs="12" className="form-group">
//                 <span><strong>{locations.length}</strong></span>
//                 </Col>
//             </Row>
//             <Row>
//                 <Col lg="2" xs="12">
//                     <span>Total Cost:</span>
//                 </Col>
//                 <Col lg="3" xs="12" className="form-group">
//                 <span><strong>{quantity}</strong></span>
//                 </Col>
//             </Row>
//         </div>
       
        
//     )
// }

export default locationTableComponent;
