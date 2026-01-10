"use client";
import React, { useEffect, useState } from "react";
import {
  Info,
  Trash2,
  Plus,
  ChevronRight,
  ChevronLeft,
  X,
  Coins,
  User,
  Mail,
  MapPin,
  Phone,
  Tag,
} from "lucide-react";
import GetSalePos from "@/api/lib/PosIntegration/Sale/SaleGet/SaleGet";
import { responseGetSale, Sale } from "@/api/types/PosIntegration/Sale/Sale";
import GetProduct from "@/api/lib/product/GetProduct/GetProduct";
import { Product, ProductApiResponse } from "@/api/types/product/getProduct";
import GetInitalStoreSalesMan from "@/api/lib/store/GetStoreSalesMan/GetStoreSalesMan";
import { StoreApiResponse, storeInital } from "@/api/types/storeGet";
import SearchByInvoice from "@/api/lib/PosIntegration/Return/SearchHistory/SearchByInvoice/SearchByInvoice";
import SearchByProduct from "@/api/lib/PosIntegration/Return/SearchHistory/SearchByProduct/SearchByProduct";
import {
  CustomerData,
  ResponseCustomerGetData,
} from "@/api/types/PosIntegration/Customer/CustomerType";
import GetCustomer from "@/api/lib/PosIntegration/Customer/GetCustomer";
import { useRouter } from "next/navigation";
import AddCustomer from "@/api/lib/PosIntegration/Customer/AddCustomer";
import AddSalePosReturn from "@/api/lib/PosIntegration/SaleReturn/AddSaleReturn/page";

interface SaleItem {
  barcode: string;
  attributeID: string;
  productName: string;
  qty: number;
  rate: number;
}
interface Item {
  barcode: string;
  attributeID: string;
  productName: string;
  qty: number;
  rate: number;
  varinet: string;
}
interface responseList {
  message: string;
  showHistory: historyData[];
}

interface historyData {
  saleID: string;
  productName: string;
  attributeID: string;
  saleDate: string;
  varientValue: string;
  barcode: string;
  qty: number;
  rate: number;
}
interface VarientsList {
  varientID: string;
  variantName: string;
  variantValues: variantValues[];
}
interface variantValues {
  attributeID: string;
  varientValue: string;
  costPrice: number;
  salePrice: number;
  qty: number;
  barcode: string;
}
export default function SaleReturnModule() {
  const router = useRouter();
  const [AmountPaid, setAmountPaid] = useState(0);
  const [Discount, setDiscount] = useState(0);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [ProductID, setProductID] = useState("");
  const [ProductName, setProductName] = useState("");
  const [SaleID, setSaleID] = useState("");
  const [returnType, setReturnType] = useState("refund");
  const [ReturnDate, setReturnDate] = useState("");
  const [selectedOption, setSelectedOption] = useState("product");
  const [barcodeInput, setBarcodeInput] = useState("");
  const [AddCustomerForm, setAddCustomerForm] = useState(false);
  const [Customer, setCustomer] = useState("");
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [Email, setEmail] = useState("");
  const [searchByProduct, setSearchByProduct] = useState("");
  const [SubVarinetName, setSubVarinetName] = useState("");
  const [storeID, setStoreID] = useState("");
  const [VarinetID, setVarinetID] = useState("");

  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [returnItems, setReturnItems] = useState<SaleItem[]>([]);
  const [exchangeItems, setExchangeItems] = useState<SaleItem[]>([]);
  const [storeList, setStoreList] = useState<storeInital[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [CustomerList, setCustomerList] = useState<CustomerData[]>([]);
  const [VarientsList, setVarientsList] = useState<VarientsList[]>([]);
  const [AttributeList, setAttributeList] = useState<variantValues[]>([]);

  const [InvocieHistory, setInvocieHistory] = useState<historyData[]>([]);
  const [SaleList, setSaleList] = useState<Sale[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState({
    attributeID: "",
    productName: "",
    qty: 0,
    rate: 0,
    barcode: "",
    varinet: "",
  });
  const [newExchange, setNewExchange] = useState({
    barcode: "",
    attributeID: "",
    productName: "",
    qty: 0,
    rate: 0,
  });
  const [showList, setShowList] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddReturn = (item: SaleItem) => {
    if (!returnItems.find((i) => i.attributeID === item.attributeID)) {
      setReturnItems((prev) => [...prev, item]);
    }
  };

  const handleRemoveReturn = (id: string) => {
    setReturnItems((prev) => prev.filter((i) => i.attributeID !== id));
  };

  function handleQtyChange(id: string, value: string) {
    const qty = parseInt(value);
    if (!isNaN(qty) && qty >= 0) {
      setReturnItems((prev) =>
        prev.map((item) =>
          item.attributeID === id
            ? { ...item, qty, total: qty * item.rate }
            : item
        )
      );
    }
  }
  const CustomerGet = async () => {
    const token = localStorage.getItem("token");
    const response = await GetCustomer(String(token));
    if (response.status === 200 || response.status === 201) {
      const data = response.data as ResponseCustomerGetData;
      setCustomerList(data.customerList || []);
    } else if (response.status === 401) {
      router.push("/sellerlogin");
    }
  };
  const handleSave = async () => {
    let totalBill = 0;
    let amountPaid = 0;
    if (returnType === "refund") {
      totalBill = -totalReturn;
      amountPaid = AmountPaid;
    }
    if (returnType === "credit") {
      totalBill = -totalReturn;
      amountPaid = 0;
    }
    if (returnType === "exchange") {
      totalBill =
        totalExchange - totalReturn > 0
          ? totalExchange - totalReturn - Discount
          : -Math.abs(totalExchange - totalReturn - Discount);
      amountPaid =
        totalExchange - totalReturn > 0 ? AmountPaid : -Math.abs(AmountPaid);
    }
    const formData = {
      saleID: SaleID,
      customerID: Customer,
      postingDate: ReturnDate,
      totalBill,
      amountPaid,
      adjustment: Discount,
      RetunrType: returnType,
      remarks: "",

      ...(returnType === "exchange"
        ? {
            listReturn: returnItems,
            listExcahnge: items,
          }
        : {
            listReturn: returnItems,
            listExcahnge: [],
          }),
    };
    const token = localStorage.getItem("token");
    console.log(formData);
    try {
      setLoading(true);
      const response = await AddSalePosReturn(formData, String(token));
      if (response.status === 200 || response.status === 201) {
        setAmountPaid(0);
        setDiscount(0);
        setItems([]);
        setReturnItems([]);
        setInvoiceNo("");
        setReturnType("refund");
      }
    } finally {
      setLoading(false);
    }
  };
  const fetchData = (attributeID: string) => {
    if (!attributeID) {
      alert("attributeID not found");
    }
    let found = false;

    for (const product of productList) {
      for (const variant of product.variants) {
        const attribute = variant.variantValues.find(
          (v) => v.attributeID === attributeID
        );

        if (attribute) {
          setItems((prev) => {
            const existingIndex = prev.findIndex(
              (item) => item.attributeID === attribute.attributeID
            );

            // 🔁 If already exists → increase qty
            if (existingIndex !== -1) {
              const updated = [...prev];
              updated[existingIndex] = {
                ...updated[existingIndex],
                qty: Number(updated[existingIndex].qty) + 1,
              };
              return updated;
            }

            // ➕ Else add new row
            return [
              ...prev,
              {
                barcode: attribute.barcode,
                attributeID: attribute.attributeID,
                productName: product.productName,
                qty: attribute.qty, // start with 1
                rate: attribute.salePrice,
                varinet: attribute.varientValue,
              },
            ];
          });

          found = true;
          break;
        }
      }

      if (found) break;
    }

    if (!found) {
      alert("Barcode not found");
    }
    setBarcodeInput("");
  };
  const addCustoemr = async () => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/posSalePoint/login");
    try {
      setLoading(true);
      const formData = {
        customerName: customerName,
        phoneNo: phoneNo,
        email: Email,
        description: "",
        openingBalance: 0,
        address: address,
      };
      const response = await AddCustomer(formData, String(token));
      if (response.status === 200 || response.status === 201) {
        CustomerGet();
        setEmail("");
        setAddress("");
        setCustomerName("");
        setPhoneNo("");
        setAddCustomerForm(false);
      } else if (response.status === 400) {
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
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
      setSaleID(ID);
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
  const fetchDataVarientList = (productID: string) => {
    for (var products of productList) {
      if (products) {
        const data = productList.find((p) => p.productID === productID);
        if (data) {
          setVarientsList(data.variants);
        }
      }
    }
  };

  const fetchDataAttributeList = (varientID: string) => {
    for (var atribute of VarientsList) {
      if (atribute) {
        const data = VarientsList.find((p) => p.varientID === varientID);
        if (data) {
          setAttributeList(data.variantValues);
        }
        setAttributeList(atribute.variantValues);
      }
    }
  };

  const saleGet = async () => {
    const token = localStorage.getItem("token");
    const response = await GetSalePos(String(token));
    if (response.status === 200 || response.status === 201) {
      const data = response.data as responseGetSale;
      console.log(data);
      const filterData = data.saleList.filter(
        (item) => item.itemList.length > 0
      );
      if (filterData) {
        setSaleList(filterData);
      }
    }
  };

  useEffect(() => {
    saleGet();
    storesget();
    CustomerGet();
  }, []);

  const totalReturn = returnItems.reduce((total, variant) => {
    return total + variant.qty * variant.rate;
  }, 0);
  const totalExchange = items.reduce((total, variant) => {
    return total + variant.qty * variant.rate;
  }, 0);

  const getRemainingBalance = () => {
    const returnedTotal = totalReturn;
    const newTotal = totalExchange;

    if (returnType === "refund") {
      return -Math.abs(returnedTotal - AmountPaid);
    }

    if (returnType === "credit") {
      return returnedTotal;
    }

    if (returnType === "exchange") {
      return newTotal - returnedTotal < 0
        ? newTotal - returnedTotal + AmountPaid
        : newTotal - returnedTotal - AmountPaid;
    }

    return 0;
  };
  return (
    <div className="min-h-screen  p-3 mt-2">
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
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="w-full">
                <label className="block text-gray-700 font-medium mb-2">
                  Customer Name
                </label>

                <div className="flex gap-2">
                  <div className="w-full flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                    <User className="text-gray-400 mr-2" size={18} />

                    <select
                      value={Customer}
                      onChange={(e) => setCustomer(e.target.value)}
                      className="w-full bg-transparent outline-none text-gray-900"
                    >
                      {CustomerList.length !== 0 ? (
                        <>
                          <option value="">Select Customer</option>

                          {CustomerList.map((customer) => (
                            <option
                              key={customer.customerID}
                              value={customer.customerID}
                            >
                              {customer.customerName}
                            </option>
                          ))}
                        </>
                      ) : (
                        <option value="">No Record Found</option>
                      )}
                    </select>
                  </div>

                  <button
                    onClick={() => setAddCustomerForm(true)}
                    className="px-2 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
                  >
                    <Plus />
                  </button>
                </div>
              </div>

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
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-gray-600 font-medium mb-2 block">
                  Return Date
                </label>
                <input
                  type="date"
                  value={ReturnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
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
                      <th className="py-2 text-left">Barcode</th>
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
                        key={item.attributeID}
                        className="border-b hover:bg-gray-100 transition"
                      >
                        <td className="py-2">{item.barcode}</td>
                        <td className="py-2">{item.productName}</td>
                        <td className=" py-2  text-center w-[1/2]">
                          <input
                            type="number"
                            min={0}
                            value={item.qty}
                            onChange={(e) =>
                              handleQtyChange(item.attributeID, e.target.value)
                            }
                            className="focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                            placeholder="Qty"
                            required
                          />
                        </td>
                        <td className="text-center">{item.rate}</td>
                        <td className="text-center">{item.qty * item.rate}</td>
                        <td className="text-center">
                          <button
                            onClick={() => handleRemoveReturn(item.attributeID)}
                            className="text-red-600 hover:text-red-800"
                            aria-label={`Remove ${item.productName}`}
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
              <>
                <div className="w-full mt-2 flex-col gap-2 md:flex-row flex">
                  {/* Customer Name */}
                  <div className="w-full">
                    <label className="block text-gray-700 font-medium mb-2">
                      Stores
                    </label>
                    <div className="flex items-center w-full border border-gray-200 rounded-lg bg-gray-50 px-3 py-2">
                      <Tag className="text-gray-400 mr-2" size={18} />
                      <select
                        value={storeID}
                        onChange={(e) => {
                          setStoreID(e.target.value);
                          getProduct(e.target.value);
                        }}
                        className="flex-1 bg-transparent outline-none text-gray-900 p-1"
                      >
                        {storeList.length === 0 ? (
                          <option value="">No Record Found</option>
                        ) : (
                          <>
                            {storeList.map((item) => (
                              <option key={item.storeID} value={item.storeID}>
                                {item.storeName}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="block text-gray-700 font-medium mb-2">
                      Product Name
                    </label>
                    <div className="flex items-center w-full border border-gray-200 rounded-lg bg-gray-50 px-3 py-2">
                      <Tag className="text-gray-400 mr-2" size={18} />
                      <select
                        value={ProductID}
                        onChange={(e) => {
                          setProductID(e.target.value);
                          fetchDataVarientList(e.target.value);
                        }}
                        className="flex-1 bg-transparent outline-none text-gray-900 p-1"
                      >
                        {productList.length === 0 ? (
                          <option value="">No Record Found</option>
                        ) : (
                          <>
                            {productList.map((item) => (
                              <>
                                <option
                                  key={item.productID}
                                  value={item.productID}
                                >
                                  {item.productName}
                                </option>
                              </>
                            ))}
                          </>
                        )}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="w-full mt-2 mb-2 flex-col gap-2 md:flex-row flex">
                  <div className="w-full">
                    <label className="block text-gray-700 font-medium mb-2">
                      Variant
                    </label>

                    <div className="flex items-center gap-2 w-full">
                      {/* Select wrapper (input look) */}
                      <div className="flex-1 border border-gray-200 rounded-lg bg-gray-50 px-3 py-2">
                        <select
                          value={VarinetID}
                          onChange={(e) => {
                            setVarinetID(e.target.value);
                            fetchDataAttributeList(e.target.value);
                            // fetchData(e.target.value);
                          }}
                          className="w-full bg-transparent outline-none text-gray-900 p-1"
                        >
                          <option value="">Select Product</option>
                          {VarientsList.length === 0 ? (
                            <option value="">No Record Found</option>
                          ) : (
                            <>
                              {VarientsList.map((item) => (
                                <>
                                  <option
                                    key={item.varientID}
                                    value={item.varientID}
                                  >
                                    {item.variantName}
                                  </option>
                                </>
                              ))}
                            </>
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="block text-gray-700 font-medium mb-2">
                      Barcode
                    </label>

                    <div className="flex items-center gap-2 w-full">
                      {/* Select wrapper (input look) */}
                      <div className="flex-1 border border-gray-200 rounded-lg bg-gray-50 px-3 py-2">
                        <input
                          list="productVariants"
                          value={SubVarinetName}
                          onChange={(e: any) => {
                            const value = e.target.value;
                            const data = AttributeList.find(
                              (item) => item.varientValue === value
                            );
                            if (data) {
                              setSearchByProduct(data.attributeID);
                              setSubVarinetName(data.varientValue);
                            }
                          }}
                          placeholder="Select Barcode"
                          className="w-full bg-transparent outline-none text-gray-900 "
                        />

                        <datalist id="productVariants">
                          {AttributeList.length === 0 ? (
                            <option value="No Record Found" />
                          ) : (
                            AttributeList.map((item) => (
                              <option value={item.varientValue}>
                                {item.varientValue}
                              </option>
                            ))
                          )}
                        </datalist>
                      </div>
                      <button
                        onClick={() => {
                          fetchData(searchByProduct);
                          setSearchByProduct("");
                          setSubVarinetName("");
                        }}
                        className="px-2 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
                      >
                        <Plus />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-full overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg overflow-hidden ">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-gray-700 font-medium">
                          Barcode
                        </th>
                        <th className="px-4 py-2 text-left text-gray-700 font-medium">
                          Product Name
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700 font-medium">
                          Variant
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700 font-medium">
                          Quantity
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700 font-medium">
                          Price / Unit
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700 font-medium">
                          Total
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700 font-medium">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr
                          key={item.attributeID}
                          className="border-t hover:bg-gray-50 transition"
                        >
                          <td className="px-4 py-2">{item.barcode}</td>
                          <td className="px-4 py-2">{item.productName}</td>
                          <td className="px-4 py-2">{item.varinet}</td>
                          <td className="px-4 py-2 text-center">
                            <input
                              type="number"
                              value={item.qty}
                              onChange={(e) => {
                                const newItems = [...items];
                                newItems[index].qty = Number(e.target.value);
                                setItems(newItems);
                              }}
                              className="w-20 text-center bg-transparent border-b border-gray-200 focus:border-gray-400 outline-none"
                              placeholder="0"
                            />
                          </td>
                          <td className="px-4 py-2 text-center">
                            <input
                              type="number"
                              value={item.rate}
                              onChange={(e) => {
                                const newItems = [...items];
                                newItems[index].rate = Number(e.target.value);
                                setItems(newItems);
                              }}
                              className="w-24 text-center bg-transparent border-b border-gray-200 focus:border-gray-400 outline-none"
                              placeholder="0"
                            />
                          </td>
                          <td className="px-4 py-2 text-center text-gray-800 font-medium">
                            {(
                              Number(item.qty || 0) * Number(item.rate || 0)
                            ).toFixed(2)}
                          </td>
                          <td className="px-4 py-2 text-center">
                            <button
                              onClick={() =>
                                setItems(items.filter((_, i) => i !== index))
                              }
                              className="text-red-500 hover:text-red-700"
                              title="Delete Item"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))}

                      {/* Row to Add New Item */}
                      <tr className="border-t bg-gray-50">
                        <td className="px-4 py-2 text-center">
                          <input
                            type="number"
                            value={barcodeInput}
                            onChange={(e) => {
                              setBarcodeInput(e.target.value); // allow typing
                            }}
                            onKeyDown={(e) => {
                              if (e.key !== "Enter") return;

                              const value = barcodeInput;

                              let foundAttributeID = null;
                              let foundVariantValue = null;

                              for (const product of productList) {
                                for (const variant of product.variants) {
                                  const match = variant.variantValues.find(
                                    (vv) => vv.barcode === value
                                  );

                                  if (match) {
                                    foundAttributeID = match.attributeID;
                                    foundVariantValue = match.varientValue;
                                    break;
                                  }
                                }
                                if (foundAttributeID) break;
                              }

                              if (foundAttributeID) {
                                fetchData(foundAttributeID);
                                setBarcodeInput("");
                              }
                            }}
                            className="w-20 text-center bg-transparent border-b border-gray-200 focus:border-gray-400 outline-none"
                            placeholder="Scan barcode"
                          />
                        </td>

                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={newItem.productName || ""}
                            onChange={(e) =>
                              setNewItem({
                                ...newItem,
                                productName: e.target.value,
                              })
                            }
                            className="w-full bg-transparent outline-none border-b border-gray-200 focus:border-gray-400"
                            placeholder="New Product Name"
                          />
                        </td>
                        <td className="px-4 py-2 text-center">
                          <input
                            type="number"
                            value={newItem.varinet || ""}
                            onChange={(e) =>
                              setNewItem({
                                ...newItem,
                                varinet: String(e.target.value),
                              })
                            }
                            className="w-20 text-center bg-transparent outline-none border-b border-gray-200 focus:border-gray-400"
                            placeholder="eg:- MD"
                          />
                        </td>
                        <td className="px-4 py-2 text-center">
                          <input
                            type="number"
                            value={newItem.qty || ""}
                            onChange={(e) =>
                              setNewItem({
                                ...newItem,
                                qty: Number(e.target.value),
                              })
                            }
                            className="w-20 text-center bg-transparent outline-none border-b border-gray-200 focus:border-gray-400"
                            placeholder="0"
                          />
                        </td>
                        <td className="px-4 py-2 text-center">
                          <input
                            type="number"
                            value={newItem.rate || ""}
                            onChange={(e) =>
                              setNewItem({
                                ...newItem,
                                rate: Number(e.target.value),
                              })
                            }
                            className="w-24 text-center bg-transparent outline-none border-b border-gray-200 focus:border-gray-400"
                            placeholder="0"
                          />
                        </td>
                        <td className="px-4 py-2 text-center font-medium text-gray-800">
                          {(
                            Number(newItem.qty || 0) * Number(newItem.rate || 0)
                          ).toFixed(2)}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <button
                            onClick={() => {
                              if (
                                newItem.barcode &&
                                newItem.attributeID &&
                                newItem.productName &&
                                newItem.qty &&
                                newItem.rate &&
                                newItem.varinet
                              ) {
                                setItems([...items, newItem]);
                                setNewItem({
                                  attributeID: "",
                                  productName: "",
                                  qty: 0,
                                  rate: 0,
                                  barcode: "",
                                  varinet: "",
                                });
                              }
                            }}
                            className="text-green-600 hover:text-green-800 font-medium"
                          >
                            ➕
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
            {/* Billing Deatils*/}
            <div className="w-full md:w-full">
              <div className="flex flex-wrap md:flex-nowrap gap-4 mt-3">
                {/* Amount Paid */}
                {returnType !== "credit" && (
                  <>
                    <div className="w-full md:w-1/3">
                      <label className="block text-gray-700 font-medium mb-2">
                        Amount Paid
                      </label>
                      <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                        <Coins className="text-gray-400 mr-2" size={18} />
                        <input
                          type="number"
                          value={AmountPaid || 0}
                          onChange={(e) =>
                            setAmountPaid(Number(e.target.value))
                          }
                          name="totalBill"
                          placeholder="Enter Amount Paid"
                          className="w-full bg-transparent outline-none text-gray-900"
                        />
                      </div>
                    </div>
                    {returnType === "exchange" && (
                      <div className="w-full md:w-1/3">
                        <label className="block text-gray-700 font-medium mb-2">
                          Discount
                        </label>
                        <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                          <Coins className="text-gray-400 mr-2" size={18} />
                          <input
                            value={Discount || 0}
                            onChange={(e) =>
                              setDiscount(Number(e.target.value))
                            }
                            type="number"
                            name="Discount"
                            placeholder="Enter Discount"
                            className="w-full bg-transparent outline-none text-gray-900"
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Total Bill */}
                {returnType === "exchange" && (
                  <div className="w-full md:w-1/3">
                    <label className="block text-gray-700 font-medium mb-2">
                      Total Exchange
                    </label>
                    <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                      <Coins className="text-gray-400 mr-2" size={18} />
                      <input
                        type="number"
                        name="amountPaid"
                        value={totalExchange || 0}
                        readOnly
                        className="w-full text-center bg-transparent outline-none text-gray-900"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-4 mt-3">
              <div className="w-full md:w-1/2">
                <label className="block text-gray-700 font-medium mb-2">
                  Total Return
                </label>
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                  <Coins className="text-gray-400 mr-2" size={18} />
                  <input
                    type="number"
                    name="amountPaid"
                    value={totalReturn || 0}
                    readOnly
                    className="w-full text-center bg-transparent outline-none text-gray-900"
                  />
                </div>
              </div>

              {/* Remaining Balance */}
              <div className="w-full md:w-1/2">
                <label className="block text-gray-700 font-medium mb-2">
                  Remaining Balance
                </label>
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                  <Coins className="text-gray-400 mr-2" size={18} />
                  <input
                    value={getRemainingBalance()}
                    type="number"
                    name="remainingBalance"
                    placeholder="Auto Calculated"
                    readOnly
                    className="w-full text-center bg-transparent outline-none text-gray-900"
                  />
                </div>
              </div>
            </div>
            {/*Save Button*/}
            {returnItems.length > 0 && (
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700"
                >
                  {!loading ? "Save Return" : "Saving..."}
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
                  <th className="text-center">Sale Date</th>
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
                    <td className="text-center">
                      {item.saleDate.split("T")[0]}
                    </td>
                    <td className="text-center">{item.qty * item.rate}</td>
                    <td className="text-center">
                      <button
                        onClick={() => handleAddReturn(item)}
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
      {AddCustomerForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md ">
            {/* Header */}
            <h2 className="text-xl font-semibold text-gray-800">
              Customer Add
            </h2>
            <div className="mt-2 ">
              <label className="block text-gray-700 font-medium mb-2">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                <User className="text-gray-400 mr-2" size={18} />
                <input
                  type="text"
                  name="name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter Customer Name"
                  className="w-full bg-transparent outline-none text-gray-900"
                />
              </div>
            </div>

            {/* Email */}

            {/* Phone */}
            <div className="mt-2 ">
              <label className="block text-gray-700 font-medium mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                <Phone className="text-gray-400 mr-2" size={18} />
                <input
                  type="text"
                  name="phone"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  placeholder="+92 300 1234567"
                  className="w-full bg-transparent outline-none text-gray-900"
                />
              </div>
            </div>
            <div className="mt-2 ">
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                <Mail className="text-gray-400 mr-2" size={18} />
                <input
                  type="text"
                  name="phone"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full bg-transparent outline-none text-gray-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Address
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                <MapPin className="text-gray-400 mr-2" size={18} />
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter full address"
                  className="w-full bg-transparent outline-none text-gray-900 resize-none"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between gap-4">
              <button
                onClick={() => setAddCustomerForm(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  addCustoemr();
                }}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
