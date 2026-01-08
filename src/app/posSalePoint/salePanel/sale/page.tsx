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
import AddSale from "@/api/lib/PosIntegration/Sale/SaleAdd/SaleAdd";
import {
  ListItem,
  responseGetSale,
  Sale,
} from "@/api/types/PosIntegration/Sale/Sale";
import AddSalePos from "@/api/lib/PosIntegration/Sale/SaleAdd/SaleAdd";
import GetSalePos from "@/api/lib/PosIntegration/Sale/SaleGet/SaleGet";
import Spinner from "@/component/spinner/page";
interface Item {
  barcode: string;
  attributeID: string;
  productName: string;
  qty: number;
  price: number;
  varinet: string;
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

export default function SaleForm() {
  const router = useRouter();
  const [showList, setShowList] = useState(true);
  const [ShowMessage, setShowMessage] = useState(false);
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
  const [SearchByProduct, setSearchByProduct] = useState("");
  const [SearchByBarcode, setSearchByBarcode] = useState("");
  const [storeList, setStoreList] = useState<storeInital[]>([]);
  const [RescponseBack, setRersponseBack] = useState("");
  const [SubVarinetName, setSubVarinetName] = useState("");
  const [SubVarinetName2, setSubVarinetName2] = useState("");

  const [VarinetID, setVarinetID] = useState("");
  const [ProductID, setProductID] = useState("");
  const [barcodeInput, setBarcodeInput] = useState("");

  const [items, setItems] = useState<Item[]>([]);
  const [CustomerList, setCustomerList] = useState<CustomerData[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);

  const [VarientsList, setVarientsList] = useState<VarientsList[]>([]);
  const [AttributeList, setAttributeList] = useState<variantValues[]>([]);
  const [SaleList, setSaleList] = useState<Sale[]>([]);
  const [storeID, setStoreID] = useState("");
  const [AmountPaid, setAmountPaid] = useState(0);
  const [Discount, setDiscount] = useState(0);
  const [SaleDate, setSaleDate] = useState("");
  const [Description, setDescription] = useState("");
  const [SearchBy, setSearchBy] = useState("SearchByBarcode");
  const [isLoading, setIsLoading] = useState(false);

  const [newItem, setNewItem] = useState({
    attributeID: "",
    productName: "",
    qty: 0,
    price: 0,
    barcode: "",
    varinet: "",
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
    const token = localStorage.getItem("token");

    if (!token) return;

    const response = await GetProduct(token, ID);

    if (response.status === 200 || response.status === 201) {
      const data = response.data as ProductApiResponse;
      setProductList(data.list || []);
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
                price: attribute.salePrice,
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

    setSubVarinetName2("");
    setSubVarinetName("");
    setSearchByProduct("");
    setBarcodeInput("");
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

  const SaleAdd = async () => {
    try {
      setLoading(true);
      const listForRequest: ListItem[] = items.map((item) => ({
        attributeID: item.attributeID,
        qty: item.qty,
        amount: item.price,
        remakrs: "",
      }));
      const formData = {
        postingDate: SaleDate,
        customerID: Customer,
        amountPaid: AmountPaid,
        adjustment: Discount,
        totalBill: totalSum,
        remarks: Description,
        list: listForRequest,
      };
      const token = localStorage.getItem("token");
      console.log(formData);
      const response = await AddSalePos(formData, String(token));
      if (response.status === 200 || response.status === 201) {
        setCustomerName("");
        setSaleDate("");
        setItems([]);
        setAmountPaid(0);
        setDiscount(0);
        setDescription("");
        setRersponseBack(response.data.message || "Sale Added Successfully");
        setShowMessage(true);
      } else if (response.status === 400) {
        setRersponseBack(
          response.data.message || "PLease Fill in All Required Fields"
        );
        setShowMessage(false);
      } else {
        setRersponseBack(
          response.data.message ||
            "Something Went Wrong. Please Try Again later."
        );
        setShowMessage(false);
      }
    } finally {
      setLoading(false);
    }
  };
  const saleGet = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await GetSalePos(String(token));
      if (response.status === 200 || response.status === 201) {
        const data = response.data as responseGetSale;
        console.log(data);
        setSaleList(data.saleList);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDataForModify = (saleID: string) => {
    const data = SaleList.find((item) => item.saleID === saleID);
    if (data) {
      setCustomerName(data.customer);
      setSaleDate(data.saleDate);
      setItems(data.itemList);
    }
  };

  const totalSum = items.reduce((total, variant) => {
    return total + variant.qty * variant.price;
  }, 0);

  useEffect(() => {
    setTimeout(() => {
      if (ShowMessage) {
        setRersponseBack("");
        setShowMessage(false);
      }
    }, 2000);
  }, [ShowMessage, RescponseBack]);
  useEffect(() => {
    saleGet();
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
          <>
            {isLoading ? (
              <div className="flex justify-center py-10">
                <Spinner />
              </div>
            ) : (
              <>
                {SaleList.length !== 0 ? (
                  <>
                    {SaleList.map((item) => (
                      <div
                        key={item.saleID}
                        className="p-4 border mt-2 border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition flex justify-between items-center"
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {item.customer}
                          </h3>
                          <p className="text-gray-600">
                            Sale Date: {item.saleDate}
                          </p>
                          <p className="text-gray-600">
                            Total Bill: {item.totalBill}
                          </p>
                          <p className="text-gray-600">
                            Adjustment: {item.adjustment}
                          </p>
                          <p className="text-gray-600">
                            Amount Paid: {item.amountPaid}
                          </p>
                        </div>
                        <div className="flex gap-4">
                          <button
                            onClick={() => fetchDataForModify(item.saleID)}
                            className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 transition"
                            title="Edit"
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button
                            // onClick={() => {
                            //   setID(item.customerID);
                            //   setIsOpen(true);
                            // }}
                            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
                            title="Delete"
                          >
                            <Trash className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="w-full bg-red-100 text-red-800 text-center px-4 py-3 mb-2 rounded">
                    No Record Found
                  </div>
                )}
              </>
            )}
          </>
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
                      value={SaleDate}
                      onChange={(e) => setSaleDate(e.target.value)}
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
                        value={Customer}
                        type="text"
                        name="CustomerName"
                        onChange={(e) => setCustomer(e.target.value)}
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
                            <option key={item.productID} value={item.productID}>
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
            <>
              <div className="w-full flex-col gap-2 md:flex-row flex">
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
                        fetchData(SearchByProduct);
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
            </>

            {/* Product Name */}

            {/* Quantity */}

            {/* Table */}
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
                            setSubVarinetName2(foundVariantValue ?? "");
                            setSearchByBarcode(foundAttributeID);
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
                          if (
                            newItem.barcode &&
                            newItem.attributeID &&
                            newItem.productName &&
                            newItem.qty &&
                            newItem.price &&
                            newItem.varinet
                          ) {
                            setItems([...items, newItem]);
                            setNewItem({
                              attributeID: "",
                              productName: "",
                              qty: 0,
                              price: 0,
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
                      value={AmountPaid || 0}
                      onChange={(e) => setAmountPaid(Number(e.target.value))}
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
                      value={Discount || 0}
                      onChange={(e) => setDiscount(Number(e.target.value))}
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
                      value={totalSum || 0}
                      readOnly
                      className="w-full text-center bg-transparent outline-none text-gray-900"
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
                      value={totalSum - AmountPaid - Discount || 0}
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
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                  name="description"
                  placeholder="Enter Description"
                  className="w-full bg-transparent outline-none text-gray-900 resize-none"
                  rows={3}
                />
              </div>
            </div>
            {ResponseBack && (
              <div
                className={`w-full text-center px-4 py-3 mb-2 rounded ${
                  ShowMessage
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {ResponseBack}
              </div>
            )}
            {/* Save Button */}
            <div className="w-full flex justify-end mt-4">
              <button
                onClick={SaleAdd}
                type="button"
                className="w-full py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
