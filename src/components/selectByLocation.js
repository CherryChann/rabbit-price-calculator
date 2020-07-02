import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import MapComponent from '@components/map';
const selectLocation = ({ locations, onChange }) => (
    <Row>
        <Col lg="2" xs="12">
            <span>Locations: </span>
            
        </Col>
        <Col lg="3" xs="12" className="form-group">
            <Button variant="outline-dark">Add Location</Button>
        </Col>
    </Row>
)

export default selectLocation;