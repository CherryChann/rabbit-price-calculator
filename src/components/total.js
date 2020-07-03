import React from 'react';
import { Row, Col, Alert} from 'react-bootstrap';
import { format } from 'date-fns';
const total = ({
        text,
        value,
        days,
        date,
        product
    }) => {
        return (
            <div>
            {
                value > product['max_production'][days] && ( 
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
                    <span>{text}{product.name} {value > product['max_production'][days]}</span>
                </Col>
                <Col lg="3" xs="12">
                    <strong>
                        {value}
                    </strong>
                </Col>
            </Row>
            </div>
            
        )
    }

export default total;