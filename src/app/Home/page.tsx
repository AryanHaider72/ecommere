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
  ArrowDownIcon,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Ellipsis,
  Facebook,
  Filter,
  Headphones,
  Heart,
  Info,
  Instagram,
  Linkedin,
  MessageCircle,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  ShoppingCart,
  ShoppingCartIcon,
  Star,
  Truck,
  Twitter,
  X,
} from "lucide-react";
import ProductInfoPage from "@/useFullComponent/productInfo/page";

import GetProduct from "@/api/lib/product/GetProduct/GetProduct";
import {
  GetProductHomeApiResponse,
  ProductHomePage,
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
  const router = useRouter();
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
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [listVarient, setListVarient] = useState<Varient[]>([]);
  const [listImages, setListImages] = useState<ImagesList>({ listImage: [] });
  const [NumberofProduct, setNumberofProduct] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [CartData, setCartData] = useState<CartData[]>([]);
  const [pageIndex, setPageIndex] = useState(0);

  const [totalCount, setTotalCount] = useState(0);
  const [productList, setProductList] = useState<ProductHomePage[]>([]);
  const [productListFeatured, setProductListFeatured] = useState<
    ProductHomePage[]
  >([]);
  const [imageUrl, setImageUrl] = useState("");
  const [cartList, setCartList] = useState<CartData[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const features = [
    {
      icon: <Headphones size={32} className="text-primary" />,
      title: "24/7 Customer Support",
      description:
        "Our dedicated support team is available around the clock to assist you whenever you need help.",
    },
    {
      icon: <Truck size={32} className="text-primary" />,
      title: "Free Shipping",
      description:
        "Enjoy free and fast shipping on all orders with no hidden charges.",
    },
    {
      icon: <Star size={32} className="text-primary" />,
      title: "Premium Quality",
      description: "We provide top-quality products and highest standards.",
    },
  ];
  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const scrollLefts = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const getProduct = async () => {
    if (loading1 || !hasMore) return;

    try {
      setLoading1(true);

      const token = localStorage.getItem("token") ?? "";
      const response = await GetProductHome(token);

      if (response.status === 200 || response.status === 201) {
        const data = response.data as GetProductHomeApiResponse;
        console.log(data.productList);
        setProductList(data.productList);
        setTotalCount(data.totalCount);
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
      (item: any) => item.productID === productID
    );
    if (data) {
      setProductName(data.productName);
      setDiscount(data.discount.toString());
      setDescription(data.description);
      setImageUrl(data.images[0].url);
      setListImages({
        listImage: data.images.map((img: any) =>
          img.urlID ? { urlID: img.urlID, url: img.url } : { url: img.url }
        ),
      });
      if (data.variants[0].variantValues[0].qty === 0) {
        setAmount(String(data.variants[0].variantValues[1].salePrice));
      } else {
        setAmount(String(data.variants[0].variantValues[0].salePrice));
      }
      setListVarient(
        data.variants.map((variant: any) => ({
          varientName: variant.variantName,
          varientAttributes: variant.variantValues.map((attr: any) => ({
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
    getProduct();
    serverCartData();
  }, []);

  const handleSubCategoryChange = (id: string) => {
    setSelectedSubCategories((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredProducts = productList.filter((product) => {
    if (product.storeSale === "OfflineStore") return false;
    if (product.subCategoryID !== selectedCategoryId) {
      return false;
    }
    if (
      selectedSubCategories.length > 0 &&
      !selectedSubCategories.includes(product.subCategoryDetailID)
    ) {
      console.log(
        "Filtered out by subCategoryDetailID",
        product.subCategoryDetailID
      );
      return false;
    }
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
        const token = localStorage.getItem("token1");
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

  // const addToCart = async (ID: string) => {
  //   try {
  //     const data = productList.find((item) => item.productID === ID);
  //     if (!data) return;

  //     const price =
  //       data.variants[0].variantValues[0].salePrice === 0
  //         ? data.variants[0].variantValues[1].salePrice
  //         : data.variants[0].variantValues[0].salePrice;

  //     const newItem: CartData = {
  //       productID: data.productID,
  //       productName: data.productName,
  //       weight: data.weight,
  //       storeID: data.storeID,
  //       storeName: data.storeName,
  //       description: data.description,
  //       quantity: 1,
  //       discount: data.discount,
  //       salePrice: price,
  //       image: data.images?.[0]?.url,
  //     };

  //     const currentCart = await getServerCart();
  //     const updatedCart = [...currentCart, newItem];

  //     const res = await addToServerCart(updatedCart);
  //     if (res) {
  //       checkAuth(ID);
  //     }
  //     serverCartData();
  //     setCartList(updatedCart);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleShowCategories = async () => {
    const token = localStorage.getItem("token");
    const response = await GetNavbar(token || "");
    const data = response.data as NavbarApiResponse;
    if (response.status === 200 || response.status === 201) {
      setCategories(data?.categoryList ?? []);
      console.log(data.categoryList);
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
    <div className="w-full min-h-screen bg-white">
      <div className="w-full  flex justify-between text-sm p-2">
        <div className="flex items-center gap-3 mx-3">
          <a
            href="#"
            className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 text-black font-bold  
               hover:bg-blue-600 hover:text-white transition-colors duration-300"
          >
            <Facebook size={10} />
          </a>

          <a
            href="#"
            className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 text-black font-bold  
               hover:bg-pink-500 hover:text-white transition-colors duration-300"
          >
            <Instagram size={10} />
          </a>
          <a
            href="#"
            className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 text-black font-bold 
               hover:bg-sky-500 hover:text-white transition-colors duration-300"
          >
            <Twitter size={10} />
          </a>
          <a
            href="#"
            className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 text-black font-bold  
               hover:bg-blue-700 hover:text-white transition-colors duration-300"
          >
            <Linkedin size={10} />
          </a>
        </div>
        <div>
          <h1 className="absolute left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
            Free Shipping on All Orders Above 2000-/ 🚚
          </h1>
        </div>
      </div>
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
            <div className="w-full py-5 bg-gray-100 border border-gray-200 shadow-md flex justify-center items-center">
              <div className="w-full max-w-4xl px-6  text-center">
                <h2 className="text-3xl font-bold">Shop Your Style</h2>
                <p className=" mb-4">
                  Find the perfect look for every occasion
                </p>
                <div className="flex w-full justify-center gap-10">
                  {categories.map((item) => (
                    <div
                      className="flex flex-col hover:underline transition-transform  cursor-pointer"
                      onClick={() => {
                        router.push(`${item.subCategoryID}/shop`);
                      }}
                      key={item.subCategoryID}
                    >
                      <img
                        src={item?.imageList[0]?.url || "/collection1.jpg"}
                        className={`w-20 h-20 bg-black rounded-full hover:scale-[1.05] transition-transform`}
                      />
                      <p className="mt-2 text-md font-bold ">
                        {item.subCategoryName}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Top Collection Section */}
            <div className="w-full  mt-2 mb-2">
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
                                  (item: any) =>
                                    item.storeSale !== "OfflineStore"
                                )
                                .slice(0, 8)
                                .map((item: any) => (
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

                {loading1 || filteredProducts.length > 0 ? (
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
                              onClick={() =>
                                router.push(`/shop/${item.productID}`)
                              }
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
                            onClick={() => getProduct()}
                            className="px-6 py-3 bg-black text-white rounded-md shadow-md hover:bg-gray-900 text-lg"
                          >
                            Load More
                          </button>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <p>No products found for selected filters.</p>
                )}
              </div>
            </div>
            <section className="py-16 ">
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                  Why Choose Us
                </h2>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition"
                    >
                      <div className="flex justify-center mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <div className="w-full py-16 my-5   flex justify-center items-center">
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
      </main>
      <a
        href="https://wa.me/+923709143934"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 
                 w-14 h-14 rounded-full 
                 bg-green-500 text-white 
                 flex items-center justify-center
                 shadow-lg hover:bg-green-600 
                 hover:scale-110 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}
