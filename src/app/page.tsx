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
  Heart,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";
import ProductInfoPage from "@/useFullComponent/productInfo/page";

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

export default function Home() {
  const [activePage, setActivePage] = useState("home");
  const [selectedLang, setSelectedLang] = useState("English");
  const [selectedCurrency, setSelectedCurrency] = useState("Dollor");
  const [isOpenLang, setIsOpenLang] = useState(false);
  const [isOpenCurrency, setIsOpenCurrency] = useState(false);
  const [productPage, setProductPage] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleNavClick = (page: string) => {
    setActivePage(page);
  };

  const newComponent = () => {
    alert("Added to cart!");
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
                className="absolute right-0 mt-2 w-28 bg-white text-gray-700 rounded-md shadow-lg origin-top z-50"
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
                className="absolute right-0 mt-2 w-28 bg-white text-gray-700 rounded-md shadow-lg origin-top z-50"
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
              <hr className="w-1/2 border-gray-300 mt-6 mb-10" />
              {/* Content for Top Collections can be added here */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((item) => (
                  <div
                    key={item.id}
                    className="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-sm 
                              transform transition-all duration-300 ease-in-out 
                              hover:scale-102 hover:shadow-lg"
                  >
                    <div className="relative w-full h-56 overflow-hidden rounded-t-lg group">
                      {/* Product Image */}
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      <div className="absolute top-3 right-3 flex flex-col items-center gap-2">
                        <button className="bg-white/80 p-2 rounded-full shadow-md hover:bg-red-100 transition-colors">
                          <Heart className="text-gray-700 w-5 h-5" />
                        </button>

                        <button className="bg-white/80 p-2 rounded-full shadow-md hover:bg-green-100 transition-all duration-500 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 delay-100">
                          <ShoppingCart className="text-gray-700 w-5 h-5" />
                        </button>

                        <button
                          onClick={() => setProductPage(true)}
                          className="bg-white/80 p-2 rounded-full shadow-md hover:bg-blue-100 transition-all duration-500 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 delay-200"
                        >
                          <Search className="text-gray-700 w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="px-5 pb-5">
                      <h5 className="text-2xl font-semibold tracking-tight mt-3 text-gray-900 ">
                        {item.name}
                      </h5>
                      <span className="text-gray-500 mt-1 mb-1">
                        {item.description}
                      </span>
                      <div className="flex items-center mt-2.5 mb-5">
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
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] shadow-lg overflow-hidden ">
              <button
                className="w-full flex justify-end hover:text-red-500 mb-2"
                onClick={() => setProductPage(false)}
              >
                <span className=" p-1 bg-gray-100 shadow-md">
                  <X />
                </span>
              </button>
              <div className="flex w-full flex-col  p-4 items-center ">
                <div>
                  <div className="relative w-full">
                    {/* Carousel wrapper */}
                    <div className="relative h-56 md:h-96 overflow-hidden rounded-lg">
                      {images.map((src, index) => (
                        <div
                          key={index}
                          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                            index === currentIndex ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <Image
                            src={src}
                            alt={`Slide ${index + 1}`}
                            fill
                            className="object-cover"
                            priority={index === 0}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Indicators */}
                    <div className="absolute z-30 flex -translate-x-1/2 space-x-3 bottom-5 left-1/2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            currentIndex === index
                              ? "bg-white"
                              : "bg-gray-400 hover:bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Controls */}
                    <button
                      onClick={prevSlide}
                      className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 group focus:outline-none"
                    >
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 backdrop-blur">
                        <ChevronLeft className="w-5 h-5 text-white" />
                      </span>
                    </button>

                    <button
                      onClick={nextSlide}
                      className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 group focus:outline-none"
                    >
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 backdrop-blur">
                        <ChevronRight className="w-5 h-5 text-white" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
