import React, { Component } from "react";
import { FormGroup, CardHeader, Media, Input, Modal } from "reactstrap";
import { Col, Row, Card, Form, ButtonGroup } from "react-bootstrap";
import { addProduct } from "../services/productService";
import { withAlert } from "react-alert";
import { Button } from "antd";
import Resizer from "react-image-file-resizer";

export class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      loading: false,
      status: false,
      addProduct: props.addProduct,
      categories: props.categories,
      vendors: props.vendors,
      services: props.services,

      toggle: props.toggle,
      fields: {
        name: "",
        vendor: "",
        service: "",
        category: "",
        price: "",
      },
      errors: {
        name: "",
        vendor: "",
        service: "",
        category: "",
        price: "",
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
          return "product name is Required";
        } else {
          return "";
        }
      case "vendor":
        if (!value) {
          return "Vendor is Required";
        } else {
          return "";
        }
      case "category":
        if (!value) {
          return "category is Required";
        } else {
          return "";
        }
      case "service":
        if (!value) {
          return "Service is Required";
        } else {
          return "";
        }
      case "price":
        if (!value) {
          return "Price is Required";
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

  // fileChangedHandler(event) {
  //   if (event.target.files[0]) {
  //     const validImage = [
  //       "image/jpeg",
  //       "image/jpg",
  //       "image/png",
  //       "image/JPEG",
  //       "image/PNG",
  //       "image/JPG",
  //     ];
  //     if (validImage.includes(event.target.files[0].type)) {
  //       this.setState({
  //         image: event.target.files[0],
  //         image_empty_error: false,
  //       });
  //     }
  //   }
  // }

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

  handleProductInput = (e) => {
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
      fields.vendor &&
      fields.category &&
      fields.service &&
      fields.price &&
      image
    ) {
      const data = {
        name: fields.name,
        vendor: fields.vendor,
        category: fields.category,
        service: fields.service,
        price: fields.price,
      };

      const { name, vendor, category, service, price } = data;
      const is_active = status === true ? 1 : 0;

      this.setState({ saving: true });
      addProduct({
        name,
        vendor,
        is_active,
        category,
        service,
        image,
        is_active,
        price,
      })
        .then((v) => {
          this.setState({
            fields: {
              name: "",
              vendor: "",
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
          this.setState({ err });
        });
    }
  };
  render() {
    const {
      addProduct,
      toggle,
      loading,
      saving,
      fields,
      errors,
      categories,
      vendors,
      services,
      image_empty_error,
      image_type_error,
      status,
    } = this.state;

    return (
      <Modal
        className="modal-dialog modal-dialog-centered"
        isOpen={addProduct != null}
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
              <h4 className="card-title">Add Product</h4>

              <p className="card-description"> </p>
              <form className="forms-sample">
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <label htmlFor="exampleInputName1">Product Name</label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        placeholder="Product Name"
                        name="name"
                        value={fields.name}
                        onChange={(event) => this.handleProductInput(event)}
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
                      <label htmlFor="exampleInputName1">Price</label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        placeholder="Enter Price"
                        name="price"
                        value={fields.price}
                        onChange={(event) => this.handleProductInput(event)}
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
                          {errors.price}
                        </span>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <label htmlFor="exampleFormControlSelect2">Vendor</label>
                      <select
                        className="form-control"
                        id="exampleFormControlSelect2"
                        name="vendor"
                        value={fields.vendor}
                        onChange={(event) => this.handleProductInput(event)}
                      >
                        <option value="">Choose Vendor</option>
                        {vendors.map((vendor) => (
                          <option value={vendor.id}> {vendor.shop_name}</option>
                        ))}
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
                          {errors.vendor}
                        </span>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <label htmlFor="exampleFormControlSelect2">
                        Category
                      </label>
                      <select
                        className="form-control"
                        id="exampleFormControlSelect2"
                        name="category"
                        value={fields.category}
                        onChange={(event) => this.handleProductInput(event)}
                      >
                        <option value="">Choose Category</option>
                        {categories.map((category) => (
                          <option value={category.id}> {category.name}</option>
                        ))}
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
                          {errors.category}
                        </span>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <label htmlFor="exampleFormControlSelect2">Service</label>
                      <select
                        className="form-control"
                        id="exampleFormControlSelect2"
                        name="service"
                        value={fields.service}
                        onChange={(event) => this.handleProductInput(event)}
                      >
                        <option value="">Choose Service</option>
                        {services.map((service) => (
                          <option value={service.id}> {service.name}</option>
                        ))}
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
                          {errors.service}
                        </span>
                      </div>
                    </Form.Group>
                  </Col>

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

export default withAlert()(AddProduct);
