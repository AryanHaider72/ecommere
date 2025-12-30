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
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Ellipsis,
  Filter,
  Heart,
  Info,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  ShoppingCartIcon,
  X,
} from "lucide-react";
import ProductInfoPage from "@/useFullComponent/productInfo/page";

import GetProduct from "@/api/lib/product/GetProduct/GetProduct";
import {
  GetProductHomeApiResponse,
  ProductHome,
} from "@/api/types/HomePage/Product/product";
import { Product } from "@/api/types/product/getProduct";

import ProductSkeleton from "./reveal";
import GetProductHome from "@/api/lib/HomePage/Product/Product";
import GetProductHomeFetured from "@/api/lib/HomePage/Product/FeturedProduct";
import Spinner from "@/component/spinner/page";
import {
  Category,
  NavbarApiResponse,
} from "@/api/types/HomePage/Navbar/Navbar";
import { CartData, cartList } from "@/api/types/Cart/CartData";
import {
  AddToCart,
  addToServerCart,
  clearServerCart,
  getServerCart,
} from "@/api/lib/Cart/AddCart";
import GetNavbar from "@/api/lib/HomePage/Navbar/Navbar";
import CartComponent from "@/useFullComponent/CartComponent/page";
import CheckAuth from "@/api/authentication/checkAuth";

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
  const [uploading, setUplaoding] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [activePage, setActivePage] = useState("home");

  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
    []
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [productPage, setProductPage] = useState(false);
  const [Filters, setFilters] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [productName, setProductName] = useState("");
  const [discount, setDiscount] = useState("");
  const [NumberofProduct, setNumberofProduct] = useState(0);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [CartData, setCartData] = useState<CartData[]>([]);

  const [totalCount, setTotalCount] = useState(0);
  const [productList, setProductList] = useState<ProductHome[]>([]);
  const [productListFeatured, setProductListFeatured] = useState<ProductHome[]>(
    []
  );
  const [listVarient, setListVarient] = useState<Varient[]>([]);
  const [listImages, setListImages] = useState<ImagesList>({ listImage: [] });
  const [imageUrl, setImageUrl] = useState("");
  const [cartList, setCartList] = useState<CartData[]>([]);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const scrollLefts = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const getProduct = async (page: number) => {
    if (loading1) return;

    try {
      setLoading1(true);

      const token = localStorage.getItem("token") ?? "";
      const response = await GetProductHome(token, page);

      if (response.status === 200 || response.status === 201) {
        const data = response.data as GetProductHomeApiResponse;
        console.log(data.productList);
        setTotalCount(data.totalCount);
        setLoading1(false);

        if (data.productList && data.productList.length > 0) {
          setProductList((prev) => [...prev, ...data.productList]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading1(false);
    }
  };

  const getProductFeatured = async () => {
    try {
      setLoading2(true);

      const token = localStorage.getItem("token") ?? "";
      const response = await GetProductHomeFetured(token);

      if (response.status === 200 || response.status === 201) {
        const data = response.data as GetProductHomeApiResponse;

        if (data.productList && data.productList.length > 0) {
          setProductListFeatured(data.productList);
          setLoading2(false);
        } else {
          setProductListFeatured([]);
          setLoading2(true);
        }
      } else {
        setLoading2(true);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
      setLoading2(true);
    }
  };

  const fetchData = (productID: string) => {
    const data = filteredProducts.find((item) => item.productID === productID);
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
    handleShowCategories();
    getProductFeatured();
    getProduct(1);
    serverCartData();
  }, []);

  useEffect(() => {
    if (currentPage > 1) {
      getProduct(currentPage);
    }
  }, [currentPage]);

  const handleSubCategoryChange = (id: string) => {
    setSelectedSubCategories((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredProducts = productList.filter((product) => {
    if (product.storeSale === "OfflineStore") return false;
    if (product.subCategoryID !== selectedCategoryId) return false;
    if (
      selectedSubCategories.length > 0 &&
      !selectedSubCategories.includes(product.subCategoryDetailID)
    )
      return false;

    return true;
  });

  const checkAuth = async (ID: string) => {
    const token1 = localStorage.getItem("token1");
    console.log(token1);
    const response = await CheckAuth(token1 as string);
    // console.log(token1);
    console.log("Response from CheckAuth API:", response);
    if (response?.status === 200 || response?.status === 201) {
      const data = response.data as any;
      if (data.loggedBy === "Customer") {
        setUplaoding(true);
        const data = productList.find((item) => item.productID === ID);
        const token = localStorage.getItem("token");
        if (data) {
          const formData = {
            productID: data.productID,
            qty: 1,
          };
          await AddToCart(formData, String(token));
        }
      } else {
        setUplaoding(false);
      }
    }
  };

  const addToCart = async (ID: string) => {
    try {
      const data = productList.find((item) => item.productID === ID);
      if (!data) return;

      const price =
        data.variants[0].variantValues[0].salePrice === 0
          ? data.variants[0].variantValues[1].salePrice
          : data.variants[0].variantValues[0].salePrice;

      const newItem: CartData = {
        productID: data.productID,
        productName: data.productName,
        description: data.description,
        quantity: 1,
        discount: data.discount,
        salePrice: price,
        image: data.images?.[0]?.url,
      };

      const currentCart = await getServerCart();
      const updatedCart = [...currentCart, newItem];

      const res = await addToServerCart(updatedCart);
      if (res) {
        checkAuth(ID);
      }
      serverCartData();
      setCartList(updatedCart);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowCategories = async () => {
    const token = localStorage.getItem("token");
    const response = await GetNavbar(token || "");
    const data = response.data as NavbarApiResponse;
    if (response.status === 200 || response.status === 201) {
      setCategories(data?.categoryList ?? []);
      setSelectedCategoryId(data.categoryList[0].subCategoryID);
    } else {
      setCategories([]);
    }
  };
  useEffect(() => {
    if (CartData.length === 0) return;
    addToServerCart(CartData);
  }, [CartData]);

  const serverCartData = async () => {
    const cart = await getServerCart();
    setCartList(cart);
  };

  const onClear = async () => {
    await clearServerCart();
    const freshCart = await getServerCart();
    setCartList(freshCart);
  };
  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Navbar
        onPageChange={(page) => console.log("Navigate to:", page)}
        SubCategoryID={(page) => console.log("Navigate to:", page)}
        onCategoriesLoaded={(categories) => categories}
        cartList={cartList} // Pass full cartList, not just length
        setCartList={setCartList} // Pass setter so Navbar can update
        onClear={onClear} // Pass clear handler
      />

      <main className="">
        {activePage === "home" && (
          <>
            <HomeCom />

            {/* Top Collection Section */}
            <div className="w-full bg-gray-100 mt-2 mb-2">
              <div className="mx-auto max-w-7xl px-4 ">
                {/* CATEGORY + FILTER */}

                {/* PRODUCTS GRID */}
                <div className="m-10">
                  {(loading1 || productListFeatured.length > 0) && (
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
                          {loading1
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

                                        {/* <button
                                          className="bg-white/70 p-2 rounded-full shadow hover:bg-green-100
                                     opacity-0 translate-y-2 group-hover:opacity-100
                                     group-hover:translate-y-0 transition-all duration-300"
                                        >
                                          <ShoppingCart className="w-5 h-5 text-gray-700" />
                                        </button> */}

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
                      {/* <div className="w-full flex flex-col justify-center items-center mt-8">
                        <button
                          // onClick={handleLoadMore}
                          className="px-6 mt-1 py-3 bg-black text-white rounded-md shadow-md hover:bg-gray-900 text-lg"
                        >
                          {loading1 ? "Loading..." : "Load More"}
                        </button>
                      </div> */}
                    </>
                  )}
                </div>

                <div className="flex flex-col md:flex-row mt-4 mb-6 gap-3 w-full">
                  <h1 className="text-3xl font-bold mt-2 mb-2">
                    Other Products
                  </h1>
                  <button
                    title="filter"
                    onClick={() => setFilters(true)}
                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-600 shadow-sm transition-all duration-300"
                  >
                    <Filter className="w-5 h-5" />
                  </button>
                </div>
                {(loading1 || filteredProducts.length > 0) && (
                  <>
                    <hr className="w-full border-gray-400 mt-2 mb-6" />

                    {/* GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {loading1
                        ? Array.from({ length: 8 }).map((_, i) => (
                            <ProductSkeleton key={i} />
                          ))
                        : filteredProducts.map((item) => (
                            <div
                              key={item.productID}
                              className="bg-white border border-gray-200 rounded-lg shadow-sm
                                transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                              {/* IMAGE */}
                              <div className="relative w-full h-[380px] overflow-hidden rounded-t-lg group">
                                <Image
                                  src={
                                    item.images[0]?.url || "/placeholder.png"
                                  }
                                  alt={item.productName}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                                <div className="absolute top-3 right-3 flex flex-col gap-2">
                                  <button className="bg-white/70 p-2 rounded-full shadow hover:bg-red-100">
                                    <Heart className="w-5 h-5 text-gray-700" />
                                  </button>

                                  {/* <button
                                      className="bg-white/70 p-2 rounded-full shadow hover:bg-green-100
                                      opacity-0 translate-y-2 group-hover:opacity-100
                                      group-hover:translate-y-0 transition-all duration-300"
                                    >
                                      <ShoppingCart className="w-5 h-5 text-gray-700" />
                                    </button> */}

                                  <button
                                    onClick={() => {
                                      setProductPage(true);
                                      fetchData(item.productID);
                                    }}
                                    className="bg-white/70 p-2 rounded-full shadow hover:bg-blue-100
                                      opacity-0 translate-y-2 group-hover:opacity-100
                                      group-hover:translate-y-0 transition-all duration-300 delay-100"
                                  >
                                    <Info className="w-5 h-5 text-gray-700" />
                                  </button>
                                </div>
                              </div>

                              {/* CONTENT */}
                              <div className="px-5 pb-2">
                                <h5 className="text-lg font-semibold mt-3 text-gray-900">
                                  {item.productName}
                                </h5>

                                <p className="text-gray-500 text-sm line-clamp-2">
                                  {item.description}
                                </p>
                                {/* <p className="text-lg font-semibold mt-3 text-gray-900">
                                  {item.variants[0].variantValues[0]
                                    .salePrice === 0 ? (
                                    <>
                                      {
                                        item.variants[0].variantValues[1]
                                          .salePrice
                                      }
                                    </>
                                  ) : (
                                    <>
                                      {
                                        item.variants[0].variantValues[0]
                                          .salePrice
                                      }
                                    </>
                                  )}{" "}
                                  -/
                                  {}
                                </p> */}
                                <p className="text-lg font-semibold mt-3 text-gray-900">
                                  <span className="text-gray-900">
                                    Rs.{" "}
                                    {Number(
                                      item.variants[0].variantValues[0]
                                        .salePrice
                                    ) -
                                      (Number(
                                        item.variants[0].variantValues[0]
                                          .salePrice
                                      ) *
                                        Number(item.discount)) /
                                        100}{" "}
                                    <del className="text-gray-500 ml-2 text-base font-normal">
                                      Rs.{" "}
                                      {
                                        item.variants[0].variantValues[0]
                                          .salePrice
                                      }
                                    </del>
                                  </span>
                                </p>
                              </div>
                              <div className="w-full flex justify-end mb-1">
                                <button
                                  onClick={() => {
                                    addToCart(item.productID);
                                  }}
                                  className="mx-2 mb-1 p-2 bg-black text-white rounded-full shadow-md
                                            hover:bg-white hover:text-black border border-black
                                            transition-all duration-300 flex items-center justify-center"
                                >
                                  <ShoppingCartIcon className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          ))}
                    </div>

                    {/* LOAD MORE */}
                    {productList.length < totalCount && (
                      <div className="w-full flex justify-center mt-8">
                        {loading1 ? (
                          <Spinner />
                        ) : (
                          <button
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            className="px-6 py-3 bg-black text-white rounded-md shadow-md hover:bg-gray-900 text-lg"
                          >
                            Load More
                          </button>
                        )}
                      </div>
                    )}
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
                w-[80vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw] xl:w-[20vw]
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
                <div className="w-full h-[100vh] flex flex-col p-5 rounded-2xl">
                  <h1 className="text-3xl font-bold mb-4 text-gray-900">
                    Filter & Sorting
                  </h1>

                  <div className="space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
                    {/* === Main Categories Accordion === */}
                    <div className="border border-gray-200 rounded-xl bg-white shadow-sm">
                      <button
                        type="button"
                        onClick={() => toggleAccordion(0)}
                        className="flex items-center justify-between w-full p-4 font-semibold text-gray-800 hover:bg-gray-50 transition-all"
                      >
                        Categories
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-300 ${
                            activeIndex === 0 ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {activeIndex === 0 && (
                        <div className="p-4 border-t border-gray-100">
                          {categories.map((cat) => (
                            <label
                              key={cat.subCategoryID}
                              className="flex items-center gap-3 mb-2"
                            >
                              <input
                                type="radio"
                                name="category"
                                checked={
                                  selectedCategoryId === cat.subCategoryID
                                }
                                onChange={() =>
                                  setSelectedCategoryId(cat.subCategoryID)
                                }
                                className="w-5 h-5 rounded accent-gray-900"
                              />
                              <span className="text-lg">
                                {cat.subCategoryName}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* === Subcategories Accordion === */}
                    {/* {selectedSubCategories.length > 0 && ( */}
                    <>
                      {selectedCategoryId &&
                        (() => {
                          const selectedCategory = categories.find(
                            (cat) => cat.subCategoryID === selectedCategoryId
                          );

                          if (
                            !selectedCategory ||
                            selectedCategory.subCategory.length === 0
                          ) {
                            return null; // don't render if no subcategories
                          }

                          return (
                            <div className="border border-gray-200 rounded-xl bg-white shadow-sm">
                              <button
                                type="button"
                                onClick={() => toggleAccordion(1)}
                                className="flex items-center justify-between w-full p-4 font-semibold text-gray-800 hover:bg-gray-50 transition-all"
                              >
                                Sub Categories
                                <ChevronDown
                                  className={`w-5 h-5 transition-transform duration-300 ${
                                    activeIndex === 1 ? "rotate-180" : ""
                                  }`}
                                />
                              </button>
                              {activeIndex === 1 && (
                                <div className="p-4 border-t border-gray-100 grid grid-cols-2 gap-2">
                                  {selectedCategory.subCategory.map((sub) => (
                                    <label
                                      key={sub.subCategoryDetailID}
                                      className="flex items-center gap-3"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={selectedSubCategories.includes(
                                          sub.subCategoryDetailID
                                        )}
                                        onChange={() =>
                                          handleSubCategoryChange(
                                            sub.subCategoryDetailID
                                          )
                                        }
                                        className="w-5 h-5 rounded accent-gray-900"
                                      />
                                      <span className="text-lg">
                                        {sub.name}
                                      </span>
                                    </label>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })()}
                    </>

                    {/* )} */}
                  </div>

                  {/* Apply Button */}
                  <button
                    // onClick={applyFilters}
                    className="mt-4 flex items-center justify-between px-4 py-3 bg-black text-white rounded-lg hover:bg-white hover:text-black transition-all duration-300"
                  >
                    Apply
                    <ArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
