"use client";
import { useState } from "react";
import Navbar from "@/component/Navbar/page";
import LoginPage from "@/app/login/page";
import HomeCom from "@/component/Header/page";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/component/Footer/page";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Filter,
  Heart,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";
import ProductInfoPage from "@/useFullComponent/productInfo/page";
import FilterComponenet from "@/useFullComponent/filterComponent/page";

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
];
const images = ["/collection1.jpg", "/collection2.jpg", "/collection3.jpg"];

export default function MainHome() {
  const [activePage, setActivePage] = useState("home");
  const [activeSize, setActiveSize] = useState("");
  const [selectedLang, setSelectedLang] = useState("English");
  const [selectedCurrency, setSelectedCurrency] = useState("Dollor");
  const [isOpenLang, setIsOpenLang] = useState(false);
  const [isOpenCurrency, setIsOpenCurrency] = useState(false);
  const [productPage, setProductPage] = useState(false);
  const [Filters, setFilters] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [active, setActive] = useState("Women");

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleNavClick = (page: string) => {
    setActivePage(page);
  };

  const product = () => {
    window.location.href = "/product";
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="w-full bg-gray-700 py-2 px-6  flex justify-around items-center">
        <div className="flex gap-4 items-center">
          <div className="hidden lg:flex items-center">
            <p className="text-white text-sm">Call-Us: +12-345-67890</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-200">
            Welcome To Our Platform{" "}
            <a href="/login" className="text-blue-400">
              Sign In
            </a>{" "}
          </p>
        </div>

        {/* 🔹 Language & Currency */}
        <div className="flex gap-3">
          {/* Language */}
          <div className="relative">
            <button
              onClick={() => {
                setIsOpenLang(!isOpenLang);
                setIsOpenCurrency(false);
              }}
              className="flex items-center text-white text-xs gap-1 focus:outline-none"
            >
              <span className="text-sm md:text-sm">{selectedLang}</span>
              <ChevronDown
                className={`w-4 h-4 transform transition-transform duration-300 ${
                  isOpenLang ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {isOpenLang && (
              <div
                className="absolute right-0 mt-2 w-28 bg-white text-gray-700 rounded-md shadow-lg origin-top z-100"
                onMouseLeave={() => setIsOpenLang(false)}
              >
                <ul className="py-1 text-xs">
                  {["English", "Urdu", "Hindi"].map((lang) => (
                    <li
                      key={lang}
                      onClick={() => {
                        setSelectedLang(lang);
                        setIsOpenLang(false);
                      }}
                      className={`px-3 py-2 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors ${
                        selectedLang === lang ? "bg-blue-100" : ""
                      }`}
                    >
                      <span className="text-sm">{lang}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Currency */}
          <div className="relative">
            <button
              onClick={() => {
                setIsOpenCurrency(!isOpenCurrency);
                setIsOpenLang(false);
              }}
              className="flex items-center text-white text-xs gap-1 focus:outline-none"
            >
              <span className="text-sm md:text-sm">{selectedCurrency}</span>
              <ChevronDown
                className={`w-4 h-4 transform transition-transform duration-300 ${
                  isOpenCurrency ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {isOpenCurrency && (
              <div
                className="absolute right-0 mt-2 w-28 bg-white text-gray-700 rounded-md shadow-lg origin-top z-100"
                onMouseLeave={() => setIsOpenCurrency(false)}
              >
                <ul className="py-1 text-sm">
                  {["Rupees", "Dollor"].map((currency) => (
                    <li
                      key={currency}
                      onClick={() => {
                        setSelectedCurrency(currency);
                        setIsOpenCurrency(false);
                      }}
                      className={`px-3 py-2 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors ${
                        selectedCurrency === currency ? "bg-blue-100" : ""
                      }`}
                    >
                      {currency}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <Navbar onPageChange={handleNavClick} />

      <main className="">
        {activePage === "home" && (
          <>
            <HomeCom />

            {/* Top Collection Section */}
            <div className="flex w-full flex-col p-4 items-center bg-gray-100 mt-2 mb-2">
              <h1 className="text-2xl font-bold mt-10 mb-2 text-blue-600">
                Special Offer
              </h1>
              <h1 className="text-4xl font-extrabold text-gray-700  underline mb-5 ">
                Top Collections
              </h1>

              <p className="text-center max-w-3xl text-gray-800 text-lg mt-2">
                Find Various types of quality chairs, and international
                standards. only with this one website you can see and buy
                quality chairs. immediately order the best seat.
              </p>
              <hr className="w-1/2 border-gray-300 mt-6" />
              <div className="flex flex-col md:flex-row mt-2 mb-2 items-center justify-center md:justify-center gap-3 w-full">
                {/* Category Tabs */}
                <ul className="flex flex-wrap justify-center px-2 gap-3 md:gap-4 text-base font-medium text-gray-600 border-b border-gray-200 shadow-sm bg-white rounded-lg py-3 w-full md:w-auto">
                  <li>
                    <Link
                      href="#"
                      onClick={() => setActive("Men")}
                      className={`inline-flex items-center px-6 py-2.5 rounded-md transition-all duration-300 ${
                        active === "Men"
                          ? "bg-blue-600 text-white shadow-md scale-105"
                          : "bg-gray-100 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      Men
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="#"
                      onClick={() => setActive("Women")}
                      className={`inline-flex items-center px-6 py-2.5 rounded-md transition-all duration-300 ${
                        active === "Women"
                          ? "bg-pink-600 text-white shadow-md scale-105"
                          : "bg-gray-100 hover:bg-pink-50 hover:text-pink-600"
                      }`}
                    >
                      Women
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="#"
                      onClick={() => setActive("Teens")}
                      className={`inline-flex items-center px-6 py-2.5 rounded-md transition-all duration-300 ${
                        active === "Teens"
                          ? "bg-purple-600 text-white shadow-md scale-105"
                          : "bg-gray-100 hover:bg-purple-50 hover:text-purple-600"
                      }`}
                    >
                      Teens
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="#"
                      onClick={() => setActive("Kids")}
                      className={`inline-flex items-center px-6 py-2.5 rounded-md transition-all duration-300 ${
                        active === "Kids"
                          ? "bg-green-600 text-white shadow-md scale-105"
                          : "bg-gray-100 hover:bg-green-50 hover:text-green-600"
                      }`}
                    >
                      Kids
                    </Link>
                  </li>
                </ul>

                {/* Filter Button */}
                <button
                  title="filter"
                  onClick={() => setFilters(true)}
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-600 shadow-sm transition-all duration-300"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>

              {/* Content for Top Collections can be added here */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((item) => (
                  <div
                    key={item.id}
                    className="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-sm 
                              transform transition-all duration-300 ease-in-out 
                              hover:scale-102 hover:shadow-lg"
                  >
                    <div className="relative w-full h-120 overflow-hidden rounded-t-lg group">
                      {/* Product Image */}
                      <Image
                        onClick={product}
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
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
              <div className=" w-full flex flex-col justify-center items-center mt-4">
                <h1 className="text-gray-400">312 Out Off 550</h1>
                <div className="w-1/4   bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: "45%" }}
                  ></div>
                </div>
                <button className="px-5 mt-2 py-3 bg-black text-white rounded-md shadow-md hover:bg-gray-900 text-lg">
                  Load More
                </button>
              </div>
            </div>

            <Footer />
          </>
        )}
        {activePage === "login" && (
          <div className="flex w-full h-screen justify-center items-center bg-gray-100">
            <div className="w-full max-w-5xl mx-4">
              <LoginPage />
            </div>
          </div>
        )}

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
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
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
                <div className="flex flex-col">
                  <h1 className="text-md font-bold">Sizes</h1>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveSize("sm")}
                      className={`w-10 h-10 font-bold text-sm p-2 shadow-md border border-gray-100 rounded-full ${
                        activeSize === "sm"
                          ? `bg-gray-900 text-white`
                          : `bg-white text-black`
                      }`}
                    >
                      sm
                    </button>
                    <button
                      onClick={() => setActiveSize("md")}
                      className={`w-10 h-10 font-bold text-sm p-2 shadow-md border border-gray-100 rounded-full ${
                        activeSize === "md"
                          ? `bg-gray-900 text-white`
                          : `bg-white text-black`
                      }`}
                    >
                      md
                    </button>
                    <button
                      onClick={() => setActiveSize("lg")}
                      className={`w-10 h-10 font-bold text-sm p-2 shadow-md border border-gray-100 rounded-full ${
                        activeSize === "lg"
                          ? `bg-gray-900 text-white`
                          : `bg-white text-black`
                      }`}
                    >
                      lg
                    </button>
                    <button
                      onClick={() => setActiveSize("xl")}
                      className={`w-10 h-10 font-bold text-sm p-2 shadow-md border border-gray-100 rounded-full ${
                        activeSize === "xl"
                          ? `bg-gray-900 text-white`
                          : `bg-white text-black`
                      }`}
                    >
                      xl
                    </button>
                  </div>
                </div>
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

        {Filters && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setFilters(false)}
            ></div>

            {/* Drawer */}
            <div
              className={`
        fixed top-0 left-0 z-50 h-full 
        bg-white shadow-xl transform transition-transform duration-500 ease-in-out
        w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[25vw] xl:w-[20vw]
        flex flex-col
      `}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                <button
                  title="Close"
                  className="text-gray-500 hover:text-red-500 transition"
                  onClick={() => setFilters(false)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-4">
                <FilterComponenet />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
