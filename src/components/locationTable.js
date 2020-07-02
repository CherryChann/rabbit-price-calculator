import React from 'react';
import { Table, Button, Form } from 'react-bootstrap';
const locationTableComponent = ({locations, onRemove,product}) => {
    return (
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
                                < Form.Control type = "number"
                                placeholder = "quantity"
                                defaultValue = {
                                    location.max_dist
                                }
                                />
                            </td>
                            <td>{product.name}</td>
                            <td>
                                <Button onClick={() => onRemove(location)}>Remove</Button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
            
        </Table>
        
    )
}

export default locationTableComponent;
