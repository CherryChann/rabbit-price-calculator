import React, { Component } from 'react';
import { Container,Row, Col, Button, Card } from 'react-bootstrap';
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
        let differenceDays = differenceInCalendarDays(date, today); /** To get max production of selected date need to know date difference */
        this.setState({
            selectedDate: date,
            startDate: date,
            differenceDays
        });
    }

    getSelectedProduct = (productId) => { /** when product is changed, parent component need to set product Id to pass child component */
        if (productId !== 'placeholder') { 
            const selectedProduct = this.props.products.find(product => product.id === productId)
            this.setState({
                selectedProduct
            });
        } else {
            /** when placeholder is selected, the form needs to set to be initital state */
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
        /** when the quantity of each location has changed, the quanity and price needs to be updated as well. so this 
         * method is called when the quantity input of selected location is changed.
        */
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
        /** to push selectedLocation from map marker to update the state data from parent component
         * according to changes from child component, map
         */
        let price = (selectedLocation.max_dist * this.state.selectedProduct.price_per_unit) + selectedLocation.fee; /* destructure to add price and quantity after selection from map*/ 
        selectedLocation['price'] = price;
        selectedLocation['quantity'] = selectedLocation.max_dist;
        selectedLocation['status'] = true;
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
        /** when remove button is clicked, the selected location needs to be removed and also total unit and total cost needs to updated accordingly*/
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
        /** to call the POST cart end point to save the card object along with locations, selected product and selected date*/
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
                        <Card>
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
                                            <Button variant="primary" onClick={this.showMap}>Add Location</Button>
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
                                        
                                        <Col md={{ span: 4, offset: 4 }} xs="12" className="form-group">
                                            <Button onClick={this.onSubmit} disabled={!this.state.isValid} type="button">
                                                {this.props.cartLoading ? 'Loading' : 'Submit'}
                                            </Button>
                                        </Col>
                                    </Row>
                                    
                                )
                            }
                        </Card> 
                    </Container>  
                }
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    /** to connect data from redux-state with commponent state*/
    return {
        products: state.product.data,
        isLoadingProducts: state.product.isLoading,
        locations: state.location.data,
        isLoadingLocations: state.location.isLoading,
        cartLoading: state.cart.isLoading
    }
};

export default connect(mapStateToProps)(HomePage);