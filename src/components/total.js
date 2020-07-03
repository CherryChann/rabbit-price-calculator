import React from 'react';
import { Row, Col, Alert} from 'react-bootstrap';
import { format } from 'date-fns';
const total = ({
        totalCost,
        totalUnits,
        days,
        date,
        product
    }) => {
        return (
            <div>
                {
                    totalUnits > product['max_production'][days] && ( 
                        <Alert variant = {
                            "danger"
                        } >
                            Total units should not be more than &nbsp;
                            {
                                product['max_production'][days]
                            } 
                            &nbsp; for selected date: &nbsp;
                            {
                                format(new Date(date), 'dd-MM-yyyy')
                            }
                        </Alert>
                    )
                }
                <Row className="margin-top">
                    <Col lg="2" xs="12">
                        <span>Total Units: </span>
                    </Col>
                    <Col lg="3" xs="12">
                        <strong>
                            {totalUnits}
                        </strong>
                    </Col>
                </Row>
                <Row className="margin-top">
                    <Col lg="2" xs="12">
                        <span>Total Cost:</span>
                    </Col>
                    <Col lg="3" xs="12">
                        <strong>
                            {totalCost}
                        </strong>
                    </Col>
                </Row>
            </div>
            
        )
    }

export default total;