import settings from "./settings";
import { authHeader } from "./authHeader";
import { authService } from "./authService";

export function searchCategories(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(
    `${settings.API_URL}admin/searchcategories`,
    requestOptions
  ).then(authService.handleResponse);
}

export function getCategories(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}admin/categories`, requestOptions).then(
    authService.handleResponse
  );
}

export function addCategory({ name, image }) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      name,
      image,
    }),
  };
  return fetch(`${settings.API_URL}admin/addcategory`, requestOptions).then(
    authService.handleResponse
  );
}

export function editCategory({ name, id, image }) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      name,
      id,
      image,
    }),
  };

  return fetch(
    `${settings.API_URL}admin/updatecategory/${id}`,
    requestOptions
  ).then(authService.handleResponse);
}

export function deleteCategory(id) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  return fetch(
    `${settings.API_URL}admin/deletecategory/${id}`,
    requestOptions
  ).then(authService.handleResponse);
}

/* Service Endpoint*/

export function searchServices(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}admin/searchservices`, requestOptions).then(
    authService.handleResponse
  );
}

export function getServices(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}admin/services`, requestOptions).then(
    authService.handleResponse
  );
}

export function addService({ name }) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      name,
    }),
  };
  return fetch(`${settings.API_URL}admin/addservice`, requestOptions).then(
    authService.handleResponse
  );
}

export function editService({ name, id }) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      name,
      id,
    }),
  };

  return fetch(
    `${settings.API_URL}admin/updateservice/${id}`,
    requestOptions
  ).then(authService.handleResponse);
}

export function deleteService(id) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  return fetch(
    `${settings.API_URL}admin/deleteservice/${id}`,
    requestOptions
  ).then(authService.handleResponse);
}
