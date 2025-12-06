"use client";
import { useState, useRef, useEffect } from "react";
import { Edit, Pencil, Plus, ShoppingBag, Trash, X } from "lucide-react";
import convertImageToWebPWithWatermark from "@/api/OtherController/webConverter";
import { SendDataToApi } from "@/api/OtherController/router";
import {
  CategoryMain,
  CategoryMainApiResponse,
} from "@/api/types/categoryTypes/CategoryMain";
import GetCategoryMain from "@/api/lib/category/CategorySeller/CategoryMain";
import { useRouter } from "next/navigation";
import {
  CategorySub,
  CategorySubApiResponse,
} from "@/api/types/categoryTypes/CategorySub";
import GetCountry from "@/api/lib/country/countryList/countryListGet";
import {
  Countryget,
  CountrygetApiResponse,
} from "@/api/types/country/countryget";
import GetCategorySub from "@/api/lib/category/getCategorySub/categorySubGet";
import GetFurtherSub from "@/api/lib/subCategory/GetSub/getSub";
import {
  FurtherSub,
  FurtherSubApiResponse,
} from "@/api/types/subCategory/getSub";
import GetUnitByID from "@/api/lib/unit/unitGetByID/unitGetByID";
import { UnitIDApiResponse, UnitListID } from "@/api/types/unit/unitsGetByID";

type CategoryTree = {
  [mainCategory: string]: {
    [subCategory: string]: string[];
  };
};

interface ImagesList {
  listImage: urlTypes[];
}
type urlTypes = {
  url: string;
};

interface Varient {
  varientName: string;
  varientAttributes: VarientAttribute[];
}
interface VarientAttribute {
  varientValue: string;
  qty: number;
  amount: number;
}

interface CountryList {
  countryID: string;
  countryName: string;
}

const categoryData: CategoryTree = {
  "Fashion & Apparel": {
    "Men’s Clothing": [
      "Tops",
      "Bottoms",
      "Outerwear",
      "Suits & Formal Wear",
      "Stitched Clothes",
      "Unstitched Clothes",
    ],
    "Women’s Clothing": [
      "Tops",
      "Bottoms",
      "Dresses & Jumpsuits",
      "Outerwear",
      "Lingerie & Hosiery",
      "Stitched Clothes",
      "Unstitched Clothes",
    ],
    "Kids’ Clothing": [
      "Tops",
      "Bottoms",
      "Outerwear",
      "Sleepwear",
      "Stitched Clothes",
      "Unstitched Clothes",
    ],
  },
};

export default function ProductControll({ storeID }: { storeID: string }) {
  const router = useRouter();
  const [showlist, setShowList] = useState(false);
  const [selectedMain, setSelectedMain] = useState("");
  const [selectedSub, setSelectedSub] = useState("");
  const [selectedOption, setSelectedOption] = useState("ShowinAllCountry");
  const [selectedOption2, setSelectedOption2] = useState("OnlineStore");

  const [selectedSubSub, setSelectedSubSub] = useState("");
  const [Quantity, setQuantity] = useState(0);

  const [images, setImages] = useState<(File | null)[]>([null, null, null]);
  const [listImages, setListImages] = useState<ImagesList>({ listImage: [] });

  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [productName, setProductName] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const [CategoryMainID, setCategoryMainID] = useState("");
  const [CategorySubID, setCategorySubID] = useState("");
  const [FurtherCategorySubID, setFurtherCategorySubID] = useState("");
  const [UnitID, setUnitID] = useState("");
  const [catgeoryMainList, setCatgeoryMainList] = useState<CategoryMain[]>([]);
  const [catgeorySubList, setCatgeorySubList] = useState<CategorySub[]>([]);
  const [FurtherSubList, setFurtherSubList] = useState<FurtherSub[]>([]);
  const [UnitList, setUnitList] = useState<UnitListID[]>([]);

  const [Width, setWidth] = useState("");
  const [Height, setHeight] = useState("");
  const [Depth, setDepth] = useState("");
  const [Weight, setWeight] = useState("");
  const [TotalQuantity, setTotalQuantity] = useState("");

  const [countryHideList, setCountryHideList] = useState<CountryList[]>([]);
  const [countryShowLis, setCountryShowList] = useState<CountryList[]>([]);
  const [HideCountryID, setHideCountryID] = useState("");
  const [DisplayCountryID, setDisplayCountryID] = useState("");
  const [DisplayCountryName, setDisplayCountryName] = useState("");
  const [HideCountryName, setHideCountryName] = useState("");

  const [listofCountry, setListofCountry] = useState<Countryget[]>([]);

  //VARIENT States
  const [listVarient, setListVarient] = useState<Varient[]>([]);
  const [mainVarientName, setMainVarientName] = useState("");
  const [currentAttributes, setCurrentAttributes] = useState<
    VarientAttribute[]
  >([]);
  const [newAttribute, setNewAttribute] = useState<VarientAttribute>({
    varientValue: "",
    qty: 0,
    amount: 0,
  });

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    handleImageChange(e.dataTransfer.files);
  };

  const handleClick = () => fileInputRef.current?.click();

  const displayTitle = `${productName}${
    productName && productTitle ? " | " : ""
  }${productTitle}`;

  //-----------------------------------------------Variant Function----------------------------------------------

  const handleAddMainVariant = () => {
    if (!mainVarientName.trim()) {
      alert("Please enter a Variant Name");
      return;
    }
    if (currentAttributes.length === 0) {
      alert("Please add at least one attribute");
      return;
    }

    const updatedList = [
      ...listVarient,
      {
        varientName: mainVarientName.trim(),
        varientAttributes: currentAttributes,
      },
    ];
    setListVarient(updatedList);
    // Reset inputs for next variant
    setMainVarientName("");
    setCurrentAttributes([]);
  };

  // Add new attribute row to currentAttributes
  const handleAddAttribute = () => {
    if (!newAttribute.varientValue.trim()) {
      alert("Please enter Attribute Name");
      return;
    }
    setCurrentAttributes([...currentAttributes, newAttribute]);
    setNewAttribute({ varientValue: "", qty: 0, amount: 0 });
  };

  // Update newAttribute inputs (for the input row)
  const handleNewAttributeChange = (
    field: keyof VarientAttribute,
    value: string | number
  ) => {
    setNewAttribute({ ...newAttribute, [field]: value });
  };

  // Remove an attribute from currentAttributes by index
  const handleRemoveAttribute = (index: number) => {
    setCurrentAttributes(currentAttributes.filter((_, i) => i !== index));
  };

  //-----------------------------------------------Image Function----------------------------------------------

  const handleImageChange = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      const newImages = [...images];
      let idx = 0;
      for (let file of fileArray) {
        while (idx < 3 && newImages[idx] !== null) idx++;
        if (idx < 3) {
          newImages[idx] = file;
          idx++;
        }
      }
      setImages(newImages);
    }
  };

  const reorderImages = (from: number, to: number) => {
    const updated = [...images];
    const moved = updated.splice(from, 1)[0];
    updated.splice(to, 0, moved);
    setImages(updated);
  };
  const handleUploadAll = async () => {
    // Filter out null images
    const filesToUpload = images.filter((img): img is File => img !== null);

    if (filesToUpload.length === 0) {
      alert("No images to upload");
      return;
    }

    // Use the previously suggested function for uploading multiple images
    const uploadedUrls = await sendMultipleImages(filesToUpload);
    console.log("Uploaded URLs before setState:", uploadedUrls);
    if (uploadedUrls) {
      setListImages((prevState) => ({
        listImage: [
          ...prevState.listImage,
          ...uploadedUrls.map((url) => ({ url })),
        ],
      }));
    }
    return uploadedUrls;
    // You can save these URLs in state or send to backend as needed
  };

  const sendMultipleImages = async (files: File[]) => {
    if (!files || files.length === 0) {
      alert("Please select at least one file");
      return;
    }

    const watermark = "© My Watermark";
    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Convert to WebP with watermark (your function)
      const webPBlob = await convertImageToWebPWithWatermark(file, watermark);

      if (!webPBlob) {
        alert(`Conversion failed for image ${file.name}`);
        continue;
      }

      // Upload to API
      const res = await SendDataToApi(webPBlob as unknown as File);
      if (res && res.data && res.data.secure_url) {
        uploadedUrls.push(res.data.secure_url);
      } else {
        alert(`Upload failed for image ${file.name}`);
      }
    }

    // Do something with URLs (e.g. set state or return)
    return uploadedUrls;
  };

  const handleSave = () => {
    handleUploadAll();
    console.log(listVarient);
    console.log(listImages);
  };
  //-----------------------------------------------Return----------------------------------------------

  const hanldeAddShowCountry = () => {
    // const data = countryShowLis.find((item) => item.countryID === id);
    const updatedList = [
      ...countryShowLis,
      {
        countryID: DisplayCountryID,
        countryName: DisplayCountryName,
      },
    ];
    setDisplayCountryID("");
    setCountryShowList(updatedList);
  };

  const handleRemoveShowCountry = (index: number) => {
    setCountryShowList(countryShowLis.filter((_, i) => i !== index));
  };

  const hanldeAddHideCountry = () => {
    // const data = countryShowLis.find((item) => item.countryID === id);
    const updatedList = [
      ...countryHideList,
      {
        countryID: HideCountryID,
        countryName: HideCountryName,
      },
    ];
    setHideCountryID("");
    setCountryHideList(updatedList);
  };

  const handleRemoveHideCountry = (index: number) => {
    setCountryHideList(countryHideList.filter((_, i) => i !== index));
  };

  const totalQuantity = listVarient.reduce((total, variant) => {
    return (
      total + variant.varientAttributes.reduce((sum, attr) => sum + attr.qty, 0)
    );
  }, 0);

  const discountedAmount =
    Number(amount) - (Number(amount) * Number(discount)) / 100;

  const getCategroyMain = async () => {
    const token = localStorage.getItem("token");
    const response = await GetCategoryMain(String(token));

    if (response.status === 200 || response.status === 201) {
      const data = response.data as CategoryMainApiResponse;
      setCatgeoryMainList(data.categoryList);
      getCategorySub(data.categoryList[0].categoryID);
      setCategoryMainID(data.categoryList[0].categoryID);
    }
    if (response.status === 401) {
      router.push("/sellerlogin");
    }
  };

  const getCountry = async () => {
    const token = localStorage.getItem("token");
    const response = await GetCountry(String(token));
    if (response.status === 201 || response.status === 200) {
      console.log(response.data);
      const data = response.data as CountrygetApiResponse;
      setListofCountry(data.countryList);
    } else if (response.status === 401) return router.push("/sellerogin");
  };

  const getCategorySub = async (ID: string) => {
    const formData = {
      categoryID: ID,
      storeID: storeID,
    };
    const token = localStorage.getItem("token");
    const response = await GetCategorySub(String(token), formData);
    if (response.status === 200 || response.status === 201) {
      const data = response.data as CategorySubApiResponse;
      console.log(data.categoryList);
      setCatgeorySubList(data.categoryList);
      setCategorySubID(data.categoryList[0].subCategoryID);
      getFurtherSub(data.categoryList[0].subCategoryID);
    } else if (response.status === 401) {
      router.push("/sellerlogin");
    }
  };
  const getFurtherSub = async (ID: string) => {
    const token = localStorage.getItem("token");
    const formData = {
      subCategoryID: ID,
      storeID: storeID,
    };
    const response = await GetFurtherSub(String(token), formData);
    if (response.status === 200 || response.status === 201) {
      const data = response.data as FurtherSubApiResponse;

      // Make sure every item has units array
      const safeList = data.categoryList.map((item) => ({
        ...item,
        units: Array.isArray(item.unit) ? item.unit : [],
      }));
      console.log(data.categoryList);
      setFurtherSubList(safeList);
      setFurtherCategorySubID(data.categoryList[0].subCategoryDetailID);
      getUnits(data.categoryList[0].subCategoryDetailID);
    } else if (response.status === 401) {
      router.push("/sellerlogin");
    }
  };
  const getUnits = async (ID: string) => {
    const token = localStorage.getItem("token");
    const formData = {
      subCategoryDetailID: ID,
      storeID: storeID,
    };
    const response = await GetUnitByID(String(token), formData);
    if (response.status === 200 || response.status === 201) {
      const data = response.data as UnitIDApiResponse;
      setUnitList(data.unitsList);
      setUnitID(data.unitsList[0].unitID);
    } else if (response.status === 401) {
      router.push("/sellerlogin");
    }
  };
  //ProductAdd
  const productAdd = async () => {
    const payload = {
      storeID: storeID,
      categoryID: CategoryMainID,
      subCategoryID: CategorySubID,
      subCategoryDetailID: FurtherCategorySubID,
      unitID: UnitID,
      currentStock: totalQuantity,
      ...(selectedOption === "ShowinAllCountry" && {
        showinAllCountry: true,
        showinCountry: false,
        notShowinCountry: false,
      }),
      ...(selectedOption === "ShowinSomeCountry" && {
        showinAllCountry: false,
        showinCountry: true,
        notShowinCountry: false,
      }),
      ...(selectedOption === "ShowinSomeCountry" && {
        lisCountry: {
          countryShowLis,
        },
      }),
      ...(selectedOption === "HideinSomeCountry" && {
        showinAllCountry: false,
        showinCountry: false,
        notShowinCountry: true,
      }),
      ...(selectedOption === "HideinSomeCountry" && {
        lisCountry: {
          countryHideList,
        },
      }),
    };
  };

  useEffect(() => {
    getCategroyMain();
    getCountry();
  }, []);

  return (
    <div className="w-full px-4 md:px-8 pb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <ShoppingBag className="w-7 h-7 text-indigo-600" /> Category
        </h1>
        {showlist ? (
          <button
            className="px-4 py-2 bg-blue-600 rounded-md text-white mb-3"
            onClick={() => setShowList(false)}
          >
            Show list
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-blue-600 rounded-md text-white mb-3"
            onClick={() => setShowList(true)}
          >
            Add New
          </button>
        )}
      </div>
      {/* Responsive layout */}
      {showlist ? (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* === Form Section === */}
          <div className="w-full lg:w-4/5 bg-white p-6 rounded-xl shadow-lg">
            <div className="space-y-6">
              {/* === Product Info === */}
              <fieldset className="p-4 border border-gray-300 rounded-lg">
                <legend className="text-lg font-semibold text-gray-800 px-2">
                  Product Info
                </legend>

                <div className="p-3 rounded-xl max-w-md">
                  <h2 className="text-md text-gray-800 mb-4">Store Sale</h2>

                  <div className="flex flex-wrap  gap-4 ">
                    {/* Option 1 */}
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="StoreSale"
                        value="Both"
                        checked={selectedOption2 === "Both"}
                        onChange={(e) => setSelectedOption2(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700 text-sm font-medium">
                        Both
                      </span>
                    </label>

                    {/* Option 2 */}
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="StoreSale"
                        value="OnlineStore"
                        checked={selectedOption2 === "OnlineStore"}
                        onChange={(e) => setSelectedOption2(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700 text-sm font-medium">
                        Online Store
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="StoreSale"
                        value="OfflineStore"
                        checked={selectedOption2 === "OfflineStore"}
                        onChange={(e) => setSelectedOption2(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700 text-sm font-medium">
                        Offline Store
                      </span>
                    </label>
                  </div>
                </div>

                {/* Row 1 */}
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="w-full">
                    <label className="block text-gray-700 font-medium mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="Enter product name"
                      className="w-full p-3 border border-gray-200 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-gray-700 font-medium mb-1">
                      Discount
                    </label>
                    <input
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      placeholder="Enter discount (%)"
                      className="w-full p-3 border border-gray-200 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="w-full">
                    <label className="block text-gray-700 font-medium mb-1">
                      Total Quantity
                    </label>
                    <input
                      type="text"
                      value={TotalQuantity}
                      onChange={(e) => setTotalQuantity(e.target.value)}
                      placeholder="Enter Qunatity"
                      className="w-full p-3 border border-gray-200 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {/* {selectedOption2 === "OfflineStore" && (
                    <div className="w-full">
                      <label className="block text-gray-700 font-medium mb-1">
                        Amount
                      </label>
                      <input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        placeholder="Enter Amount"
                        className="w-full p-3 border border-gray-200 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )} */}
                </div>
                {(selectedOption2 === "Both" ||
                  selectedOption2 === "OnlineStore") && (
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="w-full">
                      <label className="block text-gray-700 font-medium mb-1">
                        Width
                      </label>
                      <input
                        type="text"
                        value={Width}
                        onChange={(e) => setWidth(e.target.value)}
                        placeholder="Enter Width"
                        className="w-full p-3 border border-gray-200 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="w-full">
                      <label className="block text-gray-700 font-medium mb-1">
                        Height
                      </label>
                      <input
                        type="number"
                        value={Height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="Enter Height "
                        className="w-full p-3 border border-gray-200 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="w-full">
                      <label className="block text-gray-700 font-medium mb-1">
                        Depth
                      </label>
                      <input
                        value={Depth}
                        onChange={(e) => setDepth(e.target.value)}
                        type="number"
                        placeholder="Enter Depth "
                        className="w-full p-3 border border-gray-200 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="w-full">
                      <label className="block text-gray-700 font-medium mb-1">
                        Weight
                      </label>
                      <input
                        value={Weight}
                        onChange={(e) => setWeight(e.target.value)}
                        type="number"
                        placeholder="Enter Weight "
                        className="w-full p-3 border border-gray-200 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
                {(selectedOption2 === "Both" ||
                  selectedOption2 === "OnlineStore") && (
                  <div className="p-3 rounded-xl max-w-md">
                    <h2 className="text-md text-gray-800 mb-4">
                      Show in Country
                    </h2>

                    <div className="flex flex-wrap flex-col gap-4 ">
                      {/* Option 1 */}
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="ShowinCountry"
                          value="ShowinAllCountry"
                          checked={selectedOption === "ShowinAllCountry"}
                          onChange={(e) => setSelectedOption(e.target.value)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                          onClick={() => {
                            setCountryHideList([]);
                            setCountryShowList([]);
                          }}
                        />

                        <span className="ml-2 text-gray-700 text-sm font-medium">
                          Show in All Country
                        </span>
                      </label>

                      {/* Option 2 */}
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="ShowinCountry"
                          value="ShowinSomeCountry"
                          checked={selectedOption === "ShowinSomeCountry"}
                          onChange={(e) => setSelectedOption(e.target.value)}
                          onClick={() => setCountryHideList([])}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700 text-sm font-medium">
                          Show in Some Country
                        </span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="ShowinCountry"
                          value="HideinSomeCountry"
                          checked={selectedOption === "HideinSomeCountry"}
                          onChange={(e) => setSelectedOption(e.target.value)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                          onClick={() => setCountryShowList([])}
                        />
                        <span className="ml-2 text-gray-700 text-sm font-medium">
                          Hide in Some Country
                        </span>
                      </label>
                    </div>
                  </div>
                )}
                {selectedOption === "ShowinSomeCountry" && (
                  <>
                    <div className=" gap-4 mb-4">
                      <label className=" mt-2 block text-gray-700 font-medium mb-1">
                        Display Country
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={DisplayCountryID}
                          onChange={(e) => {
                            const id = e.target.value;
                            setDisplayCountryID(id);
                            const data = listofCountry.find(
                              (item) => item.countryID === id
                            );
                            if (data) {
                              setDisplayCountryName(data.countryName);
                            }
                          }}
                          className="w-full p-3 border border-gray-300 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Country</option>
                          {listofCountry.map((item) => (
                            <option key={item.countryID} value={item.countryID}>
                              {item.countryName}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => hanldeAddShowCountry()}
                          className="text-white rounded-md px-2 bg-yellow-500 hover:bg-yellow-600"
                        >
                          <Plus />
                        </button>
                      </div>
                    </div>
                    {countryShowLis.map((item, index) => (
                      <div
                        key={index}
                        className="inline-flex mx-2  mt-1 items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-300 shadow-sm"
                      >
                        <span>{item.countryName}</span>
                        <X
                          size={16}
                          className="cursor-pointer hover:text-red-500 transition"
                          onClick={() => handleRemoveShowCountry(index)}
                        />
                      </div>
                    ))}
                  </>
                )}
                {selectedOption === "HideinSomeCountry" && (
                  <>
                    <div className=" gap-4 mb-4">
                      <label className=" mt-2 block text-gray-700 font-medium mb-1">
                        Hide Country
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={HideCountryID}
                          onChange={(e) => {
                            const id = e.target.value;
                            setHideCountryID(id);
                            const data = listofCountry.find(
                              (item) => item.countryID === id
                            );
                            if (data) {
                              setHideCountryName(data.countryName);
                            }
                          }}
                          className="w-full p-3 border border-gray-300 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Country</option>
                          {listofCountry.map((item) => (
                            <option key={item.countryID} value={item.countryID}>
                              {item.countryName}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={hanldeAddHideCountry}
                          className="text-white rounded-md px-2 bg-yellow-500 hover:bg-yellow-600"
                        >
                          <Plus />
                        </button>
                      </div>
                    </div>
                    {countryHideList.map((item, index) => (
                      <div
                        key={index}
                        className="inline-flex mx-2  mt-1 items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-300 shadow-sm"
                      >
                        <span>{item.countryName}</span>
                        <X
                          size={16}
                          className="cursor-pointer hover:text-red-500 transition"
                          onClick={() => handleRemoveHideCountry(index)}
                        />
                      </div>
                    ))}
                  </>
                )}

                {/* Description */}
                <div>
                  <label className=" mt-2 block text-gray-700 font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter product description"
                    className="w-full p-3 border border-gray-200 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </fieldset>

              {/* === Category Info === */}
              <fieldset className="p-4 border border-gray-300 rounded-lg">
                <legend className="text-lg font-semibold text-gray-800 px-2">
                  Category Info
                </legend>

                {/* Main Category */}
                <div className=" md:flex-row gap-4 mb-4">
                  <label className="block text-gray-700 font-medium mb-1">
                    Main Category
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500"
                    value={selectedMain}
                    onChange={(e) => {
                      setCategoryMainID(e.target.value);
                      getCategorySub(e.target.value);
                    }}
                  >
                    {catgeorySubList.length !== 0 ? (
                      <>
                        {catgeoryMainList.map((item) => (
                          <option
                            key={item.categoryID}
                            value={item.categoryID}
                            className="p-2"
                          >
                            {item.categoryName}
                          </option>
                        ))}
                      </>
                    ) : (
                      <option> No Record Found</option>
                    )}
                  </select>
                </div>

                {CategoryMainID && (
                  <div className=" md:flex-row gap-4 mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                      Sub Category
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500"
                      value={CategorySubID}
                      onChange={(e) => {
                        {
                          setCategorySubID(e.target.value);
                          getFurtherSub(e.target.value);
                        }
                      }}
                    >
                      {catgeorySubList.length !== 0 ? (
                        <>
                          {catgeorySubList.map((item) => (
                            <option
                              key={item.subCategoryID}
                              value={item.subCategoryID}
                              className="p-2"
                            >
                              {item.subCategoryName}
                            </option>
                          ))}
                        </>
                      ) : (
                        <option> No Record Found</option>
                      )}
                    </select>
                  </div>
                )}
                {CategorySubID && (
                  <div className=" md:flex-row gap-4 mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                      Further Sub Category
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500"
                      value={FurtherCategorySubID}
                      onChange={(e) => {
                        setFurtherCategorySubID(e.target.value);
                        getUnits(e.target.value);
                      }}
                    >
                      {FurtherSubList.length !== 0 ? (
                        <>
                          {FurtherSubList.map((item) => (
                            <option
                              key={item.subCategoryDetailID}
                              value={item.subCategoryDetailID}
                              className="p-2"
                            >
                              {item.name}
                            </option>
                          ))}
                        </>
                      ) : (
                        <option> No Record Found</option>
                      )}
                    </select>
                  </div>
                )}
                {FurtherCategorySubID && (
                  <div className=" md:flex-row gap-4 mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                      Unit
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500"
                      value={UnitID}
                      onChange={(e) => {
                        setUnitID(e.target.value);
                      }}
                    >
                      {UnitList.length !== 0 ? (
                        <>
                          {UnitList.map((item) => (
                            <option
                              key={item.unitID}
                              value={item.unitID}
                              className="p-2"
                            >
                              {item.unitName}
                            </option>
                          ))}
                        </>
                      ) : (
                        <option> No Record Found</option>
                      )}
                    </select>
                  </div>
                )}

                {/* Image Upload */}
              </fieldset>

              <fieldset className="p-4 border border-gray-300 rounded-lg">
                <legend className="text-lg font-semibold mb-4">
                  Variant Info
                </legend>

                {/* Input for Main Variant Name and button */}
                <div className="flex gap-2 items-center mb-4">
                  <input
                    type="text"
                    placeholder="Enter Variant Name (Main)"
                    value={mainVarientName}
                    onChange={(e) => setMainVarientName(e.target.value)}
                    className="flex-grow p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddMainVariant}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Save Variant
                  </button>
                </div>

                {/* Table of current attributes (sub-variants) */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border border-gray-300 rounded">
                    <thead className="bg-gray-100 border-b border-gray-300">
                      <tr>
                        <th className="px-4 py-2">Attribute Name</th>
                        <th className="px-4 py-2">Qty</th>
                        <th className="px-4 py-2">Amount</th>
                        <th className="px-4 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Existing attributes */}
                      {currentAttributes.map((attr, i) => (
                        <tr
                          key={i}
                          className="border-b border-gray-300 odd:bg-white even:bg-gray-50"
                        >
                          <td className="px-4 py-2">{attr.varientValue}</td>
                          <td className="px-4 py-2">{attr.qty}</td>
                          <td className="px-4 py-2">{attr.amount}</td>
                          <td className="px-4 py-2">
                            <button
                              className="px-2 py-1 bg-red-600 text-white rounded"
                              onClick={() => handleRemoveAttribute(i)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}

                      {/* Row for adding new attribute */}
                      <tr>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            placeholder="Attribute Name"
                            value={newAttribute.varientValue}
                            onChange={(e) =>
                              handleNewAttributeChange(
                                "varientValue",
                                e.target.value
                              )
                            }
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="number"
                            min={0}
                            value={newAttribute.qty}
                            onChange={(e) =>
                              handleNewAttributeChange(
                                "qty",
                                parseInt(e.target.value) || 0
                              )
                            }
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="number"
                            min={0}
                            step="0.01"
                            value={newAttribute.amount}
                            onChange={(e) =>
                              handleNewAttributeChange(
                                "amount",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <button
                            onClick={handleAddAttribute}
                            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center"
                            title="Add Attribute"
                          >
                            <Plus className="mr-1" />
                            Add
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </fieldset>
              {(selectedOption2 === "OnlineStore" ||
                selectedOption2 === "Both") && (
                <fieldset className="p-4 border border-gray-300 rounded-lg">
                  <legend className="text-lg font-semibold text-gray-800 px-2">
                    Product Image
                  </legend>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                      Product Images (Max 3)
                    </label>
                    <div
                      onClick={handleClick}
                      onDrop={handleDrop}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragOver(true);
                      }}
                      onDragLeave={() => setIsDragOver(false)}
                      className={`w-full p-4 border-2 flex  justify-center gap-5 border-dashed rounded-md cursor-pointer text-center ${
                        isDragOver
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300"
                      }`}
                    >
                      {images.map((img, i) => (
                        <div
                          key={i}
                          draggable={!!img}
                          onDragStart={() => setDragIndex(i)}
                          onDragEnter={() => img && setHoverIndex(i)}
                          onDragEnd={() => {
                            if (
                              dragIndex !== null &&
                              hoverIndex !== null &&
                              dragIndex !== hoverIndex
                            ) {
                              reorderImages(dragIndex, hoverIndex);
                            }
                            setDragIndex(null);
                            setHoverIndex(null);
                          }}
                          className={`relative w-20 h-20 rounded-md flex items-center justify-center 
                      ${
                        hoverIndex === i ? "ring-2 ring-blue-500 scale-105" : ""
                      }
                      transition-all duration-150`}
                        >
                          {img ? (
                            <img
                              src={URL.createObjectURL(img)}
                              alt={`Img ${i}`}
                              className="w-full h-full object-cover rounded-md pointer-events-none"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">
                              Empty
                            </div>
                          )}

                          <span className="absolute -bottom-5 text-xs text-gray-600">
                            {i === 0 ? "Header Image" : `Image ${i + 1}`}
                          </span>
                        </div>
                      ))}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageChange(e.target.files)}
                      className="hidden"
                    />
                  </div>
                </fieldset>
              )}
              <button
                onClick={handleSave}
                className="w-full py-3 bg-indigo-500 text-white rounded-xl font-semibold shadow-lg hover:bg-indigo-600 transition-all"
              >
                Save
              </button>
            </div>
          </div>

          {/* === Preview Section === */}
          <div className="w-full lg:w-1/5 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Preview
            </h2>
            <div className="bg-gray-50 rounded-lg  flex flex-col items-center">
              {images[mainImageIndex] ? (
                <img
                  src={URL.createObjectURL(images[mainImageIndex]!)}
                  alt="Main"
                  className=" object-cover rounded-md mb-3"
                />
              ) : (
                <div className=" bg-gray-300 rounded-md mb-3"></div>
              )}
              <div className="flex gap-2 mb-3 flex-wrap justify-center">
                {images.map((img, i) =>
                  img ? (
                    <img
                      key={i}
                      src={URL.createObjectURL(img)}
                      alt={`Thumb ${i}`}
                      onClick={() => setMainImageIndex(i)}
                      className="w-12 h-12 object-cover rounded-md cursor-pointer  hover:border-blue-500"
                    />
                  ) : (
                    <div
                      key={i}
                      className="w-12 h-12 bg-gray-200 rounded-md"
                    ></div>
                  )
                )}
              </div>

              <p className="font-semibold text-gray-800 text-center">
                {displayTitle}
              </p>
              {Number(totalQuantity) > 0 ? (
                <p className=" px-2 py-1 text-sm bg-green-200 text-green-500 text-center rounded-md">
                  Available in Stock
                </p>
              ) : (
                <p className=" px-2 py-1 text-sm bg-red-200 text-red-500 text-center rounded-md">
                  Out of Stock
                </p>
              )}
              <p className="text-gray-500 text-sm text-center p-3">
                {description}
              </p>

              {/* Sizes */}

              {/* Price */}
              <div className="mt-2 text-center">
                {Number(discount) > 0 ? (
                  <>
                    <span className="font-bold text-gray-900">
                      {discountedAmount.toFixed(2)}
                    </span>
                    <span className="ml-2 text-gray-400 text-sm line-through">
                      {Number(amount).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <p className="text-gray-700 font-semibold">
                    {Number(amount).toFixed(2)}
                  </p>
                )}
              </div>
              <div>
                {listVarient.map((item, index) => (
                  <div key={index} className="mb-4">
                    <h1>{item.varientName}</h1>
                    <div className="flex gap-2 items-center">
                      {item.varientAttributes.map((attr, index) => (
                        <>
                          {attr.qty <= 0 ? (
                            <button
                              key={index}
                              onClick={() => setAmount(String(attr.amount))}
                              className="px-2 py-1 bg-gray-300 text-xs text-gray-600 rounded-full"
                              disabled
                            >
                              {attr.varientValue}
                            </button>
                          ) : (
                            <button
                              key={index}
                              onClick={() => setAmount(String(attr.amount))}
                              className="px-2 py-1 bg-black text-xs text-white rounded-full"
                            >
                              {attr.varientValue}
                            </button>
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
