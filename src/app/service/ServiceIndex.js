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
import { getServices } from "../services/categoryService";
import SpinDiv from "../components/SpinDiv";

import { throttle, debounce } from "./debounce";
import "antd/dist/reset.css";
import { Pagination } from "antd";
import EditService from "./EditService";
import AddService from "./AddService";
import DeleteService from "./DeleteServic";

export class ServiceIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      page: 1,
      rows: 10,
      loading: false,
      services: [],
      total: 0,
    };
    this.searchDebounced = debounce(this.searchServices, 500);
    this.searchThrottled = throttle(this.searchServices, 500);
  }

  componentDidMount() {
    this.getServices();
  }

  getServices = () => {
    const { page, rows, search, services } = this.state;
    this.setState({ loading: true });
    getServices({ page, rows, search, services }).then(
      (res) => {
        this.setState({
          services: res.services.data,
          page: res.services.current_page,
          total: res.services.total,
          loading: false,
        });
      },
      (error) => {
        this.setState({ loading: false });
      }
    );
  };

  searchServices = () => {
    const { page, rows, search, services } = this.state;
    this.setState({ loading: false });
    getServices({ page, rows, search, services }).then(
      (res) => {
        this.setState({
          services: res.services.data,
          page: res.services.current_page,
          total: res.services.total,
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
    await this.getServices();
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

  toggleAddService = () => {
    this.setState({ addService: !this.state.addService });
    this.getServices();
  };

  toggleEditService = (editService) => {
    this.setState({ editService });
    this.getServices();
  };

  toggleEdit = () => {
    this.setState({ editService: !this.state.editService });
    this.getServices();
  };

  toggle = () => {
    this.setState({ deleteService: !this.state.deleteService });
  };

  toggleDeleteService = (deleteService) => {
    this.setState({ deleteService });
  };

  render() {
    const {
      services,
      total,
      page,
      rows,
      search,
      loading,
      addService,
      editService,
      deleteService,
    } = this.state;
    return (
      <div>
        {addService && (
          <AddService
            saved={this.searchServices}
            addService={addService}
            toggle={this.toggleAddService}
          />
        )}
        {editService && (
          <EditService
            saved={this.getServices}
            service={editService}
            toggle={this.toggleEdit}
          />
        )}
        {deleteService && (
          <DeleteService
            saved={this.getServices}
            service={deleteService}
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
                            href="#services"
                          >
                            Services
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
                            onClick={() => this.toggleAddService()}
                          >
                            Add Service
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
                      Services{" "}
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

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service) => (
                        <tr>
                          <td>{service.name} </td>

                          <td>
                            <ButtonGroup>
                              <Button
                                variant="outline-dark"
                                onClick={() => this.toggleEditService(service)}
                                size="sm"
                              >
                                View
                              </Button>

                              <Button
                                variant="outline-danger"
                                onClick={() => {
                                  //console.log('111')
                                  this.toggleDeleteService(service);
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
                      {services.length > 0 && (
                        <Pagination
                          total={total}
                          showTotal={(total) => `Total ${total} services`}
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

export default ServiceIndex;
