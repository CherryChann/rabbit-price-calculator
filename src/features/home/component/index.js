import React, { Component } from 'react';
import { Container,Row, Col, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import NavBar from '../../../components/navBar';
import SelectByProduct from '../../../components/selectByProduct';

import fetchingService from '../../../services/fetchingService';
import '../../../custom.scss';
import "react-datepicker/dist/react-datepicker.css";
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate : new Date(),
            products: [{
                name: 'Product 1',
                id: 1
            }, 
            {
                name: 'Product 2',
                id: 2
            }]
            }
    }
    
    handleChange = (date) => this.setState({
        startDate: date
    });

    componentDidMount () {
        // fetch products list from api
        console.log(this.props, 'Props');
    }
    render() {
        return (
            <div>
                <NavBar></NavBar>
                <Container>
                    <SelectByProduct products={this.state.products} />
                    <Row>
                        <Col lg="2" xs="12">
                            <span>Date: </span>
                            
                        </Col>
                        <Col lg="3" xs="12" className="form-group">
                            <DatePicker
                                className="custom-date-picker"
                                selected={this.state.startDate}
                                onChange = {
                                    date => this.handleChange(date)
                                }
                                placeholderText="Select a date after 5 days ago"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="2" xs="12">
                            <span>Locations: </span>
                            
                        </Col>
                        <Col lg="3" xs="12" className="form-group">
                            <Button variant="outline-dark">Add Location</Button>
                        </Col>
                    </Row>
            </Container>
            </div>
            
        )
    }
}

export default HomePage;