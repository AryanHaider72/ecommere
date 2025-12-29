"use client";
import { useEffect, useState } from "react";
import { ChevronRight, Eye, EyeOff, Mail } from "lucide-react";
import Image from "next/image";
import CustomerSignUp from "@/api/lib/CustomerAuthentication/SignUp/signup";
import { ResponseLoginDataCustomer } from "@/api/types/CustomerAuthentication/CustomerAuth";
import axios from "axios";
import OtpSend from "@/api/authentication/OtpSend";
import OtpSendCustomer from "@/api/lib/CustomerAuthentication/OtpSend/OtpSendCustomer";
import { useRouter } from "next/navigation";
import CustomerLogin from "@/api/lib/CustomerAuthentication/Login/CustomerLogin";
export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [ShowMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [Address, setAddress] = useState("");
  const [responseBack, setResponseBack] = useState("");

  const signUp = async () => {
    try {
      setLoading(true);

      const formData = {
        userName: fullName,
        email: Email,
        password: Password,
        phoneNo: PhoneNo,
        address: Address,
      };
      const response = await CustomerSignUp(formData);

      if (response.status === 200) {
        verfiy(Email);
        localStorage.setItem("Email", Email);
        router.push("/login/OtpVerifyPage");
        setResponseBack(response.message);
        setShowMessage(true);
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhoneNo("");
        setAddress("");
      } else {
        console.log(response);
        setResponseBack(response.message);
        setShowMessage(true);
      }
    } catch (error: any) {
      console.log(error);
      setResponseBack(error?.message || "Something went wrong");
      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  };
  const verfiy = async (email: string) => {
    const token = localStorage.getItem("token");
    const response = await OtpSendCustomer(email, String(token));
    console.log("Response from VerifySeller API:", response);
  };
  const login = async () => {
    try {
      setLoading(true);
      const formData = {
        email: Email,
        password: Password,
      };
      const response = await CustomerLogin(formData);

      if (response.status === 200) {
        router.push("/");
        console.log(response.data.token);
        localStorage.setItem("token1", response.data.token);
        setResponseBack(response.message);
        setShowMessage(true);
        setEmail("");
        setPassword("");
      } else {
        console.log(response);
        setResponseBack(response.message);
        setShowMessage(true);
      }
    } catch (error: any) {
      console.log(error);
      setResponseBack(error?.message || "Something went wrong");
      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!responseBack) return;

    const timer = setTimeout(() => {
      setShowMessage(false);
      setResponseBack("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [responseBack]);

  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mt-10 text-center">Login / SignUp</h1>
      <hr className="w-1/2 border-gray-300 mt-6 mb-10" />

      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-xl overflow-hidden shadow-xl relative">
        {/* Left Section - Image */}
        <div className="relative hidden md:block md:w-1/2 h-64 md:h-auto">
          <Image
            src="/banner.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 p-8 lg:p-16 flex flex-col justify-center relative z-10">
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-500 rounded-md"></div>
              <span className="text-xl font-semibold">N.</span>
            </div>

            {/* Heading */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {isLogin ? "Start your journey" : "Join us today"}
              </h2>
              <p className="text-gray-600 text-sm">
                {isLogin ? "Sign in Now To Get Started" : "Create your account"}
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    type="text"
                    placeholder="John Doe"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <div className="relative">
                  <input
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="example@email.com"
                    className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <Mail
                    className="absolute left-3 top-2.5 text-gray-400"
                    size={18}
                  />
                </div>
              </div>

              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone No
                    </label>
                    <input
                      value={PhoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                      type="text"
                      placeholder="1234567890"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      value={Address}
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      placeholder="123 Street, City"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </>
              )}

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full border border-gray-300 rounded-md pl-4 pr-10 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      value={ConfirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type={showPassword1 ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full border border-gray-300 rounded-md pl-4 pr-10 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword1(!showPassword1)}
                      className="absolute right-3 top-2.5 text-gray-400"
                    >
                      {showPassword1 ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              )}
              {ShowMessage && (
                <>
                  {responseBack && (
                    <div
                      className={`w-full text-center px-4 py-3 mb-2 rounded ${
                        responseBack === "Record Added Successfully" ||
                        responseBack === "Login Successfully" ||
                        responseBack === "Request successful"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {responseBack}
                    </div>
                  )}
                </>
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={isLogin ? login : signUp}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md py-2 mt-2 transition-colors"
              >
                {isLogin ? (
                  <>{loading ? "Logging In..." : "Login"}</>
                ) : (
                  <>{loading ? "Signing Up..." : "Sign Up"}</>
                )}
              </button>
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500 mt-6">
              {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:underline"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
