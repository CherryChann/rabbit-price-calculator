import React, { Component } from 'react';
import { Container,Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addDays } from 'date-fns';

import NavBar from '@components/navBar';
import SelectByProduct from '@components/selectByProduct';
import SelectByDate from '@components/selectByDate';
import LoadingProduct from '@components/loading';
import SelectByLocation from '@components/map';
import { getProductsIfNeeded } from '@services/productService'; 
import { getLocationsIfNeeded } from '@services/locationService'; // need to do for pretty directory 

import '../../../custom.scss';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: addDays(new Date(), 1),
            minDate: addDays(new Date(), 1),
            maxDate: addDays(new Date(),7),
            showMap: false,
            selectedProduct: {}
        }
    }
    componentDidMount () {
        const { dispatch } = this.props;
        dispatch(getProductsIfNeeded()); // fetch products list from api
        dispatch(getLocationsIfNeeded()); // fetch locations list from api

    }

    handleChange = (date) => this.setState({
        startDate: date
    });

    getSelectedProduct = (product) => this.setState({
        selectedProduct: product
    });

    showMap = () => this.setState({
        showMap: true
    })
    render() {
        return (
            <div>
                <NavBar></NavBar>
                <Container>
                    {
                        this.props.isLoadingProducts ? 
                        <LoadingProduct/> : 
                        <SelectByProduct products={this.props.products} onClick={this.getSelectedProduct}/>
                    }
                    <SelectByDate startDate={this.state.startDate} minDate={this.state.minDate} maxDate={this.state.maxDate} onChange={this.handleChange} />
                    <Row>
                        <Col lg="2" xs="12">
                            <span>Locations: </span>
                            
                        </Col>
                        <Col lg="3" xs="12" className="form-group">
                            <Button variant="outline-dark" onClick={this.showMap}>Add Location</Button>
                        </Col>
                    </Row>
                    {
                        !this.props.isLoadingLocations && this.state.showMap ?
                        <SelectByLocation locations={this.props.locations} /> : 
                        <LoadingProduct />
                    }
            </Container>
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.product.data,
        isLoadingProducts: state.product.isLoading,
        locations: state.location.data,
        isLoadingLocations: state.location.isLoading
    }
};

export default connect(mapStateToProps)(HomePage);