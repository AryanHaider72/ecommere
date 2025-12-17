"use client";
import { useState } from "react";

import { Trash2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Footer from "@/component/Footer/page";
import Navbar from "@/component/Navbar/page";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [activePage, setActivePage] = useState("login");
  const [selected, setSelected] = useState("COD");

  const [promoCode, setPromoCode] = useState("");
  const paymentMethods = [
    "COD",
    "PayOneer",
    "Easypaisa / JazzCash",
    "Bank Transfer",
    "Credit / Debit Card",
  ];
  return (
    <>
      <Navbar onPageChange={setActivePage} />

      {/* MAIN CONTENT */}
      <div className="flex flex-col items-center w-full min-h-[calc(100vh-200px)] bg-gray-100 px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">CheckOut</h1>
        <hr className="w-1/2 border-gray-300 mt-6 mb-10" />
        <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 🧾 Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Account Details */}
              <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Account Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full mt-1 p-2 text-sm  border border-gray-200  rounded-md focus:ring-2 focus:ring-black/60 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full mt-1 p-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-black/60 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-600 font-medium">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+92 300 0000000"
                      className="w-full mt-1 p-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-black/60 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Details */}
              <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Shipping Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 font-medium">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Mr / Ms"
                      className="w-full mt-1 p-2 text-sm text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-black/60 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 font-medium">
                      Address
                    </label>
                    <input
                      type="text"
                      placeholder="Street Address"
                      className="w-full mt-1 p-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-black/60 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 font-medium">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="City"
                      className="w-full mt-1 p-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-black/60 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 font-medium">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      placeholder="00000"
                      className="w-full mt-1 p-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-black/60 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Billing Details */}
              <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Payment Method
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <label
                      key={method}
                      className={`flex items-center justify-between border rounded-md p-3 cursor-pointer transition-all duration-200 ${
                        selected === method
                          ? "border-gray-400 bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="payment"
                          value={method}
                          checked={selected === method}
                          onChange={() => setSelected(method)}
                          className="text-gray-500 focus:ring-gray-500"
                        />
                        <span
                          className={`font-medium text-sm ${
                            selected === method
                              ? "text-gray-600"
                              : "text-gray-700"
                          }`}
                        >
                          {method.toUpperCase()}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              {/*EasyPaisa Detail*/}
              {selected === "Easypaisa / JazzCash" && (
                <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    EasyPaisa/JazzCash Payment
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 font-medium">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        placeholder="0300-123456789"
                        className="w-full mt-1 p-2 text-sm  border border-gray-200  rounded-md focus:ring-2 focus:ring-black/60 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 font-medium">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="YourEmail@email.com"
                        className="w-full mt-1 p-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-black/60 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
              {selected === "Bank Transfer" && (
                <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    Bank Transfer Payment
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 font-medium">
                        Account Number
                      </label>
                      <input
                        type="text"
                        placeholder="123-456789-0000"
                        className="w-full mt-1 p-2 text-sm  border border-gray-200  rounded-md focus:ring-2 focus:ring-black/60 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 font-medium">
                        Bank Receipt
                      </label>
                      <input
                        type="file"
                        placeholder="YourEmail@email.com"
                        className="w-full mt-1 p-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-black/60 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100 h-fit">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Advance Booking
                </h2>

                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Red Branded Shirt</span>
                    <span>1000.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gym Coated Set (Brown)</span>
                    <span>150.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cotton Tank Top (Blue)</span>
                    <span>1410.50</span>
                  </div>
                </div>
                <div className="mt-2 flex flex-col space-x-2">
                  <label className="text-gray-700 text-sm">
                    Order Date/Time
                  </label>
                  <input
                    type="datetime-local"
                    placeholder="Enter promo code"
                    className="mt-1 border border-gray-300 shadow-md rounded-md p-2 text-sm focus:ring-2 focus:ring-black/60 "
                  />
                </div>

                <div className="mt-5 border-t border-gray-200 pt-4">
                  <h3 className="text-md font-semibold mb-2">
                    Billing Summary
                  </h3>

                  <div className="text-sm mt-4 space-y-1">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>2561.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between  text-gray-900">
                      <span>Date/Time</span>
                      <span>02-Nov-2025 (15-30-00)</span>
                    </div>
                    <div className="flex justify-between font-semibold text-gray-900">
                      <span>Total</span>
                      <span>2561.50</span>
                    </div>
                  </div>
                </div>

                <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
                  Place Order
                </button>
              </div>
              <div className="mt-2 bg-white shadow-sm rounded-xl p-6 border border-gray-100 h-fit">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Summary Order
                </h2>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Red Branded Shirt</span>
                    <span>1000.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gym Coated Set (Brown)</span>
                    <span>150.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cotton Tank Top (Blue)</span>
                    <span>1410.50</span>
                  </div>
                </div>

                <div className="mt-5 border-t border-gray-200 pt-4">
                  <h3 className="text-md font-semibold mb-2">
                    Billing Summary
                  </h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-1 border border-gray-300 shadow-md rounded-md p-2 text-sm focus:ring-2 focus:ring-black/60 "
                    />
                    <button className="bg-gray-600 text-white px-3 py-2 rounded-md text-sm hover:bg-black transition">
                      Apply
                    </button>
                  </div>

                  <div className="text-sm mt-4 space-y-1">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>2561.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between font-semibold text-gray-900">
                      <span>Total</span>
                      <span>2561.50</span>
                    </div>
                  </div>
                </div>

                <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
