import React, { useState } from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import { Modal } from 'react-bootstrap';
const WrappedMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap 
        defaultZoom = {10}
        defaultCenter = {
            {
                lat: 13.756331,
                lng: 100.501762
            }
        }
    />
));

const mapComponet = ({locations}) => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    return (
        <Modal show={show}
            size = "lg"
            onHide={handleClose}
            backdrop="static"
            keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Location Map</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <WrappedMapComponent 
                        googleMapURL = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyByMdMkdrOqio5sfI8OP3ZZldo9iDf8Jsc"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </Modal.Body>
        </Modal>
    )
}
export default mapComponet;