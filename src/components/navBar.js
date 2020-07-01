import React, { Component } from 'react';
import {
    Navbar,
    Nav
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../custom.scss';

const NavBarComponent = () => (
    < Navbar variant = "dark"
    className="navBar"
    >
        <Nav className="justify-content-end" style={{ float: 'left' }}>
            <Link key={0} to="/" style={{ textDecoration: 'none' }}>
                <Nav.Item className="nav-link" as="li" >
                    <span>Rabbit Finance Price Calculator</span>
                </Nav.Item>
            </Link>
        </Nav>
    </Navbar>
)

export default NavBarComponent;