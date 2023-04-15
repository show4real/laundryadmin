import React, { Component } from "react";
import { FormGroup, CardHeader, Media, Input, Modal } from "reactstrap";
import { Col, Row, Card, Form, ButtonGroup } from "react-bootstrap";
import { addPayment } from "../services/paymentService";
import { withAlert } from "react-alert";
import { Button } from "antd";
import ReactDatetime from "react-datetime";
import moment from "moment";
import SpinDiv from "../components/SpinDiv";

export class AddPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      loading: false,
      addPayment: props.addPayment,
      subscriptions: props.subscriptions,
      toggle: props.toggle,
      date: moment().startOf("month"),
      fields: {
        depositor: "",
        bank: "",
        amount: "",
        subscription_id: "",
        description: "",
      },
      errors: {
        depositor: "",
        bank: "",
        amount: "",
        subscription_id: "",
        description: "",
        address: "",
      },
      err: {
        name: "",
      },
    };
  }

  validate = (name, value) => {
    switch (name) {
      case "depositor":
        if (!value) {
          return "Depositor's name is Required";
        } else {
          return "";
        }
      case "bank":
        if (!value) {
          return "Bank is Required";
        } else {
          return "";
        }
      case "amount":
        if (!value) {
          return "Amount is Required";
        } else {
          return "";
        }

      case "subscription_id":
        if (!value) {
          return "Subscription is Required";
        } else {
          return "";
        }
      case "description":
        if (!value) {
          return "Description is Required";
        } else {
          return "";
        }
      default: {
        return "";
      }
    }
  };

  handlePaymentInput = (e) => {
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
  dateFilter = async (e, state) => {
    await this.setState({ [state]: e });
  };

  handleSubmit = (e) => {
    const { fields, date } = this.state;

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
      fields.amount &&
      fields.depositor &&
      fields.subscription_id &&
      fields.bank &&
      fields.description
    ) {
      const data = {
        amount: fields.amount,
        depositor: fields.depositor,
        subscription_id: fields.subscription_id,
        bank: fields.bank,
        description: fields.description,
      };
      const { amount, depositor, subscription_id, description, bank } = data;

      this.setState({ saving: true });
      addPayment({
        amount,
        depositor,
        subscription_id,
        description,
        bank,
        date,
      })
        .then((v) => {
          this.setState({
            fields: {
              amount: "",
              depositor: "",
              subscription_id: "",
              description: "",
              bank: "",
            },
            err: {
              amount: "",
              depositor: "",
              subscription_id: "",
              description: "",
              bank: "",
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
      addPayment,
      toggle,
      loading,
      saving,
      fields,
      errors,
      err,
      date,
      subscriptions,
    } = this.state;

    return (
      <Modal
        className="modal-dialog modal-dialog-centered"
        isOpen={addPayment != null}
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
              <h4 className="card-title">Create Payment</h4>

              <p className="card-description"> </p>
              <form className="forms-sample">
                <Form.Group>
                  <label htmlFor="exampleInputName1">Depositor</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="Depositor's Name"
                    name="depositor"
                    value={fields.depositor}
                    onChange={(event) => this.handlePaymentInput(event)}
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
                      {errors.depositor}
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
                  <label htmlFor="exampleInputName1">Bank</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="Bank's Name"
                    name="bank"
                    value={fields.bank}
                    onChange={(event) => this.handlePaymentInput(event)}
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
                      {errors.bank}
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
                      {err.bank}
                    </span>
                  </div>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputName1">Amount</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="Amount"
                    name="amount"
                    value={fields.amount}
                    onChange={(event) => this.handlePaymentInput(event)}
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
                      {errors.amount}
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
                  <label htmlFor="exampleFormControlSelect2">
                    Subscription
                  </label>
                  <select
                    className="form-control"
                    id="exampleFormControlSelect2"
                    name="subscription_id"
                    value={fields.subscription_id}
                    onChange={(event) => this.handlePaymentInput(event)}
                  >
                    <option value="">Choose Subscription Package</option>
                    {subscriptions.map((subscription) => (
                      <option value={subscription.id}>
                        {" "}
                        {subscription.name}
                      </option>
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
                      {errors.subscription_id}
                    </span>
                  </div>
                </Form.Group>
                <FormGroup className="form-date">
                  <label className="form-control-label" htmlFor="input-address">
                    Date
                  </label>
                  <ReactDatetime
                    value={date}
                    dateFormat={"MMM D, YYYY"}
                    closeOnSelect
                    onChange={(e) => this.dateFilter(e, "date")}
                    inputProps={{
                      required: true,
                      className: "form-control date-width",
                    }}
                    timeFormat={false}
                  />
                </FormGroup>
                <Form.Group>
                  <label htmlFor="exampleTextarea1">Description</label>
                  <textarea
                    className="form-control"
                    id="exampleTextarea1"
                    rows="4"
                    name="description"
                    value={fields.description}
                    onChange={(event) => this.handlePaymentInput(event)}
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

export default withAlert()(AddPayment);
