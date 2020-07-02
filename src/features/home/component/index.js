import React, { Component } from 'react';
import { Container,Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addDays } from 'date-fns';

import NavBar from '@components/navBar';
import SelectByProduct from '@components/selectByProduct';
import SelectByDate from '@components/selectByDate';
import Loading from '@components/loading';
import SelectByLocation from '@components/map';
import LocationTable from '@components/locationTable';
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
            selectedProduct: {},
            selectedDate: '',
            selectedLocations: []
        }
    }
    componentDidMount () {
        const { dispatch } = this.props;
        dispatch(getProductsIfNeeded()); // fetch products list from api
        dispatch(getLocationsIfNeeded()); // fetch locations list from api

    }

    handleChange = (date) => this.setState({
        selectedDate: date
    });

    getSelectedProduct = (productId) => {
        const selectedProduct = this.props.products.find(product => product.id === productId)
        this.setState({
            selectedProduct
        });
    }

    showMap = () => {
        console.log('showmap');
        this.setState({
            showMap: true
        })
    }

    hideMap = () => {
        console.log('hidemap',this.state.selectedProduct);
        this.setState({
            showMap: false
        })
    }

    onSelectLocation = (selectedLocation) => {
        console.log(selectedLocation, 'SelectedLocation', this.state.selectedLocations)
        this.state.selectedLocations.push(selectedLocation);
        this.hideMap();
    }

    removeLocation = (removedLocation) => {
        console.log('remove');
        const result = this.state.selectedLocations.filter(location => location.id !== removedLocation.id)
        this.setState({
            selectedLocations: result
        })

    }
    render() {
        return (
            <div>
                <NavBar></NavBar>
                {
                    this.props.isLoadingProducts && this.props.isLoadingLocations ?
                    <Loading/> :
                    <Container>
                        <SelectByProduct products={this.props.products} onClick={this.getSelectedProduct}/>
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
                            !this.props.isLoadingLocations && this.state.showMap && (
                                <SelectByLocation locations={this.props.locations} mapStatus={true} handleClose={this.hideMap} onSelectLocation={this.onSelectLocation}/> 
                            )
                        }
                        {
                            this.state.selectedLocations.length !== 0 && (
                                < LocationTable locations = {
                                    this.state.selectedLocations
                                }
                                onRemove = {
                                    this.removeLocation
                                }
                                product = {
                                    this.state.selectedProduct
                                }
                                />
                            )
                        }
                    </Container> 
                }
                
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