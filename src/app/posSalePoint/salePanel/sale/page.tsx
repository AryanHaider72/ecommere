import GetSalesman from "@/api/lib/MainDashbaord/SalemanApi/GetSalesman";
import GetTillForSalesMan from "@/api/lib/MainDashbaord/TillCreate/GetTillForSpecficSaleMan";
import AddCustomer from "@/api/lib/PosIntegration/Customer/AddCustomer";
import GetCustomer from "@/api/lib/PosIntegration/Customer/GetCustomer";
import GetProductSalesMan from "@/api/lib/PosIntegration/ProductGet/productsGetSalesMan";
import SearchByInvoice from "@/api/lib/PosIntegration/Return/SearchHistory/SearchByInvoice/SearchByInvoice";
import SearchByProduct from "@/api/lib/PosIntegration/Return/SearchHistory/SearchByProduct/SearchByProduct";
import AddSalePos from "@/api/lib/PosIntegration/Sale/SaleAdd/SaleAdd";
import GetSalePosInvoice from "@/api/lib/PosIntegration/Sale/SaleGetInvoice/SaleGetInvoice";
import GetProduct from "@/api/lib/product/GetProduct/GetProduct";
import GetInitalStoreSalesMan from "@/api/lib/store/GetStoreSalesMan/GetStoreSalesMan";
import {
  CustomerData,
  ResponseCustomerGetData,
} from "@/api/types/PosIntegration/Customer/CustomerType";
import {
  ListItem,
  responseGetSale,
  Sale,
} from "@/api/types/PosIntegration/Sale/Sale";
import {
  Product,
  ProductApiResponse,
  ProductApiResponseSalesMan,
} from "@/api/types/product/getProduct";
import { StoreApiResponse, storeInital } from "@/api/types/storeGet";
import {
  Calendar,
  Coins,
  Mail,
  MapPin,
  Notebook,
  Phone,
  Plus,
  Tag,
  Trash,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Salesman {
  salesmanID: string;
  salesmanName: string;
}
interface SalesmanApiResponse {
  salesmanList: Salesman[];
  message?: string;
}
interface RespiosneGet {
  message: string;
  tillList: TillList[];
}
interface TillList {
  tillID: string;
  tillName: string;
  tillSubList: TillSubList[];
}
interface TillSubList {
  listID: string;
  productID: string;
  productName: string;
}

interface VarintList {
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
interface newItem {
  attributeID: string;
  productName: string;
  qty: number;
  varientValue: string;
  price: number;
  barcode: string;
  stockQty: number;
  discount: number;
}
interface responseList {
  message: string;
  showHistory: historyData[];
}

interface historyData {
  customerID: string;
  customerName: string;
  saleID: string;
  productName: string;
  attributeID: string;
  saleDate: string;
  varientValue: string;
  barcode: string;
  qty: number;
  rate: number;
  maxQty: number;
}
export default function SaleForm() {
  const router = useRouter();
  const [Loading1, setLoading1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [Email, setEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [AddCustomerForm, setAddCustomerForm] = useState(false);
  const [CustomerList, setCustomerList] = useState<CustomerData[]>([]);
  const [salesmanList, setSalesmanList] = useState<Salesman[]>([]);
  const [productList2, setProductList2] = useState<Product[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [TillList, setTillList] = useState<TillList[]>([]);
  const [storeList, setStoreList] = useState<storeInital[]>([]);
  const [InvocieHistory, setInvocieHistory] = useState<historyData[]>([]);
  const [selectedSalesman, setSelectedSalesman] = useState("");
  const [Customer, setCustomer] = useState("");
  const [Description, setDescription] = useState("");
  const [SaleDate, setSaleDate] = useState("");
  const [Barcode, setBarcode] = useState("");
  const [ProductID, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [VarintShowList, setVarintShowList] = useState(false);
  const [VarintListInPopUp, setVarintListInPopUp] = useState<VarintList[]>([]);
  const [newItem, setNewItem] = useState<newItem[]>([]);
  const [AmountPaid, setAmountPaid] = useState(0);
  const [Discount, setDiscount] = useState(0);
  const [RescponseBack, setRersponseBack] = useState("");
  const [ShowMessage, setShowMessage] = useState(false);
  const [ReturnMenu, setReturnMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState("inovice");
  const [SaleList, setSaleList] = useState<Sale[]>([]);

  const CustomerGet = async () => {
    const token = localStorage.getItem("token");
    const response = await GetCustomer(String(token));
    if (response.status === 200 || response.status === 201) {
      const data = response.data as ResponseCustomerGetData;
      setCustomerList(data.customerList || []);
      setCustomer(data.customerList[0].customerID);
    } else if (response.status === 401) {
      router.push("/sellerlogin");
    }
  };
  const addCustoemr = async () => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/posSalePoint/login");
    try {
      setLoading1(true);
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
        // setResponseBack(response.data.message || "Customer Added Successfully");
        // setShowMessage(true);
      } else if (response.status === 401) {
        router.push("/posSalePoint/login");
      }
    } catch (error) {
    } finally {
      setLoading1(false);
    }
  };
  const fetchSalesman = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await GetSalesman(String(token));

      if (response.status === 200 || response.status === 201) {
        const data = response.data as SalesmanApiResponse;

        setSalesmanList(data.salesmanList || []);
        setSelectedSalesman(data.salesmanList[0].salesmanID);
      }
    } catch (error) {
      console.error("Error fetching salesman list", error);
    }
  };
  const saleGet = async () => {
    const token = localStorage.getItem("token");
    const response = await GetSalePosInvoice(String(token));
    if (response.status === 200 || response.status === 201) {
      const data = response.data as responseGetSale;
      console.log("New Sale Data", data);
      setSaleList(data.saleList);
    }
  };
  const getProductHistory = async (ID: string) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const response = await SearchByProduct(token, ID);

    if (response.status === 200 || response.status === 201) {
      const data = response.data as responseList;

      setInvocieHistory(data.showHistory || []);
    }
  };
  const getInvoiceHistory = async (ID: string) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const response = await SearchByInvoice(token, ID);
    if (response.status === 200 || response.status === 201) {
      const data = response.data as responseList;

      setInvocieHistory(data.showHistory || []);
      setCustomerName(data.showHistory[0].customerName);
    }
  };
  const getTill = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await GetTillForSalesMan(String(token));

      if (response.status === 200) {
        const data = response.data as RespiosneGet;

        if (data?.tillList?.length > 0) {
          setTillList(data.tillList);

          getProduct(data.tillList[0].tillID);
        } else {
          setTillList([]);
        }
      }
    } finally {
      setLoading(false);
    }
  };
  const getProduct = async (ID: string) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const response = await GetProductSalesMan(token, ID);

    if (response.status === 200 || response.status === 201) {
      const data = response.data as ProductApiResponseSalesMan;
      console.log(data);
      const newData = data.productList.filter(
        (item) => item.storeSale !== "OnlineStore",
      );
      if (newData) {
        setProductList2(newData || []);
      } else {
        setProductList2([]);
      }
    }
  };
  const storesget = async () => {
    const token = localStorage.getItem("token");
    const response = await GetInitalStoreSalesMan(String(token));
    if (response.status === 200 || response.status === 201) {
      const data = response.data as StoreApiResponse;
      console.log(data);
      setStoreList(data.storeList);
      getProductall(data.storeList[0].storeID);
    }
  };
  const getProductall = async (ID: string) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const response = await GetProduct(token, ID);

    if (response.status === 200 || response.status === 201) {
      const data = response.data as ProductApiResponse;
      const newData = data.list.filter(
        (item) => item.storeSale !== "OnlineStore",
      );
      if (newData) {
        setProductList(newData || []);
      } else {
        setProductList([]);
      }
    }
  };
  const fetchDataVarientList = (ID: string) => {
    const data = productList.find((item) => item.productID === ID);
    if (data) {
      console.log(data);
      setVarintListInPopUp(data.variants);
    }
  };
  const DeletFromTableList = (ID: string) => {
    const data = newItem.filter((item) => item.attributeID !== ID);
    setNewItem(data);
  };
  const FetchAttribuetToAddInATable = (ID: string) => {
    // Find the product containing the attributeID
    const product = productList.find((item) =>
      item.variants.some((v) =>
        v.variantValues.some((val) => val.attributeID === ID),
      ),
    );

    if (!product) return; // No product found

    const variantValue = product.variants
      .flatMap((v) => v.variantValues)
      .find((val) => val.attributeID === ID);

    if (!variantValue) return; // No variant found

    setNewItem((prev) => {
      // **Make sure we only have one entry per attributeID**
      const existingItem = prev.find(
        (item) => item.attributeID === variantValue.attributeID,
      );

      if (existingItem) {
        // Item exists → increment qty by 1
        return prev.map((item) =>
          item.attributeID === variantValue.attributeID
            ? { ...item, qty: item.qty + 1 }
            : item,
        );
      }

      // Item does not exist → add new entry
      const newEntry: newItem = {
        attributeID: variantValue.attributeID,
        productName: product.productName,
        qty: 1,
        varientValue: variantValue.varientValue,
        price: variantValue.salePrice,
        barcode: variantValue.barcode,
        stockQty: variantValue.qty,
        discount: product.discount,
      };

      return [...prev, newEntry];
    });
  };
  const findDataUsingBarcode = () => {
    for (const product of productList) {
      for (const variant of product.variants) {
        const attribute = variant.variantValues.find(
          (v) => v.barcode === Barcode,
        );

        if (!attribute) continue; // Skip if barcode not found

        // ✅ Check if the barcode exists in productList2
        const existsInTill = productList2.some((p) =>
          p.variants.some((v) =>
            v.variantValues.some((val) => val.barcode === Barcode),
          ),
        );

        // Show confirm box if not in productList2
        if (!existsInTill) {
          const confirmAdd = window.confirm(
            "This product does not exist in your till. Do you want to add it?",
          );
          if (!confirmAdd) {
            return; // User cancelled → do not add
          }
        }

        // Prepare new item
        const newEntry: newItem = {
          attributeID: attribute.attributeID,
          productName: product.productName,
          qty: 1,
          varientValue: attribute.varientValue,
          price: attribute.salePrice,
          barcode: attribute.barcode,
          stockQty: attribute.qty,
          discount: product.discount,
        };

        // Add or increment qty
        setNewItem((prev) => {
          const existing = prev.find(
            (item) => item.attributeID === newEntry.attributeID,
          );
          if (existing) {
            return prev.map((item) =>
              item.attributeID === newEntry.attributeID
                ? { ...item, qty: item.qty + 1 }
                : item,
            );
          }
          return [...prev, newEntry];
        });

        setBarcode(""); // Clear input
        return; // Stop after first match
      }
    }
  };
  const getItemTotal = (item: any) => {
    const totalWithoutDiscount = item.qty * item.price;
    const discountAmount = (item.price * item.discount) / 100; // discount only once
    return totalWithoutDiscount - discountAmount;
  };
  const totalSum = newItem.reduce(
    (total, item) => total + getItemTotal(item),
    0,
  );
  useEffect(() => {
    const getItemTotal = (item: any) => {
      const totalWithoutDiscount = item.qty * item.price;
      const discountAmount = (item.price * item.discount) / 100; // discount only once
      return totalWithoutDiscount - discountAmount;
    };
    const totalSum = newItem.reduce(
      (total, item) => total + getItemTotal(item),
      0,
    );
    setAmountPaid(totalSum);
  }, [newItem]);

  const SaleAdd = async () => {
    try {
      setLoading(true);
      const listForRequest: ListItem[] = newItem.map((item) => ({
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
        salesmanID: selectedSalesman,
        list: listForRequest,
      };
      const token = localStorage.getItem("token");
      console.log(formData);
      const response = await AddSalePos(formData, String(token));
      if (response.status === 200 || response.status === 201) {
        // saleGet();
        getTill();
        setProductName("");
        setCustomerName("");
        setSaleDate("");
        setNewItem([]);
        setSelectedSalesman("");
        setAmountPaid(0);
        setDiscount(0);
        setDescription("");
        setRersponseBack(response.data.message || "Sale Added Successfully");
        setShowMessage(true);
      } else if (response.status === 400) {
        setRersponseBack(
          response.data.message || "PLease Fill in All Required Fields",
        );
        setShowMessage(false);
      } else {
        setRersponseBack(
          response.data.message ||
            "Something Went Wrong. Please Try Again later.",
        );
        setShowMessage(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const date = new Date().toISOString().split("T")[0];
    setSaleDate(date);
    saleGet();
    storesget();
    fetchSalesman();
    CustomerGet();
    getTill();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (ShowMessage) {
        setRersponseBack("");
        setShowMessage(false);
      }
    }, 2000);
  }, [ShowMessage, RescponseBack]);
  return (
    <>
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
                {Loading1 ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
      {VarintShowList && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-4xl">
            {/* Close Button */}
            <div className="flex justify-end mb-4">
              <span
                onClick={() => setVarintShowList(false)}
                className="text-gray-600 text-xl hover:text-red-500 cursor-pointer"
              >
                X
              </span>
            </div>

            {/* Header */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Item List
            </h2>
            {/* Table Wrapper for scrolling */}
            <div className="overflow-x-auto w-full">
              {VarintListInPopUp.map((item) => (
                <>
                  <h1 key={item.varientID} className="text-lg font-bold">
                    {item.variantName}
                  </h1>
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-gray-700 font-medium">
                          Barcode
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700 font-medium">
                          Variant
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700 font-medium">
                          Quantity
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700 font-medium">
                          Original Price
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700 font-medium">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.variantValues.map((item2) => (
                        <tr className="border-t">
                          <td className="px-4 py-2 text-left">
                            {item2.barcode}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {item2.varientValue}
                          </td>
                          <td className="px-4 py-2 text-center">{item2.qty}</td>
                          <td className="px-4 py-2 text-center">
                            {item2.salePrice}
                          </td>
                          <td className="px-4 py-2 text-center">
                            <button
                              onClick={() =>
                                FetchAttribuetToAddInATable(item2.attributeID)
                              }
                              className="px-2 py-1 bg-yellow-500 text-white rounded-md"
                            >
                              <Plus />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ))}
            </div>
          </div>
        </div>
      )}
      {ReturnMenu && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-4xl">
            {/* Close Button */}
            <div className="flex justify-end mb-4">
              <span
                onClick={() => setReturnMenu(false)}
                className="text-gray-600 text-xl hover:text-red-500 cursor-pointer"
              >
                X
              </span>
            </div>
            <div className="p-6  rounded-xl w-full">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Search By
              </h2>

              <div className="flex flex-wrap gap-4 ">
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
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-6 mt-2">
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
                            (item) => item.productName === value,
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
                            <option
                              key={item.productID}
                              value={item.productName}
                            >
                              {item.productName}
                            </option>
                          ))
                        )}
                      </datalist>
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
                            (item) => item.invoiceNo === Number(value),
                          );
                          if (data) {
                            getInvoiceHistory(data.saleID);
                          }
                        }}
                        placeholder="Select or type Invoice No"
                        className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <datalist id="productOptions">
                        {SaleList.length === 0 ? (
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
                    </div>
                  </div>
                )}
                <div className="w-full">
                  <label className="block text-gray-700 font-medium mb-2">
                    Customer Name
                  </label>

                  <div className="flex gap-2">
                    <div className="w-full flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                      <User className="text-gray-400 mr-2" size={18} />

                      <input
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Customer Name"
                        readOnly
                        className="w-full bg-transparent outline-none text-gray-900"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full overflow-x-auto">
                <table className="w-full border border-gray-50 rounded-lg overflow-hidden ">
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
                        Orignal Price
                      </th>
                      <th className="px-4 py-2 text-center text-gray-700 font-medium">
                        Total Bill
                      </th>
                      <th className="px-4 py-2 text-center text-gray-700 font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {InvocieHistory.map((item, index) => (
                      <tr
                        key={item.attributeID}
                        className={`${item.maxQty < item.qty && "bg-red-200"}`}
                      >
                        <td className="px-4 py-2 text-left text-gray-700 font-medium">
                          {item.barcode}
                        </td>
                        <td className="px-4 py-2 text-left text-gray-700 font-medium">
                          {item.productName}
                        </td>
                        <td className="px-4 py-2 text-center text-gray-700 font-medium">
                          {item.varientValue}
                        </td>

                        {/* Editable Quantity */}
                        <td className="px-4 py-2 text-center text-gray-700 font-medium">
                          <input
                            type="number"
                            className="w-16 text-center border rounded-md px-1 py-1"
                            value={item.qty}
                            onChange={(e) => {
                              const value = Number(e.target.value);
                              setNewItem((prev) =>
                                prev.map((itm, i) =>
                                  i === index ? { ...itm, qty: value } : itm,
                                ),
                              );
                            }}
                          />
                        </td>
                        {/* Editable Original Price */}
                        <td className="px-4 py-2 text-center text-gray-700 font-medium">
                          {item.rate}
                        </td>

                        {/* Total Bill */}
                        <td className="px-4 py-2 text-center text-gray-700 font-medium">
                          {item.rate * item.qty}
                        </td>

                        {/* Action */}
                        <td className="px-4 py-2 text-center text-gray-700 font-medium">
                          <button
                            onClick={() => DeletFromTableList(item.attributeID)}
                            className="px-2 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
                          >
                            <Plus />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full relative">
        <h2 className="text-2xl font-semibold text-gray-800">
          Sale Management
        </h2>
        <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-md">
          <div className="w-full flex justify-end">
            <button
              onClick={() => setReturnMenu(true)}
              className=" px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              Return Item
            </button>
          </div>
          <div className="flex flex-col gap-6">
            {/* Salesman */}
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-2">
                Salesman <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 w-full">
                <User className="text-gray-400 mr-2" size={18} />
                <select
                  value={selectedSalesman}
                  onChange={(e) => setSelectedSalesman(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-900 p-2"
                >
                  {salesmanList.length > 0 ? (
                    salesmanList.map((sm) => (
                      <option key={sm.salesmanID} value={sm.salesmanID}>
                        {sm.salesmanName}
                      </option>
                    ))
                  ) : (
                    <option>No Record Found</option>
                  )}
                </select>
              </div>
            </div>

            {/* Sale Date & Customer */}
            <div className="flex flex-col md:flex-row gap-4 w-full">
              {/* Sale Date */}
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">
                  Sale Date
                </label>
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 w-full">
                  <Calendar className="text-gray-400 mr-2" size={18} />
                  <input
                    value={SaleDate}
                    onChange={(e) => setSaleDate(e.target.value)}
                    type="date"
                    readOnly
                    placeholder="Enter Purchase Date"
                    className="flex-1 bg-transparent outline-none text-gray-900"
                  />
                </div>
              </div>

              {/* Customer */}
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">
                  Customer Name
                </label>
                <div className="flex gap-2 w-full">
                  <div className="flex-1 flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                    <User className="text-gray-400 mr-2" size={18} />
                    <select
                      value={Customer}
                      onChange={(e) => {
                        setDescription("");
                        const value = e.target.value;
                        setCustomer(value);
                        const data = CustomerList.find(
                          (item) => item.customerID === value,
                        );
                        if (data) setCustomerName(data.customerName);
                      }}
                      className="flex-1 p-1 bg-transparent outline-none text-gray-900"
                    >
                      {CustomerList.length !== 0 ? (
                        <>
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
                    className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
                  >
                    <Plus />
                  </button>
                </div>
              </div>
            </div>
            {customerName === "Walk in Customer" && (
              <div className="w-full">
                <label className="block text-gray-700 font-medium mb-2">
                  Customer Name
                </label>
                <div className="flex items-center w-full border border-gray-200 rounded-lg bg-gray-50 px-3 py-2">
                  <Tag className="text-gray-400 mr-2" size={18} />
                  <input
                    type="text"
                    value={Description}
                    placeholder="Enter Customer Name"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    className="flex-1 bg-transparent outline-none text-gray-900 p-1"
                  />
                </div>
              </div>
            )}
            <div className="w-full flex-col gap-2 md:flex-row flex">
              <div className="w-full">
                <label className="block text-gray-700 font-medium mb-2">
                  Barcode
                </label>
                <div className="flex items-center w-full border border-gray-200 rounded-lg bg-gray-50 px-3 py-2">
                  <Tag className="text-gray-400 mr-2" size={18} />
                  <input
                    type="text"
                    value={Barcode}
                    placeholder="Enter Barcode"
                    onChange={(e) => {
                      setBarcode(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        findDataUsingBarcode();
                        setBarcode("");
                      }
                    }}
                    className="flex-1 bg-transparent outline-none text-gray-900 p-1"
                  />
                </div>
              </div>
              <div className="w-full min-w-0">
                <label className="block text-gray-700 font-medium mb-2">
                  Product Name
                </label>
                {productList2.length === 0 ? (
                  <div className="flex items-center w-full border border-gray-200 rounded-lg bg-gray-50 px-3 py-2">
                    <Tag className="text-gray-400 mr-2" size={18} />
                    <input
                      type="text"
                      list="productList"
                      value={productName}
                      onChange={(e) => {
                        const value = e.target.value;
                        setProductName(value);
                        const data = productList.find(
                          (item) => item.productName === value,
                        );
                        if (data) {
                          setProductID(data.productID);
                          fetchDataVarientList(data.productID);
                        }
                      }}
                      disabled
                      placeholder="No Product Found"
                      className="flex-1 bg-transparent outline-none text-gray-900 p-1 truncate"
                    />
                  </div>
                ) : (
                  <div className="flex  gap-1">
                    <div className="flex items-center w-full border border-gray-200 rounded-lg bg-gray-50 px-3 py-2">
                      <Tag className="text-gray-400 mr-2" size={18} />
                      <input
                        type="text"
                        list="productList"
                        value={productName}
                        onChange={(e) => {
                          const value = e.target.value;
                          setProductName(value);
                          const data = productList.find(
                            (item) => item.productName === value,
                          );
                          if (data) {
                            setProductID(data.productID);
                            fetchDataVarientList(data.productID);
                          }
                        }}
                        placeholder="Select Product"
                        className="flex-1 bg-transparent outline-none text-gray-900 p-1 truncate"
                      />
                      <datalist id="productList">
                        {productList2.map((item) => (
                          <option
                            key={item.productID}
                            value={item.productName}
                          />
                        ))}
                      </datalist>
                    </div>
                    <button
                      onClick={() => setVarintShowList(true)}
                      className="px-2 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                    >
                      <Notebook />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full overflow-x-auto">
              <table className="w-full border border-gray-50 rounded-lg overflow-hidden ">
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
                      Orignal Price
                    </th>
                    <th className="px-4 py-2 text-center text-gray-700 font-medium">
                      Discount Price
                    </th>
                    <th className="px-4 py-2 text-center text-gray-700 font-medium">
                      Total Bill
                    </th>
                    <th className="px-4 py-2 text-center text-gray-700 font-medium">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {newItem.map((item, index) => (
                    <tr
                      key={item.attributeID}
                      className={`${item.stockQty < item.qty && "bg-red-200"}`}
                    >
                      <td className="px-4 py-2 text-left text-gray-700 font-medium">
                        {item.barcode}
                      </td>
                      <td className="px-4 py-2 text-left text-gray-700 font-medium">
                        {item.productName}
                      </td>
                      <td className="px-4 py-2 text-center text-gray-700 font-medium">
                        {item.varientValue}
                      </td>

                      {/* Editable Quantity */}
                      <td className="px-4 py-2 text-center text-gray-700 font-medium">
                        <input
                          type="number"
                          className="w-16 text-center border rounded-md px-1 py-1"
                          value={item.qty}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            setNewItem((prev) =>
                              prev.map((itm, i) =>
                                i === index ? { ...itm, qty: value } : itm,
                              ),
                            );
                          }}
                        />
                      </td>

                      {/* Editable Original Price */}
                      <td className="px-4 py-2 text-center text-gray-700 font-medium">
                        <input
                          type="number"
                          className="w-20 text-center border rounded-md px-1 py-1"
                          value={item.price}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            setNewItem((prev) =>
                              prev.map((itm, i) =>
                                i === index ? { ...itm, price: value } : itm,
                              ),
                            );
                          }}
                        />
                      </td>

                      {/* Discount */}
                      <td className="px-4 py-2 text-center text-gray-700 font-medium">
                        {item.discount}%
                      </td>

                      {/* Total Bill */}
                      <td className="px-4 py-2 text-center text-gray-700 font-medium">
                        {(item.price - (item.price * item.discount) / 100) *
                          item.qty}
                      </td>

                      {/* Action */}
                      <td className="px-4 py-2 text-center text-gray-700 font-medium">
                        <button
                          onClick={() => DeletFromTableList(item.attributeID)}
                          className="px-2 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                        >
                          <Trash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
                  <div
                    className={`flex items-center  ${
                      totalSum - AmountPaid - Discount < 0 &&
                      `text-red-100 border-red-200 bg-red-100`
                    }  border border-gray-200 rounded-lg px-3 py-2 bg-gray-50`}
                  >
                    <Coins className="text-gray-400 mr-2" size={18} />
                    <input
                      value={totalSum - AmountPaid - Discount || 0}
                      type="number"
                      name="remainingBalance"
                      placeholder="Auto Calculated"
                      readOnly
                      className={`w-full text-center ${
                        totalSum - AmountPaid - Discount < 0 && `text-red-500`
                      } bg-transparent outline-none text-gray-900`}
                    />
                  </div>
                </div>
              </div>
            </div>
            {customerName !== "Walk in Customer" && (
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
            )}
            {RescponseBack && (
              <div
                className={`w-full text-center px-4 py-3 mb-2 rounded ${
                  ShowMessage
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {RescponseBack}
              </div>
            )}

            {/* ---------------------------- */}
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
        </div>
      </div>
    </>
  );
}
