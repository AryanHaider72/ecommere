"use client";

import AddPayment from "@/api/lib/payment/addPayment/addPayment";
import DeletePaymentApi from "@/api/lib/payment/deletePayment/deletePayment";
import GetPayment from "@/api/lib/payment/getPayment/getPayment";
import UpdatePaymentApi from "@/api/lib/payment/updatePayment/updatePayment";
import {
  paymentget,
  paymentgetApiResponse,
} from "@/api/types/payment/getpayment";
import Spinner from "@/component/spinner/page";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CourierService() {
  const router = useRouter();
  const [mode, setMode] = useState("list");
  const [showlist, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [responseBack, setResponseBack] = useState(0);

  const [ID, setID] = useState("");
  const [ServiceName, setServiceName] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [Email, setEmail] = useState("");
  const [Description, setDescription] = useState("");

  const [paymentList, setPaymentList] = useState<paymentget[]>([]);

  useEffect(() => {
    if (
      responseBack === 1 ||
      responseBack === 2 ||
      responseBack === 3 ||
      responseBack === 4
    ) {
      setTimeout(() => {
        setResponseBack(0);
      }, 2000);
    }
  }, [responseBack]);
  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Courier Service Management
        </h1>
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
      <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          {/* <h2 className="text-2xl font-semibold text-gray-800">
            Supplier Ledger
          </h2> */}
          <button
            onClick={() => {
              setShowList(!showlist);
              setID("");
              setServiceName("");
              setDescription("");
              setEmail("");
              setPhoneNo("");
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {showlist ? (
              <>
                <ChevronRight size={18} /> Add New
              </>
            ) : (
              <>
                <ChevronLeft size={18} /> Show List
              </>
            )}
          </button>
        </div>
        {showlist ? (
          <>
            {loading ? (
              <div className="flex justify-center py-10">
                <Spinner />
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Add Courier
            </h2>
            <div className="space-y-5">
              {/* Bank Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Service Name
                </label>
                <input
                  type="text"
                  required
                  value={ServiceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className={`w-full px-3 py-3 border rounded-md ${
                    responseBack === 2 && !ServiceName
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none`}
                />
              </div>

              {/* Account Title */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Phone No
                </label>
                <input
                  type="text"
                  required
                  value={PhoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  className={`w-full px-3 py-3 border rounded-md ${
                    responseBack === 2 && !PhoneNo
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none`}
                />
              </div>

              {/* Account Number */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  type="text"
                  required
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-3 py-3 border rounded-md ${
                    responseBack === 2 && !Email
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none`}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <textarea
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`w-full px-3 py-3 border rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none border-gray-300`}
                />
              </div>

              {/* Response Messages */}
              {responseBack === 2 && (
                <div className="w-full bg-red-100 text-red-800 text-center px-4 py-3 mb-2 rounded">
                  Fill in All Required Fields
                </div>
              )}
              {responseBack === 3 && (
                <div className="w-full bg-red-100 text-red-800 text-center px-4 py-3 mb-2 rounded">
                  Network Error
                </div>
              )}
              {responseBack === 1 && (
                <div className="w-full bg-green-100 text-green-800 text-center px-4 py-3 mb-2 rounded">
                  Record Added Successfully
                </div>
              )}
              {responseBack === 4 && (
                <div className="w-full bg-green-100 text-green-800 text-center px-4 py-3 mb-2 rounded">
                  Record Modified Successfully
                </div>
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
                  // onClick={addPayment}
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
    </div>
  );
}
