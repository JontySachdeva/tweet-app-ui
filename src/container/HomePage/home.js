import React, { Component } from "react";
import Crousel from "../Crousel/Crousel";
import { Container } from "react-bootstrap";
import AuthService from "../../service/AuthenticationService";
import Items from "../../components/ItemsCard/item/item";
import NavBar from "../../components/NavigationCompnents/NavItems/NavItem";
class Home extends Component {
  state = {};
  render() {
    AuthService.isUserLoggedIn();
    return (
      <Container fluid>
        <NavBar />
        <Crousel />
        <Items />
      </Container>
    );
  }
}

export default Home;
