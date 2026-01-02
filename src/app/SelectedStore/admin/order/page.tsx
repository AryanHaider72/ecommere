"use client";
import { useEffect, useState } from "react";
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
import SellerOrderGet from "@/api/lib/Order/SellerOrdersGet";
import {
  SellerStoreListResponse,
  storesListSeller,
  storesSubList,
} from "@/api/types/order/GetStore";
import Spinner from "@/component/spinner/page";
import SellerOrderConfirmation from "@/api/lib/Order/SellerOrderConfirmation";

export default function SellerOrders({ storeID }: { storeID: string }) {
  const [isLoading, setisLoading] = useState(false);
  const [productList, setProuctList] = useState<storesListSeller[]>([]);
  const [subProductList, setsubProductList] = useState<storesSubList[]>([]);
  const [bags, setBags] = useState(0);
  const [qty, setQty] = useState(0);
  const [ResponseBack, setResponseBack] = useState("");
  const [isTrue, setIsTrue] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const statusStyle = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "Shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-green-100 text-green-700 border-green-200";
    }
  };

  const getOrders = async () => {
    try {
      setisLoading(true);
      const token = localStorage.getItem("token");
      const response = await SellerOrderGet(String(token), storeID);
      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
        const data = response.data as SellerStoreListResponse;
        setProuctList(data.storesMainList);
      } else {
        console.log(response.data);
      }
    } catch {
    } finally {
      setisLoading(false);
    }
  };
  const fetchData = (orderID: string) => {
    setSelectedOrder(true);
    const data = productList.find((item) => item.orderID === orderID);
    if (data) {
      console.log(data.storesSubList);
      setsubProductList(data.storesSubList);
    }
  };
  const orderStatusChange = async (orderDetailID: string, status: string) => {
    try {
      setisLoading(true);
      const token = localStorage.getItem("token");

      const formData = {
        bags: Number(bags),
        qty: Number(qty),
        status: status,
      };
      const response = await SellerOrderConfirmation(
        String(token),
        orderDetailID,
        formData
      );
      if (response.status === 200 || response.status === 201) {
        getOrders();
        setSelectedOrder(false);
        setResponseBack(response.data.message);
        setIsTrue(true);
      } else {
        setResponseBack(response.data.message);
        setIsTrue(true);
      }
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="w-full relative">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Seller Order Management
      </h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="space-y-5">
          {productList.map((order) => (
            <div
              key={order.orderID}
              className="flex flex-col md:flex-row items-center justify-between bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all p-5"
            >
              {/* === LEFT: Customer Info === */}
              <div className="flex flex-col w-full md:w-1/3">
                <h3 className="font-semibold text-gray-900">
                  {order.productName}
                </h3>
                <p className="text-sm text-gray-500">{order.customerName}</p>
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
                <p className="text-sm text-gray-500">
                  {order.orderDate.split("T")[0]}
                </p>
              </div>

              {/* === RIGHT: Controls === */}
              <div className="flex items-center gap-3 mt-3 md:mt-0 w-full md:w-1/3 justify-end">
                <p className="text-lg font-semibold text-gray-900">
                  Rs. {order.totalAmount}
                </p>
                <button
                  onClick={() => fetchData(order.orderID)}
                  className="flex items-center gap-2 text-sm text-white bg-black hover:bg-gray-900 rounded-lg px-4 py-2 transition"
                >
                  <Eye size={16} /> View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* === Order Detail Modal === */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => {
                setSelectedOrder(null);
                setQty(0);
                setBags(0);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* === Header === */}
            {subProductList.map((item) => (
              <>
                <div key={item.orderDetailID} className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Order Details
                  </h2>
                  <p className="text-sm text-gray-500">
                    Order ID: {item.orderDetailID}
                  </p>
                </div>

                {/* === Customer Info === */}
                <div className="flex items-center gap-3 mb-6">
                  <User className="w-5 h-5 text-gray-700" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {item.customerName}
                    </h4>
                    <p className="text-sm text-gray-500">{item.email}</p>
                  </div>
                </div>

                {/* === Items === */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Ordered Items
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border border-gray-100 rounded-xl p-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={"/collection3.jpg"}
                            alt={"/collection3.jpg"}
                            width={56}
                            height={56}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.productName}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.qty}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap2">
                        <p className="w-full flex justify-between gap-2">
                          <span className="font-semibold text-gray-900">
                            Item Price:{" "}
                          </span>
                          <span>
                            {item.salePrice -
                              (item.salePrice * item.discount) / 100}{" "}
                            -/
                          </span>
                        </p>
                        <p className="w-full flex justify-between gap-2">
                          <span className="font-semibold text-gray-900">
                            Shipping Charges.{" "}
                          </span>
                          <span>{item.shippingCharges} -/</span>
                        </p>
                      </div>
                    </div>
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
                        {item.shippingAddress}
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
                        Currenlty UnAvalibale
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-gray-700 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Payment Method
                      </h4>
                      <p className="text-gray-600 text-sm">{item.bankName}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-700 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Estimated Delivery
                      </h4>
                      <p className="text-gray-600 text-sm">4-5 Days</p>
                    </div>
                  </div>
                </div>

                {/* === Summary === */}
                <div className="border-t pt-4 space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="font-semibold text-gray-900 text-base">
                      Rs.{" "}
                      {item.shippingCharges +
                        (item.salePrice -
                          (item.salePrice * item.discount) / 100)}
                    </span>
                  </div>
                </div>
                <hr className="mt-2" />
                <div className="flex gap-2 mt-2">
                  <div className="w-full">
                    <label className="block text-gray-700 font-medium mb-1">
                      Bags
                    </label>
                    <input
                      type="number"
                      value={bags}
                      onChange={(e) => setBags(Number(e.target.value))}
                      placeholder="Enter Bags "
                      className="w-full p-3 border border-gray-200 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-gray-700 font-medium mb-1">
                      Quantity
                    </label>
                    <input
                      value={qty || item.qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      type="number"
                      placeholder="Enter Quantity "
                      className="w-full p-3 border border-gray-200 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                {item.status === "pending" && (
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => {
                        orderStatusChange(item.orderDetailID, "Cancelled");
                      }}
                      className="px-4 py-2 mt-2 mb-2 bg-red-500 hover:bg-red-600 rounded-md text-white"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() =>
                        orderStatusChange(item.orderDetailID, "Approved")
                      }
                      className="px-4 py-2 mt-2 mb-2 bg-green-500 hover:bg-green-600 rounded-md text-white"
                    >
                      {isLoading ? "Working..." : "Aproved"}
                    </button>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
