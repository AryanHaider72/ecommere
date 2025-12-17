"use server";
import { SignUpData } from "../types/signup";
import { postRequest } from "./main";

export default async function SignUpApi(data: SignUpData, token?: string) {
  const customHeaders: Record<string, string> = {};
  if (token) customHeaders.Authorization = `Bearer ${token}`;

  const response = await postRequest(`/api/Seller/SignUp`, data, customHeaders);

  if (response.success) {
    return {
      data: response.data,
      status: response.status,
      message: "SignUp successful",
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

  if (status === 409) {
    return {
      data: null,
      message: "Account already exists",
      status,
    };
  }

  return {
    data: null,
    message: response.message || "Signup failed due to an unexpected error.",
    status: response.status,
  };
}
