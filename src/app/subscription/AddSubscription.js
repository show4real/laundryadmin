import React, { Component } from "react";
import { FormGroup, CardHeader, Media, Input, Modal } from "reactstrap";
import { Col, Row, Card, Form, ButtonGroup } from "react-bootstrap";
import { addSubscription } from "../services/subscriptionService";
import { withAlert } from "react-alert";
import { Button } from "antd";

export class AddSubscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      loading: false,
      addSubscription: props.addSubscription,
      toggle: props.toggle,
      fields: {
        name: "",
        price: "",
        days: "",
      },
      errors: {
        name: "",
        price: "",
        days: "",
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
          return "subscription name is Required";
        } else {
          return "";
        }
      case "price":
        if (!value) {
          return "subscription price is Required";
        } else {
          return "";
        }
      case "days":
        if (!value) {
          return "subscription days is Required";
        } else {
          return "";
        }

      default: {
        return "";
      }
    }
  };

  handleSubscriptionInput = (e) => {
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
    if (fields.name && fields.price && fields.days) {
      const data = {
        name: fields.name,
        price: fields.price,
        days: fields.days,
      };
      const { name, price, days } = data;

      this.setState({ saving: true });
      addSubscription({
        name,
        price,
        days,
      })
        .then((v) => {
          this.setState({
            fields: {
              name: "",
              price: "",
              days: "",
            },
            err: {
              email: "",
              price: "",
              days: "",
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
    const { addSubscription, toggle, loading, saving, fields, errors, err } =
      this.state;

    return (
      <Modal
        className="modal-dialog modal-dialog-centered"
        isOpen={addSubscription != null}
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
              <h4 className="card-title">Create Subscriptions</h4>

              <p className="card-description"> </p>
              <form className="forms-sample">
                <Form.Group>
                  <label htmlFor="exampleInputName1">Subscription Name</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="Subscription Name"
                    name="name"
                    value={fields.name}
                    onChange={(event) => this.handleSubscriptionInput(event)}
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
                <Form.Group>
                  <label htmlFor="exampleInputName1">Subscription Price</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="Subscription Price"
                    name="price"
                    value={fields.price}
                    onChange={(event) => this.handleSubscriptionInput(event)}
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
                  <div>
                    <span
                      style={{
                        paddingTop: 10,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                      className="text-danger"
                    >
                      {err.price}
                    </span>
                  </div>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputName1">Subscription Days</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="Subscription Name"
                    name="days"
                    value={fields.days}
                    onChange={(event) => this.handleSubscriptionInput(event)}
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
                      {errors.days}
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
                      {err.days}
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

export default withAlert()(AddSubscription);
