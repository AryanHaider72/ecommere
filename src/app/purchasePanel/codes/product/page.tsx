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
  Box,
  Timer,
  ShoppingCart,
  Text,
} from "lucide-react";

export default function ProductForm() {
  const [showList, setShowList] = useState(true);

  return (
    <div className="w-full relative">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Product Management
      </h1>
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
              <h3 className="text-lg font-semibold text-gray-800">
                Blue Jeans
              </h3>
              <p className="text-gray-600">Short Code: Short Code</p>
              <p className="text-gray-600">Description: Description</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-5">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Product Name
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                <ShoppingCart className="text-gray-400 mr-2" size={18} />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Product ame"
                  className="w-full bg-transparent outline-none text-gray-900"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Short Code
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                <Text className="text-gray-400 mr-2" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Short Code"
                  className="w-full bg-transparent outline-none text-gray-900"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Threshold
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                <Timer className="text-gray-400 mr-2" size={18} />
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter Threshold"
                  className="w-full bg-transparent outline-none text-gray-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Unit
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                <Box className="text-gray-400 mr-2" size={18} />
                <input
                  type="text"
                  name="address"
                  placeholder="Enter Unit"
                  className="w-full bg-transparent outline-none text-gray-900 resize-none"
                />
              </div>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <div className="flex items-start border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                <MapPin className="text-gray-400 mr-2 mt-1" size={18} />
                <textarea
                  name="Description"
                  placeholder="Enter full Description"
                  className="w-full bg-transparent outline-none text-gray-900 resize-none"
                  rows={3}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-end mt-3">
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
