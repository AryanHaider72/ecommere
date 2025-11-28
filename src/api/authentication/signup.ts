"use server";
import axios from "axios";
import { SignUpData } from "../types/signup";

export default async function SignUpApi(data: SignUpData) {
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}/api/Seller/SignUp`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      return {
        status: response.status,
        data: response.data,
        message: "SignUp successful",
      };
    } else {
      throw new Error(`Sign Up failed with status code: ${response.status}`);
    }
  } catch (error: unknown) {
    if (
      axios.isAxiosError(error) &&
      (error.response?.status === 401 || error.response?.status === 401)
    ) {
      return {
        status: error.status,
        data: error.response?.data,
        message: "Invalid credentials",
      };
    }
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      return {
        status: error.status,
        data: error.response?.data,
        message: "Password must be At least 8 characters long",
      };
    } else {
      throw new Error("An unexpected error occurred during login.");
    }
  }
}
