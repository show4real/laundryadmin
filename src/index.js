import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import "./i18n";
import * as serviceWorker from "./serviceWorker";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import AuthRoute from "./app/services/AuthRoute";
import { Routes } from "./app/auth/routes";
import ResetPassword from "./app/auth/ResetPassword";
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 10000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};
ReactDOM.render(
  <BrowserRouter>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
