"use client";
import { useState } from "react";
import { Eye, EyeOff, Link, Mail } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <div className="flex flex-col md:flex-row w-full max-w-5xl h-auto md:h-[600px] bg-white rounded-xl overflow-hidden shadow-xl relative">
        {/* Background Image - Positioned Absolutely on Left */}
        <div
          className={`absolute transition-all duration-500 hidden md:block left-0 top-0 w-1/2 h-full `}
        >
          <Image
            src="/fashion_83.webp"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Section - Form */}
        <div className="flex flex-col justify-center w-full md:w-1/2 px-8 lg:px-16 py-10 bg-white relative z-10 md:ml-auto">
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-400 rounded-md"></div>
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
            <form className="space-y-4">
              {!isLogin && (
                /* Name - Only for Sign Up */
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  E-mail
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    placeholder="example@email.com"
                    className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <Mail
                    className="absolute left-3 top-2.5 text-gray-400"
                    size={18}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
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
                /* Confirm Password - Only for Sign Up */
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
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
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-md py-2 mt-2"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>

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
    </>
  );
}
