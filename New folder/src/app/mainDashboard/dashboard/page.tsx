"use client";
import GetInitalStore from "@/api/authentication/StoreGet";
import StoreCreation from "@/api/lib/store/createStore/createStore";
import GetUserData from "@/api/lib/userData/userDataGet/dataGet";
import { StoreApiResponse, storeInital } from "@/api/types/storeGet";
import { userDatagetApiResponse } from "@/api/types/userData/userDataType";
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
  const [loading, setLoading] = useState(false);
  const [addStoreForm, setaddStoreForm] = useState(false);
  const [responseBack, setResponseBack] = useState(0);

  const [storeEmail, setStoreEmail] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");

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
  const getData = async () => {
    const token = localStorage.getItem("token");
    const response = await GetUserData(String(token));

    if (response.status === 200 || response.status === 201) {
      const user = response.data as userDatagetApiResponse;
      setStoreEmail(user.userData[0].email);
    }

    if (response.status === 401) {
      router.push("/sellerlogin");
    }
  };
  const createStore = async () => {
    if (!storeDescription || !storeEmail) return setResponseBack(2);
    else {
      const token = localStorage.getItem("token");
      const formData = {
        email: storeEmail,
        storeName: storeName,
        description: storeDescription,
      };
      const response = await StoreCreation(formData, String(token));
      if (response.status === 200 || response.status === 201) {
        setStoreName("");
        setStoreDescription("");
        setResponseBack(1);
      }

      if (response.status === 401) {
        router.push("/sellerlogin");
      }
      if (response.status === 409) {
        return setResponseBack(3);
      } else return setResponseBack(4);
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
          <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Your Stores
              </h2>
              <button
                onClick={() => setStoreShow(false)}
                className="p-1 rounded-full hover:bg-gray-200 transition"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {storeList.length > 0 ? (
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Store Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
                  {storeList.map((item) => (
                    <div
                      key={item.storeID}
                      onClick={() => router.push(`/${item.storeID}`)}
                      className="relative bg-gray-50 shadow-md border border-gray-200 p-5 rounded-2xl 
                        hover:shadow-lg hover:-translate-y-1 hover:bg-white transition-all cursor-pointer text-center flex flex-col justify-center items-center"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.storeName}
                      </h3>
                      <span
                        className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold 
                              w-5 h-5 flex items-center justify-center rounded-full shadow"
                      >
                        2
                      </span>
                    </div>
                  ))}
                </div>

                {/* Create Store Sidebar */}
                <div className="flex sm:flex-col justify-center items-center sm:items-start">
                  <button
                    onClick={() => {
                      setaddStoreForm(true);
                      setStoreShow(false);
                      getData();
                    }}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all text-lg font-medium"
                  >
                    + Create Store
                  </button>
                </div>
              </div>
            ) : (
              // No stores: center the button
              <div className="flex justify-center items-center h-40">
                <button
                  onClick={() => {
                    setaddStoreForm(true);
                    setStoreShow(false);
                    getData();
                  }}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all text-lg font-medium"
                >
                  + Create Your First Store
                </button>
              </div>
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
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 border border-gray-200 mt-10">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Create New Store
              </h2>

              <div className="space-y-5">
                {/* Email (Read-only) */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={storeEmail}
                    readOnly
                    placeholder="Enter store email"
                    className="w-full px-3 py-3 border rounded-md border-gray-300 bg-gray-100"
                  />
                </div>

                {/* Store Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Store Name
                  </label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="Enter store name"
                    className="w-full px-3 py-3 border rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    value={storeDescription}
                    onChange={(e) => setStoreDescription(e.target.value)}
                    placeholder="Enter description..."
                    rows={4}
                    className="w-full px-3 py-3 border rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
                  ></textarea>
                </div>

                {/* Messages */}
                {responseBack === 2 && (
                  <div className="w-full bg-red-100 text-red-800 p-3 rounded text-center">
                    Fill in All Required Fields
                  </div>
                )}
                {responseBack === 1 && (
                  <div className="w-full bg-green-100 text-green-800 p-3 rounded text-center">
                    Store Created Successfully
                  </div>
                )}
                {responseBack === 3 && (
                  <div className="w-full bg-red-100 text-red-800 p-3 rounded text-center">
                    Store Limit Reached
                  </div>
                )}
                {responseBack === 4 && (
                  <div className="w-full bg-red-100 text-red-800 p-3 rounded text-center">
                    Network Error
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={createStore} // Your API call function
                  type="button"
                  className="w-full py-3 bg-indigo-500 text-white rounded-xl font-semibold shadow-lg hover:bg-indigo-600 transition"
                >
                  {loading ? "Creating..." : "Create Store"}
                </button>
              </div>
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
