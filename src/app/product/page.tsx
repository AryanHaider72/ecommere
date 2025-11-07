"use client";
import { useRef, useState } from "react";
import { Star, Send, UserCircle } from "lucide-react";
import {
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  CreditCard,
  Heart,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import Footer from "@/component/Footer/page";
import Navbar from "@/component/Navbar/page";
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

export default function ProductPage() {
  const [productPage, setProductPage] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [activeSize, setActiveSize] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("center");
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [newReview, setNewReview] = useState({
    name: "",
    message: "",
    rating: 0,
  });
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Ali Khan",
      message: "Excellent quality and fast delivery! Totally worth the price.",
      rating: 5,
      date: "2 days ago",
    },
    {
      id: 2,
      name: "Sarah Ahmed",
      message: "Good product but packaging could be improved.",
      rating: 4,
      date: "5 days ago",
    },
    {
      id: 3,
      name: "Sarah Ahmed",
      message: "Good product but packaging could be improved.",
      rating: 4,
      date: "5 days ago",
    },
    {
      id: 4,
      name: "Sarah Ahmed",
      message: "Good product but packaging could be improved.",
      rating: 4,
      date: "5 days ago",
    },
  ]);
  const handleRating = (rating: number) => {
    setNewReview({ ...newReview, rating });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.message || !newReview.rating) return;
    const newEntry = {
      ...newReview,
      id: Date.now(),
      date: "Just now",
    };
    setReviews([newEntry, ...reviews]);
    setNewReview({ name: "", message: "", rating: 0 });
  };
  const images = ["/collection1.jpg", "/collection2.jpg", "/collection3.jpg"];

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
  const handleMouseMove = (e: any) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.pageX - rect.left) / rect.width) * 100;
    const y = ((e.pageY - rect.top) / rect.height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  return (
    <>
      <Navbar onPageChange={handleNavClick} />

      <div className="flex flex-col items-center w-full min-h-[calc(100vh-200px)]  px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">SHOP</h1>
        <hr className="w-1/2 border-gray-300 mb-10" />

        {/* === PRODUCT SECTION === */}
        <div className="flex flex-col md:flex-row justify-between gap-10 w-full max-w-6xl">
          {/* === IMAGE SECTION === */}
          <div className="relative w-full md:w-1/2 flex flex-col items-center">
            {/* === MAIN IMAGE === */}
            <div
              ref={imageRef}
              className="relative w-full h-[400px] sm:h-[500px] md:h-[700px] overflow-hidden rounded-2xl shadow-md"
              onMouseEnter={() =>
                window.innerWidth >= 1024 && setZoomVisible(true)
              }
              onMouseLeave={() => setZoomVisible(false)}
              onMouseMove={(e) =>
                window.innerWidth >= 1024 && handleMouseMove(e)
              }
            >
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
                    className="object-contain rounded-2xl"
                    priority={index === 0}
                  />
                </div>
              ))}

              {/* === DOTS === */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentIndex === index
                        ? "bg-white scale-110 shadow-md"
                        : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* === THUMBNAIL PREVIEWS === */}
            <div className="flex justify-center mt-4 gap-3 flex-wrap">
              {images.map((src, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative w-15 h-20 sm:w-14 sm:h-14 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-300 ${
                    currentIndex === index
                      ? "border-blue-500 shadow-md scale-105"
                      : "border-gray-200 hover:scale-105"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* === ZOOM PREVIEW (Only visible on desktop) === */}
            {zoomVisible && (
              <div
                className="hidden lg:block absolute top-0 left-full ml-6 w-[300px] h-[400px] border-2 border-gray-300 rounded-xl shadow-2xl bg-white/10 backdrop-blur-md overflow-hidden"
                style={{
                  backgroundImage: `url(${images[currentIndex]})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: backgroundPosition,
                  backgroundSize: "200%",
                }}
              ></div>
            )}
          </div>

          {/* === INFO SECTION === */}
          <div className="flex flex-col justify-center md:w-1/2 space-y-6 text-gray-800">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Beige Trouser New | Ladies Fashion
            </h1>

            {/* Ratings */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
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

            {/* Price Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                MRP:{" "}
                <span>
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

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed">
              Elegant beige trousers for everyday and formal wear. Crafted with
              soft fabric for comfort and style. Available in all sizes.
            </p>

            {/* Sizes */}
            <div>
              <h3 className="text-md font-bold mb-2">Sizes</h3>
              <div className="flex gap-2">
                {["sm", "md", "lg", "xl"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setActiveSize(size)}
                    className={`w-10 h-10 font-bold text-sm p-2 shadow-md border border-gray-100 rounded-full ${
                      activeSize === size
                        ? "bg-gray-900 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center w-36 justify-between border border-gray-200 rounded-lg bg-gray-50 px-3 py-2 shadow-sm">
              <button className="p-1 bg-white hover:bg-gray-100 shadow-sm rounded">
                <Minus size={16} />
              </button>
              <p className="text-lg font-medium">1</p>
              <button className="p-1 bg-white hover:bg-gray-100 shadow-sm rounded">
                <Plus size={16} />
              </button>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button className="w-full sm:w-1/2 bg-black text-white py-3 rounded-lg font-medium hover:bg-white hover:text-black border border-black transition-all duration-300">
                <div className="flex justify-center items-center gap-2">
                  <ShoppingCart size={18} />
                  <span>Add to Cart</span>
                </div>
              </button>
              <button className="w-full sm:w-1/2 bg-black text-white py-3 rounded-lg font-medium hover:bg-white hover:text-black border border-black transition-all duration-300">
                <div className="flex justify-center items-center gap-2">
                  <CreditCard size={18} />
                  <span>Buy Now</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* === SUGGESTED PRODUCTS === */}
      <div className="w-full max-w-7xl mx-auto mt-16 px-4">
        <h2 className="text-2xl  flex justify-start font-semibold text-gray-900 mb-3 text-center">
          Suggested For You
        </h2>
        {/* <hr className="w-1/2 mb-3 text-gray-400" /> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.map((item) => (
            <div
              key={item.id}
              className="w-full bg-white border border-gray-200 rounded-lg shadow-sm 
                 transform transition-all duration-300 ease-in-out 
                 hover:scale-[1.02] hover:shadow-lg"
            >
              {/* Product Image */}
              <div className="relative w-full h-[420px] overflow-hidden rounded-t-lg group">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover bg-white group-hover:scale-105 transition-transform duration-500"
                  onClick={product}
                />

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="bg-white p-2 rounded-full shadow hover:bg-red-100 transition">
                    <Heart className="text-gray-700 w-4 h-4" />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow hover:bg-green-100 transition">
                    <ShoppingCart className="text-gray-700 w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setProductPage(true)}
                    className="bg-white p-2 rounded-full shadow hover:bg-blue-100 transition"
                  >
                    <Search className="text-gray-700 w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 space-y-2">
                <h5 className="text-lg font-semibold text-gray-900 truncate">
                  {item.name}
                </h5>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* === Load More Button === */}
        <div className="flex flex-col items-center mt-10">
          <p className="text-gray-500 mb-2 text-sm">
            312 of 550 products shown
          </p>
          <div className="w-1/3 bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gray-900 h-2.5 rounded-full transition-all duration-500"
              style={{ width: "45%" }}
            ></div>
          </div>
          <button className="mt-4 px-6 py-3 bg-black text-white rounded-md shadow hover:bg-gray-900 transition-all duration-300">
            Load More
          </button>
        </div>
      </div>
      <div className="w-full max-w-6xl mx-auto mt-16 mb-16 px-4">
        <h2 className="text-2xl font-bold flex justify-start text-gray-900 mb-8 text-center">
          Customer Reviews & Ratings
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* === LEFT: Review Form (Fixed) === */}
          <div className="relative">
            <div className="sticky top-24">
              <form
                onSubmit={handleSubmit}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Write a Review
                </h3>

                {/* Name Field */}
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview({ ...newReview, name: e.target.value })
                  }
                />

                {/* Message Field */}
                <textarea
                  placeholder="Share your experience..."
                  rows={4}
                  className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  value={newReview.message}
                  onChange={(e) =>
                    setNewReview({ ...newReview, message: e.target.value })
                  }
                ></textarea>

                {/* Star Rating */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-gray-700 font-medium mr-2">
                    Your Rating:
                  </span>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      onClick={() => handleRating(i + 1)}
                      className={`w-6 h-6 cursor-pointer transition ${
                        i < newReview.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 hover:text-yellow-400"
                      }`}
                    />
                  ))}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition"
                >
                  <Send className="w-4 h-4" /> Submit Review
                </button>
              </form>
            </div>
          </div>

          {/* === RIGHT: Scrollable Reviews === */}
          <div className="w-full max-h-[600px] overflow-y-auto pr-2 space-y-5 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  <UserCircle className="w-8 h-8 text-gray-400" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {review.name}
                    </h4>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-700 text-sm leading-relaxed">
                  {review.message}
                </p>
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
                with soft fabric for comfort and style. Available in all sizes.
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
      <Footer />
    </>
  );
}
