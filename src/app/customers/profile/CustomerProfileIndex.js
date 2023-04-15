import React, { Component } from "react";
import { withAlert } from "react-alert";
import { Col, Row, Form } from "react-bootstrap";
import { getProfile, addProfile } from "../../services/userService";

import SpinDiv from "../../components/SpinDiv";

export class CustomerProfileIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      loading: false,
      fields: {
        name: "",
        address: "",
        phone: "",
      },
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = () => {
    this.setState({ loading: true });
    getProfile().then(
      (res) => {
        this.setState({
          fields: {
            name: res.user.name,
            phone: res.user.phone,
            address: res.user.address,
          },
          loading: false,
        });
      },
      (error) => {
        this.setState({ loading: false });
      }
    );
  };

  render() {
    const { fields, loading } = this.state;
    return (
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              {loading && <SpinDiv text={"Loading..."} />}

              {!loading && (
                <Row>
                  <Col md={12}>
                    <h3>Personal Information</h3>

                    <form className="pt-3">
                      <Row>
                        <Col md={6}>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              placeholder="First Name"
                              name="name"
                              disabled
                              value={fields.name}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <div className="form-group">
                            <input
                              type="text"
                              name="phone"
                              className="form-control form-control-lg"
                              placeholder="Phone number"
                              value={fields.phone}
                              disabled
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={8}>
                          <Form.Group>
                            <label htmlFor="exampleTextarea1">Address</label>
                            <textarea
                              className="form-control"
                              id="exampleTextarea1"
                              rows="4"
                              name="address"
                              value={fields.address}
                              disabled
                            ></textarea>
                          </Form.Group>
                        </Col>
                      </Row>
                    </form>
                  </Col>
                </Row>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAlert()(CustomerProfileIndex);
