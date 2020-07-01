import React from 'react';
import { Row, Col, Form} from 'react-bootstrap';

const loadingProduct = () => (
    <Row className="margin-top">
        <Col lg="2" xs="12">
            <span>Products: </span>
        </Col>
        <Col lg="3" xs="12">
            <Form.Group>
                <Form.Control as="select" defaultValue="Loading" >
                    <option>Loading</option>
            </Form.Control>
            </Form.Group>
        </Col>
    </Row>
)

export default loadingProduct;