import React from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import "./signup.css";
import { Alert } from "react-bootstrap";
import userService from "../../service/user-service";
import { Redirect } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
const SIGNUP_SUCCESS = "Signup successful.";

const SIGNUP_ERROR = "Please try again later.";

function passwordValidate(pass) {
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})"
  );
  if (strongRegex.test(pass)) {
    return false;
  } else {
    return true;
  }
}

function validate(state) {
  const errors = [];

  if (state.firstName === "") {
    errors.push("First name is required");
  }
  if (state.lastName === "") {
    errors.push("Last name is required");
  }
  if (state.email.length < 5) {
    errors.push("Email should be at least 5 charcters long");
  }
  if (state.email.split("").filter((x) => x === "@").length !== 1) {
    errors.push("Email should contain a @");
  }
  if (state.email.indexOf(".") === -1) {
    errors.push("Email should contain at least one dot");
  }
  if (state.password.length < 8 || passwordValidate(state.password)) {
    errors.push("Password should be at least 6 characters long");
  }

  return errors;
}
export default class SignupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName:"",
      lastName:"",
      loginId:"",
      email: "",
      password: "",
      hiddenPassword: true,
      signupSuccess: false,
      signupError: false,
      confirmPassword:"",
      phoneNumber:""
    };
  }
  handleEmailChange = (eve) => {
    this.setState({ email: eve.target.value });
  };
  handlePhoneChange = (eve) => {
    this.setState({ phoneNumber: eve.target.value });
  };
  handleFirstNameChange = (eve) => {
    if (eve.target.value.match("^[A-Za-z]*$") != null) {
      this.setState({ firstName: eve.target.value });
    } else {
      this.setState({ error: "Enter a valid firstname" });
    }
  };
  handleLastNameChange = (eve) => {
    if (eve.target.value.match("^[A-Za-z]*$") != null) {
      this.setState({ lastName: eve.target.value });
    } else {
      this.setState({ error: "Enter a valid lastname" });
    }
  };
  handleLoginIdChange = (eve) => {
    this.setState({ loginId: eve.target.value });
  };
  handleCityChange = (eve) => {
    this.setState({ city: eve.target.value });
  };
  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };
  handleConfirmPasswordChange = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };

  togglePassword = (e) => {
    this.setState({ hiddenPassword: !this.state.hiddenPassword });
  };

  submitSignUpRequest = (event) => {
    event.preventDefault();
    const state = this.state;
    const errors = validate(state);
    event.target.className += " was-validated";

    if (errors.length > 0) {
      return;
    } else {
      var signupData = {
        firstName:this.state.firstName,
        lastName:this.state.lastName,
        loginId:this.state.loginId,
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        phoneNumber:this.state.phoneNumber
      };
      trackPromise(
        userService.signup(signupData).then((response) => {
          if (response.status===200) {
            this.setState({
              signupSuccess: true,
              signupError: false,
              signupMessage: response.message,
            });
          }
         
         
        })
      ).catch((err) => {
        var errorResponse = "";
        if (err.response) errorResponse = err.response.data.message;
        else errorResponse = SIGNUP_ERROR;
          
        this.setState({
          signupError: true,
          signupSuccess: false,
          errorMessage: errorResponse,
        });
      });
    }
  };

  render() {
    const hideiconstyle = this.state.hiddenPassword ? { display: "none" } : {};
    const showiconstyle = !this.state.hiddenPassword ? { display: "none" } : {};
    if (this.state.signupSuccess)
      return (
        <Redirect
          to={{
            pathname: "/Login",
            state: {
              isLoggedIn: true,
              email: this.state.email,
            },
          }}
        />
      );

    return (
      <React.Fragment>
        <Container>
          <form
            className="signup-form"
            onSubmit={this.submitSignUpRequest}
            noValidate
          >
            <Row>
              <Col>
                <h3>Sign Up</h3>
                <br />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formSignUpFirstName">
                  <Form.Label>FirstName</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    onChange={this.handleFirstNameChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide First Name
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formLastName">
                  <Form.Label>LastName</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    onChange={this.handleLastNameChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide Last Name
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formUserName">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    onChange={this.handleLoginIdChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide username
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formSignUpEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={this.handleEmailChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide a valid email
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formSignUpPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Phone Number"
                    onChange={this.handlePhoneChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide a valid phonenumber
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formSignUpPassword">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="Password"
                      type={this.state.hiddenPassword ? "password" : "text"}
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                      required
                    />
                    <InputGroup.Append>
                      <InputGroup.Text
                        onClick={this.togglePassword}
                        style={showiconstyle}
                      >
                        <i className="fa fa-eye" aria-hidden="true"></i>
                      </InputGroup.Text>
                      <InputGroup.Text
                        onClick={this.togglePassword}
                        style={hideiconstyle}
                      >
                        <i className="fa fa-eye-slash" aria-hidden="true"></i>
                      </InputGroup.Text>
                    </InputGroup.Append>
                    <div className="invalid-feedback">
                      Password must be 6 characters long It should contain a
                      number and <br></br> contain , uppercase and lowercase
                      letter
                    </div>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formSignUpPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="Password"
                      type={this.state.hiddenPassword ? "password" : "text"}
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      value={this.state.confirmPassword}
                      onChange={this.handleConfirmPasswordChange}
                      required
                    />
                    <InputGroup.Append>
                      <InputGroup.Text
                        onClick={this.togglePassword}
                        style={showiconstyle}
                      >
                        <i className="fa fa-eye" aria-hidden="true"></i>
                      </InputGroup.Text>
                      <InputGroup.Text
                        onClick={this.togglePassword}
                        style={hideiconstyle}
                      >
                        <i className="fa fa-eye-slash" aria-hidden="true"></i>
                      </InputGroup.Text>
                    </InputGroup.Append>
                    <div className="invalid-feedback">
                      Password must be 8 characters long It should contain a
                      number and <br></br> contain , uppercase and lowercase
                      letter
                    </div>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Alert
                  variant="success"
                  className={!this.state.signupSuccess ? "hidden" : ""}
                >
                  {this.state.signupSuccess || SIGNUP_SUCCESS}
                </Alert>
                <Alert
                  variant="danger"
                  className={!this.state.signupError ? "hidden" : ""}
                >
                  {this.state.errorMessage || SIGNUP_ERROR}
                </Alert>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  variant="outline-dark"
                  type="submit"
                  className="btn-signup"
                  size="lg"
                  block
                >
                  Sign Up
                </Button>
              </Col>
            </Row>
          </form>
        </Container>
      </React.Fragment>
    );
  }
}
