"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Eye,
  X,
  Truck,
  MapPin,
  CreditCard,
  Package,
  Mail,
  Calendar,
  ShoppingBag,
} from "lucide-react";

export default function Order() {
  const [orders] = useState([
    {
      id: "#4578",
      product: "Beige Trouser",
      image: "/collection1.jpg",
      amount: "Rs. 1500",
      status: "Delivered",
      date: "Oct 25, 2025",
      details: {
        items: [
          {
            name: "Beige Trouser",
            image: "/collection1.jpg",
            qty: 1,
            price: 1500,
          },
          {
            name: "White Shirt",
            image: "/collection1.jpg",
            qty: 2,
            price: 2400,
          },
        ],
        address: "House #45, DHA Phase 6, Karachi, Pakistan",
        paymentMethod: "Cash on Delivery",
        deliveryMethod: "Leopard Courier",
        subtotal: 3900,
        deliveryFee: 200,
        total: 4100,
        estimatedDelivery: "Oct 28, 2025",
      },
    },
    {
      id: "#4576",
      product: "Denim Jacket",
      image: "/collection3.jpg",
      amount: "Rs. 2500",
      status: "Pending",
      date: "Oct 30, 2025",
      details: {
        items: [
          {
            name: "Denim Jacket",
            image: "/collection3.jpg",
            qty: 1,
            price: 2500,
          },
        ],
        address: "123 Clifton Block 8, Karachi, Pakistan",
        paymentMethod: "Credit Card",
        deliveryMethod: "TCS Express",
        subtotal: 2500,
        deliveryFee: 150,
        total: 2650,
        estimatedDelivery: "Nov 3, 2025",
      },
    },
    {
      id: "#4576",
      product: "Denim Jacket",
      image: "/collection2.jpg",
      amount: "Rs. 2500",
      status: "Pending",
      date: "Oct 30, 2025",
      details: {
        items: [
          {
            name: "Denim Jacket",
            image: "/collection2.jpg",
            qty: 1,
            price: 2500,
          },
        ],
        address: "123 Clifton Block 8, Karachi, Pakistan",
        paymentMethod: "Credit Card",
        deliveryMethod: "TCS Express",
        subtotal: 2500,
        deliveryFee: 150,
        total: 2650,
        estimatedDelivery: "Nov 3, 2025",
      },
    },
    {
      id: "#4576",
      product: "Denim Jacket",
      image: "/collection3.jpg",
      amount: "Rs. 2500",
      status: "Delivered",
      date: "Oct 30, 2025",
      details: {
        items: [
          {
            name: "Denim Jacket",
            image: "/collection3.jpg",
            qty: 1,
            price: 2500,
          },
        ],
        address: "123 Clifton Block 8, Karachi, Pakistan",
        paymentMethod: "Credit Card",
        deliveryMethod: "TCS Express",
        subtotal: 2500,
        deliveryFee: 150,
        total: 2650,
        estimatedDelivery: "Nov 3, 2025",
      },
    },
    {
      id: "#4576",
      product: "Denim Jacket",
      image: "/collection1.jpg",
      amount: "Rs. 2500",
      status: "Delivered",
      date: "Oct 30, 2025",
      details: {
        items: [
          {
            name: "Denim Jacket",
            image: "/collection1.jpg",
            qty: 1,
            price: 2500,
          },
        ],
        address: "123 Clifton Block 8, Karachi, Pakistan",
        paymentMethod: "Credit Card",
        deliveryMethod: "TCS Express",
        subtotal: 2500,
        deliveryFee: 150,
        total: 2650,
        estimatedDelivery: "Nov 3, 2025",
      },
    },
    {
      id: "#4576",
      product: "Denim Jacket",
      image: "/collection2.jpg",
      amount: "Rs. 2500",
      status: "Shipped",
      date: "Oct 30, 2025",
      details: {
        items: [
          {
            name: "Denim Jacket",
            image: "/collection2.jpg",
            qty: 1,
            price: 2500,
          },
        ],
        address: "123 Clifton Block 8, Karachi, Pakistan",
        paymentMethod: "Credit Card",
        deliveryMethod: "TCS Express",
        subtotal: 2500,
        deliveryFee: 150,
        total: 2650,
        estimatedDelivery: "Nov 3, 2025",
      },
    },
    {
      id: "#4576",
      product: "Denim Jacket",
      image: "/collection3.jpg",
      amount: "Rs. 2500",
      status: "Pending",
      date: "Oct 30, 2025",
      details: {
        items: [
          {
            name: "Denim Jacket",
            image: "/collection3.jpg",
            qty: 1,
            price: 2500,
          },
        ],
        address: "123 Clifton Block 8, Karachi, Pakistan",
        paymentMethod: "Credit Card",
        deliveryMethod: "TCS Express",
        subtotal: 2500,
        deliveryFee: 150,
        total: 2650,
        estimatedDelivery: "Nov 3, 2025",
      },
    },
    {
      id: "#4576",
      product: "Denim Jacket",
      image: "/collection1.jpg",
      amount: "Rs. 2500",
      status: "Canceled",
      date: "Oct 30, 2025",
      details: {
        items: [
          {
            name: "Denim Jacket",
            image: "/collection1.jpg",
            qty: 1,
            price: 2500,
          },
        ],
        address: "123 Clifton Block 8, Karachi, Pakistan",
        paymentMethod: "Credit Card",
        deliveryMethod: "TCS Express",
        subtotal: 2500,
        deliveryFee: 150,
        total: 2650,
        estimatedDelivery: "Nov 3, 2025",
      },
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const statusStyle = (status: string) => {
    if (status === "Delivered")
      return "bg-green-100 text-green-700 border-green-200";
    if (status === "Shipped")
      return "bg-blue-100 text-blue-700 border-blue-200";
    if (status === "Pending")
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    if (status === "Canceled") return "bg-red-100 text-red-700 border-red-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="w-full relative">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">My Orders</h1>
      <div className="w-full flex flex-col md:flex-row justify-around gap-2 mt-2 mb-2">
        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-2">
            Date From
          </label>
          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50">
            <Calendar className="text-gray-400 mr-2" size={18} />
            <input
              type="date"
              name="email"
              // value={formData.email}
              // onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-900"
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-2">
            Date To
          </label>
          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50">
            <Calendar className="text-gray-400 mr-2" size={18} />
            <input
              type="date"
              name="email"
              // value={formData.email}
              // onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-900"
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-2">Status</label>
          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50">
            <ShoppingBag className="text-gray-400 mr-2" size={18} />
            <select className="w-full p-1 bg-transparent outline-none text-gray-900">
              <option>Pending</option>
              <option>Delivered</option>
              <option>Canceled</option>
              <option>Shipped</option>
            </select>
          </div>
        </div>
      </div>
      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col md:flex-row items-center justify-between bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all p-5"
          >
            {/* === LEFT === */}
            <div className="flex items-center gap-4 w-full md:w-1/3">
              <div>
                <h3 className="font-semibold text-gray-900">{order.id}</h3>
                <p className="text-sm text-gray-500">
                  {order.product}, {order.product}
                </p>
              </div>
            </div>

            {/* === CENTER === */}
            <div className="flex items-center gap-4 mt-4 md:mt-0 w-full md:w-1/3 justify-center">
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full border ${statusStyle(
                  order.status
                )}`}
              >
                {order.status}
              </span>
              <p className="text-sm text-gray-500">{order.date}</p>
            </div>

            {/* === RIGHT === */}
            <div className="flex items-center gap-4 mt-4 md:mt-0 w-full md:w-1/3 justify-end">
              <p className="text-lg font-semibold text-gray-900">
                {order.amount}
              </p>
              <button
                onClick={() => setSelectedOrder(order)}
                className="flex items-center gap-2 text-sm text-white bg-black hover:bg-gray-900 rounded-lg px-4 py-2 transition"
              >
                <Eye size={16} /> View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* === Detailed Modal === */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* === Header === */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Order Details
              </h2>
              <p className="text-sm text-gray-500">
                Order ID: {selectedOrder.id} • {selectedOrder.date}
              </p>
            </div>

            {/* === Status === */}
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-5 h-5 text-gray-700" />
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full border ${statusStyle(
                  selectedOrder.status
                )}`}
              >
                {selectedOrder.status}
              </span>
            </div>

            {/* === Items === */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Items</h3>
              <div className="space-y-3">
                {selectedOrder.details.items.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border border-gray-100 rounded-xl p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={56}
                          height={56}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-900">
                      Rs. {item.price}
                    </p>
                    <button className="px-2 py-2 bg-black rounded-md text-white hover:bg-gray-900">
                      Order Again
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* === Shipping & Payment === */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-700 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Shipping Address
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {selectedOrder.details.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-gray-700 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Delivery Method
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {selectedOrder.details.deliveryMethod}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-gray-700 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Payment Method
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {selectedOrder.details.paymentMethod}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-gray-700 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Estimated Delivery
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {selectedOrder.details.estimatedDelivery}
                  </p>
                </div>
              </div>
            </div>

            {/* === Price Summary === */}
            <div className="border-t pt-4 space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {selectedOrder.details.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>Rs. {selectedOrder.details.deliveryFee}</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900 text-base">
                <span>Total</span>
                <span>Rs. {selectedOrder.details.total}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
