import React, { useState } from 'react';
import { GoogleMap, withGoogleMap, withScriptjs, Marker, InfoWindow } from 'react-google-maps';
import { Modal } from 'react-bootstrap';
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
                    <div>{selectedLocation.name}</div>
                </InfoWindow>
            )}
        </GoogleMap>
    )
});


const mapComponet = ({locations, mapStatus, handleClose}) => {
    // const [show, setShow] = useState(true);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
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