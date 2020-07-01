import React, { Component } from 'react';
import { Container,Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import NavBar from '../../../components/navBar';
import SelectByProduct from '../../../components/selectByProduct';
import SelectByDate from '../../../components/selectByDate';
import LoadingProduct from '../../../components/loading';
import '../../../custom.scss';
import { getProductsIfNeeded } from '../../../services/productService';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate : new Date(),
            selectedProduct: {}
        }
    }
    
    handleChange = (date) => this.setState({
        startDate: date
    });

    getSelectedProduct = (product) => this.setState({
        selectedProduct: product
    });
    componentDidMount () {
        const { dispatch } = this.props;
        dispatch(getProductsIfNeeded()); // fetch products list from api
    }
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

const mapStateToProps = state => {
    return {
        products: state.product.data,
        isLoadingProducts: state.product.isLoading,
        locations: state.location.data,
        isLoadingLocations: state.location.isLoading
    }
};

export default connect(mapStateToProps)(HomePage);