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
        console.log(status, 'hihih', max_unit)
        return (
            <div>
                {  
                    status && ( 
                        <Alert 
                            id = "total-units-error"
                            variant = { "danger"} 
                        >
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
                    <Col lg="2" xs="5" className="form-group total-unit-padding-top">
                        <span>Total Units: </span>
                    </Col>
                    <Col lg="3" xs="7">
                        <h4>
                            <Badge variant="secondary" className="badge-vertical-align" id="total-unit-badge">
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
                            <Badge variant="secondary" className="badge-vertical-align" id="total-cost-badge">
                                <strong>{totalCost}</strong>
                            </Badge>
                        </h4>
                    </Col>
                </Row>
            </div>
            
        )
    }

export default total;