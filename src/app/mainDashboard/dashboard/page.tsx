"use client";
import GetInitalStore from "@/api/authentication/StoreGet";
import { StoreApiResponse, storeInital } from "@/api/types/storeGet";
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  Wallet,
  Star,
  Package,
  TrendingUp,
  DollarSign,
  Users,
  ChevronLeft,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SellerOverviewDashbaord() {
  const router = useRouter();
  const [storeShow, setStoreShow] = useState(false);
  const [addStoreForm, setaddStoreForm] = useState(false);

  const [storeList, setStoreList] = useState<storeInital[]>([]);
  const stats = [
    {
      id: 1,
      title: "Total Products",
      value: "128",
      icon: Package,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Pending Orders",
      value: "12",
      icon: Clock,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: 3,
      title: "Completed Orders",
      value: "116",
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 4,
      title: "Total Revenue",
      value: "Rs. 254,000",
      icon: Wallet,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 5,
      title: "Top Rating",
      value: "4.8/5",
      icon: Star,
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: 6,
      title: "Monthly Growth",
      value: "+12%",
      icon: TrendingUp,
      color: "bg-pink-100 text-pink-600",
    },
  ];

  const recentOrders = [
    {
      id: "#1023",
      product: "Denim Jacket",
      buyer: "Ali Khan",
      status: "Delivered",
      amount: "Rs. 3,200",
      date: "Oct 28, 2025",
    },
    {
      id: "#1022",
      product: "Graphic Tee",
      buyer: "Sara Ahmed",
      status: "Processing",
      amount: "Rs. 1,800",
      date: "Oct 27, 2025",
    },
    {
      id: "#1021",
      product: "Hoodie",
      buyer: "Zain Malik",
      status: "Pending",
      amount: "Rs. 2,500",
      date: "Oct 25, 2025",
    },
  ];
  const storesget = async () => {
    const token = localStorage.getItem("token");
    const response = await GetInitalStore(String(token));
    if (response.status === 200 || response.status === 201) {
      const data = response.data as StoreApiResponse;
      console.log(data);
      setStoreList(data.storeList);
    }
  };
  useEffect(() => {
    storesget();
  }, []);
  return (
    <div className="w-full">
      <div className="w-full flex justify-end">
        <button
          onClick={() => {
            setStoreShow(true);
          }}
          className=" border border-gray-200 hover:bg-gray-200 rounded-md  px-3 py-2"
        >
          <span className=" flex justify-around align-center gap-1">
            <span>List Store</span>
          </span>{" "}
        </button>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Seller Dashboard Overview
      </h1>

      {storeShow && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
            {/* Header */}
            <div className="w-full flex justify-end ">
              <button
                onClick={() => setStoreShow(false)}
                className=" cursor-pointer hover:text-red-600"
              >
                <X />
              </button>
            </div>
            {storeList.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {storeList.map((item) => (
                    <div
                      key={item.storeID}
                      onClick={() => router.push(`/${item.storeID}`)}
                      className="relative bg-white shadow-sm border border-gray-200 p-6 rounded-2xl 
                          hover:shadow-lg hover:-translate-y-1 hover:bg-gray-100 transition-all cursor-pointer text-center"
                    >
                      <span
                        className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold 
                              w-5 h-5 flex items-center justify-center rounded-full shadow"
                      >
                        2
                      </span>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {item.storeName}
                      </h2>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setaddStoreForm(true);
                    setStoreShow(false);
                  }}
                  className="px-3 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white"
                >
                  Create Store
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {addStoreForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
            {/* Header */}
            <div className="w-full flex justify-start ">
              <button
                onClick={() => {
                  setStoreShow(true);
                  setaddStoreForm(false);
                }}
                className=" cursor-pointer hover:text-gray-900"
              >
                <ChevronLeft />
              </button>
            </div>
            <div className="max-w-lg mx-auto bg-white shadow-md p-6 mt-10 rounded-xl ">
              <h1 className="text-2xl font-bold text-gray-900 mb-5">
                Create New Store
              </h1>

              {/* Store Name */}
              <div className="mb-4">
                <label className="font-medium text-gray-700">Store Name</label>
                <input
                  name="storeName"
                  type="text"
                  placeholder="Enter store name"
                  // value={form.storeName}
                  // onChange={handleChange}
                  className="w-full p-3 border rounded-lg mt-1"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="font-medium text-gray-700">Store Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter store email"
                  className="w-full p-3 border rounded-lg mt-1"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  placeholder="Enter description..."
                  rows={4}
                  className="w-full p-3 border rounded-lg mt-1"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-2">
                Create Store
                {/* {loading ? (
                      <Loader2 className="animate-spin w-5 h-5" />
                    ) : (
                      "Create Store"
                    )} */}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* === STAT CARDS GRID === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {stats.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5"
          >
            <div>
              <p className="text-sm text-gray-500 font-medium">{item.title}</p>
              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {item.value}
              </h2>
            </div>
            <div
              className={`p-3 rounded-full ${item.color} flex items-center justify-center`}
            >
              <item.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* === RECENT ORDERS SECTION === */}
      <div className="mt-10 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Orders Received
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-t border-gray-100 text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Buyer</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 font-medium text-gray-700">
                    {order.id}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{order.product}</td>
                  <td className="py-3 px-4 text-gray-600">{order.buyer}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-md font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{order.amount}</td>
                  <td className="py-3 px-4 text-gray-500">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
