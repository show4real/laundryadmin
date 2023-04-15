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
import { getSubscriptions } from "../services/subscriptionService";
import SpinDiv from "../components/SpinDiv";

import { throttle, debounce } from "./debounce";
import "antd/dist/reset.css";
import { Pagination } from "antd";
import EditSubscription from "./EditSubscription";
import AddSubscription from "./AddSubscription";
import DeleteSubscription from "./DeleteSubscription";

export class SubscriptionIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      page: 1,
      rows: 10,
      loading: false,
      subscriptions: [],
      total: 0,
    };
    this.searchDebounced = debounce(this.searchSubscriptions, 500);
    this.searchThrottled = throttle(this.searchSubscriptions, 500);
  }

  componentDidMount() {
    this.getSubscriptions();
  }

  getSubscriptions = () => {
    const { page, rows, search } = this.state;
    this.setState({ loading: true });

    getSubscriptions({ page, rows, search }).then(
      (res) => {
        this.setState({
          subscriptions: res.subscriptions.data,
          page: res.subscriptions.current_page,
          total: res.subscriptions.total,
          loading: false,
        });
      },
      (error) => {
        this.setState({ loading: false });
      }
    );
  };

  searchSubscriptions = () => {
    const { page, rows, search, subscriptions } = this.state;
    this.setState({ loading: false });
    getSubscriptions({ page, rows, search, subscriptions }).then(
      (res) => {
        this.setState({
          subscriptions: res.subscriptions.data,
          page: res.subscriptions.current_page,
          total: res.subscriptions.total,
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
    await this.getSubscriptions();
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

  toggleAddSubscription = () => {
    this.setState({ addSubscription: !this.state.addSubscription });
    this.getSubscriptions();
  };

  toggleEditSubscription = (editSubscription) => {
    this.setState({ editSubscription });
    this.getSubscriptions();
  };

  toggleEdit = () => {
    this.setState({ editSubscription: !this.state.editSubscription });
    this.getSubscriptions();
  };

  toggle = () => {
    this.setState({ deleteSubscription: !this.state.deleteSubscription });
  };

  toggleDeleteSubscription = (deleteSubscription) => {
    this.setState({ deleteSubscription });
  };

  render() {
    const {
      subscriptions,
      total,
      page,
      rows,
      search,
      loading,
      addSubscription,
      editSubscription,
      deleteSubscription,
    } = this.state;
    return (
      <div>
        {addSubscription && (
          <AddSubscription
            saved={this.searchSubscriptions}
            addSubscription={addSubscription}
            toggle={this.toggleAddSubscription}
          />
        )}
        {editSubscription && (
          <EditSubscription
            saved={this.getSubscriptions}
            editSubscription={editSubscription}
            toggle={this.toggleEdit}
          />
        )}
        {deleteSubscription && (
          <DeleteSubscription
            saved={this.getSubscriptions}
            subscription={deleteSubscription}
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
                            href="#subscription"
                          >
                            subscription
                          </Breadcrumb.Item>
                        </Breadcrumb>
                      </div>
                      <div className="btn-toolbar mb-2 mb-md-0">
                        <ButtonGroup>
                          <Button
                            style={{
                              textDecoration: "none",
                              color: "white",
                              backgroundColor: "black",
                              borderColor: "black",
                              fontWeight: "bold",
                            }}
                            size="sm"
                            onClick={() => this.toggleAddSubscription()}
                          >
                            Add subscription
                          </Button>
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
                      subscription{" "}
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
                        <th> Name </th>
                        <th> Days </th>
                        <th> Price </th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscriptions.map((subscription) => (
                        <tr>
                          <td>{subscription.name}</td>
                          <td>{subscription.days}</td>
                          <td>{subscription.price} </td>

                          <td>
                            <ButtonGroup>
                              <Button
                                variant="outline-dark"
                                onClick={() =>
                                  this.toggleEditSubscription(subscription)
                                }
                                size="sm"
                              >
                                View
                              </Button>

                              <Button
                                variant="outline-danger"
                                onClick={() => {
                                  //console.log('111')
                                  this.toggleDeleteSubscription(subscription);
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
                      {subscriptions.length > 0 && (
                        <Pagination
                          total={total}
                          showTotal={(total) => `Total ${total} Subscriptions`}
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

export default SubscriptionIndex;
