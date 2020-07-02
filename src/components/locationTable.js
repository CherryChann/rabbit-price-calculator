import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Button, Form, Alert } from 'react-bootstrap';
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
    // componentWillReceiveProps(nextProps) {
    //     if (this.props.product.id !== nextProps.product.idd) {
    //         console.log(nextProps.product.id, 'hi there')
    //         this.props.getQuantity(100, 1);
    //     }
    // }
    calculateQuantity = (quantity, location, product) => {
        let validStatus = true;
        let message = '';
        let qty = 0;
        let result = {}
        let index = 0;
        if (quantity < 1) {
            validStatus = false;
            message = 'more than 1';
        } else if (quantity > location.max_dist) {
            validStatus = false;
            message = 'not be more than maximum value';
        } else {
            result = {
                locationId: location.id,
                quantity: quantity,
                price: (product.price_per_unit * quantity) + location.fee
            }
            this.state.locations[location.name] = result;
        }
        // console.log(typeof(this.state.locations), index, this.state.locations.length)
        this.setState({
            isValid: validStatus,
            message,
            quantity: qty
        })
    }
    render() {
        const { locations, product, onRemove, getPrice,pLocations } = this.props;
        return (
                <div>
                    {
                        !this.state.isValid && (
                            <Alert variant={"danger"}>
                                The quantity should be {this.state.message}
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
                                                    console.log(event.target.value)
                                                    getPrice(location, event.target.value)
                                                }}
                                                defaultValue = {
                                                    location.quantity
                                                }
                                            />
                                        </td>
                                        <td>
                                            {
                                                (product.price_per_unit * location.quantity) + location.fee
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
                    {/* <Row>
                        <Col lg="2" xs="12">
                            <span>Total Units:</span>
                        </Col>
                        <Col lg="3" xs="12" className="form-group">
                        <span><strong>{locations.length}</strong></span>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="2" xs="12">
                            <span>Total Cost:</span>
                        </Col>
                        <Col lg="3" xs="12" className="form-group">
                        <span><strong>{quantity}</strong></span>
                        </Col>
                    </Row> */}
                </div>
        )
    }
}
locationTableComponent.propTypes = {
    locations: PropTypes.array.isRequired,
    product: PropTypes.object.isRequired,
    pLocations: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    getPrice: PropTypes.func.isRequired
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
