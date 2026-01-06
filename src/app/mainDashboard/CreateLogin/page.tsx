"use client";

import SignUpApi from "@/api/authentication/signup";
import {
  paymentget,
  paymentgetApiResponse,
} from "@/api/types/payment/getpayment";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateLogins() {
  const router = useRouter();
  const [mode, setMode] = useState("list");
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [responseBack, setResponseBack] = useState("");
  const [ShowMessage, setShowMessage] = useState(false);

  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [ID, setID] = useState("");

  const [paymentList, setPaymentList] = useState<paymentget[]>([]);

  const SignUp = async () => {
    try {
      setLoading(true);

      const data = {
        userName: UserName,
        email: Email,
        phoneNo: phoneNo,
        password: Password,
        status: "Sales Man",
      };

      const response = await SignUpApi(data);

      if (response.status === 200 || response.status === 201) {
        setUserName("");
        setEmail("");
        setPhoneNo("");
        setPassword("");

        setShowMessage(true);
        setResponseBack(response.data.message);
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          setResponseBack("Please fill in all required fields");
        } else if (error.response?.status === 401) {
          router.push("/sellerlogin");
        } else {
          setResponseBack(
            error.response?.data?.message || "Something went wrong"
          );
        }
      } else {
        setResponseBack("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ShowMessage) {
      setTimeout(() => {
        setResponseBack("");
        setShowMessage(false);
      }, 2000);
    }
  }, [responseBack]);
  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Create Logins</h1>
        <button
          onClick={() => {
            setMode(mode === "list" ? "form" : "list");
            setUserName("");
            setEmail("");
            setPassword("");
            setID("");
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          {mode === "list" ? "Add New" : "Back"}
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
            {/* Header */}
            <h2 className="text-xl font-semibold text-gray-800">
              Delete Confirmation
            </h2>
            <p className="text-gray-500 mt-2">
              Are you sure you want to delete this record? <br />
              This action cannot be undone.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  //   deletePayment(ID);
                  setIsOpen(false);
                }}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* LIST VIEW */}
      {mode === "list" && (
        <div className="space-y-4">
          <div className="space-y-4">
            {paymentList?.length === 0 ? (
              <div className="w-full bg-red-100 text-red-800 text-center px-4 py-3 mb-2 rounded">
                No Record Found
              </div>
            ) : (
              paymentList?.map((item) => (
                <div
                  key={item.paymentID}
                  className="bg-white rounded-xl p-4 shadow flex justify-between items-center hover:shadow-lg transition"
                >
                  <div>
                    <h2 className="font-semibold text-gray-800">
                      {item.accountTitle}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {item.accountNumber}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      //   onClick={() => fetchData(item.paymentID)}
                      className="px-3 py-1 text-yellow-500 border border-yellow-500 rounded hover:bg-yellow-50 transition hover:bg-yellow-500 hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setIsOpen(true);
                        setID(item.paymentID);
                      }}
                      className="px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-50 transition hover:bg-red-500 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* FORM VIEW (Modern) */}
      {mode === "form" && (
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Create New Login
          </h2>
          <div className="space-y-5">
            {/* Bank Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                User Name
              </label>
              <input
                type="text"
                required
                value={UserName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter UserName"
                className={`w-full px-3 py-3 border rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none`}
              />
            </div>

            {/* Account Title */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="text"
                required
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className={`w-full px-3 py-3 border rounded-md  focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none`}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Phone No
              </label>
              <input
                type="text"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                placeholder="Enter PhoneNo"
                className={`w-full px-3 py-3 border rounded-md  focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none`}
              />
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="text"
                required
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className={`w-full px-3 py-3 border rounded-md  focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none`}
              />
            </div>
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
            {update ? (
              <button
                // onClick={UpdatePayment}
                type="button"
                className="w-full py-3 bg-indigo-500 text-white rounded-xl font-semibold shadow-lg hover:bg-indigo-600 transition-all"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            ) : (
              <button
                onClick={SignUp}
                type="button"
                className="w-full py-3 bg-indigo-500 text-white rounded-xl font-semibold shadow-lg hover:bg-indigo-600 transition-all"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
