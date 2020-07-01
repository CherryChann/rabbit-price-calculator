import React, { Component } from 'react';
import { Container,Row, Col, Form } from 'react-bootstrap';
import NavBar from '../../../components/navBar';
class HomePage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <NavBar></NavBar>
                <Container>
                    <h5>Rabbit Finance Price Calculator</h5>
                    <Row>
                        <Col lg="4" xs="12">
                            <span>Products: </span>
                        </Col>
                        <Col lg="4" xs="12">
                            <Form.Group>
                                <Form.Control as="select" defaultValue="Select Products...">
                                <option>Select Products...</option>
                                <option>...</option>
                            </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col lg="4" xs="12">
                            <span>Date: </span>
                            
                        </Col>
                        <Col lg="4" xs="12">
                            <span>Date Picker</span>
                        </Col>
                    </Row>
                    <span>Locations</span>

                    <Row>
                        <Col>
                            <span>Locations Table</span>
                        </Col>
                    </Row>
            </Container>
            </div>
            
        )
    }
}

export default HomePage;