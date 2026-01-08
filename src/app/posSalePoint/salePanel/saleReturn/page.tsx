"use client";
import React, { useEffect, useState } from "react";
import { Info, Trash2, Plus, ChevronRight, ChevronLeft, X } from "lucide-react";
import GetSalePos from "@/api/lib/PosIntegration/Sale/SaleGet/SaleGet";
import { responseGetSale, Sale } from "@/api/types/PosIntegration/Sale/Sale";
import GetProduct from "@/api/lib/product/GetProduct/GetProduct";
import { Product, ProductApiResponse } from "@/api/types/product/getProduct";
import GetInitalStoreSalesMan from "@/api/lib/store/GetStoreSalesMan/GetStoreSalesMan";
import { StoreApiResponse, storeInital } from "@/api/types/storeGet";
import SearchByInvoice from "@/api/lib/PosIntegration/Return/SearchHistory/SearchByInvoice/SearchByInvoice";
import SearchByProduct from "@/api/lib/PosIntegration/Return/SearchHistory/SearchByProduct/SearchByProduct";

interface SaleItem {
  id: number;
  name: string;
  qty: number;
  price: number;
  total: number;
}

interface responseList {
  message: string;
  showHistory: historyData[];
}

interface historyData {
  productName: string;
  attributeID: string;
  saleDate: Date;
  varientValue: string;
  barcode: string;
  qty: number;
  rate: number;
}
export default function SaleReturnModule() {
  const [invoiceNo, setInvoiceNo] = useState("");
  const [ProductID, setProductID] = useState("");
  const [ProductName, setProductName] = useState("");
  const [SaleID, setSaleID] = useState("");
  const [returnType, setReturnType] = useState("refund");
  const [selectedOption, setSelectedOption] = useState("product");

  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [returnItems, setReturnItems] = useState<SaleItem[]>([]);
  const [exchangeItems, setExchangeItems] = useState<SaleItem[]>([]);
  const [storeList, setStoreList] = useState<storeInital[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);

  const [InvocieHistory, setInvocieHistory] = useState<historyData[]>([]);
  const [SaleList, setSaleList] = useState<Sale[]>([]);
  const [newExchange, setNewExchange] = useState({
    name: "",
    qty: 0,
    price: 0,
  });
  const [showList, setShowList] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  // Dummy Data
  const dummySales: Record<string, SaleItem[]> = {
    INV001: [
      { id: 1, name: "Blue Jeans", qty: 2, price: 120, total: 240 },
      { id: 2, name: "Powder Blue Shirt", qty: 1, price: 450, total: 450 },
      { id: 3, name: "Women Fashion", qty: 1, price: 200, total: 200 },
    ],
    INV002: [
      { id: 4, name: "Toys", qty: 1, price: 1200, total: 1200 },
      { id: 5, name: "Women Jeans", qty: 2, price: 180, total: 360 },
    ],
  };

  const handleAddReturn = (item: SaleItem) => {
    if (!returnItems.find((i) => i.id === item.id)) {
      setReturnItems((prev) => [...prev, item]);
    }
  };

  const handleRemoveReturn = (id: number) => {
    setReturnItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleAddExchange = () => {
    if (newExchange.name && newExchange.qty > 0 && newExchange.price > 0) {
      const total = newExchange.qty * newExchange.price;
      setExchangeItems((prev) => [
        ...prev,
        { id: Date.now(), ...newExchange, total },
      ]);
      setNewExchange({ name: "", qty: 0, price: 0 });
    }
  };

  const handleRemoveExchange = (id: number) => {
    setExchangeItems((prev) => prev.filter((i) => i.id !== id));
  };
  function handleQtyChange(id: number, value: string) {
    const qty = parseInt(value);
    if (!isNaN(qty) && qty >= 0) {
      setReturnItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, qty, total: qty * item.price } : item
        )
      );
    }
  }

  const totalReturn = returnItems.reduce((sum, i) => sum + i.total, 0);
  const totalExchange = exchangeItems.reduce((sum, i) => sum + i.total, 0);

  const handleSave = () => {
    console.log({
      invoiceNo,
      returnType,
      returnItems,
      exchangeItems,
      totalReturn,
      totalExchange,
    });
    alert("Return saved successfully!");
  };

  const storesget = async () => {
    const token = localStorage.getItem("token");
    const response = await GetInitalStoreSalesMan(String(token));
    if (response.status === 200 || response.status === 201) {
      const data = response.data as StoreApiResponse;
      setStoreList(data.storeList);
      getProduct(data.storeList[0].storeID);
    }
  };
  const getProduct = async (ID: string) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const response = await GetProduct(token, ID);

    if (response.status === 200 || response.status === 201) {
      const data = response.data as ProductApiResponse;
      setProductList(data.list || []);
    }
  };
  const getInvoiceHistory = async (ID: string) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const response = await SearchByInvoice(token, ID);

    if (response.status === 200 || response.status === 201) {
      const data = response.data as responseList;
      console.log(data);
      setInvocieHistory(data.showHistory || []);
    }
  };
  const getProductHistory = async (ID: string) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const response = await SearchByProduct(token, ID);

    if (response.status === 200 || response.status === 201) {
      const data = response.data as responseList;
      console.log(data);
      setInvocieHistory(data.showHistory || []);
    }
  };

  const saleGet = async () => {
    const token = localStorage.getItem("token");
    const response = await GetSalePos(String(token));
    if (response.status === 200 || response.status === 201) {
      const data = response.data as responseGetSale;
      console.log(data);
      setSaleList(data.saleList);
    }
  };

  useEffect(() => {
    saleGet();
    storesget();
  }, []);

  return (
    <div className="min-h-screen  p-8 mt-8">
      <h2 className="text-2xl font-semibold text-gray-800">
        Sale Return Management
      </h2>
      <div className=" mt-5 max-w-5xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transition">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setShowList(!showList)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {showList ? (
              <>
                <ChevronRight size={18} /> Add New
              </>
            ) : (
              <>
                <ChevronLeft size={18} /> Show List
              </>
            )}
          </button>
        </div>

        {!showList && (
          <>
            <div className="p-6  rounded-xl max-w-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Search By
              </h2>

              <div className="flex flex-wrap gap-4 ">
                {/* Option 1 */}
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="inline-radio"
                    value="product"
                    checked={selectedOption === "product"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700 text-sm font-medium">
                    Product
                  </span>
                </label>

                {/* Option 2 */}
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="inline-radio"
                    value="inovice"
                    checked={selectedOption === "inovice"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700 text-sm font-medium">
                    Invoice No
                  </span>
                </label>
              </div>
            </div>
            {/* Invoice & Return Type */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {selectedOption === "product" ? (
                <div>
                  <label className="text-gray-600 font-medium mb-2 block">
                    Product Name
                  </label>
                  <div className="flex gap-2">
                    <input
                      list="productOptions"
                      value={ProductID}
                      onChange={(e) => {
                        setProductID(e.target.value);
                        const value = e.target.value;
                        const data = productList.find(
                          (item) => item.productName === value
                        );
                        if (data) {
                          getProductHistory(data.productID);
                        }
                      }}
                      placeholder="Select or type product"
                      className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <datalist id="productOptions">
                      {productList.length === 0 ? (
                        <option value="" disabled>
                          No products found
                        </option>
                      ) : (
                        productList.map((item) => (
                          <option key={item.productID} value={item.productName}>
                            {item.productName}
                          </option>
                        ))
                      )}
                    </datalist>
                    <button
                      onClick={() => setShowPopup(true)}
                      className="bg-blue-600 p-2.5 rounded-lg text-white hover:bg-blue-700"
                    >
                      <Info size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-gray-600 font-medium mb-2 block">
                    Select Invoice
                  </label>
                  <div className="flex gap-2">
                    <input
                      list="productOptions"
                      value={invoiceNo}
                      onChange={(e) => {
                        setInvoiceNo(e.target.value);
                        const value = e.target.value;
                        const data = SaleList.find(
                          (item) => item.invoiceNo === Number(value)
                        );
                        if (data) {
                          getInvoiceHistory(data.saleID);
                        }
                      }}
                      placeholder="Select or type product"
                      className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <datalist id="productOptions">
                      {productList.length === 0 ? (
                        <option value="" disabled>
                          No Invoice found
                        </option>
                      ) : (
                        SaleList.map((item) => (
                          <option key={item.saleID} value={item.invoiceNo}>
                            {item.invoiceNo}
                          </option>
                        ))
                      )}
                    </datalist>
                    <button
                      onClick={() => setShowPopup(true)}
                      className="bg-blue-600 p-2.5 rounded-lg text-white hover:bg-blue-700"
                    >
                      <Info size={18} />
                    </button>
                  </div>
                </div>
              )}
              <div>
                <label className="text-gray-600 font-medium mb-2 block">
                  Return Date
                </label>
                <input
                  type="date"
                  value={returnType}
                  onChange={(e) => setReturnType(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium mb-2 block">
                  Return Type
                </label>
                <select
                  value={returnType}
                  onChange={(e) => setReturnType(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="refund">Refund</option>
                  <option value="exchange">Exchange</option>
                  <option value="credit">Credit</option>
                </select>
              </div>
            </div>

            {/* Returned Items */}
            {returnItems.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-4 shadow-sm mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  Returned Items
                </h3>
                <table className="w-full text-sm">
                  <thead className="text-gray-600 border-b">
                    <tr>
                      <th className="py-2 text-left">Item</th>
                      <th className="text-center">Qty</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Total</th>
                      <th className="text-center">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {returnItems.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b hover:bg-gray-100 transition"
                      >
                        <td className="py-2">{item.name}</td>
                        <td className=" py-2  text-center w-[1/2]">
                          <input
                            type="number"
                            min={0}
                            value={item.qty}
                            onChange={(e) =>
                              handleQtyChange(item.id, e.target.value)
                            }
                            className="focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                            placeholder="Qty"
                            required
                          />
                        </td>
                        <td className="text-center">{item.price}</td>
                        <td className="text-center">{item.total}</td>
                        <td className="text-center">
                          <button
                            onClick={() => handleRemoveReturn(item.id)}
                            className="text-red-600 hover:text-red-800"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Exchange Section */}
            {returnType === "exchange" && returnItems.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-4 shadow-sm mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-700">
                  Exchange New Products
                </h3>
                <div className="flex flex-wrap gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={newExchange.name}
                    onChange={(e) =>
                      setNewExchange({ ...newExchange, name: e.target.value })
                    }
                    className="flex-1 rounded-lg border border-gray-300 p-2.5"
                  />
                  <input
                    type="number"
                    placeholder="Qty"
                    value={newExchange.qty}
                    onChange={(e) =>
                      setNewExchange({
                        ...newExchange,
                        qty: Number(e.target.value),
                      })
                    }
                    className="w-24 rounded-lg border border-gray-300 p-2.5 text-center"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={newExchange.price}
                    onChange={(e) =>
                      setNewExchange({
                        ...newExchange,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-32 rounded-lg border border-gray-300 p-2.5 text-center"
                  />
                  <button
                    onClick={handleAddExchange}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                {exchangeItems.length > 0 && (
                  <table className="w-full text-sm">
                    <thead className="text-gray-600 border-b">
                      <tr>
                        <th className="py-2 text-left">Product</th>
                        <th className="text-center">Qty</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Total</th>
                        <th className="text-center">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exchangeItems.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b hover:bg-gray-100 transition"
                        >
                          <td className="py-2">{item.name}</td>
                          <td className="text-center">{item.qty}</td>
                          <td className="text-center">{item.price}</td>
                          <td className="text-center">{item.total}</td>
                          <td className="text-center">
                            <button
                              onClick={() => handleRemoveExchange(item.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* Summary */}
            {returnItems.length > 0 && (
              <div className="flex justify-between items-center bg-blue-50 rounded-xl p-4 mt-4 shadow-sm">
                <h3 className="text-gray-700 font-semibold">
                  Total Return:{" "}
                  <span className="text-blue-700 font-bold">
                    Rs {totalReturn}
                  </span>
                </h3>
                {returnType === "exchange" ? (
                  <h3 className="text-gray-700 font-semibold">
                    Total Exchange:{" "}
                    <span className="text-blue-700 font-bold">
                      Rs {totalExchange}
                    </span>
                  </h3>
                ) : (
                  <h3 className="text-green-700 font-semibold">
                    Refund Rs {totalReturn}
                  </h3>
                )}
                <h3 className="text-gray-700 font-semibold">
                  Total Amount:{" "}
                  <span className="text-blue-700 font-bold">
                    Rs {totalReturn - totalExchange}
                  </span>
                </h3>
              </div>
            )}

            {returnItems.length > 0 && (
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700"
                >
                  Save Return
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* --- Sleek Popup Modal --- */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-3xl relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Invoice {invoiceNo} – Sold Items
            </h3>
            <table className="w-full text-sm">
              <thead className="text-gray-600 border-b">
                <tr>
                  <th className="py-2 text-left">Barcode</th>
                  <th className="py-2 text-left">Name</th>
                  <th className="text-center">Qty</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Total</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {InvocieHistory.map((item) => (
                  <tr
                    key={item.attributeID}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="py-2">{item.barcode}</td>
                    <td className="py-2">{item.productName}</td>
                    <td className="text-center">{item.qty}</td>
                    <td className="text-center">{item.rate}</td>
                    <td className="text-center">{item.qty * item.rate}</td>
                    <td className="text-center">
                      <button
                        // onClick={() => handleAddReturn(item)}
                        className="text-blue-600 hover:text-blue-800 "
                      >
                        <Plus size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
