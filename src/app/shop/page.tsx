"use client";
import { useState } from "react";

import {
  Trash2,
  ShoppingCart,
  Search,
  Heart,
  ChevronDown,
  CreditCard,
  Minus,
  Plus,
  ChevronRight,
  X,
} from "lucide-react";
import Image from "next/image";
import Footer from "@/component/Footer/page";
import Navbar from "@/component/Navbar/page";
import { useRouter } from "next/navigation";
const images = ["/collection1.jpg", "/collection2.jpg", "/collection3.jpg"];
type Filters = {
  gender: string;
  sizes: string[];
  colors: string[];
  categories: string[];
  materials: string[];
  priceMin: string;
  priceMax: string;
  sortBy: string;
};
const products = [
  {
    id: 1,
    name: "DESIGN smart Bermuda ",
    description: "High-quality linen blend culottes perfect for summer wear.",
    price: "$599",
    rating: 5.0,
    image: "/collection1.jpg",
  },
  {
    id: 2,
    name: "Linen blend culottes ",
    description: "High-quality linen blend culottes perfect for summer wear.",
    price: "$499",
    rating: 4.8,
    image: "/collection3.jpg",
  },
  {
    id: 3,
    name: "DESIGN smart Bermuda",
    price: "$699",
    description: "High-quality linen blend culottes perfect for summer wear.",
    rating: 4.9,
    image: "/collection2.jpg",
  },
  {
    id: 4,
    name: "Linen blend culottes",
    price: "$329",
    description: "High-quality linen blend culottes perfect for summer wear.",
    rating: 4.6,
    image: "/collection1.jpg",
  },
  {
    id: 5,
    name: "DESIGN smart Bermuda",
    price: "$799",
    description: "High-quality linen blend culottes perfect for summer wear.",
    rating: 5.0,
    image: "/collection2.jpg",
  },
  {
    id: 6,
    name: "Linen blend culottes",
    price: "$279",
    description: "High-quality linen blend culottes perfect for summer wear.",
    rating: 4.7,
    image: "/collection3.jpg",
  },
  {
    id: 7,
    name: "Linen blend culottes",
    price: "$329",
    description: "High-quality linen blend culottes perfect for summer wear.",
    rating: 4.6,
    image: "/collection1.jpg",
  },
  {
    id: 8,
    name: "DESIGN smart Bermuda",
    price: "$799",
    description: "High-quality linen blend culottes perfect for summer wear.",
    rating: 5.0,
    image: "/collection2.jpg",
  },
  {
    id: 9,
    name: "DESIGN smart Bermuda ",
    description: "High-quality linen blend culottes perfect for summer wear.",
    price: "$599",
    rating: 5.0,
    image: "/collection1.jpg",
  },
  {
    id: 10,
    name: "Linen blend culottes ",
    description: "High-quality linen blend culottes perfect for summer wear.",
    price: "$499",
    rating: 4.8,
    image: "/collection3.jpg",
  },
  {
    id: 11,
    name: "DESIGN smart Bermuda",
    price: "$699",
    description: "High-quality linen blend culottes perfect for summer wear.",
    rating: 4.9,
    image: "/collection2.jpg",
  },
  {
    id: 12,
    name: "Linen blend culottes",
    price: "$329",
    description: "High-quality linen blend culottes perfect for summer wear.",
    rating: 4.6,
    image: "/collection1.jpg",
  },
  {
    id: 13,
    name: "DESIGN smart Bermuda",
    price: "$799",
    description: "High-quality linen blend culottes perfect for summer wear.",
    rating: 5.0,
    image: "/collection2.jpg",
  },
  {
    id: 14,
    name: "Linen blend culottes",
    price: "$279",
    description: "High-quality linen blend culottes perfect for summer wear.",
    rating: 4.7,
    image: "/collection3.jpg",
  },
  {
    id: 15,
    name: "Linen blend culottes",
    price: "$329",
    description: "High-quality linen blend culottes perfect for summer wear.",
    rating: 4.6,
    image: "/collection1.jpg",
  },
  {
    id: 16,
    name: "DESIGN smart Bermuda",
    price: "$799",
    description: "High-quality linen blend culottes perfect for summer wear.",
    rating: 5.0,
    image: "/collection2.jpg",
  },
];
export default function Shop() {
  const [activePage, setActivePage] = useState("login");
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [productPage, setProductPage] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filters, setFilters] = useState<Filters>({
    gender: "",
    sizes: [],
    colors: [],
    categories: [],
    materials: [],
    priceMin: "0",
    priceMax: "5000",
    sortBy: "",
  });

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleCheckboxChange = (
    type: "sizes" | "colors" | "categories" | "materials",
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const handleRadioChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: value,
    }));
  };

  const colors = [
    "Black",
    "White",
    "Gray",
    "Blue",
    "Red",
    "Green",
    "Yellow",
    "Brown",
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "Free Size"];

  const materials = [
    "Cotton",
    "Polyester",
    "Denim",
    "Silk",
    "Linen",
    "Wool",
    "Leather",
    "Nylon",
    "Velvet",
    "Rayon",
    "Spandex",
    "Fleece",
  ];
  return (
    <>
      <>
        {/* <Navbar onPageChange={setActivePage} /> */}

        {/* MAIN CONTENT */}
        <div className="flex flex-col items-center w-full min-h-[calc(100vh-200px)] bg-gray-100 px-4 py-10">
          <h1 className="text-3xl font-bold text-gray-800 ">Shop</h1>
          <hr className="w-1/2 border-gray-300 mt-6 mb-10" />
          <div className="w-full flex gap-4 justify-center">
            <div className="bg-white w-72 p-4 max-w-md h-[calc(100vh-100px)] sticky top-20 rounded-xl shadow-md overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
              <div className="space-y-4">
                {/* === Accordion Items === */}
                {[
                  {
                    title: "Sort By",
                    index: 0,
                    content: (
                      <div className="flex flex-col gap-3">
                        {[
                          { value: "lowToHigh", label: "Price: Low to High" },
                          { value: "highToLow", label: "Price: High to Low" },
                          { value: "topSold", label: "Top Sold" },
                          { value: "newest", label: "Newest Items" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="sortBy"
                              value={option.value}
                              checked={filters.sortBy === option.value}
                              onChange={() => handleRadioChange(option.value)}
                              className="w-5 h-5 accent-gray-900"
                            />
                            <span className="text-lg text-gray-800">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    ),
                  },

                  {
                    title: "Category",
                    index: 1,
                    content: (
                      <div className="grid grid-cols-2 gap-2">
                        {["Cloths", "Shoes", "Accessories"].map((category) => (
                          <label
                            key={category}
                            className="flex items-center gap-3"
                          >
                            <input
                              type="checkbox"
                              checked={filters.categories.includes(category)}
                              onChange={() =>
                                handleCheckboxChange("categories", category)
                              }
                              className="w-5 h-5 accent-gray-900"
                            />
                            <span className="text-lg">{category}</span>
                          </label>
                        ))}
                      </div>
                    ),
                  },

                  {
                    title: "Clothing Items",
                    index: 2,
                    content: (
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Shirts",
                          "Pants",
                          "Jeans",
                          "Hoodies",
                          "T-Shirts",
                          "Jackets",
                          "Dresses",
                          "Shoes",
                        ].map((category) => (
                          <label
                            key={category}
                            className="flex items-center gap-3"
                          >
                            <input
                              type="checkbox"
                              checked={filters.categories.includes(category)}
                              onChange={() =>
                                handleCheckboxChange("categories", category)
                              }
                              className="w-5 h-5 accent-black"
                            />
                            <span className="text-lg">{category}</span>
                          </label>
                        ))}
                      </div>
                    ),
                  },

                  {
                    title: "Colors",
                    index: 3,
                    content: (
                      <div className="grid grid-cols-2 gap-2">
                        {colors.map((color) => (
                          <label
                            key={color}
                            className="flex items-center gap-3"
                          >
                            <input
                              type="checkbox"
                              checked={filters.colors.includes(color)}
                              onChange={() =>
                                handleCheckboxChange("colors", color)
                              }
                              className="w-5 h-5 accent-black"
                            />
                            <span className="text-lg">{color}</span>
                          </label>
                        ))}
                      </div>
                    ),
                  },

                  {
                    title: "Sizes",
                    index: 4,
                    content: (
                      <div className="grid grid-cols-3 gap-3">
                        {sizes.map((size) => (
                          <label
                            key={size}
                            className="flex items-center justify-center border border-gray-300 rounded-md py-2 cursor-pointer hover:bg-black hover:text-white transition-all duration-200"
                          >
                            <input
                              type="checkbox"
                              checked={filters.sizes.includes(size)}
                              onChange={() =>
                                handleCheckboxChange("sizes", size)
                              }
                              className="hidden"
                            />
                            <span className="text-md font-medium">{size}</span>
                          </label>
                        ))}
                      </div>
                    ),
                  },

                  {
                    title: "Material",
                    index: 5,
                    content: (
                      <div className="grid grid-cols-2 gap-2">
                        {materials.map((material) => (
                          <label
                            key={material}
                            className="flex items-center gap-3"
                          >
                            <input
                              type="checkbox"
                              checked={filters.materials.includes(material)}
                              onChange={() =>
                                handleCheckboxChange("materials", material)
                              }
                              className="w-5 h-5 accent-black"
                            />
                            <span className="text-lg">{material}</span>
                          </label>
                        ))}
                      </div>
                    ),
                  },

                  {
                    title: "Gender",
                    index: 6, // ✅ FIXED duplicate issue
                    content: (
                      <div className="grid grid-cols-2 gap-2">
                        {["Male", "Female", "UniSex"].map((gender) => (
                          <label
                            key={gender}
                            className="flex items-center gap-3"
                          >
                            <input
                              type="checkbox"
                              checked={filters.categories.includes(gender)}
                              onChange={() =>
                                handleCheckboxChange("categories", gender)
                              }
                              className="w-5 h-5 accent-gray-900"
                            />
                            <span className="text-lg">{gender}</span>
                          </label>
                        ))}
                      </div>
                    ),
                  },
                ].map(({ title, index, content }) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl bg-white shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(index)}
                      className="flex items-center justify-between w-full p-4 font-semibold text-gray-800 hover:bg-gray-50 transition-all"
                    >
                      {title}
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                          activeIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeIndex === index && (
                      <div className="p-4 border-t border-gray-100">
                        {content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-sm 
                              transform transition-all duration-300 ease-in-out 
                              hover:scale-102 hover:shadow-lg"
                >
                  <div className="relative w-full h-100 overflow-hidden rounded-t-lg group">
                    {/* Product Image */}
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105  transition-transform duration-500"
                    />

                    <div className="absolute top-3 right-3 flex flex-col items-center gap-2">
                      <button className="bg-white/40 p-2 rounded-full shadow-md hover:bg-red-100 transition-colors">
                        <Heart className="text-gray-700 w-5 h-5" />
                      </button>

                      <button className="bg-white/40 p-2 rounded-full shadow-md hover:bg-green-100 transition-all duration-500 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 delay-100">
                        <ShoppingCart className="text-gray-700 w-5 h-5" />
                      </button>

                      <button
                        onClick={() => setProductPage(true)}
                        className="bg-white/40 p-2 rounded-full shadow-md hover:bg-blue-100 transition-all duration-500 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 delay-200"
                      >
                        <Search className="text-gray-700 w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="px-5 pb-5">
                    <h5 className="text-xl font-semibold tracking-tight mt-3 text-gray-900 ">
                      {item.name}
                    </h5>
                    <span className="text-gray-500 text-sm mt-1 mb-1">
                      {item.description}
                    </span>
                    {/* <div className="flex items-center mt-2.5 mb-5">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < 4 ? "text-yellow-300" : "text-gray-200"
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 22 20"
                            >
                              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                          ))}
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ms-3">
                          {item.rating}
                        </span>
                      </div> */}

                    <div className="flex items-center gap-2">
                      <span className="text-md   font-bold text-gray-900">
                        {item.price}
                      </span>
                      <div className="flex gap-1">
                        <del>{Number(300) - 50}</del>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {productPage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-3 sm:px-6">
            <div className="relative bg-white rounded-xl p-4 sm:p-6 w-full max-w-4xl flex flex-col md:flex-row gap-6 max-h-[95vh] shadow-xl overflow-y-auto animate-slideUp">
              <button
                className="absolute top-3 right-1 z-50 p-2 text-gray-600 hover:text-red-500 bg-gray-100 rounded-full transition"
                onClick={() => setProductPage(false)}
              >
                <X size={20} />
              </button>

              <div className="relative w-full md:w-1/2 flex items-center justify-center">
                <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg">
                  {images.map((src, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        index === currentIndex ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`Product image ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                        priority={index === 0}
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={prevSlide}
                  className="absolute left-3 md:left-2 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur transition"
                >
                  <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 md:right-2 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur transition"
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        currentIndex === index
                          ? "bg-white scale-110"
                          : "bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-center md:w-1/2 space-y-4 text-gray-800">
                <h1 className="text-xl sm:text-2xl font-semibold leading-tight">
                  Beige Trouser New | Ladies Fashion
                </h1>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          i < 4 ? "text-yellow-400" : "text-gray-300"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded">
                    4.8
                  </span>
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-semibold">
                    MRP:{" "}
                    <span className="text-gray-900">
                      Rs. 1500{" "}
                      <del className="text-gray-500 ml-2 text-base font-normal">
                        Rs. 2000
                      </del>
                    </span>
                    <span className="ml-3 px-2 py-1 bg-green-100 text-green-600 text-xs rounded-md font-semibold">
                      25% OFF
                    </span>
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Inclusive of all taxes
                  </p>
                </div>

                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Elegant beige trousers for everyday and formal wear. Crafted
                  with soft fabric for comfort and style. Available in all
                  sizes.
                </p>

                <div className="flex items-center justify-between w-32 border border-gray-200 rounded-md shadow-sm bg-gray-50 px-3 py-2">
                  <button className="p-1 bg-white hover:bg-gray-100 shadow-sm rounded">
                    <Minus size={16} />
                  </button>
                  <p className="text-lg font-medium">1</p>
                  <button className="p-1 bg-white hover:bg-gray-100 shadow-sm rounded">
                    <Plus size={16} />
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button className="w-full md:w-3/5 bg-black border border-black-400 text-white py-3 rounded hover:bg-white hover:text-black transition-all duration-300">
                    <div className="flex justify-center items-center gap-2">
                      <ShoppingCart />
                      <span>Add to Cart</span>
                    </div>
                  </button>
                  <button className="w-full md:w-3/5 bg-black border border-black-400 text-white py-3 rounded hover:bg-white hover:text-black transition-all duration-300">
                    <div className="flex justify-center items-center gap-2">
                      <CreditCard />
                      <span>Buy Now</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </>
    </>
  );
}
