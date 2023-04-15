import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAlert } from "react-alert";
import Resizer from "react-image-file-resizer";
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
import { getVendorProfile, addProfile } from "../../services/userService";
import { TimePicker } from "antd";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import dayjs from "dayjs";
import SpinDiv from "../../components/SpinDiv";
import AddImage from "./AddImage";

export class ProfileIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      loading: false,
      err: { email: "" },
      profile: "",
      opening_time: "",
      closing_time: "",

      fields: {
        shop_name: "",
        lastname: "",
        firstname: "",
        address: "",
        phone: "",
        country_code: "",
        shop_name: "",
        longitude: "",
        latitude: "",
        description: "",
        distance: "",
        delivery_fee: "",
      },
      errors: {
        firstname: "",
        lastname: "",
        address: "",
        phone: "",
        country_code: "",
        shop_name: "",
        longitude: "",
        latitude: "",
        description: "",
        distance: "",
        delivery_fee: "",
      },
      image: "",
      old_image: "",
      image_type_error: false,
      image_empty_error: true,
    };
  }

  validate = (name, value) => {
    const { fields } = this.state;
    switch (name) {
      case "firstname":
        if (!value) {
          return "First name is Required";
        } else {
          return "";
        }
      case "lastname":
        if (!value) {
          return "Last name is Required";
        } else {
          return "";
        }
      case "address":
        if (!value) {
          return "Address is Required";
        } else {
          return "";
        }
      case "phone":
        if (!value) {
          return "Phone is Required";
        } else {
          return "";
        }
      case "country_code":
        if (!value) {
          return "Country Code is Required";
        } else {
          return "";
        }
      case "latitude":
        if (!value) {
          return "Latitude is Required";
        } else {
          return "";
        }
      case "longitude":
        if (!value) {
          return "Longitude is Required";
        } else {
          return "";
        }
      case "description":
        if (!value) {
          return "Description is Required";
        } else {
          return "";
        }
      case "shop_name":
        if (!value) {
          return "Shop Name is Required";
        } else {
          return "";
        }
      case "distance":
        if (!value) {
          return "Distance is Required";
        } else {
          return "";
        }
      case "delivery_fee":
        if (!value) {
          return "Delivery fee is Required";
        } else {
          return "";
        }
      case "opening_time":
        if (!value) {
          return "Opening Time is Required";
        } else {
          return "";
        }
      case "closing_time":
        if (!value) {
          return "Closing time is Required";
        } else {
          return "";
        }

      default: {
        return "";
      }
    }
  };

  componentDidMount() {
    this.getProfile();
  }

  getProfile = () => {
    this.setState({ loading: true });
    getVendorProfile().then(
      (res) => {
        this.setState({
          profile: res.vendor,
          old_image: res.vendor.shop_image_url,
          closing_time: res.vendor.closing_time,
          opening_time: res.vendor.opening_time,
          fields: {
            shop_name: res.vendor.shop_name,
            longitude: res.vendor.longitude,
            latitude: res.vendor.latitude,
            delivery_fee: res.vendor.delivery_fee,
            distance: res.vendor.distance,
            description: res.vendor.description,

            country_code: res.vendor.country_code,
            lastname: res.user.lastname,
            firstname: res.user.firstname,
            phone: res.user.phone,
            address: res.user.address,
          },
          loading: false,
        });
      },
      (error) => {
        this.setState({ loading: false });
      }
    );
  };

  onChange = (e, state) => {
    this.setState({ [state]: e });
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

  handleSubmit = (e) => {
    const { fields, image, opening_time, closing_time } = this.state;

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
      fields.firstname &&
      fields.lastname &&
      fields.phone &&
      fields.country_code &&
      fields.shop_name &&
      fields.longitude &&
      fields.latitude &&
      fields.distance &&
      fields.description &&
      opening_time &&
      closing_time &&
      fields.delivery_fee
    ) {
      const data = {
        firstname: fields.firstname,
        lastname: fields.lastname,
        phone: fields.phone,
        address: fields.address,
        shop_name: fields.shop_name,
        latitude: fields.latitude,
        longitude: fields.longitude,
        description: fields.description,
        distance: fields.distance,
        country_code: fields.country_code,
        delivery_fee: fields.delivery_fee,
      };
      const {
        firstname,
        lastname,
        phone,
        address,
        shop_name,
        country_code,
        latitude,
        longitude,
        description,
        distance,
        delivery_fee,
      } = data;
      console.log(firstname);

      this.setState({ saving: true });
      addProfile({
        firstname,
        lastname,
        phone,
        address,
        shop_name,
        country_code,
        latitude,
        longitude,
        opening_time,
        closing_time,
        description,
        distance,
        delivery_fee,
        image,
      })
        .then((v) => {
          this.setState({
            err: {
              email: "",
            },
            saving: false,
          });
          //   this.props.alert.success("Registration successful -> Login below");
          this.props.alert.show(
            <div style={{ color: "white", backgroundColor: "success" }}>
              Profile Updated
            </div>
          );
        })
        .catch((err) => {
          console.log(err);
          this.setState({ err });
        });
    }
  };

  toggleEditImage = (editImage) => {
    this.setState({ editImage });
    this.getProfile();
  };

  toggleEdit = () => {
    this.setState({ editImage: !this.state.editImage });
    this.getProfile();
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
        // this.setState({
        //   image_empty_error: false,
        // });
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
              const hello = () => {
                this.setState({ image: uri });
              };

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
  render() {
    const {
      fields,
      errors,
      err,
      image,
      image_empty_error,
      old_image,
      opening_time,
      closing_time,
      saving,
      profile,
      loading,
      editImage,
    } = this.state;
    console.log(image);
    return (
      <div className="row">
        {editImage && (
          <AddImage
            saved={this.getProfile}
            profile={editImage}
            toggle={this.toggleEdit}
          />
        )}
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              {loading && <SpinDiv text={"Loading..."} />}

              {!loading && (
                <Row>
                  <Col md={12}>
                    <h3>Personal Information</h3>
                    <Row>
                      <col md={2}></col>
                      <Col md={9}>
                        <Button
                          variant="outline-dark"
                          onClick={() => this.toggleEditImage(profile)}
                          size="sm"
                        >
                          Change Profile Image
                        </Button>
                      </Col>
                    </Row>
                    <form className="pt-3">
                      <Row>
                        <Col md={6}>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              placeholder="First Name"
                              name="firstname"
                              value={fields.firstname}
                              onChange={(event) => this.handleUserInput(event)}
                            />
                            <div>
                              <span className="text-danger">
                                {errors.firstname}
                              </span>
                            </div>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="form-group">
                            <input
                              type="text"
                              name="lastname"
                              className="form-control form-control-lg"
                              placeholder="Last Name"
                              value={fields.lastname}
                              onChange={(event) => this.handleUserInput(event)}
                            />
                            <div>
                              <span style={{}} className="text-danger">
                                {errors.lastname}
                              </span>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <div className="form-group">
                            <input
                              type="text"
                              name="phone"
                              className="form-control form-control-lg"
                              placeholder="Phone number"
                              value={fields.phone}
                              onChange={(event) => this.handleUserInput(event)}
                            />
                            <div>
                              <span style={{}} className="text-danger">
                                {errors.phone}
                              </span>
                            </div>
                          </div>
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
                                {errors.address}
                              </span>
                            </div>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <h3>Vendor Information</h3>
                          <Row>
                            <Col md={12}>
                              <Row>
                                <Col md={6}>
                                  <Form.Group>
                                    <label htmlFor="exampleInputName1">
                                      Shop Name
                                    </label>
                                    <Form.Control
                                      type="text"
                                      className="form-control"
                                      id="exampleInputName1"
                                      placeholder="Enter Shop Name"
                                      name="shop_name"
                                      value={fields.shop_name}
                                      onChange={(event) =>
                                        this.handleUserInput(event)
                                      }
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
                                    <label htmlFor="exampleInputName1">
                                      Country Code
                                    </label>
                                    <Form.Control
                                      type="text"
                                      className="form-control"
                                      id="exampleInputName1"
                                      placeholder="Enter Country Code"
                                      name="country_code"
                                      value={fields.country_code}
                                      onChange={(event) =>
                                        this.handleUserInput(event)
                                      }
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
                                    <label htmlFor="exampleInputEmail3">
                                      Latitude
                                    </label>
                                    <Form.Control
                                      type="number"
                                      className="form-control"
                                      name="latitude"
                                      placeholder="Enter Latitude"
                                      value={fields.latitude}
                                      onChange={(event) =>
                                        this.handleUserInput(event)
                                      }
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
                                      onChange={(event) =>
                                        this.handleUserInput(event)
                                      }
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
                                      onChange={(event) =>
                                        this.handleUserInput(event)
                                      }
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
                                      Delivery fee
                                    </label>
                                    <Form.Control
                                      type="text"
                                      name="delivery_fee"
                                      className="form-control"
                                      placeholder="Enter Delivery fee"
                                      value={fields.delivery_fee}
                                      onChange={(event) =>
                                        this.handleUserInput(event)
                                      }
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
                                <Col md={4}>
                                  <Form.Group id="Lastname">
                                    <Form.Label>Opening Time</Form.Label>
                                    <InputGroup>
                                      <InputGroup.Text>
                                        <FontAwesomeIcon icon={faPencilAlt} />
                                      </InputGroup.Text>

                                      <TimePicker
                                        defaultValue={dayjs(
                                          opening_time,
                                          "HH:mm:ss"
                                        )}
                                        use24Hours
                                        onChange={(time, opening_time) =>
                                          this.onChange(
                                            opening_time,
                                            "opening_time"
                                          )
                                        }
                                      />
                                    </InputGroup>
                                  </Form.Group>
                                </Col>
                                <Col md={4}>
                                  <Form.Group id="Lastname">
                                    <Form.Label>Closing Time</Form.Label>
                                    <InputGroup>
                                      <InputGroup.Text>
                                        <FontAwesomeIcon icon={faPencilAlt} />
                                      </InputGroup.Text>
                                      <TimePicker
                                        defaultValue={dayjs(
                                          closing_time,
                                          "HH:mm:ss"
                                        )}
                                        use24Hours
                                        onChange={(time, closing_time) =>
                                          this.onChange(
                                            closing_time,
                                            "closing_time"
                                          )
                                        }
                                      />
                                    </InputGroup>
                                  </Form.Group>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={7}>
                              <Form.Group>
                                <label htmlFor="exampleTextarea1">
                                  Description
                                </label>
                                <textarea
                                  className="form-control"
                                  id="exampleTextarea1"
                                  rows="4"
                                  name="description"
                                  value={fields.description}
                                  onChange={(event) =>
                                    this.handleUserInput(event)
                                  }
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
                            </Col>
                          </Row>
                          {/* <Row>
                          <Col md={6}>
                            <input
                              type="file"
                              onChange={this.fileChangedHandler}
                            />
                            <div className="d-md-block text-start">
                              <div className="fw-normal text-dark mb-1">
                                Choose Image
                              </div>
                              <div className="text-gray small">
                                JPG, GIF or PNG. Max size of 800K
                              </div>
                            </div>
                          
                            {old_image !== "" && (
                              <img
                                src={old_image}
                                height="100"
                                width="100"
                                alt=""
                              />
                            )}
                          </Col>
                          <Col md={6}></Col>
                        </Row> */}
                        </Col>
                      </Row>

                      <Row style={{ paddingTop: 20 }}>
                        <Col md={6}>
                          <Button
                            className="btn btn-dark btn-lg"
                            style={{ padding: 20, paddingBottom: 30 }}
                            type="submit"
                            loading={saving}
                            onClick={this.handleSubmit}
                          >
                            Update
                          </Button>
                        </Col>
                      </Row>
                    </form>
                  </Col>
                </Row>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAlert()(ProfileIndex);
