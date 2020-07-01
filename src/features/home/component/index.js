import React, { Component } from 'react';
import { Container,Row, Col, Button } from 'react-bootstrap';
import NavBar from '../../../components/navBar';
import SelectByProduct from '../../../components/selectByProduct';
import SelectByDate from '../../../components/selectByDate';
import '../../../custom.scss';
import fetchingService from '../../../services/fetchingService';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate : new Date(),
            selectedProduct: {},
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

    getSelectedProduct = (product) => this.setState({
        selectedProduct: product
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
                    <SelectByProduct products={this.state.products} onClick={this.getSelectedProduct}/>
                    <SelectByDate startDate={this.state.startDate} onChange={this.handleChange} />
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