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
import Total from '@components/total';
import { getProductsIfNeeded } from '@services/productService'; 
import { getLocationsIfNeeded } from '@services/locationService'; // need to do for pretty directory 

import '../../../custom.scss';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalUnits: 0,
            totalCost: 0,
            startDate: addDays(new Date(), 1),
            minDate: addDays(new Date(), 1),
            maxDate: addDays(new Date(),7),
            isValid: true,
            showMap: false,
            selectedProduct: {},
            selectedDate: '',
            selectedLocations: [],
            locations: {}
        }
    }
    componentDidMount () {
        const { dispatch } = this.props;
        dispatch(getProductsIfNeeded()); // fetch products list from api
        dispatch(getLocationsIfNeeded()); // fetch locations list from api
    }

    handleChange = (date) => {
        this.setState({
            selectedDate: date,
            startDate: date
        });
    }

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

    getQuantity = (location, quantity, status) => {
        
        this.state.selectedLocations.map((stateLocation) => {
            if (stateLocation.id === location.id) {
                stateLocation.status = status
                if(status) {
                    stateLocation.quantity = parseInt(quantity);
                    stateLocation.price = location.fee + (this.state.selectedProduct.price_per_unit * parseInt(quantity))
                    let result = this.state.selectedLocations;
                    let total = this.calculateTotalUnits(this.state.selectedLocations);
                    let totalCost = this.calculateTotalCost(this.state.selectedLocations);
                    this.setState({
                        selectedLocations: result,
                        totalUnits: total,
                        totalCost
                    })
                }
            }
        });
        
        
    }

    setValidStatus = (status) => {
        this.setState({
            isValid: status
        })
    }
    onSelectLocation = (selectedLocation) => {
        console.log(selectedLocation, 'SelectedLocation', this.state.selectedLocations)
        selectedLocation['price'] = 10;
        selectedLocation['quantity'] = 10;
        selectedLocation['status'] = true; // need to insert from state
        this.state.selectedLocations.push(selectedLocation);
        let total = this.calculateTotalUnits(this.state.selectedLocations);
        let totalCost = this.calculateTotalCost(this.state.selectedLocations);
        this.setState({
            totalUnits: total,
            showMap: false,
            totalCost
        })
        
    }

    calculateTotalUnits = (locations) => {
        let total = 0;
        locations.map(location => {
            total += location.quantity
        })
        return total;
    }

    calculateTotalCost = (locations) => {
        let totalCost = 0;
        locations.map(location => {
            let locationCost = location.fee + (this.state.selectedProduct.price_per_unit * parseInt(location.quantity))
            totalCost += locationCost;
        })
        return totalCost;
    }
    removeLocation = (removedLocation) => {
        const result = this.state.selectedLocations.filter(location => location.id !== removedLocation.id)
        let total = this.calculateTotalUnits(result);
        let totalCost = this.calculateTotalCost(result);
        this.setState({
            selectedLocations: result,
            totalUnits: total,
            totalCost
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
                        < SelectByProduct products = {
                            this.props.products
                        }
                        onClick = {
                            this.getSelectedProduct
                        }
                        />
                        <SelectByDate startDate={this.state.startDate} minDate={this.state.minDate} maxDate={this.state.maxDate} onChange={this.handleChange} />
                        {
                            Object.entries(this.state.selectedProduct).length !== 0 && this.state.selectedDate && (
                                <Row>
                                    <Col lg="2" xs="12">
                                        <span>Locations: </span>
                                        
                                    </Col>
                                    <Col lg="3" xs="12" className="form-group">
                                        <Button variant="outline-dark" onClick={this.showMap}>Add Location</Button>
                                    </Col>
                                </Row>
                                
                            )
                        }
                        {
                            !this.props.isLoadingLocations && this.state.showMap && (
                                <SelectByLocation 
                                    locations={this.props.locations} 
                                    mapStatus={true} 
                                    handleClose={this.hideMap} 
                                    selectedLocations={this.state.selectedLocations}
                                    onSelectLocation={this.onSelectLocation}/> 
                            )
                        }
                        {
                            this.state.selectedLocations.length !== 0 && this.state.selectedProduct && (
                                <LocationTable locations = {
                                    this.state.selectedLocations
                                }
                                onRemove = {
                                    this.removeLocation
                                }
                                product = {
                                    this.state.selectedProduct
                                }
                                pLocations = {
                                    this.state.locations
                                }
                                getPrice= {
                                    this.getQuantity
                                }
                                setValidStatus= {
                                    this.setValidStatus
                                }
                                />
                            )
                        }
                        {
                            this.state.selectedLocations.length !== 0 && this.state.selectedProduct &&  (
                            <Total text="Total Units:" value={this.state.isValid ? this.state.totalUnits : 'Calculating'}></Total> 
                            ) 
                        }
                        {/* {
                            this.state.selectedLocations.length !== 0 && this.state.selectedProduct && this.state.isValid ? 
                            <Total text="Total Cost:" value={this.state.totalUnits}></Total> : 
                            <Total text="Total Cost:" value={'Calculating'}></Total>
                        } */}
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