import apiEndPoints from "../routes/apiEndPoints";
import axiosInstance from "./axiosInstance";
import { itemPerPage } from "../constant/vaiables";

// async function loginUserApi(payload) {
//   try {
//     const response = await axiosInstance
//   } catch (error) {
//     throw new Error(error.response.data.message || "Login failed");
//   }
// }
async function loginUserApi(payload) {
  try {
    const response = await axiosInstance.post(apiEndPoints.LOGIN, payload);
    return response.data;
  } catch (error) {
    return error.response.data.message || "Login failed";
  }
}
async function registerUserApi(payload) {
  try {
    const response = await axiosInstance.post(apiEndPoints.REGISTER, payload);
    return response.data;
  } catch (error) {
    return error.response.data.message || "Login failed";
  }
}
async function logoutUserApi() {
  try {
    const response = await axiosInstance.get(apiEndPoints.LOGOUT);
    return response.data;
  } catch (error) {
    return error.response.data.message || "Login failed";
  }
}
async function verifyUserLoginApi() {
  try {
    const response = await axiosInstance.get(apiEndPoints.VERIFY_LOGIN);
    return response.data;
  } catch (error) {
    return error.response.data || "Login failed";
  }
}

/// products api

async function getAllproductApi(query) {
  try {
    const response = await axiosInstance.get(
      `${apiEndPoints.GET_ALL_PRODUCTS(query)}`,
    );
    return response.data;
  } catch (error) {
    return error.response.data || { message: "failed to load products" };
  }
}
async function getproductByIdApi(id) {
  try {
    const response = await axiosInstance.get(
      `${apiEndPoints.GET_ALL_PRODUCTS}/${id}`,
    );
    return response.data;
  } catch (error) {
    return error.response.data || { message: "failed to load products" };
  }
}

//cart api
async function addItemToCartApi(payload) {
  try {
    const response = await axiosInstance.post(
      apiEndPoints.ADD_TO_CART,
      payload,
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function getUserCartItemApi() {
  try {
    const response = await axiosInstance.get(apiEndPoints.GET_USER_CART);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
async function removeUserCartItemApi(cartId) {
  try {
    const response = await axiosInstance.delete(
      apiEndPoints.REMOVE_USER_CART_ITEM(cartId),
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

//orders api
async function getMyOrdersApi(cartId) {
  try {
    const response = await axiosInstance.get(
      apiEndPoints.MY_ORDERS,
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export {
  loginUserApi,
  registerUserApi,
  logoutUserApi,
  verifyUserLoginApi,
  getAllproductApi,
  getproductByIdApi,
  addItemToCartApi,
  getUserCartItemApi,
  removeUserCartItemApi,
  getMyOrdersApi
};
