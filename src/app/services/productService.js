import settings from "./settings";
import { authHeader } from "./authHeader";
import { authService } from "./authService";
const authuser = JSON.parse(localStorage.getItem("user"));

export function searchProducts(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${settings.API_URL}admin/searchproducts`, requestOptions).then(
    authService.handleResponse
  );
}

export function getProducts(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  if (authuser && authuser.admin == 1) {
    return fetch(`${settings.API_URL}admin/products`, requestOptions).then(
      authService.handleResponse
    );
  } else {
    return fetch(`${settings.API_URL}vendor/products`, requestOptions).then(
      authService.handleResponse
    );
  }
}

export function addProduct({
  name,
  vendor,
  is_active,
  category,
  service,
  image,
  price,
}) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      name,
      vendor,
      is_active,
      category,
      service,
      image,
      price,
    }),
  };
  if (authuser && authuser.admin == 1) {
    return fetch(`${settings.API_URL}admin/addproduct`, requestOptions).then(
      authService.handleResponse
    );
  } else {
    return fetch(`${settings.API_URL}vendor/addproduct`, requestOptions).then(
      authService.handleResponse
    );
  }
}

export function editProduct({
  cloth_name,
  price,
  shop_id,
  service_id,
  category_id,
  is_active,
  image,
  id,
}) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      cloth_name,
      price,
      shop_id,
      service_id,
      category_id,
      is_active,
      image,
      id,
    }),
  };

  if (authuser && authuser.admin == 1) {
    return fetch(
      `${settings.API_URL}admin/updateproduct/${id}`,
      requestOptions
    ).then(authService.handleResponse);
  } else {
    return fetch(
      `${settings.API_URL}vendor/updateproduct/${id}`,
      requestOptions
    ).then(authService.handleResponse);
  }
}

export function deleteProduct(id) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  if (authuser && authuser.admin == 1) {
    return fetch(
      `${settings.API_URL}admin/deleteproduct/${id}`,
      requestOptions
    ).then(authService.handleResponse);
  } else {
    return fetch(
      `${settings.API_URL}vendor/deleteproduct/${id}`,
      requestOptions
    ).then(authService.handleResponse);
  }
}
