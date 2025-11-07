"use client";
import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Tag,
  Building2,
  PlusCircle,
} from "lucide-react";

export default function CustomerForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
    customerType: "",
  });

  const [customers, setCustomers] = useState<any[]>([]);

  return (
    <div className="w-full relative">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Customer Management
      </h1>

      <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Customer Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Customer Name *
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
              <User className="text-gray-400 mr-2" size={18} />
              <input
                type="text"
                name="name"
                placeholder="Enter customer name"
                className="w-full bg-transparent outline-none text-gray-900"
              />
            </div>
          </div>

          {/* Company */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Company (optional)
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
              <Building2 className="text-gray-400 mr-2" size={18} />
              <input
                type="text"
                name="company"
                placeholder="Enter company name"
                className="w-full bg-transparent outline-none text-gray-900"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
              <Mail className="text-gray-400 mr-2" size={18} />
              <input
                type="email"
                name="email"
                placeholder="customer@example.com"
                className="w-full bg-transparent outline-none text-gray-900"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
              <Phone className="text-gray-400 mr-2" size={18} />
              <input
                type="text"
                name="phone"
                placeholder="+92 300 1234567"
                className="w-full bg-transparent outline-none text-gray-900"
              />
            </div>
          </div>

          {/* Customer Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Customer Type
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
              <Tag className="text-gray-400 mr-2" size={18} />
              <select
                name="customerType"
                className="w-full p-1 bg-transparent outline-none text-gray-900"
              >
                <option value="">Select type</option>
                <option value="Retail">Retail</option>
                <option value="Wholesale">Wholesale</option>
                <option value="VIP">VIP</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Address
            </label>
            <div className="flex items-start border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
              <MapPin className="text-gray-400 mr-2 mt-1" size={18} />
              <textarea
                name="address"
                placeholder="Enter full address"
                className="w-full bg-transparent outline-none text-gray-900 resize-none"
                rows={3}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="md:col-span-2 flex justify-end mt-3">
            <button
              type="button"
              className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-900 transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
