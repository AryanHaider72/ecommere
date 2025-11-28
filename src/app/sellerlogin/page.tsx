"use client";

import { Eye, EyeClosed } from "lucide-react";
import React, { useEffect, useState } from "react";
import LoginApi from "@/api/authentication/login";
import { useRouter } from "next/navigation";
import { create } from "domain";
import SignUpApi from "@/api/authentication/signup";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [UserNameSeller, setUserNameSeller] = useState("");
  const [EmailSeller, setEmailSeller] = useState("");
  const [passwordSeller, setPasswordSeller] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phoneNo, setphoneNo] = useState("");

  const [responseBack, setResponseBack] = useState(0);
  const [createAccount, setCreateAccount] = useState(false);

  //Login Function
  const Login = async () => {
    const formData = { Email, password };
    const response = await LoginApi(formData);
    console.log("Response from Login API:", response);
    if (response?.status === 400 || response?.status === 401) {
      setResponseBack(1);
    }
  };

  //SignUp Function
  const SignUp = async () => {
    var data = {
      UserNameSeller,
      EmailSeller,
      phoneNo,
      passwordSeller,
    };
    const response = await SignUpApi(data);
    console.log("Response from SignUp API:", response);
    if (response?.status === 400 || response?.status === 401) {
      setResponseBack(1);
    } else setResponseBack(2);
  };

  useEffect(() => {
    if (responseBack === 1 || responseBack === 2) {
      setTimeout(() => {
        setResponseBack(0);
      }, 2000);
    }
  }, [responseBack]);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        {createAccount ? (
          <>
            <h3 className="text-center text-2xl font-semibold mb-6">Sign Up</h3>

            <div>
              {/* Email Field */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  UserName
                </label>
                <input
                  type="Email"
                  id="email"
                  value={UserNameSeller}
                  onChange={(e) => setUserNameSeller(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="UserName"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="Email"
                  id="email"
                  value={EmailSeller}
                  onChange={(e) => setEmailSeller(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone No
                </label>
                <input
                  type="text"
                  value={phoneNo}
                  onChange={(e) => setphoneNo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone No"
                  required
                />
              </div>

              {/* Password Field with Toggle */}
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    value={passwordSeller}
                    onChange={(e) => setPasswordSeller(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                  >
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    placeholder="Confirm Password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700"
                    onClick={() => setShowPassword1((prev) => !prev)}
                    tabIndex={-1}
                  >
                    {showPassword1 ? <Eye /> : <EyeClosed />}
                  </button>
                </div>
              </div>
              {responseBack === 1 && (
                <div className="w-full bg-red-100 text-red-800 text-center px-4 py-3 mb-2 rounded">
                  Invalid Email/password
                </div>
              )}
              {responseBack === 2 && (
                <div className="w-full bg-red-100 text-red-800 text-center px-4 py-3 mb-2 rounded">
                  Network Error
                </div>
              )}
              {passwordSeller !== passwordConfirm ? (
                <button
                  type="submit"
                  // onClick={Login}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 cursor-not-allowed"
                  disabled
                >
                  SignUp
                </button>
              ) : (
                <button
                  type="button"
                  onClick={SignUp}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 cursor-not-allowed"
                  disabled
                >
                  SignUp
                </button>
              )}

              <div
                onClick={() => setCreateAccount(!createAccount)}
                className="text-blue-500 text-sm hover:underline mt-2 cursor-pointer"
              >
                Already Have an Account?
              </div>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-center text-2xl font-semibold mb-6">Login</h3>

            <div>
              {/* Email Field */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="Email"
                  id="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email"
                  required
                />
              </div>

              {/* Password Field with Toggle */}
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                  >
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </button>
                </div>
              </div>
              {responseBack === 1 && (
                <div className="w-full bg-red-100 text-red-800 text-center px-4 py-3 mb-2 rounded">
                  Invalid Email/password
                </div>
              )}
              {responseBack === 2 && (
                <div className="w-full bg-red-100 text-red-800 text-center px-4 py-3 mb-2 rounded">
                  Network Error
                </div>
              )}
              <button
                type="submit"
                onClick={Login}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Login
              </button>
              <div
                onClick={() => setCreateAccount(!createAccount)}
                className="text-blue-500 text-sm hover:underline mt-2 cursor-pointer"
              >
                Create an Accont?
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
