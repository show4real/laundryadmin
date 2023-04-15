import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Spinner, Button, InputGroup } from "react-bootstrap";
import { login } from "../services/authService";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withAlert } from "react-alert";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
      error: null,
      show: false,
    };
  }

  onChange = (e, state) => {
    this.setState({ [state]: e });
  };

  isValid = () => {
    const { username, password } = this.state;
    const phone = /^([0]\d{10})$/;
    const email =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      password != null &&
      password !== "" &&
      (email.test(username.trim()) || phone.test(username.trim()))
    ) {
      return true;
    }
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { history } = this.props;

    console.log(username);

    this.setState({ loading: true });

    login({ username, password }).then(
      (v) => {
        this.setState({ loading: true });
        window.location.reload();
        history.push("/");
      },
      (error) => {
        this.setState({ loading: false, password: "" });
        this.props.alert.show(
          <div style={{ color: "white", textTransform: "capitalize" }}>
            Invalid username/Password
          </div>,
          {
            timeout: 2000, // custom timeout just for this one alert
            type: "error",
          }
        );
      }
    );
  };

  render() {
    const { show, loading, username, password } = this.state;

    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img
                    src={require("../../assets/images/logo-dark.svg")}
                    alt="logo"
                  />
                </div>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <Form className="pt-3">
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      type="email"
                      placeholder="Username"
                      size="lg"
                      className="h-auto"
                      onChange={(e) =>
                        this.onChange(e.target.value, "username")
                      }
                    />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon
                          icon={show ? faEyeSlash : faEye}
                          style={{ fontSize: 12, cursor: "pointer" }}
                          onClick={() => this.setState({ show: !show })}
                        />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        size="lg"
                        type={show ? "text" : "password"}
                        value={password}
                        onChange={(e) =>
                          this.onChange(e.target.value, "password")
                        }
                        placeholder="Password"
                      />
                    </InputGroup>
                  </Form.Group>
                  <div className="mt-3">
                    <Button
                      disabled={!this.isValid() || loading}
                      type="submit"
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      onClick={this.onSubmit}
                    >
                      {loading ? (
                        <Spinner animation="grow" variant="light blue" />
                      ) : (
                        <span>Sign in</span>
                      )}
                    </Button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <Link
                      to="/auth/forgot-password"
                      className="auth-link text-black"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account?{" "}
                    <Link to="/auth/register" className="text-primary">
                      Create
                    </Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAlert()(Login);
