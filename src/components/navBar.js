import React, { Component } from 'react';
import {
    Navbar,
    Nav
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBarComponent = () => (
    <Navbar variant="dark" style={{ justifyContent: 'center', backgroundColor: 'rgb(26,188,156,0.8)' }}>
        <Nav className="justify-content-end" style={{ float: 'left' }}>
            <Link key={0} to="/" style={{ textDecoration: 'none' }}>
                <Nav.Item className="nav-link" as="li" style={{ color: 'white', fontWeight: 'bold' }}>Rabbit Finance Price Calculator</Nav.Item>
            </Link>
        </Nav>
    </Navbar>
)

export default NavBarComponent;