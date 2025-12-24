"use client";
import { useEffect, useRef, useState } from "react";
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
import GetProduct from "@/api/lib/product/GetProduct/GetProduct";
import {
  GetProductHomeApiResponse,
  ProductHome,
} from "@/api/types/HomePage/Product/product";
import { Product } from "@/api/types/product/getProduct";

import ProductSkeleton from "./reveal";
import GetProductHome from "@/api/lib/HomePage/Product/Product";
import GetProductHomeFetured from "@/api/lib/HomePage/Product/FeturedProduct";

interface Varient {
  varientName: string;
  varientAttributes: VarientAttribute[];
}
interface VarientAttribute {
  varientValue: string;
  qty: number;
  costPrice: number;
  salePrice: number;
}
interface ImagesList {
  listImage: urlTypes[];
}
type urlTypes = {
  urlID?: string;
  url: string;
};
export default function MainHome() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const [activePage, setActivePage] = useState("home");
  const [activeSize, setActiveSize] = useState("");
  const [selectedLang, setSelectedLang] = useState("English");
  const [selectedCurrency, setSelectedCurrency] = useState("Dollor");
  const [isOpenLang, setIsOpenLang] = useState(false);
  const [isOpenCurrency, setIsOpenCurrency] = useState(false);
  const [productPage, setProductPage] = useState(false);
  const [Filters, setFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [discount, setDiscount] = useState("");
  const [NumberofProduct, setNumberofProduct] = useState(0);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [productList, setProductList] = useState<ProductHome[]>([]);
  const [productListFeatured, setProductListFeatured] = useState<ProductHome[]>(
    []
  );
  const [listVarient, setListVarient] = useState<Varient[]>([]);
  const [listImages, setListImages] = useState<ImagesList>({ listImage: [] });
  const [imageUrl, setImageUrl] = useState("");

  const [selectedProductImageIndex, setSelectedProductImageIndex] = useState<
    Record<string, number>
  >({});

  const [active, setActive] = useState("Women");

  // const prevSlide = () => {
  //   setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  // };

  // const nextSlide = () => {
  //   setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  // };

  const scrollLefts = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };
  const scrollLefts2 = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight2 = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleNavClick = (page: string) => {
    setActivePage(page);
  };

  const getProduct = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token") ?? "";
      const response = await GetProductHome(token);

      if (response.status === 200 || response.status === 201) {
        const data = response.data as GetProductHomeApiResponse;

        if (data.productList && data.productList.length > 0) {
          setProductList(data.productList);
          console.log(data.productList);
          setLoading(false);
        } else {
          setProductList([]);
          setLoading(true);
        }
      } else {
        setLoading(true);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
      setLoading(true);
    }
  };
  const getProductFeatured = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token") ?? "";
      const response = await GetProductHomeFetured(token);

      if (response.status === 200 || response.status === 201) {
        const data = response.data as GetProductHomeApiResponse;

        if (data.productList && data.productList.length > 0) {
          setProductListFeatured(data.productList);
          setLoading(false);
        } else {
          setProductListFeatured([]);
          setLoading(true);
        }
      } else {
        setLoading(true);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
      setLoading(true);
    }
  };

  const fetchData = (productID: string) => {
    const data = productList.find((item) => item.productID === productID);
    if (data) {
      setProductName(data.productName);
      setDiscount(data.discount.toString());
      setDescription(data.description);
      setImageUrl(data.images[0].url);
      setListImages({
        listImage: data.images.map((img) =>
          img.urlID ? { urlID: img.urlID, url: img.url } : { url: img.url }
        ),
      });
      if (data.variants[0].variantValues[0].qty === 0) {
        setAmount(String(data.variants[0].variantValues[1].salePrice));
      } else {
        setAmount(String(data.variants[0].variantValues[0].salePrice));
      }
      setListVarient(
        data.variants.map((variant) => ({
          varientName: variant.variantName,
          varientAttributes: variant.variantValues.map((attr) => ({
            varientValue: attr.varientValue,
            qty: attr.qty,
            salePrice: attr.salePrice,
            costPrice: attr.costPrice,
          })),
        }))
      );
    }
  };

  const fetchData2 = (productID: string) => {
    const data = productListFeatured.find(
      (item) => item.productID === productID
    );
    if (data) {
      setProductName(data.productName);
      setDiscount(data.discount.toString());
      setDescription(data.description);
      setImageUrl(data.images[0].url);
      setListImages({
        listImage: data.images.map((img) =>
          img.urlID ? { urlID: img.urlID, url: img.url } : { url: img.url }
        ),
      });
      if (data.variants[0].variantValues[0].qty === 0) {
        setAmount(String(data.variants[0].variantValues[1].salePrice));
      } else {
        setAmount(String(data.variants[0].variantValues[0].salePrice));
      }
      setListVarient(
        data.variants.map((variant) => ({
          varientName: variant.variantName,
          varientAttributes: variant.variantValues.map((attr) => ({
            varientValue: attr.varientValue,
            qty: attr.qty,
            costPrice: attr.costPrice,
            salePrice: attr.salePrice,
          })),
        }))
      );
    }
  };
  useEffect(() => {
    getProductFeatured();
    getProduct();
  }, []);

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
            <div className="w-full bg-gray-100 mt-2 mb-2">
              <div className="mx-auto max-w-7xl px-4 ">
                {/* <h1 className="text-2xl font-bold mt-10 mb-2 text-blue-600">
                  Special Offer
                </h1>

                <h1 className="text-4xl font-extrabold text-gray-700 underline mb-5">
                  Top Collections
                </h1>

                <p className="text-center max-w-3xl text-gray-800 text-lg mt-2">
                  Find Various types of quality chairs, and international
                  standards. Only with this one website you can see and buy
                  quality chairs. Immediately order the best seat.
                </p>

                <hr className="w-1/2 border-gray-300 mt-6" /> */}

                {/* CATEGORY + FILTER */}
                <div className="flex flex-col md:flex-row mt-4 mb-6 items-center justify-center gap-3 w-full">
                  <ul className="flex flex-wrap justify-center px-2 gap-3 md:gap-4 text-base font-medium text-gray-600 border-b border-gray-200 shadow-sm bg-white rounded-lg py-3 w-full md:w-auto">
                    {["Men", "Women", "Teens", "Kids"].map((cat) => (
                      <li key={cat}>
                        <Link
                          href="#"
                          onClick={() => setActive(cat)}
                          className={`inline-flex items-center px-6 py-2.5 rounded-md transition-all duration-300 ${
                            active === cat
                              ? "bg-blue-600 text-white shadow-md scale-105"
                              : "bg-gray-100 hover:bg-blue-50 hover:text-blue-600"
                          }`}
                        >
                          {cat}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <button
                    title="filter"
                    onClick={() => setFilters(true)}
                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-600 shadow-sm transition-all duration-300"
                  >
                    <Filter className="w-5 h-5" />
                  </button>
                </div>

                {/* PRODUCTS GRID */}
                <div className="m-10">
                  {(loading || productListFeatured.length > 0) && (
                    <>
                      <h1 className="text-3xl font-bold mt-2 mb-2 ">
                        Featured Products
                      </h1>
                      <hr className="w-full border-gray-400 mt-2 mb-6 " />
                      <div className="relative w-full">
                        {/* LEFT ARROW */}
                        {productListFeatured.length > 4 && (
                          <>
                            <button
                              onClick={scrollLefts}
                              className="absolute left-0 top-[42%] z-10 -translate-y-1/2
               bg-white/90 hover:bg-white shadow-md rounded-full p-3
               hidden md:flex"
                            >
                              <ChevronLeft />
                            </button>

                            {/* RIGHT ARROW */}
                            <button
                              onClick={scrollRight}
                              className="absolute right-0 top-[42%]  z-10 -translate-y-1/2
               bg-white/90 hover:bg-white shadow-md rounded-full p-3
               hidden md:flex"
                            >
                              <ChevronRight />
                            </button>
                          </>
                        )}
                        {/* CAROUSEL */}
                        <div
                          ref={carouselRef}
                          // onMouseDown={handleMouseDown}
                          // onMouseLeave={handleMouseLeave}
                          // onMouseUp={handleMouseUp}
                          // onMouseMove={handleMouseMove}
                          className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory
                     select-none
                    [&::-webkit-scrollbar]:hidden"
                        >
                          {loading
                            ? Array.from({ length: 8 }).map((_, i) => (
                                <div
                                  key={i}
                                  className="min-w-[240px] snap-start"
                                >
                                  <ProductSkeleton />
                                </div>
                              ))
                            : productListFeatured
                                .filter(
                                  (item) => item.storeSale !== "OfflineStore"
                                )
                                .slice(0, 8)
                                .map((item) => (
                                  <div
                                    key={item.productID}
                                    className="min-w-[240px] sm:min-w-[260px] md:min-w-[280px] lg:min-w-[300px]
                         snap-start bg-white border border-gray-200 rounded-lg shadow-sm
                         transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                  >
                                    {/* IMAGE */}
                                    <div className="relative w-full h-[380px] overflow-hidden rounded-t-lg group">
                                      <Image
                                        src={
                                          item.images[0]?.url ||
                                          "/placeholder.png"
                                        }
                                        alt={item.productName}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                      />

                                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                                        <button className="bg-white/70 p-2 rounded-full shadow hover:bg-red-100">
                                          <Heart className="w-5 h-5 text-gray-700" />
                                        </button>

                                        <button
                                          className="bg-white/70 p-2 rounded-full shadow hover:bg-green-100
                                     opacity-0 translate-y-2 group-hover:opacity-100
                                     group-hover:translate-y-0 transition-all duration-300"
                                        >
                                          <ShoppingCart className="w-5 h-5 text-gray-700" />
                                        </button>

                                        <button
                                          onClick={() => {
                                            setProductPage(true);
                                            fetchData2(item.productID);
                                          }}
                                          className="bg-white/70 p-2 rounded-full shadow hover:bg-blue-100
                               opacity-0 translate-y-2 group-hover:opacity-100
                               group-hover:translate-y-0 transition-all duration-300 delay-100"
                                        >
                                          <Search className="w-5 h-5 text-gray-700" />
                                        </button>
                                      </div>
                                    </div>

                                    {/* CONTENT */}
                                    <div className="px-5 pb-5">
                                      <h5 className="text-lg font-semibold mt-3 text-gray-900">
                                        {item.productName}
                                      </h5>

                                      <p className="text-gray-500 text-sm line-clamp-2">
                                        {item.description}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                        </div>
                      </div>

                      {/* LOAD MORE */}
                      <div className="w-full flex flex-col justify-center items-center mt-8">
                        <button
                          // onClick={handleLoadMore}
                          className="px-6 mt-1 py-3 bg-black text-white rounded-md shadow-md hover:bg-gray-900 text-lg"
                        >
                          {loading ? "Loading..." : "Load More"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
                {(loading || productList.length > 0) && (
                  <>
                    <h1 className="text-3xl font-bold mt-2 mb-2 ">
                      Other Products
                    </h1>
                    <hr className="w-full border-gray-400 mt-2 mb-6 " />
                    <div className="relative w-full">
                      {/* LEFT ARROW */}
                      {productList.length > 4 && (
                        <>
                          <button
                            onClick={scrollLefts}
                            className="absolute left-0 top-[42%] z-10 -translate-y-1/2
               bg-white/90 hover:bg-white shadow-md rounded-full p-3
               hidden md:flex"
                          >
                            <ChevronLeft />
                          </button>

                          {/* RIGHT ARROW */}
                          <button
                            onClick={scrollRight}
                            className="absolute right-0 top-[42%]  z-10 -translate-y-1/2
               bg-white/90 hover:bg-white shadow-md rounded-full p-3
               hidden md:flex"
                          >
                            <ChevronRight />
                          </button>
                        </>
                      )}
                      {/* CAROUSEL */}
                      <div
                        ref={carouselRef}
                        // onMouseDown={handleMouseDown}
                        // onMouseLeave={handleMouseLeave}
                        // onMouseUp={handleMouseUp}
                        // onMouseMove={handleMouseMove}
                        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory
                     select-none
                    [&::-webkit-scrollbar]:hidden"
                      >
                        {loading
                          ? Array.from({ length: 8 }).map((_, i) => (
                              <div key={i} className="min-w-[240px] snap-start">
                                <ProductSkeleton />
                              </div>
                            ))
                          : productList
                              .filter(
                                (item) => item.storeSale !== "OfflineStore"
                              )
                              .slice(0, 8)
                              .map((item) => (
                                <div
                                  key={item.productID}
                                  className="min-w-[240px] sm:min-w-[260px] md:min-w-[280px] lg:min-w-[300px]
                         snap-start bg-white border border-gray-200 rounded-lg shadow-sm
                         transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                >
                                  {/* IMAGE */}
                                  <div className="relative w-full h-[380px] overflow-hidden rounded-t-lg group">
                                    <Image
                                      src={
                                        item.images[0]?.url ||
                                        "/placeholder.png"
                                      }
                                      alt={item.productName}
                                      fill
                                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />

                                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                                      <button className="bg-white/70 p-2 rounded-full shadow hover:bg-red-100">
                                        <Heart className="w-5 h-5 text-gray-700" />
                                      </button>

                                      <button
                                        className="bg-white/70 p-2 rounded-full shadow hover:bg-green-100
                                     opacity-0 translate-y-2 group-hover:opacity-100
                                     group-hover:translate-y-0 transition-all duration-300"
                                      >
                                        <ShoppingCart className="w-5 h-5 text-gray-700" />
                                      </button>

                                      <button
                                        onClick={() => {
                                          setProductPage(true);
                                          fetchData(item.productID);
                                        }}
                                        className="bg-white/70 p-2 rounded-full shadow hover:bg-blue-100
                               opacity-0 translate-y-2 group-hover:opacity-100
                               group-hover:translate-y-0 transition-all duration-300 delay-100"
                                      >
                                        <Search className="w-5 h-5 text-gray-700" />
                                      </button>
                                    </div>
                                  </div>

                                  {/* CONTENT */}
                                  <div className="px-5 pb-5">
                                    <h5 className="text-lg font-semibold mt-3 text-gray-900">
                                      {item.productName}
                                    </h5>

                                    <p className="text-gray-500 text-sm line-clamp-2">
                                      {item.description}
                                    </p>
                                  </div>
                                </div>
                              ))}
                      </div>
                    </div>

                    {/* LOAD MORE */}
                    <div className="w-full flex flex-col justify-center items-center mt-8">
                      <button
                        // onClick={handleLoadMore}
                        className="px-6 mt-1 py-3 bg-black text-white rounded-md shadow-md hover:bg-gray-900 text-lg"
                      >
                        {loading ? "Loading..." : "Load More"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="w-full py-16 my-5 bg-gray-100 border border-gray-200 shadow-md flex justify-center items-center">
              <div className="w-full max-w-4xl px-6 text-center">
                <h2 className="text-3xl font-bold mb-4">BE THE FIRST</h2>
                <p className="text-gray-700 mb-8">
                  New arrivals. Exclusive previews. First access to sales. Sign
                  up to stay in the know.
                </p>

                <form
                  // onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row justify-center gap-4"
                >
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-3 w-full sm:flex-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-900 transition-colors font-semibold"
                  >
                    Sign Up
                  </button>
                </form>
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
                onClick={() => {
                  setProductPage(false);
                  setAmount("");
                  setNumberofProduct(0);
                }}
              >
                <X size={20} />
              </button>

              <div className="relative w-full md:w-1/2 flex flex-col items-center justify-center gap-3">
                {/* Main Image Container */}
                <div className="relative w-full h-80 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center shadow-sm">
                  <img
                    src={imageUrl} // Current main image URL from state
                    alt="Product Main"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* Thumbnails */}
                {listImages.listImage && listImages.listImage.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto max-w-full px-2">
                    {listImages.listImage.map((img, idx) => (
                      <button
                        key={img.urlID || idx}
                        onClick={() => setImageUrl(img.url)} // Update main image on click
                        className={`border rounded-lg p-1 flex-shrink-0 hover:border-blue-500 transition ${
                          imageUrl === img.url
                            ? "border-blue-600"
                            : "border-gray-300"
                        }`} // Highlight selected thumbnail
                      >
                        <img
                          src={img.url}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-16 h-16 object-contain rounded"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center md:w-1/2 space-y-4 text-gray-800">
                <h1 className="text-xl sm:text-2xl font-semibold leading-tight">
                  {productName}
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
                      Rs.{" "}
                      {Number(amount) -
                        (Number(amount) * Number(discount)) / 100}{" "}
                      <del className="text-gray-500 ml-2 text-base font-normal">
                        Rs. {amount}
                      </del>
                    </span>
                    <span className="ml-3 px-2 py-1 bg-green-100 text-green-600 text-xs rounded-md font-semibold">
                      {discount}% OFF
                    </span>
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Inclusive of all taxes
                  </p>
                </div>

                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {description}
                </p>
                <div className="flex flex-col">
                  {listVarient.map((item) => (
                    <>
                      <h1 className="text-md font-bold">{item.varientName}</h1>
                      <div className="flex gap-2">
                        {item.varientAttributes.map((attr, idx) => (
                          <div key={idx}>
                            {attr.qty === 0 ? (
                              <button
                                className="w-10 h-10 font-bold  text-gray-400 px-2  py-1 shadow-md border border-gray-100 rounded-full cursor-not-allowed"
                                disabled
                              >
                                {attr.varientValue}
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  setAmount(String(attr.salePrice))
                                }
                                className={`min-w-[40px] h-10 font-bold text-sm px-3 py-1.5 shadow-md border border-gray-100 rounded-full cursor-pointer  flex items-center justify-center
                                ${
                                  amount === String(attr.salePrice)
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-800"
                                }
                              `}
                              >
                                {attr.varientValue}
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  ))}
                </div>
                <div className="flex items-center justify-between w-32 border border-gray-300 rounded-md shadow-sm bg-gray-200 px-3 py-2">
                  {NumberofProduct === 0 ? (
                    <button
                      onClick={() => setNumberofProduct(NumberofProduct)}
                      className="p-1  bg-white  shadow-sm rounded"
                    >
                      <Minus size={16} color="gray" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setNumberofProduct(NumberofProduct - 1)}
                      className="p-1  bg-white hover:bg-gray-200 shadow-sm rounded"
                    >
                      <Minus size={16} color="black" />
                    </button>
                  )}
                  <p className="text-lg font-medium">{NumberofProduct}</p>
                  <button
                    onClick={() => setNumberofProduct(NumberofProduct + 1)}
                    className="p-1 bg-white hover:bg-gray-100 shadow-sm rounded"
                  >
                    <Plus size={16} color="black" />
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
