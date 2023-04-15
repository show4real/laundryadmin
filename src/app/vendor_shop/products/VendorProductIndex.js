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
import { getProducts } from "../../services/productService";
import SpinDiv from "../../components/SpinDiv";

import { throttle, debounce } from "./debounce";

import { Pagination } from "antd";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";
import DeleteProduct from "./DeleteProduct";

export class VendorProductIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      page: 1,
      rows: 10,
      loading: false,
      total: 0,
      products: [],
      categories: [],
      services: [],
    };
    this.searchDebounced = debounce(this.searchProducts, 500);
    this.searchThrottled = throttle(this.searchProducts, 500);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {
    const { page, rows, search } = this.state;
    this.setState({ loading: true });
    getProducts({ page, rows, search }).then(
      (res) => {
        this.setState({
          products: res.products.data,
          categories: res.categories,
          services: res.services,
          page: res.products.current_page,
          total: res.products.total,
          loading: false,
        });
      },
      (error) => {
        this.setState({ loading: false });
      }
    );
  };

  searchProducts = () => {
    const { page, rows, search, products } = this.state;
    this.setState({ loading: false });
    getProducts({ page, rows, search, products }).then(
      (res) => {
        this.setState({
          products: res.products.data,
          page: res.products.current_page,
          total: res.products.total,
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
    await this.getProducts();
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

  toggleAddProduct = () => {
    this.setState({ addProduct: !this.state.addProduct });
    this.getProducts();
  };

  toggleEditProduct = (editProduct) => {
    this.setState({ editProduct });
    this.getProducts();
  };

  toggleEdit = () => {
    this.setState({ editProduct: !this.state.editProduct });
    this.getProducts();
  };

  toggle = () => {
    this.setState({ deleteProduct: !this.state.deleteProduct });
  };

  toggleDeleteProduct = (deleteProduct) => {
    this.setState({ deleteProduct });
  };

  render() {
    const {
      products,
      total,
      page,
      rows,
      search,
      loading,
      addProduct,
      editProduct,
      deleteProduct,
      vendors,
      categories,
      services,
    } = this.state;
    console.log(vendors);
    return (
      <div>
        {addProduct && (
          <AddProduct
            saved={this.searchProducts}
            addProduct={addProduct}
            categories={categories}
            services={services}
            toggle={this.toggleAddProduct}
          />
        )}
        {editProduct && (
          <EditProduct
            saved={this.getProducts}
            product={editProduct}
            categories={categories}
            services={services}
            toggle={this.toggleEdit}
          />
        )}
        {deleteProduct && (
          <DeleteProduct
            saved={this.getProducts}
            product={deleteProduct}
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
                            href="#products"
                          >
                            Products
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
                            onClick={() => this.toggleAddProduct()}
                          >
                            Add product
                          </Button>
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
                      Products{" "}
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
                        <th> Product Name </th>
                        <th> Vendor </th>
                        <th> Category </th>
                        <th> Service </th>
                        <th> Price </th>
                        <th> status </th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr>
                          <td style={{ textTransform: "capitalize" }}>
                            {product.cloth_name}{" "}
                          </td>
                          <td style={{ textTransform: "capitalize" }}>
                            {product.shop_name}{" "}
                          </td>
                          <td style={{ textTransform: "capitalize" }}>
                            {product.category_name}{" "}
                          </td>
                          <td style={{ textTransform: "capitalize" }}>
                            {product.service_name}{" "}
                          </td>
                          <td>${product.price} </td>
                          <td>
                            <ProgressBar
                              variant={
                                product.status !== null ? "success" : "danger"
                              }
                              now={100}
                            />
                          </td>

                          <td>
                            <ButtonGroup>
                              <Button
                                variant="outline-dark"
                                onClick={() => this.toggleEditProduct(product)}
                                size="sm"
                              >
                                View
                              </Button>

                              <Button
                                variant="outline-dark"
                                onClick={() => {
                                  //console.log('111')
                                  this.toggleDeleteProduct(product);
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
                      {products.length > 0 && (
                        <Pagination
                          total={total}
                          showTotal={(total) => `Total ${total} products`}
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

export default VendorProductIndex;
