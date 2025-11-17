"use client";
import { useState } from "react";
import {
  Building2,
  Mail,
  MapPin,
  Phone,
  User,
  Tag,
  PlusCircle,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Trash,
  Pencil,
  Coins,
} from "lucide-react";

export default function CustomerledgerForm() {
  const [showList, setShowList] = useState(true);

  return (
    <div className="w-full relative">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Customer Ledger</h1>
      <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
        {showList ? (
          <button
            onClick={() => setShowList(!showList)}
            className="px-2 py-2 flex gap-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white text-white rounded-md  items-center mb-2"
          >
            <ChevronRight className="text-white " />{" "}
            <span className="text-white ">Add New</span>
          </button>
        ) : (
          <button
            onClick={() => setShowList(!showList)}
            className="px-2 py-2 flex gap-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white text-white rounded-md  items-center mb-2"
          >
            <ChevronLeft className="text-white " />{" "}
            <span className="text-white ">Show List</span>
          </button>
        )}
        {showList ? (
          <div className="p-4 border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">ABC_XYZ</h3>
              <p className="text-gray-600">Email: abc@email.com</p>
              <p className="text-gray-600">Remaining Balance: 20,100</p>
            </div>
            <div className="flex gap-4">
              <button
                //   onClick={() => FetchData(company.Id)}
                className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 transition"
                title="Edit"
              >
                <Pencil className="w-5 h-5" />
              </button>
              <button
                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
                title="Delete"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5 mt-2">
            {/* === Row: Customer Name + Arrear === */}
            <div className="flex flex-col md:flex-row gap-5">
              {/* Customer Name */}
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">
                  Customer Name
                </label>
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                  <User className="text-gray-400 mr-2" size={18} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Customer name"
                    className="w-full bg-transparent outline-none text-gray-900"
                  />
                </div>
              </div>

              {/* Arrear */}
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">
                  Arrear
                </label>
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                  <Building2 className="text-gray-400 mr-2" size={18} />
                  <input
                    type="text"
                    name="arrear"
                    placeholder="0"
                    className="w-full bg-transparent outline-none text-gray-900"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* === Column: Payment Date === */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Payment Date
              </label>
              <input
                type="date"
                name="paymentDate"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 outline-none text-gray-900"
              />
            </div>

            {/* === Column: Amount === */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                placeholder="Enter amount"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 outline-none text-gray-900"
              />
            </div>

            {/* === Column: Description === */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Enter payment description"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 outline-none text-gray-900 resize-none"
                rows={3}
              />
            </div>

            {/* === Submit Button === */}
            <div className="flex justify-end pt-3">
              <button
                type="button"
                className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-900 transition"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
