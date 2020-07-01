import React from 'react';
import { Row, Col, Form} from 'react-bootstrap';

const selectByProduct = ({products, onClick}) => (
    <Row className="margin-top">
        <Col lg="2" xs="12">
            <span>Products: </span>
        </Col>
        <Col lg="3" xs="12">
            <Form.Group>
                <Form.Control as="select" defaultValue="Select Products..." 
                    onChange={ value => onClick(value.target.value) } >
                    {products.map((product, index) => (
                        <option value={product.id} key={index}>{product.name}</option>
                    ))}
            </Form.Control>
            </Form.Group>
        </Col>
    </Row>
)

export default selectByProduct;