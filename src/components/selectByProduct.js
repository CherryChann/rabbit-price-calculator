import React from 'react';
import { Row, Col, Form} from 'react-bootstrap';

const selectByProduct = ({products, onClick}) => (
    <Row className="margin-top">
        <Col lg="2" xs="12">
            <span>Products: </span>
        </Col>
        <Col lg="3" xs="12">
            <Form.Group>
                <Form.Control as="select" defaultValue="placeholder"
                    onChange={ value => onClick(value.target.value) } >
                    <option value="placeholder"> Select Products...</option>
                    {products.map((product) => (
                        <option value={product.id} key={product.id}>{product.name}</option>
                    ))}
                </Form.Control>
            </Form.Group>
        </Col>
    </Row>
)

export default selectByProduct;