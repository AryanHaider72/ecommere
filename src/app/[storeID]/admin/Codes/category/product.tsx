"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";
import DeleteProductApi from "@/api/lib/product/DeleteProduct/DeleteProduct";
import GetProduct from "@/api/lib/product/GetProduct/GetProduct";
import { useRouter } from "next/navigation";
import { Product, ProductApiResponse } from "@/api/types/product/getProduct";
import Spinner from "@/component/spinner/page";

export default function ProductCard({ storeID }: { storeID?: string }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [ID, setID] = useState("");
  const [productList, setProductList] = useState<Product[]>([]);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<
    Record<string, number>
  >({});
  const [selectedProductImageIndex, setSelectedProductImageIndex] = useState<
    Record<string, number>
  >({});
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const [selectedOption2, setSelectedOption2] = useState("OnlineStore");

  const getProduct = async () => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/sellerlogin");

    const response = await GetProduct(token, storeID);

    if (response.status === 200 || response.status === 201) {
      const data = response.data as ProductApiResponse;
      setProductList(data.list);
    } else if (response.status === 401) {
      router.push("/sellerlogin");
    }
    setLoading(false);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const deleteProduct = async (productID: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setDeleting(true); // start spinner
    const formData = { productID };
    const response = await DeleteProductApi(formData, token);

    if (response.status === 200 || response.status === 201) {
      setID(""); // reset selected ID
      setIsOpen(false);
      await getProduct(); // refresh list
    } else if (response.status === 401) {
      router.push("/sellerlogin");
    }

    setDeleting(false); // stop spinner
  };

  const filteredProducts = (productList || []).filter((product) => {
    if (selectedOption2 === "Both") return true;
    if (selectedOption2 === "OnlineStore")
      return (
        product.storeSale === "OnlineStore" || product.storeSale === "Both"
      );
    if (selectedOption2 === "OfflineStore")
      return product.storeSale === "OfflineStore";
    return true;
  });

  if (loading) return <Spinner />;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
            {/* Header */}
            <h2 className="text-xl font-semibold text-gray-800">
              Delete Confirmation
            </h2>
            <p className="text-gray-500 mt-2">
              Are you sure you want to delete this record? <br />
              This action cannot be undone.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteProduct(ID)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition flex items-center justify-center gap-2"
                disabled={deleting} // disable while loading
              >
                {deleting && <Spinner />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-6">
        {/* ---------- DROPDOWN ---------- */}
        <div className="p-3 rounded-xl max-w-md">
          <h2 className="text-md text-gray-800 mb-2">Store Sale</h2>
          <select
            value={selectedOption2}
            onChange={(e) => setSelectedOption2(e.target.value)}
            className="w-full rounded-lg border p-2 border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>
              Select store sale type
            </option>
            <option value="OnlineStore">Online Store</option>
            <option value="OfflineStore">Offline Store</option>
          </select>
        </div>

        {/* ---------- OFFLINE STORE CARDS ---------- */}
        {/* ---------- OFFLINE STORE ---------- */}
        {(() => {
          const offlineProducts = filteredProducts.filter(
            (p) => p.storeSale === "OfflineStore"
          );

          if (offlineProducts.length > 0) {
            return (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                  Offline Store
                </h2>
                <div className="space-y-4">
                  {offlineProducts.map((product) => {
                    const selectedVarIndex =
                      selectedVariantIndex[product.productID] ?? 0;
                    const selectedVariantValue =
                      product.variants?.[0]?.variantValues?.[selectedVarIndex];
                    const originalAmount = Number(
                      selectedVariantValue?.amount || 0
                    );

                    return (
                      <div
                        key={product.productID}
                        className="p-4 border w-full border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition flex justify-between items-center"
                      >
                        {/* Product Details */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {product.productName}
                          </h3>
                          <p className="text-gray-600">
                            Discount: {product.discount}%
                          </p>
                          <p className="text-gray-600">
                            Price: ${originalAmount}
                          </p>
                          {product.variants?.[0] && (
                            <div className="mt-3">
                              <h4 className="text-sm font-medium">
                                {product.variants[0].variantName}
                              </h4>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {product.variants[0].variantValues.map(
                                  (attr, idx) => (
                                    <button
                                      key={attr.attributeID}
                                      onClick={() =>
                                        setSelectedVariantIndex((prev) => ({
                                          ...prev,
                                          [product.productID]: idx,
                                        }))
                                      }
                                      disabled={attr.qty <= 0}
                                      className={`px-2 py-1 rounded-full text-xs ${
                                        selectedVarIndex === idx
                                          ? "bg-blue-600 text-white"
                                          : attr.qty > 0
                                          ? "bg-gray-900 text-white hover:bg-gray-700"
                                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                      }`}
                                    >
                                      {attr.varientValue}
                                    </button>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Edit/Delete Buttons */}
                        <div className="flex gap-4">
                          <button
                            onClick={() =>
                              console.log("Edit", product.productID)
                            }
                            className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 transition"
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => {
                              setIsOpen(true);
                              setID(product.productID);
                            }}
                            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
                          >
                            <Trash className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          } else {
            return (
              <p className="text-gray-500 text-center mt-4">No records found</p>
            );
          }
        })()}

        {/* ---------- ONLINE STORE / BOTH CARDS ---------- */}
        {(() => {
          const onlineProducts = filteredProducts.filter(
            (p) => p.storeSale !== "OfflineStore"
          );

          if (onlineProducts.length > 0) {
            return (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                  Online Store / Both
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {onlineProducts.map((product) => {
                    const selectedVarIndex =
                      selectedVariantIndex[product.productID] ?? 0;
                    const selectedVariantValue =
                      product.variants?.[0]?.variantValues?.[selectedVarIndex];
                    const originalAmount = Number(
                      selectedVariantValue?.amount || 0
                    );
                    const discountedAmount =
                      originalAmount -
                      (originalAmount * Number(product.discount || 0)) / 100;
                    const mainImageIndex =
                      selectedProductImageIndex[product.productID] ?? 0;
                    const mainImageUrl =
                      product.images?.[mainImageIndex]?.url ||
                      "/placeholder-image.jpg";

                    return (
                      <div
                        key={product.productID}
                        className="bg-white rounded-xl shadow hover:shadow-lg p-4 transition w-full"
                      >
                        {/* ...rest of product card */}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          } else {
            return (
              <p className="text-gray-500 text-center mt-4">No records found</p>
            );
          }
        })()}
      </div>
    </>
  );
}
