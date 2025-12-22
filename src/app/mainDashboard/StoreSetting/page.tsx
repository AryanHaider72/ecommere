import GetInitalStore from "@/api/authentication/StoreGet";
import StoreHomePageGetSetting from "@/api/lib/store/DefaultStoreSetting/DefaultHomeStoreGet";
import StoreHomePageSetting from "@/api/lib/store/DefaultStoreSetting/DefaultStore";
import { SendDataToApi } from "@/api/OtherController/router";
import {
  StoreHomeGet,
  StoreHomeSettingGetApiResponse,
} from "@/api/types/Store/StoreHomePageSetting/StoreHomePageSettingGet";
import { StoreApiResponse, storeInital } from "@/api/types/storeGet";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type ImageItem = {
  file: File;
  url: string;
};
type List = {
  imageUrl: string;
};
export default function HomePageSetting() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("list");

  const [storeList, setStoreList] = useState<storeInital[]>([]);
  const [DefautlStore, setDefaultStore] = useState("");
  const [DefaultStoreID, setDefaultStoreID] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [ImageListUrls, setImageListUrls] = useState<List[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [HeaderText, setHeadertext] = useState("");
  const [SubHeadertext, setSubHeadertext] = useState("");

  const [images, setImages] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const [DefaultStoreProductList, setDefaultStoreProductList] = useState<
    StoreHomeGet[]
  >([]);

  const [imageslist, setImagesList] = useState<ImageItem[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const storesget = async () => {
    const token = localStorage.getItem("token");
    const response = await GetInitalStore(String(token));
    if (response.status === 200 || response.status === 201) {
      const data = response.data as StoreApiResponse;
      const findData = data.storeList.find(
        (item) => item.defaultStore === true
      );
      if (findData) {
        setDefaultStore(findData.storeName);
        setDefaultStoreID(findData.storeID);
        HandleDefaultStoreGet(findData.storeID);
      }

      setStoreList(data.storeList);
    }
  };
  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/sellerLogin");
      } else {
        let uploadedLogoUrl = logoUrl;

        if (logoFile) {
          const result = await SendDataToApi(logoFile as unknown as File);
          if (result.data) {
            uploadedLogoUrl = result.data.secure_url; // use local variable
            console.log("logo Upload", uploadedLogoUrl);
          } else {
            console.log("Logo upload failed:", result.error);
          }
        }

        const uploadedUrls: List[] = [];
        if (imageslist && imageslist.length > 0) {
          await Promise.all(
            imageslist.map(async (fileItem) => {
              const res = await SendDataToApi(fileItem.file);
              if (res && res.data && res.data.secure_url) {
                uploadedUrls.push({ imageUrl: res.data.secure_url });
              } else {
                alert(`Upload failed for image ${fileItem.file.name}`);
              }
            })
          );
          console.log("Banner Images:", uploadedUrls);
        }

        // Build payload using local variables, not state
        const payload = {
          logoUrl: uploadedLogoUrl,
          HeaderText: HeaderText,
          SubHeadingText: SubHeadertext,
          OtherText: "",
          imagelist: uploadedUrls,
        };

        const response = await StoreHomePageSetting(
          payload,
          DefaultStoreID,
          token
        );

        if (response.status === 200 || response.status === 201) {
          console.log("Success: ", response.data);
          setCurrentStep(1);
          setLogoFile(null);
          setLogoUrl("");
          setLogoPreview(null);
          setHeadertext("");
          setSubHeadertext("");
          setImageListUrls([]);
          setImagesList([]);
        } else {
          alert(response.message);
          console.log(response);
          console.log(payload);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const HandleDefaultStoreGet = async (ID: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/sellerlogin");
    }
    const response = await StoreHomePageGetSetting(ID, String(token));
    if (response.status === 200 || response.status === 201) {
      const data = response.data as StoreHomeSettingGetApiResponse;
      setDefaultStoreProductList(data.storeList);
    } else {
      setDefaultStoreProductList([]);
    }
  };

  const handleImageChange = (files: FileList | null) => {
    if (!files) return;

    const newImages: ImageItem[] = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImagesList((prev) => [...prev, ...newImages]);
  };

  const reorderImages = (from: number, to: number) => {
    setImages((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated;
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    handleImageChange(e.dataTransfer.files);
  };
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const deleteImage = (index: number) => {
    setImagesList((prev) => {
      const removed = prev[index];
      if (removed) {
        URL.revokeObjectURL(removed.url);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    storesget();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Store Setting</h1>
        <button
          onClick={() => {
            setMode(mode === "list" ? "form" : "list");
            // setBankName("");
            // setAccountNumber("");
            // setAccountTitle("");
            // setID("");
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          {mode === "list" ? "Add New" : "Back"}
        </button>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
        {mode === "list" && (
          <div className="space-y-4">
            {DefaultStoreProductList?.length === 0 ? (
              <div className="w-full bg-red-100 text-red-800 text-center px-4 py-3 rounded">
                No Record Found
              </div>
            ) : (
              DefaultStoreProductList?.map((item) => (
                <div
                  key={item.userID}
                  className="bg-white rounded-xl p-4 shadow flex flex-col md:flex-row justify-between gap-4 hover:shadow-lg transition"
                >
                  {/* LEFT CONTENT */}
                  <div className="flex flex-col gap-3 flex-1">
                    {/* LOGO + TEXT */}
                    <div className="flex items-start gap-4">
                      <img
                        src={item.logoUrl}
                        alt="logo"
                        className="w-14 h-14 object-contain rounded"
                      />

                      <div className="flex-1 min-w-0">
                        <h2 className="font-semibold text-gray-800 break-words line-clamp-2">
                          {item.headerText}
                        </h2>
                        <p className="text-gray-500 text-sm break-words line-clamp-3">
                          {item.subHeadingText}
                        </p>
                      </div>
                    </div>

                    {/* IMAGES */}
                    {item.imagelist?.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {item.imagelist.map((img) => (
                          <img
                            key={img.imageID}
                            src={img.imageUrl}
                            alt="banner"
                            className="w-28 h-28 object-cover rounded-md"
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex md:flex-col gap-2 self-start md:self-center">
                    <button className="px-3 py-1 text-yellow-600 border border-yellow-500 rounded hover:bg-yellow-500 hover:text-white transition">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-500 hover:text-white transition">
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {mode === "form" && (
          <>
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center">
                {/* Step 1 */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm 
              ${
                currentStep === 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-black"
              }`}
                >
                  1
                </div>
                <span
                  className={`mx-2 text-sm font-medium ${
                    currentStep === 1 ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  Basic Info
                </span>

                {/* Line to Step 2 */}
                <div
                  className={`h-1 w-10 ${
                    currentStep === 2 ? "bg-blue-600" : "bg-gray-300"
                  }`}
                ></div>

                {/* Step 2 */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm 
              ${
                currentStep === 2
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-black"
              }`}
                >
                  2
                </div>
                <span
                  className={`mx-2 text-sm font-medium ${
                    currentStep === 2 ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  Image Upload
                </span>
              </div>
            </div>
            {currentStep === 1 && (
              <div className="space-y-5">
                {/* Store Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Store Name
                  </label>
                  <input
                    type="text"
                    value={DefautlStore}
                    readOnly
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                </div>

                {/* Header Text */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Header Text
                  </label>
                  <textarea
                    value={HeaderText}
                    onChange={(e) => setHeadertext(e.target.value)}
                    rows={3}
                    placeholder="Enter header text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Sub Heading */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Sub-Heading Text
                  </label>
                  <textarea
                    value={SubHeadertext}
                    onChange={(e) => setSubHeadertext(e.target.value)}
                    rows={3}
                    placeholder="Enter sub-heading text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Store Logo
                  </label>

                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer px-4 py-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-200 hover:bg-blue-100 transition">
                      Upload Logo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                    </label>

                    <span className="text-sm text-gray-500">
                      PNG, JPG, SVG (max 2MB)
                    </span>
                  </div>
                  {logoPreview && (
                    <div className="mt-2 mb-2 ">
                      <p className="text-sm text-gray-600 mb-2">Preview:</p>
                      <div className="w-32 h-32 border rounded-lg flex items-center justify-center bg-gray-50">
                        <img
                          src={logoPreview}
                          alt="Store Logo Preview"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </div>
                  )}

                  {/* Save Button */}
                  <div className="w-full flex justify-between mt-2 ">
                    <button
                      type="button"
                      disabled
                      className="px-3 py-2 bg-gray-300  text-md  text-gray-50 rounded-md  shadow-lg hover: transition"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentStep(2)}
                      type="button"
                      className="px-3 py-2 bg-blue-500 text-white rounded-md  shadow-lg hover:bg-blue-600 transition"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <fieldset className="p-4 border border-gray-300 rounded-lg">
                <label className="block text-gray-700 font-medium mb-2">
                  Upload Images
                </label>

                <div
                  onClick={handleClick}
                  onDrop={handleDrop}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  className={`w-full p-4 border-2 border-dashed rounded-md cursor-pointer
              ${isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"}
            `}
                >
                  {imageslist.length === 0 && (
                    <p className="text-gray-500 text-sm text-center">
                      Click or drag images here to upload
                    </p>
                  )}

                  <div className="flex flex-wrap gap-4 justify-center">
                    <div className="flex flex-wrap gap-4 justify-center">
                      {imageslist.map((img, i) => (
                        <div
                          key={i}
                          draggable
                          onDragStart={() => setDragIndex(i)}
                          onDragEnter={() => setHoverIndex(i)}
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
                          className="relative w-24 h-24 rounded-md overflow-hidden"
                        >
                          <img
                            src={img.url}
                            alt={`Image ${i + 1}`}
                            className="w-full h-full object-cover pointer-events-none"
                          />

                          {/* Delete button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteImage(i);
                            }}
                            className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition"
                          >
                            ✕
                          </button>

                          <span className="absolute bottom-1 right-1 text-[10px] bg-black/60 text-white px-1 rounded">
                            {i + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageChange(e.target.files)}
                  className="hidden"
                />
                <div className="mt-2 w-full flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-3 py-2 bg-gray-300  text-md  text-black rounded-md  shadow-lg hover:bg-gray-400 transition"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handleSave()}
                    type="button"
                    className="px-3 py-2 bg-green-600 text-white rounded-md  shadow-lg hover:bg-green-700 transition"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </fieldset>
            )}
          </>
        )}
      </div>
    </div>
  );
}
