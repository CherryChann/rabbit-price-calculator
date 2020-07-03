import React, {Component} from 'react';
import {
    Container,
    Jumbotron,
    Row,
    Col,
    Card
} from 'react-bootstrap';
import NavBar from '@components/navBar';
import { Link, useHistory } from 'react-router-dom';
import { BarChartFill,Table } from 'react-bootstrap-icons';

class successPage extends Component {
    render() {
        return (
        <div>
            <NavBar></NavBar>
            <Container>
                <Jumbotron style={{textAlign: 'center'}}>
                    <h1>Success</h1>
                    <p>
                        The cart belonging to data has already been created 
                    </p>
                    < Row className = "justify-content-md-center" >
                        <Col sm={6}  md={3} lg={3}>
                            <Link 
                            to = {
                                {
                                    pathname: '/',
                                    state: {
                                        from: '/success'
                                    }
                                }
                            }
                             style={{ textDecoration: 'none'}}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title style={{  color: 'black'}}> <strong>Back to Price Calculator</strong> </Card.Title>
                                        <Table color = "rgba(26, 188, 156, 0.8)" size = {50}/>
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