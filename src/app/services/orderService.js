import settings from "./settings";
import { authHeader } from "./authHeader";
import { authService } from "./authService";
const authuser = JSON.parse(localStorage.getItem("user"));

export function searchOrders(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${settings.API_URL}admin/searchorders`, requestOptions).then(
    authService.handleResponse
  );
}

export function getOrders(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  if (authuser && authuser.admin == 1) {
    return fetch(`${settings.API_URL}admin/orders`, requestOptions).then(
      authService.handleResponse
    );
  } else {
    return fetch(`${settings.API_URL}vendor/orders`, requestOptions).then(
      authService.handleResponse
    );
  }
}

export function editOrder({ id }) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      id,
    }),
  };

  if (authuser && authuser.admin == 1) {
    return fetch(`${settings.API_URL}admin/updateorder`, requestOptions).then(
      authService.handleResponse
    );
  } else {
    return fetch(`${settings.API_URL}vendor/updateorder`, requestOptions).then(
      authService.handleResponse
    );
  }
}

export function deleteOrder(id) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  if (authuser && authuser.admin == 1) {
    return fetch(
      `${settings.API_URL}admin/deleteorder/${id}`,
      requestOptions
    ).then(authService.handleResponse);
  } else {
    return fetch(
      `${settings.API_URL}vendor/deleteorder/${id}`,
      requestOptions
    ).then(authService.handleResponse);
  }
}
