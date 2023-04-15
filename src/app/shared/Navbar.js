import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Trans } from "react-i18next";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
    };
  }
  toggleOffcanvas() {
    document.querySelector(".sidebar-offcanvas").classList.toggle("active");
  }

  logOut = () => {
    localStorage.removeItem("user");
  };
  render() {
    const { user } = this.state;
    return (
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          {/* <Link className="navbar-brand brand-logo" to="/">
            <img src={require("../../assets/images/logo.svg")} alt="logo" />
          </Link>
          <Link className="navbar-brand brand-logo-mini" to="/">
            <img
              src={require("../../assets/images/logo-mini.svg")}
              alt="logo"
            />
          </Link> */}
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            onClick={() => document.body.classList.toggle("sidebar-icon-only")}
          >
            <span className="mdi mdi-menu"></span>
          </button>
          {/* <div className="search-field d-none d-md-block">
            <form className="d-flex align-items-center h-100" action="#">
              <div className="input-group">
                <div className="input-group-prepend bg-transparent">
                  <i className="input-group-text border-0 mdi mdi-magnify"></i>
                </div>
                <input
                  type="text"
                  className="form-control bg-transparent border-0"
                  placeholder="Search products"
                />
              </div>
            </form>
          </div> */}
          <ul className="navbar-nav navbar-nav-right">
            {/* <li className="nav-item nav-profile d-none d-xl-flex">
              <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link count-indicator">
                  <Trans>Reports</Trans>
                </Dropdown.Toggle>
                <Dropdown.Menu className="preview-list navbar-dropdown">
                  <Dropdown.Item className="dropdown-item d-flex align-items-center" href="!#" onClick={evt =>evt.preventDefault()}>
                    <i className="mdi mdi-file-pdf mr-2"></i><Trans>PDF</Trans>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item className="dropdown-item d-flex align-items-center" href="!#" onClick={evt =>evt.preventDefault()}>
                  <i className="mdi mdi-file-excel mr-2"></i><Trans>Excel</Trans>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item className="dropdown-item d-flex align-items-center" href="!#" onClick={evt =>evt.preventDefault()}>
                    <i className="mdi mdi-file-word mr-2"></i><Trans>doc</Trans>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item nav-profile d-none d-xl-flex">
              <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link count-indicator">
                  <Trans>Projects</Trans>
                </Dropdown.Toggle>
                <Dropdown.Menu className="preview-list navbar-dropdown">
                  <Dropdown.Item className="dropdown-item d-flex align-items-center" href="!#" onClick={evt =>evt.preventDefault()}>
                    <i className="mdi mdi-eye-outline mr-2"></i><Trans>View Project</Trans>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item className="dropdown-item d-flex align-items-center" href="!#" onClick={evt =>evt.preventDefault()}>
                    <i className="mdi mdi-pencil-outline mr-2"></i><Trans>Edit Project</Trans>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item nav-profile nav-language d-none d-lg-flex">
              <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link count-indicator">
                  <div className="nav-language-icon">
                    <i className="flag-icon flag-icon-us" title="us" id="us"></i>
                  </div>
                  <div className="nav-language-text">
                    <p className="mb-1 text-black"><Trans>English</Trans></p>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="preview-list navbar-dropdown">
                  <Dropdown.Item className="dropdown-item d-flex align-items-center" href="!#" onClick={evt =>evt.preventDefault()}>
                    <div className="nav-language-icon mr-2">
                      <i className="flag-icon flag-icon-ae" title="ae" id="ae"></i>
                    </div>
                    <div className="nav-language-text">
                      <p className="mb-1 text-black"><Trans>Arabic</Trans></p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item className="dropdown-item d-flex align-items-center" href="!#" onClick={evt =>evt.preventDefault()}>
                    <div className="nav-language-icon mr-2">
                      <i className="flag-icon flag-icon-gb" title="GB" id="gb"></i>
                    </div>
                    <div className="nav-language-text">
                      <p className="mb-1 text-black"><Trans>English</Trans></p>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li> */}

            <li className="nav-item nav-profile nav-language">
              <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link count-indicator">
                  <div className="nav-profile-img">
                    <img
                      src={require("../../assets/images/faces/face28.png")}
                      alt="profile"
                    />
                  </div>
                  <div className="nav-profile-text">
                    <p className="mb-1 text-black">
                      <Trans>{user && user.name}</Trans>
                    </p>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="preview-list navbar-dropdown">
                  <div className="p-3 text-center bg-primary">
                    <img
                      className="img-avatar img-avatar48 img-avatar-thumb"
                      src={require("../../assets/images/faces/face28.png")}
                      alt=""
                    />
                  </div>
                  <div className="p-2">
                    <Dropdown.Item
                      className="dropdown-item d-flex align-items-center justify-content-between"
                      href="!#"
                      onClick={(evt) => evt.preventDefault()}
                    >
                      <span>
                        <Trans>Settings</Trans>
                      </span>
                      <i className="mdi mdi-settings"></i>
                    </Dropdown.Item>

                    <Dropdown.Item
                      className="dropdown-item d-flex align-items-center justify-content-between"
                      onClick={(evt) => evt.preventDefault()}
                    >
                      <span>
                        <Trans>Sign Out</Trans>
                      </span>
                      <Link
                        onClick={() => this.logOut()}
                        to="/auth/login"
                        className="btn btn-primary"
                      >
                        {" "}
                        <i className="mdi mdi-logout ml-1"></i>
                      </Link>
                    </Dropdown.Item>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            onClick={this.toggleOffcanvas}
          >
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
