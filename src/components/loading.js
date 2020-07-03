import React from 'react';
import { Container, Row, Col, Card} from 'react-bootstrap';

const loadingProduct = () => (
    <Container>
        <Card>
            <Row className="margin-top">
                <Col md={{ span: 4, offset: 4 }} xs="12" className="form-group text-align-center">
                    <i className = "fa fa-spinner fa-spin fa-5x spinner-icon"> </i>
                </Col>
            </Row>
        </Card>
        
    </Container>
    
)

export default loadingProduct;