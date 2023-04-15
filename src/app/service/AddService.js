import React, { Component } from "react";
import { FormGroup, CardHeader, Media, Input, Modal } from "reactstrap";
import { Col, Row, Card, Form, ButtonGroup } from "react-bootstrap";
import { addService } from "../services/categoryService";
import { withAlert } from "react-alert";
import { Button } from "antd";

export class AddService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      loading: false,
      addService: props.addService,
      toggle: props.toggle,
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
  }

  validate = (name, value) => {
    switch (name) {
      case "name":
        if (!value) {
          return "Service name is Required";
        } else {
          return "";
        }

      default: {
        return "";
      }
    }
  };

  handleServiceInput = (e) => {
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
    const { fields, status } = this.state;
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
    if (fields.name) {
      const data = {
        name: fields.name,
      };
      const { name } = data;

      this.setState({ saving: true });
      addService({
        name,
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
    const { addService, toggle, loading, saving, fields, errors, err } =
      this.state;

    return (
      <Modal
        className="modal-dialog modal-dialog-centered"
        isOpen={addService != null}
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
              <h4 className="card-title">Create Service</h4>

              <p className="card-description"> </p>
              <form className="forms-sample">
                <Form.Group>
                  <label htmlFor="exampleInputName1">Service Name</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="Service Name"
                    name="name"
                    value={fields.name}
                    onChange={(event) => this.handleServiceInput(event)}
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

export default withAlert()(AddService);
