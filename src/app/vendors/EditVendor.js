import React, { Component } from "react";
import { FormGroup, CardHeader, Media, Input, Modal } from "reactstrap";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  ButtonGroup,
  InputGroup,
} from "react-bootstrap";
import { editVendor } from "../services/userService";
import { withAlert } from "react-alert";
import { addVendor } from "../services/vendorService";
import { TimePicker } from "antd";
import moment from "moment";
import ReactDatetime from "react-datetime";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class EditVendor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      loading: false,
      vendor: props.vendor,
      user: props.vendor.user,
      user_id: props.vendor.user.id,
      toggle: props.toggle,
      opening_time: props.vendor.opening_time,
      closing_time: props.vendor.closing_time,
      err: { email: "", phone: "" },
      fields: {
        country_code: props.vendor.country_code,
        shop_name: props.vendor.shop_name,
        longitude: props.vendor.longitude,
        latitude: props.vendor.latitude,
        description: props.vendor.description,
        distance: props.vendor.distance,
        delivery_fee: props.vendor.delivery_fee,
      },
      errors: {
        country_code: "",
        shop_name: "",
        longitude: "",
        latitude: "",
        description: "",
        distance: "",
        delivery_fee: "",
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
      case "delivery_fee":
        if (!value) {
          return "Delivery Fee is Required";
        } else {
          return "";
        }
      case "shop_name":
        if (!value) {
          return "Shop name is Required";
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

  onChange = (e, state) => {
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
      fields.delivery_fee &&
      fields.description
    ) {
      const data = {
        shop_name: fields.shop_name,
        latitude: fields.latitude,
        longitude: fields.longitude,
        description: fields.description,
        distance: fields.distance,
        country_code: fields.country_code,
        delivery_fee: fields.delivery_fee,
      };

      const {
        shop_name,
        country_code,
        latitude,
        longitude,
        description,
        distance,
        delivery_fee,
      } = data;
      const { opening_time, closing_time, user_id } = this.state;

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
        delivery_fee,
        user_id,
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
    const {
      user,
      toggle,
      loading,
      saving,
      fields,
      errors,
      opening_time,
      closing_time,
    } = this.state;
    console.log(opening_time);

    return (
      <Modal
        className="modal-dialog modal-dialog-centered"
        isOpen={user != null}
        toggle={() => !loading && !saving && toggle}
        style={{ maxWidth: 700, paddingLeft: 100 }}
      >
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={toggle}
              >
                <span aria-hidden={true}>×</span>
              </button>
              <h4 className="card-title">Vendor Personal Information</h4>

              <p className="card-description"> </p>
              <form className="forms-sample">
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <label htmlFor="exampleInputName1">Name</label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        value={user.name}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <label htmlFor="exampleInputName1">Phone</label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        placeholder="Enter Shop Name"
                        value={user.phone}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <label htmlFor="exampleInputName1">Email</label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        value={user.email}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <label htmlFor="exampleInputName1">Address</label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        value={user.address}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Form.Group>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={user.is_active === 1}
                          disabled
                        />
                        <i className="input-helper"></i>
                        Checked
                      </label>
                    </div>
                  </Form.Group>
                </Row>
              </form>
            </div>
          </div>
        </div>
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Vendor Shop Details</h4>
              <p className="card-description"> </p>
              <form className="forms-sample">
                <Row>
                  <Col md={6}>
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
                  </Col>
                  <Col md={6}>
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
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
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
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <label htmlFor="exampleInputEmail3">
                        Enter Longitude
                      </label>
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
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <label htmlFor="exampleInputPassword4">
                        Distance range
                      </label>
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
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <label htmlFor="exampleInputPassword4">
                        Delivery Fee
                      </label>
                      <Form.Control
                        type="number"
                        name="delivery_fee"
                        className="form-control"
                        placeholder="Enter Delivery fee"
                        value={fields.delivery_fee}
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
                          {errors.delivery_fee}
                        </span>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group id="Lastname">
                      <Form.Label>Opening Time</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </InputGroup.Text>
                        <TimePicker
                          defaultValue={moment(opening_time, "HH:mm:ss A")}
                          use24Hours
                          onChange={(time, opening_time) =>
                            this.onChange(opening_time, "opening_time")
                          }
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group id="Lastname">
                      <Form.Label>Closing Time</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </InputGroup.Text>
                        <TimePicker
                          defaultValue={moment(closing_time, "HH:mm:ss A")}
                          use24Hours
                          onChange={(time, closing_time) =>
                            this.onChange(closing_time, "closing_time")
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

export default withAlert()(EditVendor);
