"use server";
import axios from "axios";
import { postRequest } from "./api";
import { LoginData } from "../types/login";

export default async function LoginApi(data: LoginData) {
  const response = await postRequest(`/api/Seller/Login`, data);

  if (response.success) {
    return {
      data: response.data,
      message: "Login successful",
    };
  }

  // Handle error object
  if (response.error) {
    if (axios.isAxiosError(response.error)) {
      const status = response.error.response?.status;

      if (status === 400 || status === 401) {
        return {
          data: null,
          message: "Invalid credentials",
        };
      }

      // Other specific status codes can be handled here

      // Fallback for known axios errors
      return {
        data: null,
        message:
          response.error.response?.data || "An error occurred during login.",
      };
    }

    // For unknown error types
    return {
      data: null,
      message: "An unexpected error occurred during login.",
    };
  }

  // If no error info, generic fallback
  return {
    data: null,
    message: "An unexpected error occurred during login.",
  };
}
