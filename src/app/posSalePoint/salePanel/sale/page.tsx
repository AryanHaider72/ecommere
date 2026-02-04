"use client";
import { use, useEffect, useState } from "react";
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
  List,
  X,
  Receipt,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import GetCustomer from "@/api/lib/PosIntegration/Customer/GetCustomer";
import {
  CustomerData,
  ResponseCustomerGetData,
} from "@/api/types/PosIntegration/Customer/CustomerType";
import AddCustomer from "@/api/lib/PosIntegration/Customer/AddCustomer";
import {
  Product,
  ProductApiResponse,
  ProductApiResponseSalesMan,
} from "@/api/types/product/getProduct";
import GetProduct from "@/api/lib/product/GetProduct/GetProduct";
import GetProductHome from "@/api/lib/HomePage/Product/Product";
import {
  GetProductHomeApiResponse,
  ProductHomePage,
} from "@/api/types/HomePage/Product/product";
import { StoreApiResponse, storeInital } from "@/api/types/storeGet";
import GetInitalStoreSalesMan from "@/api/lib/store/GetStoreSalesMan/GetStoreSalesMan";
import AddSale from "@/api/lib/PosIntegration/Sale/SaleAdd/SaleAdd";
import {
  ListItem,
  responseGetSale,
  Sale,
  SaleItem,
} from "@/api/types/PosIntegration/Sale/Sale";
import AddSalePos from "@/api/lib/PosIntegration/Sale/SaleAdd/SaleAdd";
import GetSalePos from "@/api/lib/PosIntegration/Sale/SaleGet/SaleGet";
import Spinner from "@/component/spinner/page";
import jsPDF from "jspdf";
import GetInitalStore from "@/api/authentication/StoreGet";
import GetProductSalesMan from "@/api/lib/PosIntegration/ProductGet/productsGetSalesMan";
import GetTillForPos from "@/api/lib/MainDashbaord/TillCreate/TillGet";
import GetTillForSalesMan from "@/api/lib/MainDashbaord/TillCreate/GetTillForSpecficSaleMan";
import GetSalesman from "@/api/lib/MainDashbaord/SalemanApi/GetSalesman";
interface Item {
  barcode: string;
  attributeID: string;
  productName: string;
  qty: number;
  price: number;
  varinet: string;
  stockQty: number;
  discount: number;
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

interface Salesman {
  salesmanID: string;
  salesmanName: string;
}
interface SalesmanApiResponse {
  salesmanList: Salesman[];
  message?: string;
}

export default function SaleForm() {
  const router = useRouter();
  const [showList, setShowList] = useState(true);
  const [ShowMessage, setShowMessage] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [selectedTill, setSelectedTill] = useState("");
  const [Email, setEmail] = useState("");
  const [AddCustomerForm, setAddCustomerForm] = useState(false);
  const [Customer, setCustomer] = useState("");
  const [CustomerType, setCustomerType] = useState("WalkingCustomer");
  const [ResponseBack, setResponseBack] = useState("");
  const [SearchByBarcode, setSearchByBarcode] = useState("");
  const [storeList, setStoreList] = useState<storeInital[]>([]);
  const [RescponseBack, setRersponseBack] = useState("");
  const [SubVarinetName2, setSubVarinetName2] = useState("");

  const [SearchByProduct, setSearchByProduct] = useState("");
  const [SubVarinetName, setSubVarinetName] = useState("");
  const [storeID, setStoreID] = useState("");
  const [VarinetID, setVarinetID] = useState("");
  const [productName, setProductName] = useState("");
  const [ProductID, setProductID] = useState("");
  const [barcodeInput, setBarcodeInput] = useState("");

  const [CustomerList, setCustomerList] = useState<CustomerData[]>([]);
  const [productList2, setProductList2] = useState<Product[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);

  const [VarientsList, setVarientsList] = useState<VarientsList[]>([]);
  const [AttributeList, setAttributeList] = useState<variantValues[]>([]);

  const [showInvoioceItem, setShowInvoiceItem] = useState(false);
  const [SaleList, setSaleList] = useState<Sale[]>([]);
  const [SaleListItem, setSaleListItem] = useState<SaleItem[]>([]);
  const [AmountPaid, setAmountPaid] = useState(0);
  const [Discount, setDiscount] = useState(0);
  const [SaleDate, setSaleDate] = useState("");
  const [Description, setDescription] = useState("");
  const [SearchBy, setSearchBy] = useState("SearchByBarcode");
  const [isLoading, setIsLoading] = useState(false);
  const [Loading1, setLoading1] = useState(false);
  const [qty, setQty] = useState(1);
  const [newSaleList, setNewSaleList] = useState<Sale[]>([]);
  const [loadRecipt, setLoadRecipt] = useState(false);
  const [TillList, setTillList] = useState<TillList[]>([]);
  const [salesmanList, setSalesmanList] = useState<Salesman[]>([]);
const [selectedSalesman, setSelectedSalesman] = useState("");
const [, setSalesman] = useState("");

  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState({
    attributeID: "",
    productName: "",
    qty: 0,
    price: 0,
    barcode: "",
    varinet: "",
    stockQty: 0,
    discount: 0,
  });

  const pdfRecipt = (sale: any) => {
    if (!sale || !sale.itemList || sale.itemList.length === 0) return;

    setLoadRecipt(true);

    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [80, 250],
      });

      // Logo
      doc.addImage(
        "https://res.cloudinary.com/daz8ajhg3/image/upload/v1766325653/ir3kwpslvkrt20eoiuag.png",
        "PNG",
        5,
        5,
        30,
        20,
      );

      // Store name
      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);
      doc.text("Karime", 40, 15, { align: "center" });

      // Title
      doc.setFontSize(13);
      doc.text("Sale Receipt", 40, 30, { align: "center" });

      let y = 40;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");

      // Date & invoice
      const date = new Date(sale.saleDate).toISOString().split("T")[0];
      doc.text(`Date: ${date}`, 5, y);
      doc.text(`Invoice: ${sale.invoiceNo}`, 75, y, { align: "right" });

      y += 4;
      doc.line(5, y, 75, y);

      // 🔁 LOOP THROUGH ITEMS
      sale.itemList.forEach((item: any, index: number) => {
        // Product name
        y += 6;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.text(item.productName || "Product", 5, y, { maxWidth: 65 });

        // Divider
        y += 6;
        doc.line(5, y, 75, y);

        // Table header
        y += 5;
        doc.setFontSize(10);
        doc.text("#", 5, y);
        doc.text("Barcode", 25, y);
        doc.text("Qty", 45, y);
        doc.text("Amount", 75, y, { align: "right" });

        // Header divider
        y += 2;
        doc.line(5, y, 75, y);

        // Table row
        y += 4;
        doc.setFont("helvetica", "normal");
        doc.text(String(index + 1), 5, y);
        doc.text(item.barcode || "-", 25, y);
        doc.text(String(item.qty), 45, y);
        doc.text(String(item.price * item.qty), 75, y, { align: "right" });

        // Row divider
        y += 4;
        doc.line(5, y, 75, y);
      });

      // Totals
      // Totals section (flex style)
      y += 5;
      doc.text("Thank you for shopping!", 5, y);
      doc.text(`Total: ${sale.totalBill}`, 75, y, { align: "right" });

      y += 5;
      doc.text("Visit us again!", 5, y);
      doc.text(`Paid: ${sale.amountPaid}`, 75, y, { align: "right" });

      y += 5;
      doc.text("We appreciate you", 5, y);
      doc.text(`Discount: 0`, 75, y, { align: "right" });

      y += 5;
      doc.text("Have a nice day!", 5, y);
      doc.text(`Adjustment: ${sale.adjustment}`, 75, y, { align: "right" });

      // Footer
      y += 7;
      doc.setFont("helvetica", "italic");
      doc.text("Thank you for shopping!", 40, y, { align: "center" });

      doc.save(`receipt-${sale.invoiceNo}.pdf`);
    } finally {
      setLoadRecipt(false);
    }
  };

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
        setResponseBack(response.data.message || "Customer Added Successfully");
        setShowMessage(true);
      } else if (response.status === 401) {
        router.push("/posSalePoint/login");
      }
    } catch (error) {
    } finally {
      setLoading1(false);
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

  const fetchData = (attributeID: string) => {
    if (!attributeID) {
      alert("attributeID not found");
      return;
    }

    let found = false;

    // 🔍 Find product & attribute from full list
    for (const product of productList) {
      for (const variant of product.variants) {
        const attribute = variant.variantValues.find(
          (v) => v.attributeID === attributeID,
        );

        if (!attribute) continue;

        // 🔎 Check if product exists in productList2
        const existsInProductList2 = productList2.some((p) =>
          p.variants.some((v) =>
            v.variantValues.some((vv) => vv.attributeID === attributeID),
          ),
        );

        // ⚠️ If NOT exists in productList2 → ask confirmation
        if (!existsInProductList2) {
          const confirmed = window.confirm(
            "This item is not in the Avaliable in you're Item List. Do you want to add it?",
          );

          if (!confirmed) return;
        }

        // 💰 Discount lookup (from productList)
        const discountProduct = productList.find((item) =>
          item.variants.some((item2) =>
            item2.variantValues.some(
              (item3) => item3.attributeID === attributeID,
            ),
          ),
        );
        console.log(attribute);
        // ➕ Add to items state
        setQty(attribute.qty);
        setItems((prev) => {
          const existingIndex = prev.findIndex(
            (item) => item.attributeID === attribute.attributeID,
          );

          // 🔁 Already exists → increase qty
          if (existingIndex !== -1) {
            const updated = [...prev];
            updated[existingIndex] = {
              ...updated[existingIndex],
              qty: Number(updated[existingIndex].qty) + 1,
            };
            return updated;
          }

          // ➕ Add new row
          return [
            ...prev,
            {
              barcode: attribute.barcode,
              attributeID: attribute.attributeID,
              productName: product.productName,
              qty: 1,
              price: attribute.salePrice,
              varinet: attribute.varientValue,
              stockQty: Number(attribute.qty || 0),
              discount: discountProduct?.discount || 0,
            },
          ];
        });

        found = true;
        break;
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

  // const storesget = async () => {
  //   const token = localStorage.getItem("token");
  //   const response = await GetInitalStore(String(token));
  //   if (response.status === 200 || response.status === 201) {
  //     const data = response.data as StoreApiResponse;
  //     console.log(data);
  //     setStoreList(data.storeList);
  //     getProduct(data.storeList[0].storeID);
  //   }
  // };

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
    const data = VarientsList.find((p) => p.varientID === varientID);
    if (data) {
      setAttributeList(data.variantValues);
    } else {
      setAttributeList([]);
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
        salesmanID: selectedSalesman,
        list: listForRequest,
      };
      const token = localStorage.getItem("token");
      console.log(formData);
      const response = await AddSalePos(formData, String(token));
      if (response.status === 200 || response.status === 201) {
        saleGet();
        getTill();
        setProductName("");
        setVarientsList([]);
        setVarinetID("");
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

  const getTill = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await GetTillForSalesMan(String(token));

      if (response.status === 200) {
        const data = response.data as RespiosneGet;

        if (data?.tillList?.length > 0) {
          setTillList(data.tillList);

          // Auto select first till
          setSelectedTill(data.tillList[0].tillID);
          getProduct(data.tillList[0].tillID);
        } else {
          setTillList([]);
        }
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

  const fetchDataItem = (ID: string) => {
    setShowInvoiceItem(true);
    const data = SaleList.find((item) => item.saleID === ID);
    if (data) {
      setSaleListItem(data.itemList);
    }
  };
  // const fetchDataForModify = (saleID: string) => {
  //   const data = SaleList.find((item) => item.saleID === saleID);
  //   if (data) {
  //     setCustomerName(data.customer);
  //     setSaleDate(data.saleDate);
  //     setItems(data.itemList);
  //   }
  // };
  const fetchDataAgainFroRecipt = (ID: string) => {
    const sale = SaleList.find((item) => item.saleID === ID);
    if (!sale) return;

    console.log(sale);
    pdfRecipt(sale);
  };

  useEffect(() => {
    const getItemTotal = (item: any) => {
      const totalWithoutDiscount = item.qty * item.price;
      const discountAmount = (item.price * item.discount) / 100; // discount only once
      return totalWithoutDiscount - discountAmount;
    };
    const totalSum = items.reduce(
      (total, item) => total + getItemTotal(item),
      0,
    );
    setAmountPaid(totalSum);
  }, [items]);

  const getItemTotal = (item: any) => {
    const totalWithoutDiscount = item.qty * item.price;
    const discountAmount = (item.price * item.discount) / 100; // discount only once
    return totalWithoutDiscount - discountAmount;
  };

  const totalSum = items.reduce((total, item) => total + getItemTotal(item), 0);

  useEffect(() => {
    setTimeout(() => {
      if (ShowMessage) {
        setRersponseBack("");
        setShowMessage(false);
      }
    }, 2000);
  }, [ShowMessage, RescponseBack]);

  useEffect(() => {
    const date = new Date().toISOString().split("T")[0];
    setSaleDate(date);
    saleGet();
    CustomerGet();
    storesget();
    getTill();
    fetchSalesman();
  }, []);

const fetchSalesman = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const response = await GetSalesman(String(token));

    if (response.status === 200 || response.status === 201) {
      // Cast the unknown data to your specific interface
      const data = response.data as SalesmanApiResponse; 
      
      setSalesmanList(data.salesmanList || []);
    }
  } catch (error) {
    console.error("Error fetching salesman list", error);
  }
};
  return (
    <div className="w-full relative">
      <h2 className="text-2xl font-semibold text-gray-800">Sale Management</h2>
      {showInvoioceItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl ">
            <div className="flex w-full justify-end">
              <button onClick={() => setShowInvoiceItem(false)}>
                <X className="text-gray-500 hover:text-red-500" />
              </button>
            </div>
            {/* Header */}
            <h2 className="text-xl font-semibold text-gray-800">
              Invoice Items
            </h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full border-collapse bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      #
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Barcode
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Product Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Variant
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Unit Price
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {SaleListItem.length > 0 ? (
                    SaleListItem.map((item, index) => (
                      <tr
                        key={item.attributeID}
                        className={`${item.qty <= 0 && "bg-red-500 text-white hover:bg-red-600"} hover:bg-gray-5 transition`}
                      >
                        <td className="px-1 py-1 text-sm ">{index + 1}</td>
                        <td className="px-1 py-1 text-sm ">{item.barcode}</td>
                        <td className="px-1 py-1 text-sm ">
                          {item.productName}
                        </td>
                        <td className="px-1 py-1 text-sm text-right font-medium">
                          {item.varinet}
                        </td>
                        <td className="px-1 py-1 text-sm ">{item.qty}</td>
                        <td className="px-1 py-1 text-sm text-right font-medium">
                          {item.price}
                        </td>
                        <td className="px-1 py-1 text-sm text-right font-medium">
                          {item.qty * item.price}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-6 text-center text-sm text-gray-500"
                      >
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
                {Loading1 ? "Saving..." : "Save"}
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
                            {CustomerList.find(
                              (item2) => item2.customerID === item.customer,
                            )?.customerName || item.customer}
                          </h3>
                          <p className="text-gray-600">
                            <span className="text-gray-600 font-bold">
                              Invoice No:
                            </span>{" "}
                            {item.invoiceNo}
                          </p>
                          <p className="text-gray-600">
                            <span className="text-gray-600 font-bold">
                              Sale Date:
                            </span>{" "}
                            {item.saleDate.split("T")[0]}
                          </p>

                          <div className="flex gap-2">
                            <p className="text-gray-600">
                              <span className="text-gray-600 font-bold">
                                {" "}
                                Total Bill:
                              </span>{" "}
                              {item.totalBill}
                            </p>
                            <p className="text-gray-600">
                              <span className="text-gray-600 font-bold">
                                Adjustment:{" "}
                              </span>
                              {item.adjustment}
                            </p>
                            <p className="text-gray-600">
                              <span className="text-gray-600 font-bold">
                                Amount Paid:
                              </span>{" "}
                              {item.amountPaid}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          {item.itemList.length > 0 ? (
                            <button
                              onClick={() => fetchDataItem(item.saleID)}
                              className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 transition"
                              title="Edit"
                            >
                              <List className="w-5 h-5" />
                            </button>
                          ) : (
                            <button
                              // onClick={() => fetchDataItem(item.saleID)}
                              className="bg-gray-300 text-white px-3 py-2 rounded-md "
                              title="Edit"
                              disabled
                            >
                              <List className="w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              fetchDataAgainFroRecipt(item.saleID);
                            }}
                            className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 transition"
                            title="Delete"
                          >
                            {loadRecipt ? (
                              <Spinner />
                            ) : (
                              <Receipt className="w-5 h-5" />
                            )}
                          </button>
                          <button
                            // onClick={() => {
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
                      readOnly
                      placeholder="Enter PurchaseDate"
                      className="flex-1 bg-transparent outline-none text-gray-900"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <label className="block text-gray-700 font-medium mb-2">
                  Customer Name
                </label>

                <div className="flex gap-2">
                  <div className="w-full flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                    <User className="text-gray-400 mr-2" size={18} />

                    <select
                      value={Customer}
                      onChange={(e) => {
                        setDescription("");
                        const value = e.target.value;
                        setCustomer(e.target.value);
                        const data = CustomerList.find(
                          (item) => item.customerID === value,
                        );
                        if (data) {
                          setCustomerName(data.customerName);
                        }
                      }}
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
                  Till <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                  <User className="text-gray-400 mr-2" size={18} />
                  <select
                    value={selectedTill}
                    onChange={(e) => {
                      const value = e.target.value;

                      setSelectedTill(value);
                      // setProductList([]);
                      setBarcodeInput("");
                    }}
                    className="w-full bg-transparent outline-none text-gray-900 p-2"
                  >
                    <option value="">Select Till</option>

                    {TillList.length > 0 ? (
                      TillList.map((item) => (
                        <option key={item.tillID} value={item.tillID}>
                          {item.tillName}
                        </option>
                      ))
                    ) : (
                      <option>No Record Found</option>
                    )}
                  </select>
                </div>
              </div>
              {/* Customer Name */}
              <div className="w-full min-w-0">
                <label className="block text-gray-700 font-medium mb-2">
                  Product Name
                </label>

                <div className="flex items-center w-full border border-gray-200 rounded-lg bg-gray-50 px-3 py-2">
                  <Tag className="text-gray-400 mr-2" size={18} />
                  {productList.length === 0 ? (
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
                  ) : (
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
                      placeholder="Select product"
                      className="flex-1 bg-transparent outline-none text-gray-900 p-1 truncate"
                    />
                  )}
                  <datalist id="productList">
                    {productList2.map((item) => (
                      <option key={item.productID} value={item.productName} />
                    ))}
                  </datalist>
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
                    Sub Variant
                  </label>

                  <div className="flex items-center gap-2 w-full">
                    {/* Select wrapper (input look) */}
                    <div className="flex-1 border border-gray-200 rounded-lg bg-gray-50 px-3 py-2">
                      <input
                        list="productVariants"
                        value={SubVarinetName}
                        onChange={(e: any) => {
                          const value = e.target.value;
                          setSubVarinetName(value);
                          const data = AttributeList.find(
                            (item) => item.varientValue === value,
                          );
                          if (data) {
                            setSearchByProduct(data.attributeID);
                          }
                        }}
                        placeholder="Select Sub Variant"
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
                        setProductName("");
                        fetchData(SearchByProduct);
                        setSearchByProduct("");
                        setVarientsList([]);
                        setAttributeList([]);
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
                  {items.map((item, index) => (
                    <>
                      <tr
                        key={item.attributeID}
                        className={`border-t ${
                          item.qty <= item.stockQty
                            ? `hover:bg-gray-50`
                            : `bg-red-500 text-white hover:bg-red-600`
                        }  transition`}
                      >
                        <td className="px-4 py-2">{item.barcode}</td>
                        <td className="px-4 py-2 text-sm">
                          {item.productName}
                        </td>
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
                        <td className="px-4 py-2 text-center">
                          {item.discount}%
                        </td>
                        <td
                          className={`px-4 py-2 text-center text-gray-800 font-medium ${
                            item.qty <= item.stockQty
                              ? `text-black`
                              : `text-white`
                          }`}
                        >
                          {(
                            Number(item.qty || 0) * item.price -
                            (item.price * item.discount) / 100
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
                    </>
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
                                (vv) => vv.barcode === value,
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
                            newItem.varinet &&
                            newItem.stockQty
                          ) {
                            setItems([...items, newItem]);
                            setNewItem({
                              attributeID: "",
                              productName: "",
                              qty: 0,
                              price: 0,
                              barcode: "",
                              varinet: "",
                              stockQty: 0,
                              discount: 0,
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

            {/* Description */}
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



{/* --- NEW SALESMAN DROPDOWN --- */}
<div className="w-full mt-4">
  <label className="block text-gray-700 font-medium mb-2">
    Salesman <span className="text-red-500">*</span>
  </label>
  <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
    <User className="text-gray-400 mr-2" size={18} />
    <select
      value={selectedSalesman}
      onChange={(e) => setSelectedSalesman(e.target.value)}
      className="w-full bg-transparent outline-none text-gray-900 p-2"
    >
      <option value="">Select Salesman</option>
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
        )}
      </div>
    </div>
  );
}
