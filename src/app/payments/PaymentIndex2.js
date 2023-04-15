import React, { Component } from "react";
import {
  ProgressBar,
  Row,
  Col,
  Breadcrumb,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import { Input } from "reactstrap";
import { getPayments } from "../services/paymentService";
import { throttle, debounce } from "./debounce";
import "antd/dist/reset.css";
import { Pagination } from "antd";
import EditPayment from "./EditPayment";
import AddPayment from "./AddPayment";
import DeletePayment from "./DeletePayment";
import SpinDiv from "../components/SpinDiv";
import moment from "moment";

export class PaymentIndex2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      page: 1,
      rows: 10,
      loading: false,
      payments: [],
      subscriptions: [],
      total: 0,
    };
    this.searchDebounced = debounce(this.searchPayments, 500);
    this.searchThrottled = throttle(this.searchPayments, 500);
  }

  componentDidMount() {
    this.getPayments();
  }

  getPayments = () => {
    const { page, rows, search } = this.state;
    this.setState({ loading: true });

    getPayments({ page, rows, search }).then(
      (res) => {
        this.setState({
          payments: res.payments.data,
          subscriptions: res.subscriptions,
          page: res.payments.current_page,
          total: res.payments.total,
          loading: false,
        });
      },
      (error) => {
        this.setState({ loading: false });
      }
    );
  };

  searchPayments = () => {
    const { page, rows, search, payments } = this.state;
    this.setState({ loading: false });
    getPayments({ page, rows, search, payments }).then(
      (res) => {
        this.setState({
          payments: res.payments.data,
          subscriptions: res.subscriptions,
          page: res.payments.current_page,
          total: res.payments.total,
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

  onPage = async (page, rows) => {
    await this.setState({ page, rows });
    await this.getPayments();
  };

  handleSearch = (event) => {
    this.setState({ search: event.target.value }, () => {
      if (this.state.search < 5) {
        this.searchThrottled(this.state.search);
      } else {
        this.searchDebounced(this.state.search);
      }
    });
  };

  toggleAddPayment = () => {
    this.setState({ addPayment: !this.state.addPayment });
    this.getPayments();
  };

  toggleEditPayment = (editPayment) => {
    this.setState({ editPayment });
    this.getPayments();
  };

  toggleEdit = () => {
    this.setState({ editPayment: !this.state.editPayment });
    this.getPayments();
  };

  toggle = () => {
    this.setState({ deletePayment: !this.state.deletePayment });
  };

  toggleDeletePayment = (deletePayment) => {
    this.setState({ deletePayment });
  };

  render() {
    const {
      payments,
      total,
      page,
      rows,
      search,
      loading,
      addPayment,
      editPayment,
      deletePayment,
      subscriptions,
    } = this.state;
    return (
      <div>
        {/* {addPayment && (
          <AddPayment
            saved={this.searchPayments}
            addPayment={addPayment}
            subscriptions={subscriptions}
            toggle={this.toggleAddPayment}
          />
        )} */}
        {editPayment && (
          <EditPayment
            saved={this.getPayments}
            editPayment={editPayment}
            subscriptions={subscriptions}
            toggle={this.toggleEdit}
          />
        )}
        {deletePayment && (
          <DeletePayment
            saved={this.getPayments}
            payment={deletePayment}
            toggle={this.toggle}
          />
        )}
        {loading && <SpinDiv text={"Loading..."} />}
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <Row style={{}}>
                  <Col lg="12">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                      <div className="d-block mb-4 mb-md-0">
                        <Breadcrumb
                          listProps={{
                            className: " breadcrumb-text-dark text-dark",
                          }}
                        >
                          <Breadcrumb.Item
                            style={{
                              textDecoration: "none",
                              color: "black",
                              fontWeight: "bold",
                            }}
                            href="/"
                          >
                            Home
                          </Breadcrumb.Item>
                          <Breadcrumb.Item
                            style={{
                              textDecoration: "none",
                              color: "black",
                              fontWeight: "bold",
                            }}
                            href="#payment"
                          >
                            Payment
                          </Breadcrumb.Item>
                        </Breadcrumb>
                      </div>
                      <div className="btn-toolbar mb-2 mb-md-0">
                        <ButtonGroup>
                          {/* <Button
                            style={{
                              textDecoration: "none",
                              color: "white",
                              backgroundColor: "black",
                              borderColor: "black",
                              fontWeight: "bold",
                            }}
                            size="sm"
                            onClick={() => this.toggleAddPayment()}
                          >
                            Add Payment
                          </Button> */}
                          {/* <Button variant="outline-dark" size="sm">
                    Export
                  </Button> */}
                        </ButtonGroup>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg="8">
                    <h4 className="card-title">
                      {" "}
                      Payment{" "}
                      <span
                        style={{
                          color: "#aaa",
                          fontSize: 14,
                          fontWeight: "normal",
                        }}
                      >
                        {" "}
                        ({total})
                      </span>
                    </h4>
                  </Col>
                  <Col lg="4" className="">
                    <div style={{ display: "flex" }}>
                      <Input
                        placeholder="Search..."
                        autoFocus
                        id="show"
                        value={search}
                        style={{
                          maxHeight: 45,
                          marginRight: 5,
                          marginBottom: 10,
                        }}
                        onChange={this.handleSearch}
                      />
                    </div>
                  </Col>
                </Row>

                <div className="table-responsive">
                  <table className="table table-nowrap ">
                    <thead>
                      <tr>
                        <th> Vendor Name </th>

                        <th> Depositor </th>
                        <th> Bank </th>
                        <th> subscription Package </th>
                        <th> Payment Status </th>
                        <th> Amount </th>
                        <th> Date </th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr>
                          <td>{payment.vendor_name}</td>
                          <td>{payment.depositor}</td>
                          <td>{payment.bank}</td>
                          <td>{payment.subscription}</td>
                          <td>
                            <ProgressBar
                              variant={
                                payment.status == 1 ? "success" : "danger"
                              }
                              now={100}
                            />
                          </td>
                          <td>{payment.amount} </td>
                          <td>{moment(payment.date).format("MMM DD, YYYY")}</td>

                          <td>
                            <ButtonGroup>
                              <Button
                                variant="outline-dark"
                                onClick={() => this.toggleEditPayment(payment)}
                                size="sm"
                              >
                                View
                              </Button>

                              <Button
                                variant="outline-danger"
                                onClick={() => {
                                  //console.log('111')
                                  this.toggleDeletePayment(payment);
                                }}
                                size="sm"
                              >
                                Delete
                              </Button>
                            </ButtonGroup>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Row>
                    <Col md={12} style={{ fontWeight: "bold", paddingTop: 3 }}>
                      {payments.length > 0 && (
                        <Pagination
                          total={total}
                          showTotal={(total) =>
                            `Total ${total} Payments History`
                          }
                          onChange={this.onPage}
                          pageSize={rows}
                          current={page}
                        />
                      )}
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentIndex2;
