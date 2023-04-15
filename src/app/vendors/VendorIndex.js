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
import { getVendors } from "../services/vendorService";
import SpinDiv from "../components/SpinDiv";

import { throttle, debounce } from "./debounce";
import "antd/dist/reset.css";
import { Pagination } from "antd";
import EditVendor from "./EditVendor";

// import AddVendor from "./AddVendor";

export class VendorIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      page: 1,
      rows: 10,
      loading: false,
      vendors: [],
      total: 0,
    };
    this.searchDebounced = debounce(this.searchVendors, 500);
    this.searchThrottled = throttle(this.searchVendors, 500);
  }

  componentDidMount() {
    this.getVendors();
  }

  getVendors = () => {
    const { page, rows, search, vendors } = this.state;
    this.setState({ loading: true });
    getVendors({ page, rows, search, vendors }).then(
      (res) => {
        this.setState({
          vendors: res.vendors.data,
          page: res.vendors.current_page,
          total: res.vendors.total,
          loading: false,
        });
      },
      (error) => {
        this.setState({ loading: false });
      }
    );
  };

  searchVendors = () => {
    const { page, rows, search, vendors } = this.state;
    this.setState({ loading: false });
    getVendors({ page, rows, search, vendors }).then(
      (res) => {
        this.setState({
          vendors: res.vendors.data,
          page: res.vendors.current_page,
          total: res.vendors.total,
          loading: false,
        });
      },
      (error) => {
        this.setState({ loading: false });
      }
    );
  };

  toggleEditVendor = (editVendor) => {
    this.setState({ editVendor });
    this.getVendors();
  };

  toggleEdit = () => {
    this.setState({ editVendor: !this.state.editVendor });
    this.getVendors();
  };

  onChange = (e, state) => {
    this.setState({ [state]: e });
  };

  onPage = async (page, rows) => {
    await this.setState({ page, rows });
    await this.getVendors();
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

  toggleAddVendor = () => {
    this.setState({ addVendor: !this.state.addVendor });
    this.getVendors();
  };

  toggle = () => {
    this.setState({ deleteVendor: !this.state.deleteVendor });
  };

  toggleDeleteVendor = (deleteVendor) => {
    this.setState({ deleteVendor });
  };

  render() {
    const {
      vendors,
      total,
      page,
      rows,
      search,
      loading,
      addVendor,
      editVendor,
      deleteVendor,
    } = this.state;
    return (
      <div>
        {editVendor && (
          <EditVendor
            saved={this.getVendors}
            vendor={editVendor}
            toggle={this.toggleEdit}
          />
        )}
        {loading && <SpinDiv />}
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
                            className: " breadcrumb-text-dark text-primary",
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
                            href="#users"
                          >
                            Vendors
                          </Breadcrumb.Item>
                        </Breadcrumb>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg="8">
                    <h4 className="card-title">
                      {" "}
                      Vendors{" "}
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
                        <th> Email </th>
                        <th> Phone </th>
                        <th> Status </th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendors.map((vendor) => (
                        <tr>
                          <td>{vendor.user.name} </td>

                          <td>{vendor.user.email}</td>
                          <td>{vendor.user.phone}</td>
                          <td>
                            <ProgressBar
                              variant={
                                vendor.user.is_active !== null
                                  ? "success"
                                  : "danger"
                              }
                              now={100}
                            />
                          </td>
                          <td>
                            <ButtonGroup>
                              <Button
                                variant="outline-dark"
                                onClick={() => this.toggleEditVendor(vendor)}
                                size="sm"
                              >
                                View
                              </Button>

                              <Button
                                variant="outline-danger"
                                onClick={() => {
                                  //console.log('111')
                                  this.toggleDeleteVendor(vendor);
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
                      {vendors.length > 0 && (
                        <Pagination
                          total={total}
                          showTotal={(total) => `Total ${total} vendors`}
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

export default VendorIndex;
