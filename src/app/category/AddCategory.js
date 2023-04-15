import React, { Component } from "react";
import { FormGroup, CardHeader, Media, Input, Modal } from "reactstrap";
import { Col, Row, Card, Form, ButtonGroup } from "react-bootstrap";
import { addCategory } from "../services/categoryService";
import { withAlert } from "react-alert";
import { Button } from "antd";
import Resizer from "react-image-file-resizer";

export class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      loading: false,
      addCategory: props.addCategory,
      toggle: props.toggle,
      image: "",
      image_empty_error: true,
      fields: {
        name: "",
      },
      errors: {
        name: "",
      },
      err: {
        name: "",
      },
    };
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
  }

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

  validate = (name, value) => {
    switch (name) {
      case "name":
        if (!value) {
          return "category name is Required";
        } else {
          return "";
        }

      default: {
        return "";
      }
    }
  };

  handleCategoryInput = (e) => {
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
    const { fields, image } = this.state;
    console.log(fields.role);

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
    if (fields.name && image) {
      const data = {
        name: fields.name,
      };
      const { name } = data;

      this.setState({ saving: true });
      addCategory({
        name,
        image,
      })
        .then((v) => {
          this.setState({
            fields: {
              name: "",
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
      addCategory,
      toggle,
      image_empty_error,
      loading,
      saving,
      fields,
      errors,
      err,
    } = this.state;

    return (
      <Modal
        className="modal-dialog modal-dialog-centered"
        isOpen={addCategory != null}
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
              <h4 className="card-title">Create Category</h4>

              <p className="card-description"> </p>
              <form className="forms-sample">
                <Form.Group>
                  <label htmlFor="exampleInputName1">Category Name</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="Category Name"
                    name="name"
                    value={fields.name}
                    onChange={(event) => this.handleCategoryInput(event)}
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
                  <div>
                    <span
                      style={{
                        paddingTop: 10,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                      className="text-danger"
                    >
                      {err.name}
                    </span>
                  </div>
                </Form.Group>
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

export default withAlert()(AddCategory);
