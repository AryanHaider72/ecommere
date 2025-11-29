"use server";
import { RequestLoginData, ResponseLoginData } from "../types/login";
import { postRequest } from "./main";

export default async function LoginApi(data: RequestLoginData, token?: string) {
  const customHeader: Record<string, string> = {};
  if (token) customHeader.Authorization = `Bearer ${token}`;

  const response = await postRequest(`/api/Seller/Login`, data, customHeader);
  if (response.success) {
    return {
      data: response.data as ResponseLoginData,
      status: response.status,
      message: "Login successful",
    };
  }

  const status = response.status;

  if (status === 400 || status === 401) {
    return {
      data: null,
      message: "Invalid credentials",
      status,
    };
  }

  return {
    data: null,
    message: response.message || "Login failed due to an unexpected error.",
    status: response.status,
  };

  // const response = await postRequest(`/api/Seller/Login`, data);

  // if (response.success) {
  //   return {
  //     data: response.data,
  //     message: "Login successful",
  //   };
  // }

  // // Handle error object
  // if (response.error) {
  //   if (axios.isAxiosError(response.error)) {
  //     const status = response.error.response?.status;

  //     if (status === 400 || status === 401) {
  //       return {
  //         data: null,
  //         message: "Invalid credentials",
  //       };
  //     }
  //     return {
  //       data: null,
  //       message:
  //         response.error.response?.data || "An error occurred during login.",
  //     };
  //   }

  //   // For unknown error types
  //   return {
  //     data: null,
  //     message: "An unexpected error occurred during login.",
  //   };
  // }

  // // If no error info, generic fallback
  // return {
  //   data: null,
  //   message: "An unexpected error occurred during login.",
  // };
}
