import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { Trans } from "react-i18next";

class Sidebar2 extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach((i) => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(this.state).forEach((i) => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: "/apps", state: "appsMenuOpen" },
      { path: "/basic-ui", state: "basicUiMenuOpen" },
      { path: "/advanced-ui", state: "advancedUiMenuOpen" },
      { path: "/form-elements", state: "formElementsMenuOpen" },
      { path: "/tables", state: "tablesMenuOpen" },
      { path: "/maps", state: "mapsMenuOpen" },
      { path: "/icons", state: "iconsMenuOpen" },
      { path: "/charts", state: "chartsMenuOpen" },
      { path: "/user-pages", state: "userPagesMenuOpen" },
      { path: "/error-pages", state: "errorPagesMenuOpen" },
      { path: "/general-pages", state: "generalPagesMenuOpen" },
      { path: "/ecommerce", state: "ecommercePagesMenuOpen" },
      { path: "/users", state: "users" },
    ];

    dropdownPaths.forEach((obj) => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true });
      }
    });
  }
  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li
            className={
              this.isPathActive("/dashboard") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/dashboard">
              <span className="icon-bg">
                <i className="mdi mdi-cube menu-icon"></i>
              </span>
              <span className="menu-title">
                <Trans>Dashboard</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/vendor/profile")
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to="/vendor/profile">
              <span className="icon-bg">
                <i className="mdi mdi-cube menu-icon"></i>
              </span>
              <span className="menu-title">
                <Trans>Profile</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/vendor/products")
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to="/vendor/products">
              <span className="icon-bg">
                <i className="mdi mdi-cart-outline menu-icon"></i>
              </span>
              <span className="menu-title">
                <Trans>Products</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/vendor/drivers")
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to="/vendor/drivers">
              <span className="icon-bg">
                <i className="mdi mdi mdi-bike menu-icon"></i>
              </span>
              <span className="menu-title">
                <Trans>Drivers</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/vendor/orders")
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to="/vendor/orders">
              <span className="icon-bg">
                <i className="mdi mdi-shopping menu-icon"></i>
              </span>
              <span className="menu-title">
                <Trans>Customer Orders</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/vendor/payments")
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to="/vendor/payments">
              <span className="icon-bg">
                <i className="mdi mdi-cards-playing-outline menu-icon"></i>
              </span>
              <span className="menu-title">
                <Trans>Payment History</Trans>
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }
}

export default withRouter(Sidebar2);
