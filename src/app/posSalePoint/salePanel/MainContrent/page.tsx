"use client";
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
} from "lucide-react";

export default function SellerOfflineOverview() {
  const stats = [
    {
      id: 1,
      title: "Total Sale",
      value: "Rs. 1,00,000",
      icon: Package,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Total Return",
      value: "Rs. 3000",
      icon: Clock,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: 4,
      title: "Total Expesne",
      value: "Rs. 5000",
      icon: Wallet,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 4,
      title: "Credit Sale",
      value: "Rs. 12,000",
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 5,
      title: "Cash Recieved",
      value: "Rs. 20,000",
      icon: TrendingUp,
      color: "bg-pink-100 text-pink-600",
    },
    {
      id: 6,
      title: "Total Profit",
      value: "Rs. 45,000",
      icon: Star,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Seller Dashboard Overview
      </h1>

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
    </div>
  );
}
