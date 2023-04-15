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
import { getDrivers } from "../services/driverService";
import SpinDiv from "../components/SpinDiv";

import { throttle, debounce } from "./debounce";

import { Pagination } from "antd";
import EditDriver from "./EditDriver";
import AddDriver from "./AddDriver";
import DeleteDriver from "./DeleteDriver";

export class AdminDriverIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      page: 1,
      rows: 10,
      loading: false,
      total: 0,
      drivers: [],
    };
    this.searchDebounced = debounce(this.searchDrivers, 500);
    this.searchThrottled = throttle(this.searchDrivers, 500);
  }

  componentDidMount() {
    this.getDrivers();
  }

  getDrivers = () => {
    const { page, rows, search } = this.state;
    this.setState({ loading: true });
    getDrivers({ page, rows, search }).then(
      (res) => {
        this.setState({
          drivers: res.drivers.data,
          page: res.drivers.current_page,
          total: res.drivers.total,
          loading: false,
        });
      },
      (error) => {
        this.setState({ loading: false });
      }
    );
  };

  searchDrivers = () => {
    const { page, rows, search, drivers } = this.state;
    this.setState({ loading: false });
    getDrivers({ page, rows, search, drivers }).then(
      (res) => {
        this.setState({
          drivers: res.drivers.data,
          page: res.drivers.current_page,
          total: res.drivers.total,
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
    await this.getDrivers();
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

  toggleAddDriver = () => {
    this.setState({ addDriver: !this.state.addDriver });
    this.getDrivers();
  };

  toggleEditDriver = (editDriver) => {
    this.setState({ editDriver });
    this.getDrivers();
  };

  toggleEdit = () => {
    this.setState({ editDriver: !this.state.editDriver });
    this.getDrivers();
  };

  toggle = () => {
    this.setState({ deleteDriver: !this.state.deleteDriver });
  };

  toggleDeleteDriver = (deleteDriver) => {
    this.setState({ deleteDriver });
  };

  render() {
    const {
      drivers,
      total,
      page,
      rows,
      search,
      loading,
      addDriver,
      editDriver,
      deleteDriver,
      vendors,
      categories,
      services,
    } = this.state;
    console.log(vendors);
    return (
      <div>
        {addDriver && (
          <AddDriver
            saved={this.searchDrivers}
            addDriver={addDriver}
            categories={categories}
            services={services}
            toggle={this.toggleAddDriver}
          />
        )}
        {editDriver && (
          <EditDriver
            saved={this.getDrivers}
            driver={editDriver}
            categories={categories}
            services={services}
            toggle={this.toggleEdit}
          />
        )}
        {deleteDriver && (
          <DeleteDriver
            saved={this.getDrivers}
            driver={deleteDriver}
            toggle={this.toggle}
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
                            href="#drivers"
                          >
                            Drivers
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
                            onClick={() => this.toggleAddDriver()}
                          >
                            Add Driver
                          </Button> */}
                          {/* <Button variant="outline-primary" size="sm">
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
                      Drivers{" "}
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

                        <th> status </th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {drivers.map((driver) => (
                        <tr>
                          <td style={{ textTransform: "capitalize" }}>
                            {driver.name}{" "}
                          </td>

                          <td>
                            <ProgressBar
                              variant={
                                driver.status !== null ? "success" : "danger"
                              }
                              now={100}
                            />
                          </td>

                          <td>
                            <ButtonGroup>
                              <Button
                                variant="outline-dark"
                                onClick={() => this.toggleEditDriver(driver)}
                                size="sm"
                              >
                                View
                              </Button>

                              <Button
                                variant="outline-dark"
                                onClick={() => {
                                  //console.log('111')
                                  this.toggleDeleteDriver(driver);
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
                      {drivers.length > 0 && (
                        <Pagination
                          total={total}
                          showTotal={(total) => `Total ${total} drivers`}
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

export default AdminDriverIndex;
