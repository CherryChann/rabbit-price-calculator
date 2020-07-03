import React, {Component} from 'react';
import {
    Container,
    Jumbotron,
    Row,
    Col,
    Card
} from 'react-bootstrap';
import NavBar from '@components/navBar';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

class successPage extends Component {
    render() {
        return (
        <div>
            <NavBar></NavBar>
            <Container>
                <Jumbotron style={{textAlign: 'center'}}>
                    <h1>Success</h1>
                    <p>
                        The cart has already been created 
                    </p>
                    < Row className = "justify-content-md-center" >
                        <Col sm={6}  md={3} lg={3}>
                            <Link 
                            to = {'/'}
                             style={{ textDecoration: 'none'}}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title style={{ color: '#000' }}> <strong>Back to Calculator</strong> </Card.Title>
                                        <i className = "fa fa-calculator fa-4x calculator-icon" ></i>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        
                    </Row>
                </Jumbotron>
            </Container>
        </div>
        )
    }
}

export default successPage;