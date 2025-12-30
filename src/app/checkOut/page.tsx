"use client";
import { useEffect, useState } from "react";

import { Trash2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Footer from "@/component/Footer/page";
import Navbar from "@/component/Navbar/page";
import { useRouter } from "next/navigation";
import { CartData } from "@/api/types/Cart/CartData";
import {
  paymentget,
  paymentgetApiResponse,
} from "@/api/types/payment/getpayment";
import GetPayment from "@/api/lib/payment/getPayment/getPayment";
import GetCustomerLoginData from "@/api/lib/HomePage/CustomerData/CustomerGet";
import { CustomerDetailResponse } from "@/api/types/HomePage/CustomerData/Customerdata";

export default function CheckOut() {
  const [activePage, setActivePage] = useState("login");
  const [paymentID, setPaymentID] = useState("");
  const [selected, setSelected] = useState("COD");
  const [isShow, setIsShow] = useState(false);
  const [cartList, setCartList] = useState<CartData[]>([]);
  const [selectedOption2, setSelectedOption2] = useState("");
  const [paymentList, setPaymentList] = useState<paymentget[]>([]);
  const [accountTitle, setAccountTitle] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [fullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [country, setCountry] = useState("");
  const [City, setCity] = useState("");
  const [PostalCode, setPostalCode] = useState("");
  const [Address, setAddress] = useState("");
  const [customerID, setCustomerID] = useState("");

  const [promoCode, setPromoCode] = useState("PlaceOrder");

  const onClear = async () => {};

  useEffect(() => {
    getpayment();
    getCustomer();
    const data = localStorage.getItem("checkoutItems");
    if (data) {
      setCartList(JSON.parse(data));
    }
  }, []);
  const getpayment = async () => {
    const token = localStorage.getItem("token");
    const response = await GetPayment(String(token), {});
    if (response.status === 200 || response.status == 201) {
      const data = response.data as paymentgetApiResponse;

      setPaymentList(data.paymentMethod);
    } else {
      console.log();
    }
  };
  const fetchData = (ID: string) => {
    const data = paymentList.find((item) => item.paymentID === ID);
    if (data) {
      setAccountTitle(data.accountTitle);
      setAccountNumber(data.accountNumber);
      setBankName(data.bankName);
    }
  };
  //
  const getCustomer = async () => {
    const token = localStorage.getItem("token1");
    const response = await GetCustomerLoginData(String(token), {});
    if (response.status === 200 || response.status == 201) {
      const data = response.data as CustomerDetailResponse;
      setCustomerID(data.customerData[0].customerID);
      setFullName(data.customerData[0].customerName);
      setEmail(data.customerData[0].email);
      setPhoneNo(data.customerData[0].phoneNo);
    } else {
      console.log();
    }
  };

  const addOrder = async () => {
    const formData = {
      customerID: customerID,
      customerName: fullName,
      phoneNo: PhoneNo,
      shippingAddress: Address,
      email: Email,
      city: City,
      country: country,
      postalCode: PostalCode,
      orderDate: new Date().toISOString(),
      paymentID: paymentID,
      paymentStatus: "Unpaid",
      delievryCharges: 0,
    };
  };

  return (
    <>
      {/* <Navbar onPageChange={setActivePage} /> */}
      <Navbar
        onPageChange={(page) => console.log("Navigate to:", page)}
        SubCategoryID={(page) => console.log("Navigate to:", page)}
        onCategoriesLoaded={(categories) => {
          categories;
        }}
        cartList={cartList} // Pass full cartList, not just length
        setCartList={setCartList} // Pass setter so Navbar can update
        onClear={onClear} // Pass clear handler
      />
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
                <div className="p-2 rounded-xl max-w-md">
                  <h2 className="text-sm text-gray-800 font-medium mb-2">
                    Order Management
                  </h2>

                  <div className="flex flex-wrap  gap-4 ">
                    {/* Option 1 */}
                    <label className="text-sm text-gray-600 font-medium">
                      <input
                        type="radio"
                        name="StoreSale"
                        value="AdvanceBooking"
                        checked={selectedOption2 === "AdvanceBooking"}
                        onChange={(e) => setSelectedOption2("AdvanceBooking")}
                        className="w-3 h-3 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700 text-sm font-medium">
                        Advance Booking
                      </span>
                    </label>

                    {/* Option 2 */}
                    <label className="text-sm text-gray-600 font-medium">
                      <input
                        type="radio"
                        name="StoreSale"
                        value="PlaceOrder"
                        checked={selectedOption2 === "PlaceOrder"}
                        onChange={(e) => setSelectedOption2("PlaceOrder")}
                        className="w-3 h-3 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700 text-sm font-medium">
                        Place Order
                      </span>
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 font-medium">
                      Full Name
                    </label>
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
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
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      readOnly
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
                      value={PhoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
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
                      Country
                    </label>
                    <input
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      type="text"
                      placeholder="Country"
                      className="w-full mt-1 p-2 text-sm text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-black/60 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 font-medium">
                      Address
                    </label>
                    <input
                      value={Address}
                      onChange={(e) => setAddress(e.target.value)}
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
                      value={City}
                      onChange={(e) => setCity(e.target.value)}
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
                      value={PostalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
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
                  {paymentList.map((method) => (
                    <label
                      key={method.paymentID}
                      className={`flex items-center justify-between border rounded-md p-3 cursor-pointer transition-all duration-200 ${
                        selected === method.bankName
                          ? "border-gray-400 bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="payment"
                          value={paymentID}
                          checked={selected === method.bankName}
                          onClick={() => {
                            setIsShow(true);
                            fetchData(method.paymentID);
                            setPaymentID(method.paymentID);
                          }}
                          onChange={() => setSelected(method.bankName)}
                          className="text-gray-500 focus:ring-gray-500"
                        />
                        <span
                          className={`font-medium text-sm ${
                            selected === method.bankName
                              ? "text-gray-600"
                              : "text-gray-700"
                          }`}
                        >
                          {method.bankName.toUpperCase()}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              {/*EasyPaisa Detail*/}
              {paymentID !== "42ff7114-37ef-4d2e-ab66-d2cdd539f5ec" &&
                isShow && (
                  <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">
                      {bankName}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-600 font-medium">
                          Account Title
                        </label>
                        <input
                          type="text"
                          value={accountTitle}
                          readOnly
                          className="w-full mt-1 p-2 text-sm  border border-gray-200  rounded-md focus:ring-2 focus:ring-black/60 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 font-medium">
                          Account Number
                        </label>
                        <input
                          readOnly
                          value={accountNumber}
                          className="w-full mt-1 p-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-black/60 outline-none"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className=" text-sm text-gray-600 font-medium">
                        Add Receipt
                      </label>
                      <input
                        type="file"
                        className="w-full mt-1 p-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-black/60 outline-none"
                      />
                    </div>
                  </div>
                )}
            </div>
            <div className="flex flex-col">
              {selectedOption2 === "AdvanceBooking" ? (
                <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100 h-fit">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    Advance Booking
                  </h2>

                  <div className="space-y-3 text-sm text-gray-700">
                    {cartList.map((item) => (
                      <div
                        key={item.productID}
                        className="flex justify-between"
                      >
                        <span>{item.productName}</span>
                        <span>{item.salePrice}</span>
                      </div>
                    ))}
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
              ) : (
                <div className="mt-2 bg-white shadow-sm rounded-xl p-6 border border-gray-100 h-fit">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    Summary Order
                  </h2>
                  <div className="space-y-3 text-sm text-gray-700">
                    {cartList.map((item) => (
                      <div
                        key={item.productID}
                        className="flex justify-between"
                      >
                        <span>{item.productName}</span>
                        <span>{item.salePrice}</span>
                      </div>
                    ))}
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
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
