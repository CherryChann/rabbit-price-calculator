import React, { Component } from 'react';
import { Container,Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addDays,differenceInCalendarDays,format } from 'date-fns';

import NavBar from '@components/navBar';
import SelectByProduct from '@components/selectByProduct';
import SelectByDate from '@components/selectByDate';
import Loading from '@components/loading';
import SelectByLocation from '@components/map';
import LocationTable from '@components/locationTable';
import Total from '@components/total';
import { getProductsIfNeeded } from '@services/productService'; 
import { getLocationsIfNeeded } from '@services/locationService'; 
import { postCart } from '@services/cartService';
import utils from '@utils/index';
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
            differenceDays: 1,
            isValid: true,
            isValidTotalUnit: true,
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

    handleChange = (date) => {
        let today = new Date();
        let differenceDays = differenceInCalendarDays(date, today);
        this.setState({
            selectedDate: date,
            startDate: date,
            differenceDays
        });
    }

    getSelectedProduct = (productId) => {
        if (productId !== 'placeholder') {
            const selectedProduct = this.props.products.find(product => product.id === productId)
            this.setState({
                selectedProduct
            });
        } else {
            this.setState({
                selectedLocations: [],
                selectedProduct: {}
            })
        }
        
    }

    showMap = () => {
        this.setState({
            showMap: true
        })
    }

    hideMap = () => {
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
                    let total = utils.calculateTotalUnits(this.state.selectedLocations);
                    let totalCost = utils.calculateTotalCost(this.state.selectedLocations, this.state.selectedProduct);
                    let isValidTotalUnit = utils.validateTotalUnits(total, this.state.selectedProduct, this.state.differenceDays);
                    this.setState({
                        selectedLocations: result,
                        totalUnits: total,
                        isValidTotalUnit,
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
        selectedLocation['price'] = 10;
        selectedLocation['quantity'] = 10;
        selectedLocation['status'] = true; // need to insert from state
        this.state.selectedLocations.push(selectedLocation);
        let totalUnits = utils.calculateTotalUnits(this.state.selectedLocations);
        let totalCost = utils.calculateTotalCost(this.state.selectedLocations, this.state.selectedProduct);
        let isValidTotalUnit = utils.validateTotalUnits(totalUnits, this.state.selectedProduct, this.state.differenceDays);
        this.setState({
            totalUnits,
            showMap: false,
            isValidTotalUnit,
            totalCost
        })
        
    }

    removeLocation = (removedLocation) => {
        const result = this.state.selectedLocations.filter(location => location.id !== removedLocation.id)
        let totalUnits= utils.calculateTotalUnits(result);
        let totalCost = utils.calculateTotalCost(result, this.state.selectedProduct);
        let isValidTotalUnit = utils.validateTotalUnits(totalUnits, this.state.selectedProduct, this.state.differenceDays);
        this.setState({
            selectedLocations: result,
            isValidTotalUnit,
            totalUnits,
            totalCost
        })

    }

    onSubmit = () => {
        console.log(this.state, this.props);
        let locations = [];
        this.state.selectedLocations.map(location => {
            locations.push({
                locationId: location.id,
                quantity: location.quantity
            })
        })
        let request = {
            date: format(this.state.selectedDate, 'yyyy-MM-dd'),
            productId: this.state.selectedProduct.id,
            locations
        }
        this.props.dispatch(postCart(request, this.props.history));
    }
    render() {
        return (
            <div>
                <NavBar></NavBar>
                {
                    this.props.isLoadingProducts && this.props.isLoadingLocations ?
                    <Loading/> :
                    <Container>
                        <SelectByProduct 
                            products = {this.props.products}
                            onClick = {
                                this.getSelectedProduct
                            }
                        />
                        <SelectByDate 
                            startDate={this.state.startDate} 
                            minDate={this.state.minDate} 
                            maxDate={this.state.maxDate} 
                            onChange={this.handleChange} 
                        />
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
                                <LocationTable 
                                    locations = {this.state.selectedLocations}
                                    onRemove = {
                                        this.removeLocation
                                    }
                                    product = {
                                        this.state.selectedProduct
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
                            <Total 
                                totalCost={this.state.isValid ? this.state.totalCost : 'Calculating'}
                                totalUnits={this.state.isValid ? this.state.totalUnits : 'Calculating'} 
                                days={this.state.differenceDays}
                                date={this.state.selectedDate}
                                product={this.state.selectedProduct}
                            ></Total> 
                            ) 
                        }
                        {
                            this.state.selectedLocations.length !== 0 && this.state.selectedProduct && (
                                <Row>
                                    <Col lg="2" xs="12">
                                       
                                    </Col>
                                    <Col lg="3" xs="12" className="form-group">
                                        <Button onClick={this.onSubmit}>
                                            {this.props.cartLoading ? 'Loading' : 'Submit'}
                                        </Button>
                                    </Col>
                                </Row>
                                
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
        isLoadingLocations: state.location.isLoading,
        cartLoading: state.cart.isLoading
    }
};

export default connect(mapStateToProps)(HomePage);