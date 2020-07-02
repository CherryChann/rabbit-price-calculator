import React, { useState } from 'react';
import { GoogleMap, withGoogleMap, withScriptjs, Marker, InfoWindow } from 'react-google-maps';
import { Row, Col, Modal, Container, Button } from 'react-bootstrap';
import { compose, withProps } from "recompose"

const WrappedMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBg3iAIPcacaGNiW3MudLqiEbLwgfHTHoI",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
    const [selectedLocation, setSelectedLocation ] = useState(null);
    return(
        <GoogleMap
            defaultZoom={12}
            defaultCenter={{  lat: 13.756331, lng: 100.501762 }}
        >
            {props.locations.map(location => (
                <Marker
                    key={location.id}
                    position={{
                        lat: location.lat,
                        lng: location.long
                    }}
                    onClick={() => {
                        setSelectedLocation(location)
                    }}
                />
            ))}
            { selectedLocation && (
                <InfoWindow 
                    position = {
                        {
                            lat: selectedLocation.lat,
                            lng: selectedLocation.long
                        }
                    } 
                    onCloseClick={() => {
                        setSelectedLocation(null)
                    }}>
                    <Container>
                        <Row>
                            <Col className="form-group">
                                <h5>{selectedLocation.name}</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col sx='6' lg='8' className="form-group">Max Units:</Col>
                            <Col className="form-group">{selectedLocation.max_dist}</Col>
                        </Row>
                        <Row>
                            <Col sx='6' lg='8' md='8'sm='8' className="form-group">Fees:</Col>
                            <Col className="form-group">{selectedLocation.fee}</Col>
                        </Row>
                        <Row>
                            <Col className="form-group info-window-button-col"><Button> Add </Button></Col>
                        </Row>
                    </Container>
                    
                </InfoWindow>
            )}
        </GoogleMap>
    )
});


const mapComponet = ({locations, mapStatus, handleClose}) => {
    return (
        <Modal show={mapStatus}
            size = "lg"
            onHide={handleClose}
            backdrop="static"
            keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Location Map</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <WrappedMapComponent
                        locations={locations}
                    />
                </Modal.Body>
        </Modal>
    )
}
export default mapComponet;