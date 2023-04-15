import React, { Component } from "react";
import { FormGroup, CardHeader, Media, Input, Modal } from "reactstrap";
import { Col, Row, Card, Form, ButtonGroup } from "react-bootstrap";
import { addDriver } from "../../services/driverService";
import { withAlert } from "react-alert";
import { Button } from "antd";
import Resizer from "react-image-file-resizer";

export class AddDriver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      loading: false,
      status: false,
      addDriver: props.addDriver,

      toggle: props.toggle,
      fields: {
        name: "",
        address: "",
        fleet_type: "",
        fleet_number: "",
        status: "",
        email: "",
        password: "",
      },
      errors: {
        name: "",
        address: "",
        fleet_type: "",
        fleet_number: "",
        status: "",
        email: "",
        password: "",
      },
      err: {
        email: "",
      },
      image_type_error: false,
      image_empty_error: true,
    };
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
  }

  validate = (name, value) => {
    switch (name) {
      case "name":
        if (!value) {
          return "Name is Required";
        } else {
          return "";
        }
      case "fleet_type":
        if (!value) {
          return "Fleet Type is Required";
        } else {
          return "";
        }
      case "fleet_number":
        if (!value) {
          return "Fleet Number is Required";
        } else {
          return "";
        }
      case "email":
        if (!value) {
          return "Email is Required";
        } else {
          return "";
        }
      case "address":
        if (!value) {
          return "Address is Required";
        } else {
          return "";
        }

      default: {
        return "";
      }
    }
  };

  handleStatus = (e, state) => {
    this.setState({ [state]: e });
  };

  fileChangedHandler(event) {
    if (event.target.files[0]) {
      const validImage = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/JPEG",
        "image/PNG",
        "image/JPG",
      ];
      if (validImage.includes(event.target.files[0].type)) {
        this.setState({
          image_empty_error: false,
        });
        try {
          Resizer.imageFileResizer(
            event.target.files[0],
            300,
            300,
            "JPEG",
            100,
            0,
            (uri) => {
              console.log(uri);
              this.setState({ image: uri });
              //this.setState({imageType:event.target.files[0].type})
            },
            "base64",
            200,
            200
          );
        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  handleDriverInput = (e) => {
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

  handleSubmit = (e) => {
    const { fields, status, image } = this.state;

    console.log(status);

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
      fields.name &&
      fields.address &&
      fields.email &&
      fields.fleet_type &&
      fields.fleet_number &&
      fields.password &&
      image
    ) {
      const data = {
        name: fields.name,
        address: fields.address,
        fleet_number: fields.fleet_number,
        fleet_type: fields.fleet_type,
        password: fields.password,
        email: fields.email,
      };

      const { name, email, address, fleet_number, fleet_type, password } = data;
      const is_active = status === true ? 1 : 0;

      this.setState({ saving: true });
      addDriver({
        name,
        email,
        address,
        password,
        fleet_number,
        fleet_type,
        image,
        is_active,
      })
        .then((v) => {
          this.setState({
            fields: {
              name: "",
              address: "",
            },
            err: {
              email: "",
            },
            saving: false,
          });
          this.props.toggle();
          this.props.saved();
        })
        .catch((err) => {
          this.setState({ err, saving: false });
        });
    }
  };
  render() {
    const {
      addDriver,
      toggle,
      loading,
      saving,
      fields,
      errors,
      err,
      image_empty_error,
      image_type_error,
      status,
    } = this.state;

    return (
      <Modal
        className="modal-dialog modal-dialog-centered"
        isOpen={addDriver != null}
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
              <h4 className="card-title">Add Driver</h4>

              <p className="card-description"> </p>
              <form className="forms-sample">
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <label htmlFor="exampleInputName1">Driver Name</label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        placeholder="Driver Name"
                        name="name"
                        value={fields.name}
                        onChange={(event) => this.handleDriverInput(event)}
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
                          {errors.name}
                        </span>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <label htmlFor="exampleInputName1">email</label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        placeholder="Enter Email Address"
                        name="email"
                        value={fields.email}
                        onChange={(event) => this.handleDriverInput(event)}
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
                          {errors.email}
                          {err.email}
                        </span>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <label htmlFor="exampleFormControlSelect2">
                        Fleet type
                      </label>
                      <select
                        className="form-control"
                        id="exampleFormControlSelect2"
                        name="fleet_type"
                        value={fields.fleet_type}
                        onChange={(event) => this.handleDriverInput(event)}
                      >
                        <option value="">Choose Fleet</option>
                        <option value="bike">Bike</option>
                        <option value="car">Car</option>
                        <option value="scooter">Scooter</option>
                      </select>
                      <div>
                        <span
                          style={{
                            paddingTop: 10,
                            fontSize: 12,
                            fontWeight: "bold",
                          }}
                          className="text-danger"
                        >
                          {errors.fleet_type}
                        </span>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <label htmlFor="exampleFormControlSelect2">
                        Fleet Registration Number
                      </label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        placeholder="Enter fleet Number"
                        name="fleet_number"
                        value={fields.fleet_number}
                        onChange={(event) => this.handleDriverInput(event)}
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
                          {errors.fleet_number}
                        </span>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <label htmlFor="exampleFormControlSelect2">
                        Password
                      </label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        placeholder="Enter password"
                        name="password"
                        value={fields.password}
                        onChange={(event) => this.handleDriverInput(event)}
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
                          {errors.password}
                        </span>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <div className="form-check">
                      <label
                        style={{ paddingLeft: 5 }}
                        className="form-check-label"
                      >
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={status}
                          onChange={async (e) => {
                            await this.handleStatus(e.target.checked, "status");
                          }}
                        />
                        <i className="input-helper"></i>
                        Status
                      </label>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <input type="file" onChange={this.fileChangedHandler} />
                    <div className="d-md-block text-start">
                      <div className="fw-normal text-dark mb-1">
                        Choose Image
                      </div>
                      <div className="text-gray small">
                        JPG, GIF or PNG. Max size of 800K
                      </div>
                    </div>
                    <div>
                      <span
                        style={{
                          paddingTop: 10,
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                        className="text-danger"
                      >
                        {image_empty_error && "Please upload an image"}
                      </span>
                    </div>
                  </Col>
                  <Col md={6}>
                    <img
                      src={this.state.image}
                      alt=""
                      height="100"
                      width="100"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <Form.Group>
                      <label htmlFor="exampleTextarea1">Address</label>
                      <textarea
                        className="form-control"
                        id="exampleTextarea1"
                        rows="4"
                        name="address"
                        value={fields.address}
                        onChange={(event) => this.handleDriverInput(event)}
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
                          {errors.address}
                        </span>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <div style={{ float: "right" }}>
                  <Button
                    className="btn btn-outline-dark btn-sm"
                    type="submit"
                    loading={saving}
                    onClick={this.handleSubmit}
                  >
                    Save
                  </Button>

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

export default withAlert()(AddDriver);
