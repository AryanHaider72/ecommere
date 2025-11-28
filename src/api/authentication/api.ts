import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.100.5:8081/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: any;
  message?: string;
}

async function getRequest<T>(
  url: string,
  params?: any
): Promise<ApiResponse<T>> {
  try {
    const response = await api.get<T>(url, { params });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("GET request error:", error);
    return { success: false, error };
  }
}

async function postRequest<T>(
  url: string,
  data?: any
): Promise<ApiResponse<T>> {
  try {
    const response = await api.post<T>(url, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("POST request error:", error);
    return { success: false, error };
  }
}

export default api;
export { getRequest, postRequest };
