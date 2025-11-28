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
  Contact,
  Notebook,
  Calendar,
  List,
} from "lucide-react";

export default function ExpenseForm() {
  const [showList, setShowList] = useState(true);

  return (
    <div className="w-full relative">
      <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Expense Management
          </h2>
          <button
            onClick={() => setShowList(!showList)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {showList ? (
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
          <div className="gap-5 mt-2">
            {/* Expense Name */}
            <div className="mt-2">
              <label className="block text-gray-700 font-medium mb-2">
                Expense Date
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                <Calendar className="text-gray-400 mr-2" size={18} />
                <input
                  type="date"
                  name="address"
                  placeholder="Enter Expense Date"
                  className="w-full bg-transparent outline-none text-gray-900 resize-none"
                />
              </div>
            </div>
            <div className="mt-2">
              <label className="block text-gray-700 font-medium mb-2">
                Expense Name
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                <User className="text-gray-400 mr-2" size={18} />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Expense Name"
                  className="w-full bg-transparent outline-none text-gray-900"
                />
              </div>
            </div>

            {/* Expense Type */}
            <div className="mt-2">
              <label className="block text-gray-700 font-medium mb-2">
                Expense Type
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                <List className="text-gray-400 mr-2" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Expense Type"
                  className="w-full bg-transparent outline-none text-gray-900"
                />
              </div>
            </div>

            {/* Expense Amount */}
            <div className="mt-2">
              <label className="block text-gray-700 font-medium mb-2">
                Expense Amount
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                <Coins className="text-gray-400 mr-2" size={18} />
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter Expense Amount"
                  className="w-full bg-transparent outline-none text-gray-900"
                />
              </div>
            </div>

            {/* Expense Date */}

            {/* Description (Full width) */}
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <div className="flex items-start border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                <Notebook className="text-gray-400 mr-2 mt-1" size={18} />
                <textarea
                  name="address"
                  placeholder="Enter Description"
                  className="w-full bg-transparent outline-none text-gray-900 resize-none"
                  rows={3}
                />
              </div>
            </div>

            {/* Submit Button (Full width) */}
            <div className="w-full flex justify-end mt-3">
              <button
                type="button"
                // onClick={insertCapital}
                className="w-full py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition"
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
