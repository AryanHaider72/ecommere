"use server";

import { getRequest } from "@/api/authentication/main";

export default async function GetSalesman(token: string) {
  const customHeaders: Record<string, string> = {};
  if (token) customHeaders.Authorization = `Bearer ${token}`;

  const response = await getRequest(
    `/api/MainDashboard/GetSalesman`,
    null,
    customHeaders,
  );

  if (response.success) {
    return {
      data: response.data,
      status: response.status,
      message: "Salesman List Fetched",
    };
  }

  const status = response.status;

  if (status === 400 || status === 401) {
    return {
      data: null,
      message: "Unauthorized User",
      status,
    };
  }

  return {
    data: null,
    message: response.message || "An unexpected error occurred while fetching salesmen.",
    status: response.status || 500,
  };
}