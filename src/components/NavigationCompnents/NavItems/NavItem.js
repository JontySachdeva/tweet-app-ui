import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Cookies from "js-cookie";
class NavItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: Cookies.get("user_id"),
    };
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="https://1000logos.net/wp-content/uploads/2017/06/emblem-Twitter.jpg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          Tweet App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link as={Link} to="/">
              Home
            </Nav.Link> */}
            <Nav.Link as={Link} to="/Login">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavItem;
