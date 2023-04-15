import React, { Component } from "react";
import { FormGroup, CardHeader, Media, Input, Modal } from "reactstrap";
import { Col, Row, Card, Form, ButtonGroup } from "react-bootstrap";
import { withAlert } from "react-alert";
import { editProduct } from "../services/productService";
import Resizer from "react-image-file-resizer";
import { Button } from "antd";

export class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      loading: false,
      editProduct: props.product,
      status: props.product.status == 1 ? true : false,
      vendors: props.vendors,
      categories: props.categories,
      services: props.services,
      id: props.product.id,
      image: "",
      old_image: props.product.image_url,
      toggle: props.toggle,
      fields: {
        cloth_name: props.product.cloth_name,
        price: props.product.price,
        shop_id: props.product.shop_id,
        category_id: props.product.category_id,
        service_id: props.product.service_id,
      },
      errors: {
        name: "",
      },
      err: {
        name: "",
      },
      image_type_error: false,
      image_empty_error: true,
    };
    this.fileChangedHandler = this.fileChangedHandler.bind(this);

    console.log(props.product);
  }

  validate = (name, value) => {
    switch (name) {
      case "cloth_name":
        if (!value) {
          return "Cloth name is Required";
        } else {
          return "";
        }
      case "vendor_ud":
        if (!value) {
          return "Vendor is Required";
        } else {
          return "";
        }
      case "category_id":
        if (!value) {
          return "category is Required";
        } else {
          return "";
        }
      case "service_id":
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
              this.setState({ image: uri, image_type_error: false });
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
    this.setState({ image_type_error: true });
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

  handleStatus = (e, state) => {
    this.setState({ [state]: e });
  };

  handleSubmit = (e) => {
    const { fields, status, id, image, image_type_error } = this.state;

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
    const check_image = image && !image_type_error ? true : false;
    if (
      fields.cloth_name &&
      fields.shop_id &&
      fields.category_id &&
      fields.service_id &&
      fields.price
    ) {
      const data = {
        cloth_name: fields.cloth_name,
        price: fields.price,
        shop_id: fields.shop_id,
        service_id: fields.service_id,
        category_id: fields.category_id,
      };

      const is_active = status === true ? 1 : 0;

      const { cloth_name, price, shop_id, service_id, category_id } = data;

      this.setState({ saving: true });
      editProduct({
        cloth_name,
        price,
        shop_id,
        service_id,
        category_id,
        is_active,
        image,
        id,
      })
        .then((v) => {
          this.setState({
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
      editProduct,
      toggle,
      loading,
      saving,
      fields,
      errors,
      status,
      categories,
      vendors,
      services,
      image,
      old_image,
    } = this.state;

    return (
      <Modal
        className="modal-dialog modal-dialog-centered"
        isOpen={editProduct != null}
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
              <h4 className="card-title">Edit Product</h4>

              <p className="card-description"> </p>
              <form className="forms-sample">
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <label htmlFor="exampleInputName1">Cloth Name</label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        placeholder="Cloth Name"
                        name="cloth_name"
                        value={fields.cloth_name}
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
                          {errors.cloth_name}
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
                        name="shop_id"
                        value={fields.shop_id}
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
                          {errors.shop_id}
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
                        name="category_id"
                        value={fields.category_id}
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
                          {errors.category_id}
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
                        name="service_id"
                        value={fields.service_id}
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
                          {errors.service_id}
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
                  </Col>
                  <Col md={6}>
                    {image !== "" && (
                      <img src={image} alt="" height="100" width="100" />
                    )}
                    {image == "" && (
                      <img src={old_image} height="100" width="100" alt="" />
                    )}
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

export default withAlert()(EditProduct);
