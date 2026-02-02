"use server";

import { postRequest } from "@/api/authentication/main";

export default async function AddSalesman(salesmanName: string, token: string) {
  const customHeaders: Record<string, string> = {};
  if (token) customHeaders.Authorization = `Bearer ${token}`;

  const response = await postRequest(
    `/api/MainDashboard/AddSalesman`,
    salesmanName,
    customHeaders,
  );

  if (response.success) {
    return {
      data: response.data,
      status: response.status,
      message: "Salesman Added Successfully",
    };
  }

  const status = response.status;

  if (status === 400 || status === 401) {
    return {
      data: null,
      message: "Unauthorized User or Invalid Data",
      status,
    };
  }

  if (status === 409) {
    return {
      data: null,
      message: "Salesman already exists",
      status,
    };
  }

  return {
    data: null,
    message: response.message || "Failed to add salesman.",
    status: response.status || 500,
  };
}