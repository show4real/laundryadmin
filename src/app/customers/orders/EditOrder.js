import React, { Component } from "react";
import { FormGroup, CardHeader, Media, Input, Modal } from "reactstrap";
import { Col, Row, Card, Form, ButtonGroup } from "react-bootstrap";
import { withAlert } from "react-alert";
import { editOrder } from "../../services/orderService";
import Resizer from "react-image-file-resizer";
import { Button } from "antd";

export class EditOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      loading: false,
      order: props.order,

      id: props.order.id,
      toggle: props.toggle,
    };
  }

  validate = (name, value) => {
    switch (name) {
      case "cloth_name":
        if (!value) {
          return "Cloth name is Required";
        } else {
          return "";
        }

      default: {
        return "";
      }
    }
  };

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

  totalOrderCost = () => {
    const { order } = this.state;
    let total = 0;
    order.products.map((product) => {
      total += product.price;
    });
    return total;
  };

  handleSubmit = (e) => {
    const { id } = this.state;

    e.preventDefault();

    this.setState({ saving: true });
    editOrder({
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
  };
  render() {
    const { order, toggle, loading, saving, status } = this.state;

    return (
      <Modal
        className="modal-dialog modal-dialog-centered"
        isOpen={order != null}
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
              <h4 className="card-title">Order Details</h4>

              <p className="card-description"> </p>
              <form className="forms-sample">
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <label htmlFor="exampleInputName1">Customer Name</label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        placeholder="Cloth Name"
                        // name="cloth_name"
                        disabled
                        value={order.customer_name}
                        onChange={(event) => this.handleProductInput(event)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <label htmlFor="exampleInputName1">Customer Phone</label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        // placeholder="Enter Price"
                        // name="price"
                        disabled
                        value={order.customer_phone}
                        // onChange={(event) => this.handleProductInput(event)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <label htmlFor="exampleInputName1">
                        Customer Address
                      </label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        placeholder="Cloth Name"
                        disabled
                        value={order.customer_address}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <label htmlFor="exampleInputName1">Order Status</label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        placeholder="Cloth Name"
                        disabled
                        value={order.status}
                      />
                    </Form.Group>
                  </Col>
                  {order.delivery_date && (
                    <Col md={6}>
                      <Form.Group>
                        <label htmlFor="exampleInputName1">Delivered at</label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          id="exampleInputName1"
                          disabled
                          value={order.delivery_date}
                        />
                      </Form.Group>
                    </Col>
                  )}
                </Row>
                <Row></Row>
              </form>
              <div className="table-responsive">
                <h3 className="card-title">
                  Product Details {"(" + this.totalOrderCost() + ")"}
                </h3>
                <table className="table table-nowrap ">
                  <thead>
                    <tr>
                      <th> Product Name </th>
                      <th> Price </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((product) => (
                      <tr>
                        <td style={{ textTransform: "capitalize" }}>
                          {product.product_name}{" "}
                        </td>
                        <td style={{ textTransform: "capitalize" }}>
                          {product.price}{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* {(order.status == "Pending" || order.status == "Intransit") && (
                  <div style={{ float: "right" }}>
                    <Button
                      className="btn btn-outline-dark btn-sm"
                      type="submit"
                      loading={saving}
                      // onClick={this.handleSubmit}
                    >
                      Complete Order
                    </Button>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default withAlert()(EditOrder);
