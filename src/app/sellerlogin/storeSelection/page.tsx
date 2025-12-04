import GetInitalStore from "@/api/authentication/StoreGet";
import { StoreApiResponse, storeInital } from "@/api/types/storeGet";
import { useEffect, useState } from "react";

export default function StoreSelection() {
  const [storeList, setStoreList] = useState<storeInital[]>([]);

  const storesget = async () => {
    const token = localStorage.getItem("token");
    const response = await GetInitalStore(String(token));
    if (response.status === 200 || response.status === 201) {
      const data = response.data as StoreApiResponse;
      setStoreList(data.storeList);
    }
  };
  useEffect(() => {
    storesget();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {storeList.map((store, i) => (
          <div
            key={i}
            //   onClick={() => goToDashboard(store.storeID)}
            className="cursor-pointer bg-white rounded-lg shadow-md p-5 border hover:shadow-xl hover:border-indigo-500 transition duration-200"
          >
            <img
              alt="Store Logo"
              className="w-20 h-20 mx-auto object-cover rounded-full mb-4"
            />

            <h3 className="text-xl font-semibold text-gray-800 text-center">
              {store.storeName}
            </h3>

            <div className="mt-4 flex justify-center">
              <span className="px-4 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full">
                View Dashboard
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
