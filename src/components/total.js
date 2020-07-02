import React from 'react';
import { Row, Col} from 'react-bootstrap';

const total = ({text, value}) => (
    <Row className="margin-top">
        <Col lg="2" xs="12">
            <span>{text}</span>
        </Col>
        <Col lg="3" xs="12">
            <strong>
                {value}
            </strong>
        </Col>
    </Row>
)

export default total;