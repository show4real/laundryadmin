import React, { Component } from "react";
import { FormGroup, CardHeader, Media, Input, Modal } from "reactstrap";
import { Col, Row, Card, Form, ButtonGroup } from "react-bootstrap";
import { addImage } from "../../services/userService";
import { withAlert } from "react-alert";
import { Button } from "antd";
import Resizer from "react-image-file-resizer";

export class AddImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      loading: false,
      status: false,
      addImage: props.profile,
      toggle: props.toggle,

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
    const { image } = this.state;

    e.preventDefault();

    this.setState({ saving: true });
    addImage({
      image,
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
  };
  render() {
    const {
      addImage,
      toggle,
      loading,
      saving,
      image_empty_error,
      image_type_error,
      image,
    } = this.state;

    return (
      <Modal
        className="modal-dialog modal-dialog-centered"
        isOpen={addImage != null}
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
              <h4 className="card-title">Update Shop Image</h4>

              <p className="card-description"> </p>
              <form className="forms-sample">
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
                    {image && (
                      <img
                        src={this.state.image}
                        alt=""
                        height="100"
                        width="100"
                      />
                    )}
                    {addImage.shop_image_url && (
                      <img
                        src={addImage.shop_image_url}
                        alt=""
                        height="100"
                        width="100"
                      />
                    )}
                  </Col>
                </Row>

                <div>
                  <Button
                    className="btn btn-outline-dark btn-sm"
                    type="submit"
                    loading={saving}
                    onClick={this.handleSubmit}
                  >
                    Update
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default withAlert()(AddImage);
