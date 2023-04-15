import React, { Component } from "react";
import { FormGroup, CardHeader, Media, Input, Modal } from "reactstrap";
import { Col, Row, Card, Form, Button, ButtonGroup } from "react-bootstrap";
import { addVendor } from "../services/vendorService";
import { withAlert } from "react-alert";
import { TimePicker } from "antd";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class AddVendor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      loading: false,
      status: false,
      addVendor: props.addVendor,
      toggle: props.toggle,
      err: { email: "", phone: "" },
      fields: {
        country_code: "",
        shop_name: "",
        opening_time: "",
        closing_time: "",
        longitude: "",
        latitude: "",
        description: "",
        distance: "",
      },
      errors: {
        country_code: "",
        shop_name: "",
        opening_time: "",
        closing_time: "",
        longitude: "",
        latitude: "",
        description: "",
        distance: "",
      },
    };
  }

  validate = (name, value) => {
    const { fields } = this.state;
    switch (name) {
      case "country_code":
        if (!value) {
          return "Country code is Required";
        } else {
          return "";
        }
      case "shop_name":
        if (!value) {
          return "Shop name is Required";
        } else {
          return "";
        }
      case "closing_time":
        if (!value) {
          return "Closing time is Required";
        } else {
          return "";
        }
      case "opening_time":
        if (!value) {
          return "Opening time is Required";
        } else {
          return "";
        }
      case "longitude":
        if (!value) {
          return "Longitude is Required";
        } else {
          return "";
        }
      case "latitude":
        if (!value) {
          return "Latitude is Required";
        } else {
          return "";
        }
      case "description":
        if (!value) {
          return "Description is Required";
        } else {
          return "";
        }
      case "distance":
        if (!value) {
          return "Distance is Required";
        } else {
          return "";
        }
      default: {
        return "";
      }
    }
  };

  handleUserInput = (e) => {
    this.setState({
      errors: {
        ...this.state.errors,
        [e.target.name]: this.validate(e.target.name, e.target.value),
      },
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleStatus = (e, state) => {
    this.setState({ [state]: e });
  };

  handleSubmit = (e) => {
    const { fields } = this.state;

    e.preventDefault();
    let validationErrors = {};
    Object.keys(fields).forEach((name) => {
      const error = this.validate(name, fields[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      this.setState({ errors: validationErrors });
      return;
    }
    if (
      fields.country_code &&
      fields.shop_name &&
      fields.longitude &&
      fields.latitude &&
      fields.distance &&
      fields.description &&
      fields.opening_time &&
      fields.closing_time
    ) {
      const data = {
        shop_name: fields.shop_name,
        latitude: fields.latitude,
        longitude: fields.longitude,
        closing_time: fields.closing_time,
        opening_time: fields.opening_time,
        description: fields.description,
        distance: fields.distance,
        country_code: fields.country_code,
      };

      const {
        shop_name,
        country_code,
        latitude,
        longitude,
        opening_time,
        closing_time,
        description,
        distance,
      } = data;

      this.setState({ saving: true });
      addVendor({
        shop_name,
        country_code,
        latitude,
        longitude,
        opening_time,
        closing_time,
        description,
        distance,
      })
        .then((v) => {
          this.setState({
            fields: {
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
              phone: "",
              address: "",
              status: false,
            },
            saving: false,
          });
          this.props.toggle();
          this.props.saved();
        })
        .catch((err) => {
          this.setState({ err });
        });
    }
  };
  render() {
    const { addVendor, toggle, loading, saving, fields, errors } = this.state;

    return (
      <Modal
        className="modal-dialog modal-dialog-centered"
        isOpen={addVendor != null}
        toggle={() => !loading && !saving && toggle}
        style={{ maxWidth: 700, paddingLeft: 100 }}
      >
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Create Vendor</h4>
              <p className="card-description"> </p>
              <form className="forms-sample">
                <Form.Group>
                  <label htmlFor="exampleInputName1">Shop Name</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="Enter Shop Name"
                    name="shop_name"
                    value={fields.shop_name}
                    onChange={(event) => this.handleUserInput(event)}
                  />
                  <div>
                    <span
                      style={{
                        paddingTop: 10,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                      className="text-danger"
                    >
                      {errors.shop_name}
                    </span>
                  </div>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputName1">Country Code</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="Enter Country Code"
                    name="country_code"
                    value={fields.country_code}
                    onChange={(event) => this.handleUserInput(event)}
                  />
                  <div>
                    <span
                      style={{
                        paddingTop: 10,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                      className="text-danger"
                    >
                      {errors.country_code}
                    </span>
                  </div>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputEmail3">Latitude</label>
                  <Form.Control
                    type="number"
                    className="form-control"
                    name="latitude"
                    placeholder="Enter Latitude"
                    value={fields.latitude}
                    onChange={(event) => this.handleUserInput(event)}
                  />
                  <div>
                    <span
                      style={{
                        paddingTop: 10,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                      className="text-danger"
                    >
                      {errors.latitude}
                    </span>
                  </div>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputEmail3">Enter Longitude</label>
                  <Form.Control
                    type="number"
                    className="form-control"
                    name="longitude"
                    placeholder="Enter Longitude"
                    value={fields.longitude}
                    onChange={(event) => this.handleUserInput(event)}
                  />
                  <div>
                    <span
                      style={{
                        paddingTop: 10,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                      className="text-danger"
                    >
                      {errors.longitude}
                    </span>
                  </div>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputPassword4">Distance range</label>
                  <Form.Control
                    type="text"
                    name="distance"
                    className="form-control"
                    placeholder="Enter Distance range"
                    value={fields.distance}
                    onChange={(event) => this.handleUserInput(event)}
                  />
                  <div>
                    <span
                      style={{
                        paddingTop: 10,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                      className="text-danger"
                    >
                      {errors.distance}
                    </span>
                  </div>
                </Form.Group>
                <Row>
                  <Col md={4}>
                    <Form.Group id="Lastname">
                      <Form.Label>Opening Time</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </InputGroup.Text>
                        <TimePicker
                          use24Hours
                          onChange={(time, clock_in) =>
                            this.onChange(clock_in, "clock_in")
                          }
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group id="Lastname">
                      <Form.Label>Clock Out</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </InputGroup.Text>
                        <TimePicker
                          use24Hours
                          onChange={(time, clock_out) =>
                            this.onChange(clock_out, "clock_out")
                          }
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group>
                  <label htmlFor="exampleTextarea1">Description</label>
                  <textarea
                    className="form-control"
                    id="exampleTextarea1"
                    rows="4"
                    name="description"
                    value={fields.description}
                    onChange={(event) => this.handleUserInput(event)}
                  ></textarea>
                  <div>
                    <span
                      style={{
                        paddingTop: 10,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                      className="text-danger"
                    >
                      {errors.description}
                    </span>
                  </div>
                </Form.Group>
                <div style={{ float: "right" }}>
                  <button
                    type="submit"
                    onClick={this.handleSubmit}
                    className="btn btn-dark btn-sm"
                  >
                    Save
                  </button>

                  <button
                    onClick={toggle}
                    className="btn btn-outline-dark btn-sm"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default withAlert()(AddVendor);
