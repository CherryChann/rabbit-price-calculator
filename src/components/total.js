import React from 'react';
import { Row, Col, Alert, Badge} from 'react-bootstrap';
import { format } from 'date-fns';
const total = ({
        totalCost,
        totalUnits,
        days,
        date,
        product
    }) => {
        let max_unit = days > 3 ? product['max_production'][3] : product['max_production'][days];
        let status = totalUnits > max_unit;
        return (
            <div>
                {  
                    totalUnits > max_unit && ( 
                        <Alert variant = {
                            "danger"
                        } >
                            Total units should not be more than &nbsp;
                            {
                                max_unit
                            } 
                            &nbsp; for selected date: &nbsp;
                            {
                                format(new Date(date), 'dd-MM-yyyy')
                            }
                        </Alert>
                    )
                }
                <Row className="margin-top">
                    <Col lg="2" xs="5" className="form-group">
                        <span>Total Units: </span>
                    </Col>
                    <Col lg="3" xs="7">
                        <h4>
                            <Badge variant="secondary">
                                <strong> 
                                    {totalUnits} 
                                </strong>
                            </Badge>
                        </h4>
                    </Col>
                </Row>
                <Row className="margin-top">
                    <Col lg="2" xs='5' className="form-group">
                        <span>Total Cost:</span>
                    </Col>
                    <Col lg="3" xs='7'>
                        <h4>
                            <Badge variant="secondary">
                                <strong>{totalCost}</strong>
                            </Badge>
                        </h4>
                    </Col>
                </Row>
            </div>
            
        )
    }

export default total;