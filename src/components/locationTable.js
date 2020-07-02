import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Button, Form } from 'react-bootstrap';
class locationTableComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quantity: 0,
            locations: []
        }
    }

    calculateQuantity = (quantity) => {
        this.setState
    }
    render() {
        const { locations } = this.props;
        return (
                <div>
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
                                                    this.calculateQuantity(event.target.value)
                                                }}
                                                defaultValue = {
                                                    10
                                                }
                                            />
                                        </td>
                                        <td>
                                            {/* {(product.price_per_unit * quantity) + location.fee} */}
                                        </td>

                                        <td>
                                            {
                                                location.fee
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
    onRemove: PropTypes.func.isRequired
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
