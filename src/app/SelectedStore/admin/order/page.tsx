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
  User,
  Calendar,
  CheckCircle,
  Clock,
  ShoppingCart,
} from "lucide-react";

export default function SellerOrders() {
  const [orders, setOrders] = useState([
    {
      id: "#1001",
      customer: "Ali Khan",
      email: "ali.khan@example.com",
      date: "Oct 28, 2025",
      status: "Pending",
      total: 4100,
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
        estimatedDelivery: "Oct 31, 2025",
      },
    },
    {
      id: "#1002",
      customer: "Sara Ahmed",
      email: "sara.ahmed@example.com",
      date: "Oct 27, 2025",
      status: "Shipped",
      total: 2650,
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
        estimatedDelivery: "Nov 2, 2025",
      },
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const statusStyle = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "Shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Canceled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const updateOrderStatus = (id: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  return (
    <div className="w-full relative">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Seller Order Management
      </h1>

      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col md:flex-row items-center justify-between bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all p-5"
          >
            {/* === LEFT: Customer Info === */}
            <div className="flex flex-col w-full md:w-1/3">
              <h3 className="font-semibold text-gray-900">{order.id}</h3>
              <p className="text-sm text-gray-500">{order.customer}</p>
              <p className="text-xs text-gray-400">{order.email}</p>
            </div>

            {/* === CENTER: Status + Date === */}
            <div className="flex items-center gap-4 mt-3 md:mt-0 w-full md:w-1/3 justify-center">
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full border ${statusStyle(
                  order.status
                )}`}
              >
                {order.status}
              </span>
              <p className="text-sm text-gray-500">{order.date}</p>
            </div>

            {/* === RIGHT: Controls === */}
            <div className="flex items-center gap-3 mt-3 md:mt-0 w-full md:w-1/3 justify-end">
              <p className="text-lg font-semibold text-gray-900">
                Rs. {order.total}
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

      {/* === Order Detail Modal === */}
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

            {/* === Customer Info === */}
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5 text-gray-700" />
              <div>
                <h4 className="font-semibold text-gray-900">
                  {selectedOrder.customer}
                </h4>
                <p className="text-sm text-gray-500">{selectedOrder.email}</p>
              </div>
            </div>

            {/* === Items === */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Ordered Items
              </h3>
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
                  </div>
                ))}
              </div>
            </div>

            {/* === Delivery + Payment Info === */}
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
                <Clock className="w-5 h-5 text-gray-700 mt-1" />
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

            {/* === Summary === */}
            <div className="border-t pt-4 space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Total</span>
                <span className="font-semibold text-gray-900 text-base">
                  Rs. {selectedOrder.total}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button className="px-4 py-2 mt-2 mb-2 bg-red-500 hover:bg-red-600 rounded-md text-white">
                Reject
              </button>
              <button className="px-4 py-2 mt-2 mb-2 bg-green-500 hover:bg-green-600 rounded-md text-white">
                Approved
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
