import React, { Component, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Spinner from "./shared/Spinner";
import UserIndex from "./users/UserIndex";
import AdminRoute from "./services/AdminRoute";

import Login from "./auth/Login";
import Dashboard from "./dashboard/Dashboard";
import Register from "./auth/Register";
import AuthRoute from "./services/AuthRoute";
import VendorIndex from "./vendors/VendorIndex";
import CategoryIndex from "./category/categoryIndex";
import ServiceIndex from "./service/ServiceIndex";
import ProductIndex from "./products/ProductIndex";
import VendorProductIndex from "./vendor_shop/products/VendorProductIndex";
import DriverIndex from "./vendor_shop/drivers/DriverIndex";
import ProfileIndex from "./vendor_shop/profile/ProfileIndex";
import AdminDriverIndex from "./drivers/AdminDriverIndex";
import SubscriptionIndex from "./subscription/SubscriptionIndex";
import PaymentIndex from "./vendor_shop/payments/PaymentIndex";
import PaymentIndex2 from "./payments/PaymentIndex2";
import OrderIndex from "./vendor_shop/orders/OrderIndex";
import OrderAdminIndex from "./orders/OrderAdminIndex";
import ResetPassword from "./auth/ResetPassword";
import ForgotPassword from "./auth/ForgotPassword";
import { Routes } from "./auth/routes";
import CustomerOrderIndex from "./customers/orders/CustomerOrderIndex";
import CustomerProfileIndex from "./customers/profile/CustomerProfileIndex";

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <AdminRoute exact path="/" component={Dashboard} />
          <AdminRoute exact path="/dashboard" component={Dashboard} />
          <AdminRoute exact path="/users" component={UserIndex} />
          <AdminRoute exact path="/vendors" component={VendorIndex} />
          <AdminRoute exact path="/categories" component={CategoryIndex} />
          <AdminRoute exact path="/services" component={ServiceIndex} />
          <AdminRoute exact path="/products" component={ProductIndex} />
          <AdminRoute exact path="/drivers" component={AdminDriverIndex} />
          <AdminRoute exact path="/vendor/payments" component={PaymentIndex} />
          <AdminRoute exact path="/payment-history" component={PaymentIndex2} />
          <AdminRoute exact path="/orders" component={OrderAdminIndex} />

          <AdminRoute
            exact
            path="/subscriptions"
            component={SubscriptionIndex}
          />

          {/* Laundry Shop route section */}
          <AdminRoute exact path="/vendor/orders" component={OrderIndex} />
          <AdminRoute
            exact
            path="/vendor/products"
            component={VendorProductIndex}
          />

          <AdminRoute exact path="/vendor/drivers" component={DriverIndex} />
          <AdminRoute exact path="/vendor/profile" component={ProfileIndex} />

          {/* Customer Orders */}
          <AdminRoute
            exact
            path="/customer/orders"
            component={CustomerOrderIndex}
          />

          <AdminRoute
            exact
            path="/customer/profile"
            component={CustomerProfileIndex}
          />

          <AuthRoute path="/auth/login" component={Login} />
          <AuthRoute path="/auth/register" component={Register} />
          <AuthRoute path="/auth/forgot-password" component={ForgotPassword} />
          <AuthRoute
            exact
            path={Routes.ResetPassword.path}
            component={ResetPassword}
          />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
