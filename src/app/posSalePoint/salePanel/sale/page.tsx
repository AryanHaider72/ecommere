"use client";
import { useEffect, useState } from "react";
import {
  Building2,
  Mail,
  MapPin,
  Phone,
  User,
  Tag,
  PlusCircle,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Trash,
  Pencil,
  Coins,
  Plus,
  Notebook,
  Calendar,
  NotepadText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import GetCustomer from "@/api/lib/PosIntegration/Customer/GetCustomer";
import {
  CustomerData,
  ResponseCustomerGetData,
} from "@/api/types/PosIntegration/Customer/CustomerType";
import AddCustomer from "@/api/lib/PosIntegration/Customer/AddCustomer";
import { Product, ProductApiResponse } from "@/api/types/product/getProduct";
import GetProduct from "@/api/lib/product/GetProduct/GetProduct";
import GetProductHome from "@/api/lib/HomePage/Product/Product";
import {
  GetProductHomeApiResponse,
  ProductHome,
  ProductHomePage,
} from "@/api/types/HomePage/Product/product";
import { StoreApiResponse, storeInital } from "@/api/types/storeGet";
import GetInitalStoreSalesMan from "@/api/lib/store/GetStoreSalesMan/GetStoreSalesMan";
interface Item {
  name: string;
  qty: number;
  price: number;
}
export default function SaleForm() {
  const router = useRouter();
  const [showList, setShowList] = useState(true);
  const [ShowMessage, setShowMessage] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [AddCustomerForm, setAddCustomerForm] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [Email, setEmail] = useState("");
  const [Customer, setCustomer] = useState("");
  const [CustomerType, setCustomerType] = useState("WalkingCustomer");
  const [ResponseBack, setResponseBack] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [storeList, setStoreList] = useState<storeInital[]>([]);

  const [items, setItems] = useState<Item[]>([]);
  const [CustomerList, setCustomerList] = useState<CustomerData[]>([]);
  const [productList, setProductList] = useState<ProductHome[]>([]);
  const [storeID, setStoreID] = useState("");

  const [newItem, setNewItem] = useState({
    name: "",
    qty: 0,
    price: 0,
  });

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
        setResponseBack(response.data.message || "Customer Added Successfully");
        setShowMessage(true);
      } else if (response.status === 400) {
        setResponseBack(
          response.data.message || "PLease Fill in All Required Fields"
        );
        setShowMessage(false);
      } else {
        setResponseBack(
          response.data.message ||
            "Something Went Wrong. Please Try Again later."
        );
        setShowMessage(false);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const getProduct = async (ID: string) => {
    const token = localStorage.getItem("token") ?? "";
    const response = await GetProduct(String(token), ID);

    if (response.status === 200 || response.status === 201) {
      const data = response.data as ProductApiResponse;
      console.log(data);
    }
  };
  const storesget = async () => {
    const token = localStorage.getItem("token");
    const response = await GetInitalStoreSalesMan(String(token));
    if (response.status === 200 || response.status === 201) {
      const data = response.data as StoreApiResponse;
      console.log(data);
      setStoreList(data.storeList);
      getProduct(data.storeList[0].storeID);
    }
  };

  useEffect(() => {
    CustomerGet();
    storesget();
  }, []);
  return (
    <div className="w-full relative">
      <h2 className="text-2xl font-semibold text-gray-800">Sale Management</h2>
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
      <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
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
        {showList ? (
          <div className="p-4 border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">ABC_XYZ</h3>
              <p className="text-gray-600">Email: abc@email.com</p>
              <p className="text-gray-600">Remaining Balance: 20,100</p>
            </div>
            <div className="flex gap-4">
              <button
                //   onClick={() => FetchData(company.Id)}
                className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 transition"
                title="Edit"
              >
                <Pencil className="w-5 h-5" />
              </button>
              <button
                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
                title="Delete"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-wrap md:flex-row gap-5 mt-2">
            <div className="p-3 rounded-xl max-w-md">
              <h2 className="text-md text-gray-800 mb-4">Customer Type</h2>

              <div className="flex flex-wrap  gap-4 ">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="CustomerType"
                    value="WalkingCustomer"
                    checked={CustomerType === "WalkingCustomer"}
                    onChange={(e) => setCustomerType("WalkingCustomer")}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700 text-sm font-medium">
                    Walking Customer
                  </span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="CustomerType"
                    value="RegularCustomer"
                    checked={CustomerType === "RegularCustomer"}
                    onChange={(e) => setCustomerType("RegularCustomer")}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700 text-sm font-medium">
                    Regular Customer
                  </span>
                </label>

                {/* Option 2 */}
              </div>
            </div>
            {/* Sale Date */}
            <div className="w-full flex-col gap-2 md:flex-row flex">
              <div className="w-full ">
                <label className="block text-gray-700 font-medium mb-2">
                  Sale Date
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center w-full border border-gray-200 rounded-lg bg-gray-50 px-3 py-2">
                    <Calendar className="text-gray-400 mr-2" size={18} />
                    <input
                      type="date"
                      name="productName"
                      placeholder="Enter PurchaseDate"
                      className="flex-1 bg-transparent outline-none text-gray-900"
                    />
                  </div>
                </div>
              </div>
              {CustomerType === "WalkingCustomer" ? (
                <div className="w-full ">
                  <label className="block text-gray-700 font-medium mb-2">
                    Customer Name
                  </label>
                  <div className="flex gap-2">
                    <div className=" w-full flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                      <User className="text-gray-400 mr-2" size={18} />
                      <input
                        type="text"
                        name="CustomerName"
                        placeholder="Enter Customer name"
                        className="w-full bg-transparent outline-none text-gray-900"
                      />
                    </div>
                    <button
                      onClick={() => setAddCustomerForm(true)}
                      className="px-2 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
                    >
                      <Plus />
                    </button>
                  </div>
                </div>
              ) : (
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
              )}
            </div>
            <div className="w-full flex-col gap-2 md:flex-row flex">
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
                      GetProduct(e.target.value);
                    }}
                    className="flex-1 bg-transparent outline-none text-gray-900 p-1"
                  >
                    {storeList.length === 0 ? (
                      <option value="">No Record Found</option>
                    ) : (
                      <>
                        {storeList.map((item) => (
                          <option value={item.storeID}>{item.storeName}</option>
                        ))}
                      </>
                    )}
                  </select>
                </div>
              </div>
              <div className="w-full ">
                <label className="block text-gray-700 font-medium mb-2">
                  Product Name
                </label>
                <div className="flex items-center w-full border border-gray-200 rounded-lg bg-gray-50 px-3 py-2">
                  <select
                    value={selectedOption2}
                    onChange={(e) => setSelectedOption2(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-gray-900 p-1"
                  >
                    <option value="">Select Product</option>
                    {productList.map((item) => (
                      <>
                        {item.products.map((item) => (
                          <option key={item.productID} value={item.productID}>
                            {item.productName}
                          </option>
                        ))}
                      </>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Product Name */}

            {/* Quantity */}

            {/* Table */}
            <div className="w-full overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg overflow-hidden ">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-700 font-medium">
                      Product Name
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
                      key={index}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-2">New Pants</td>
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
                          value={item.price}
                          onChange={(e) => {
                            const newItems = [...items];
                            newItems[index].price = Number(e.target.value);
                            setItems(newItems);
                          }}
                          className="w-24 text-center bg-transparent border-b border-gray-200 focus:border-gray-400 outline-none"
                          placeholder="0"
                        />
                      </td>
                      <td className="px-4 py-2 text-center text-gray-800 font-medium">
                        {(
                          Number(item.qty || 0) * Number(item.price || 0)
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
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={newItem.name || ""}
                        onChange={(e) =>
                          setNewItem({ ...newItem, name: e.target.value })
                        }
                        className="w-full bg-transparent outline-none border-b border-gray-200 focus:border-gray-400"
                        placeholder="New Product Name"
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
                        value={newItem.price || ""}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem,
                            price: Number(e.target.value),
                          })
                        }
                        className="w-24 text-center bg-transparent outline-none border-b border-gray-200 focus:border-gray-400"
                        placeholder="0"
                      />
                    </td>
                    <td className="px-4 py-2 text-center font-medium text-gray-800">
                      {(
                        Number(newItem.qty || 0) * Number(newItem.price || 0)
                      ).toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => {
                          if (newItem.name && newItem.qty && newItem.price) {
                            setItems([...items, newItem]);
                            setNewItem({ name: "", qty: 0, price: 0 });
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

            {/* Payment Summary Section */}
            <div className="w-full md:w-full">
              <div className="flex flex-wrap md:flex-nowrap gap-4 mt-3">
                {/* Amount Paid */}
                <div className="w-full md:w-1/3">
                  <label className="block text-gray-700 font-medium mb-2">
                    Amount Paid
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                    <Coins className="text-gray-400 mr-2" size={18} />
                    <input
                      type="number"
                      name="totalBill"
                      placeholder="Enter Amount Paid"
                      className="w-full bg-transparent outline-none text-gray-900"
                    />
                  </div>
                </div>

                {/* Discount */}
                <div className="w-full md:w-1/3">
                  <label className="block text-gray-700 font-medium mb-2">
                    Discount
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                    <Coins className="text-gray-400 mr-2" size={18} />
                    <input
                      type="number"
                      name="Discount"
                      placeholder="Enter Discount"
                      className="w-full bg-transparent outline-none text-gray-900"
                    />
                  </div>
                </div>

                {/* Total Bill */}
                <div className="w-full md:w-1/3">
                  <label className="block text-gray-700 font-medium mb-2">
                    Total Bill
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                    <Coins className="text-gray-400 mr-2" size={18} />
                    <input
                      type="number"
                      name="amountPaid"
                      placeholder="Enter Total Bill"
                      className="w-full bg-transparent outline-none text-gray-900"
                    />
                  </div>
                </div>

                {/* Remaining Balance */}
                <div className="w-full md:w-1/3">
                  <label className="block text-gray-700 font-medium mb-2">
                    Remaining Balance
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                    <Coins className="text-gray-400 mr-2" size={18} />
                    <input
                      type="number"
                      name="remainingBalance"
                      placeholder="Auto Calculated"
                      readOnly
                      className="w-full bg-transparent outline-none text-gray-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <div className="flex items-start border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                <Notebook className="text-gray-400 mr-2 mt-1" size={18} />
                <textarea
                  name="description"
                  placeholder="Enter Description"
                  className="w-full bg-transparent outline-none text-gray-900 resize-none"
                  rows={3}
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="w-full flex justify-end mt-4">
              <button
                type="button"
                className="w-full py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        )}
        {showModel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] shadow-lg overflow-hidden">
              {/* Close Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setShowModel(false)}
                  className="text-gray-500 hover:text-red-600 font-bold text-xl"
                >
                  X
                </button>
              </div>

              {/* Table Section */}
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Sold Items
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-gray-700 font-medium">
                        Product Name
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
                        key={index}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-2">New Pants</td>
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
                            value={item.price}
                            onChange={(e) => {
                              const newItems = [...items];
                              newItems[index].price = Number(e.target.value);
                              setItems(newItems);
                            }}
                            className="w-24 text-center bg-transparent border-b border-gray-200 focus:border-gray-400 outline-none"
                            placeholder="0"
                          />
                        </td>
                        <td className="px-4 py-2 text-center text-gray-800 font-medium">
                          {(
                            Number(item.qty || 0) * Number(item.price || 0)
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
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={newItem.name || ""}
                          onChange={(e) =>
                            setNewItem({ ...newItem, name: e.target.value })
                          }
                          className="w-full bg-transparent outline-none border-b border-gray-200 focus:border-gray-400"
                          placeholder="New Product Name"
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
                          value={newItem.price || ""}
                          onChange={(e) =>
                            setNewItem({
                              ...newItem,
                              price: Number(e.target.value),
                            })
                          }
                          className="w-24 text-center bg-transparent outline-none border-b border-gray-200 focus:border-gray-400"
                          placeholder="0"
                        />
                      </td>
                      <td className="px-4 py-2 text-center font-medium text-gray-800">
                        {(
                          Number(newItem.qty || 0) * Number(newItem.price || 0)
                        ).toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => {
                            if (newItem.name && newItem.qty && newItem.price) {
                              setItems([...items, newItem]);
                              setNewItem({ name: "", qty: 0, price: 0 });
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

              {/* Total Summary */}
              <div className="flex justify-end mt-4">
                <p className="text-lg font-semibold text-gray-800">
                  Total:{" "}
                  {items
                    .reduce(
                      (sum, i) =>
                        sum + Number(i.qty || 0) * Number(i.price || 0),
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
