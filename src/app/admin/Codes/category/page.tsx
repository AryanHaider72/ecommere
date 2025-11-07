"use client";
import { useState, useRef } from "react";
import { Edit, Pencil, ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";

type CategoryTree = {
  [mainCategory: string]: {
    [subCategory: string]: string[];
  };
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  rating: number;
  images: string[];
};
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

const availableSizes = ["S", "M", "L", "XL", "XXL"];

export default function AccountSettings() {
  const [showAll, setShowAll] = useState(false);
  const [showlist, setShowList] = useState(false);
  const [selectedMain, setSelectedMain] = useState("");
  const [selectedSub, setSelectedSub] = useState("");
  const [selectedSubSub, setSelectedSubSub] = useState("");
  const [Quantity, setQuantity] = useState(0);
  const [sizes, setSizes] = useState<{ size: string; price: string }[]>([
    { size: "", price: "" },
  ]);
  const [samePriceForAll, setSamePriceForAll] = useState(false);
  const [commonPrice, setCommonPrice] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [newColor, setNewColor] = useState("#000000");
  const [images, setImages] = useState<(File | null)[]>([null, null, null]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [productName, setProductName] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const products: Product[] = [
    {
      id: 1,
      name: "DESIGN smart Bermuda ",
      description: "High-quality linen blend culottes perfect for summer wear.",
      price: "$599",
      rating: 5.0,
      images: ["/collection1.jpg", "/collection2.jpg", "/collection3.jpg"],
    },
    {
      id: 2,
      name: "Linen blend culottes ",
      description: "High-quality linen blend culottes perfect for summer wear.",
      price: "$499",
      rating: 4.8,
      images: ["/collection1.jpg", "/fashion_83.webp", "/collection3.jpg"],
    },
    {
      id: 3,
      name: "DESIGN smart Bermuda",
      price: "$699",
      description: "High-quality linen blend culottes perfect for summer wear.",
      rating: 4.9,
      images: ["/collection1.jpg", "/collection2.jpg", "/collection3.jpg"],
    },
    {
      id: 4,
      name: "Linen blend culottes",
      price: "$329",
      description: "High-quality linen blend culottes perfect for summer wear.",
      rating: 4.6,
      images: ["/collection1.jpg", "/collection2.jpg", "/collection3.jpg"],
    },
    {
      id: 5,
      name: "DESIGN smart Bermuda",
      price: "$799",
      description: "High-quality linen blend culottes perfect for summer wear.",
      rating: 5.0,
      images: ["/collection1.jpg", "/collection2.jpg", "/collection3.jpg"],
    },
    {
      id: 6,
      name: "Linen blend culottes",
      price: "$279",
      description: "High-quality linen blend culottes perfect for summer wear.",
      rating: 4.7,
      images: ["/collection1.jpg", "/collection2.jpg", "/collection3.jpg"],
    },
    {
      id: 7,
      name: "Linen blend culottes",
      price: "$329",
      description: "High-quality linen blend culottes perfect for summer wear.",
      rating: 4.6,
      images: ["/collection1.jpg", "/collection2.jpg", "/collection3.jpg"],
    },
    {
      id: 8,
      name: "DESIGN smart Bermuda",
      price: "$799",
      description: "High-quality linen blend culottes perfect for summer wear.",
      rating: 5.0,
      images: ["/collection1.jpg", "/collection2.jpg", "/collection3.jpg"],
    },
  ];

  const handleAddSize = () => setSizes([...sizes, { size: "", price: "" }]);
  const handleSizeChange = (
    index: number,
    field: "size" | "price",
    value: string
  ) => {
    const updated = [...sizes];
    updated[index][field] = value;
    setSizes(updated);
  };

  const handleAddColor = () => {
    if (newColor && !colors.includes(newColor)) {
      setColors([...colors, newColor]);
      setNewColor("#000000");
    }
  };
  const handleRemoveColor = (color: string) =>
    setColors(colors.filter((c) => c !== color));

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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    handleImageChange(e.dataTransfer.files);
  };

  const handleClick = () => fileInputRef.current?.click();
  const isStitched = selectedSubSub.toLowerCase().includes("stitched");

  const displayTitle = `${productName}${
    productName && productTitle ? " | " : ""
  }${productTitle}`;
  const originalAmount = parseFloat(amount) || 0;
  const discountPercent = parseFloat(discount) || 0;
  const discountedAmount = originalAmount * (1 - discountPercent / 100);

  const [selectedImages, setSelectedImages] = useState<Record<number, string>>(
    products.reduce((acc, product) => {
      acc[product.id] = product.images[0];
      return acc;
    }, {} as Record<number, string>)
  );

  const handleImageClick = (productId: number, image: string) => {
    setSelectedImages((prev) => ({
      ...prev,
      [productId]: image,
    }));
  };

  return (
    <div className="w-full px-4 md:px-8 pb-10">
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
                      Product Title
                    </label>
                    <input
                      type="text"
                      value={productTitle}
                      onChange={(e) => setProductTitle(e.target.value)}
                      placeholder="Enter product title"
                      className="w-full p-3 border border-gray-200 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="w-full">
                    <label className="block text-gray-700 font-medium mb-1">
                      Amount
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
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
                <div className="w-full">
                  <label className="block text-gray-700 font-medium mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={Quantity || 0}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    placeholder="Enter Quantity"
                    className="w-full p-3 border border-gray-200 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

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
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <select
                    className="w-full p-3 border border-gray-300 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500"
                    value={selectedMain}
                    onChange={(e) => {
                      setSelectedMain(e.target.value);
                      setSelectedSub("");
                      setSelectedSubSub("");
                    }}
                  >
                    <option value="">Select Main Category</option>
                    {Object.keys(categoryData).map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Gender */}
                {selectedMain && (
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <select
                      className="w-full p-3 border border-gray-200 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500"
                      value={selectedSub}
                      onChange={(e) => {
                        setSelectedSub(e.target.value);
                        setSelectedSubSub("");
                      }}
                    >
                      <option value="">Select Gender</option>
                      {Object.keys(categoryData[selectedMain]).map((sub) => (
                        <option key={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Type */}
                {selectedSub && (
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <select
                      className="w-full p-3 border border-gray-200 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500"
                      value={selectedSubSub}
                      onChange={(e) => setSelectedSubSub(e.target.value)}
                    >
                      <option value="">Select Type</option>
                      {categoryData[selectedMain][selectedSub].map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Sizes */}
                {selectedSubSub && (
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                      Sizes
                    </label>
                    <label className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={samePriceForAll}
                        onChange={(e) => {
                          setSamePriceForAll(e.target.checked);
                          setShowAll(true);
                        }}
                        className="mr-2"
                      />
                      Same price for all sizes
                    </label>

                    {samePriceForAll ? (
                      <input
                        type="number"
                        placeholder="Enter common price"
                        value={commonPrice}
                        onChange={(e) => setCommonPrice(e.target.value)}
                        className="w-full p-3 border border-gray-200 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <>
                        {sizes.map((s, i) => (
                          <div
                            key={i}
                            className="flex flex-col md:flex-row gap-4 mb-2"
                          >
                            <select
                              value={s.size}
                              onChange={(e) =>
                                handleSizeChange(i, "size", e.target.value)
                              }
                              className="w-full p-3 border border-gray-200 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Select Size</option>
                              {availableSizes.map((size) => (
                                <option key={size}>{size}</option>
                              ))}
                            </select>
                            <input
                              type="number"
                              placeholder="Price for this size"
                              value={s.price}
                              onChange={(e) =>
                                handleSizeChange(i, "price", e.target.value)
                              }
                              className="w-full p-3 border border-gray-200 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={handleAddSize}
                          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          + Add Another Size
                        </button>
                      </>
                    )}
                  </div>
                )}

                {/* Colors */}
                {isStitched && (
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                      Colors
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <input
                        type="color"
                        value={newColor}
                        onChange={(e) => setNewColor(e.target.value)}
                        className="w-16 h-10 border border-gray-200 shadow-sm rounded-md"
                      />
                      <button
                        type="button"
                        onClick={handleAddColor}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        + Add Color
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((color) => (
                        <span
                          key={color}
                          className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
                        >
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: color }}
                          ></div>
                          <button
                            onClick={() => handleRemoveColor(color)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Upload */}
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
                    className={`w-full p-4 border-2 border-dashed rounded-md cursor-pointer text-center ${
                      isDragOver
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                  >
                    {images.some((img) => img) ? (
                      <div className="flex flex-wrap gap-2 justify-center">
                        {images.map((img, i) =>
                          img ? (
                            <img
                              key={i}
                              src={URL.createObjectURL(img)}
                              alt={`Img ${i}`}
                              className="w-20 h-20 object-cover rounded-md"
                            />
                          ) : (
                            <div
                              key={i}
                              className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500"
                            >
                              Empty
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-500">
                        Drop or click to upload
                      </span>
                    )}
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

              <button className="w-full py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-900">
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
              {Number(Quantity) > 0 ? (
                <p className=" px-2 py-1 text-sm bg-green-200 text-green-500 text-center rounded-md">
                  Available in Stock
                </p>
              ) : (
                <p className=" px-2 py-1 text-sm bg-red-200 text-red-500 text-center rounded-md">
                  Out of Stock
                </p>
              )}
              <p className="text-gray-500 text-sm text-center">{description}</p>

              {/* Sizes */}
              {(samePriceForAll || sizes.some((s) => s.size)) && (
                <div className="flex flex-wrap gap-1 mt-2 justify-center">
                  {(samePriceForAll
                    ? availableSizes
                    : sizes.filter((s) => s.size).map((s) => s.size)
                  ).map((size, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-black text-xs text-white rounded-full"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              )}

              {/* Colors */}
              {colors.length > 0 && (
                <div className="flex gap-1 mt-2 justify-center">
                  {colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              )}

              {/* Price */}
              <div className="mt-2 text-center">
                {discountPercent > 0 ? (
                  <>
                    <span className="font-bold text-gray-900">
                      ${discountedAmount.toFixed(2)}
                    </span>
                    <span className="ml-2 text-gray-400 text-sm line-through">
                      ${originalAmount.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <p className="text-gray-700 font-semibold">
                    ${originalAmount.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full bg-white p-6 rounded-xl shadow-lg">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Product List
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.length === 0 ? (
                <div className="text-center text-gray-500 w-full py-10 border rounded-lg">
                  No products added yet.
                </div>
              ) : (
                products.map((item) => (
                  <div
                    key={item.id}
                    className="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-sm transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg"
                  >
                    {/* Main Image */}
                    <div className="relative w-full h-120 overflow-hidden rounded-t-lg group">
                      <Image
                        src={selectedImages[item.id]}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Thumbnails */}
                    <div className="flex justify-center gap-2 mt-3 px-3">
                      {item.images.map((img, idx) => (
                        <div
                          key={idx}
                          className={`relative w-12 h-12 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                            selectedImages[item.id] === img
                              ? "border-yellow-500"
                              : "border-transparent"
                          }`}
                          onClick={() => handleImageClick(item.id, img)}
                        >
                          <Image
                            src={img}
                            alt="Thumbnail"
                            fill
                            className="object-cover hover:opacity-80 transition-opacity"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Product Info */}
                    <div className="px-5 pb-5">
                      <h5 className="text-xl font-semibold tracking-tight mt-3 text-gray-900">
                        {item.name}
                      </h5>
                      <span className="text-gray-500 text-sm mt-1 mb-1 block">
                        {item.description}
                      </span>

                      <div className="flex justify-between items-center mt-3">
                        <div className="flex gap-2 items-center">
                          <span className="text-md font-bold text-gray-900">
                            {item.price}
                          </span>
                          <del className="text-gray-400 text-sm">
                            {Number(300) - 50}
                          </del>
                        </div>

                        <div className="flex gap-2 items-center">
                          <button
                            className="p-2 bg-yellow-400 hover:bg-yellow-500 rounded-md text-white"
                            title="Edit"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            className="p-2 bg-red-500 hover:bg-red-600 rounded-md text-white"
                            title="Delete"
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
