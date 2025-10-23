"use client";
import {
  ChevronDown,
  Heart,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import SearchCom from "@/useFullComponent/SearchComponent/page";
import CartComponent from "@/useFullComponent/CartComponent/page";

export default function Navbar({
  onPageChange,
}: {
  onPageChange: (page: string) => void;
}) {
  const [searchComponentVisible, setSearchComponentVisible] = useState(false);
  const [cartComponentVisible, setCartComponentVisible] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showOverlay2, setShowOverlay2] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [selectedLang, setSelectedLang] = useState("English");
  const [selectedCurrency, setSelectedCurrency] = useState("Dollor");
  const [isOpenLang, setIsOpenLang] = useState(false);
  const [isOpenCurrency, setIsOpenCurrency] = useState(false);

  // ✅ Automatically close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openSearch = () => {
    setShowOverlay(true);
    setTimeout(() => setSearchComponentVisible(true), 10);
  };

  const closeSearch = () => {
    setSearchComponentVisible(false);
    setTimeout(() => setShowOverlay(false), 500);
  };

  const openCart = () => {
    setShowOverlay2(true);
    setTimeout(() => setCartComponentVisible(true), 10);
  };

  const closeCart = () => {
    setCartComponentVisible(false);
    setTimeout(() => setShowOverlay2(false), 500);
  };

  return (
    <>
      {/* 🔹 Topbar */}
      <div className="w-full bg-gray-700 py-2 px-6 flex justify-around items-center">
        <div className="flex gap-4 items-center">
          <p className="text-sm text-gray-200">Welcome To Our Platform</p>
          <div className="flex items-center">
            <Phone className="w-4 h-4 text-white mr-2" color="orange" />
            <p className="text-white text-sm">Call-Us: +12-345-67890</p>
          </div>
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
              <span className="text-sm md:text-lg">{selectedLang}</span>
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
                      className={`px-3 py-2 cursor-pointer hover:bg-orange-500 hover:text-white transition-colors ${
                        selectedLang === lang ? "bg-orange-100" : ""
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
              <span className="text-sm md:text-lg">{selectedCurrency}</span>
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
                      className={`px-3 py-2 cursor-pointer hover:bg-orange-500 hover:text-white transition-colors ${
                        selectedCurrency === currency ? "bg-orange-100" : ""
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

      <nav className="bg-white p-4 flex justify-between items-center px-6 relative shadow">
        <h1 className="text-xl font-extrabold">N.</h1>

        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6">
            <li>
              <a
                href="#"
                className="text-gray-800 hover:text-orange-500"
                onClick={() => onPageChange("home")}
              >
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 hover:text-orange-500">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 hover:text-orange-500">
                Blogs
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 hover:text-orange-500">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 hover:text-orange-500">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-3">
            <button className="group" title="Search" onClick={openSearch}>
              <Search className="w-5 h-5 group-hover:text-orange-500 transition" />
            </button>

            <button
              className="group"
              title="User"
              onClick={() => onPageChange("login")}
            >
              <User className="w-5 h-5 group-hover:text-orange-500 transition" />
            </button>

            <button className="relative group" title="Wishlist">
              <Heart className="w-5 h-5 group-hover:text-orange-500 transition" />
              <span className="absolute -top-2 -right-1 bg-orange-500 text-white px-1.5 rounded-full text-[10px]">
                0
              </span>
            </button>

            <button className="relative group" title="Cart" onClick={openCart}>
              <ShoppingCart className="w-5 h-5 group-hover:text-orange-500 transition" />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white px-1.5 rounded-full text-[10px]">
                1
              </span>
            </button>
          </div>
        </div>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={`fixed top-0 left-0 h-full w-2/3 bg-white shadow-lg z-50 p-6 transform transition-transform duration-500 ease-in-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">Menu</h1>
            <button
              className="text-gray-600"
              onClick={() => setMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <ul className="flex flex-col gap-4">
            {["Home", "Shop", "Blogs", "About Us", "Contact Us"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  onClick={() => {
                    onPageChange(item.toLowerCase().replace(" ", ""));
                    setMenuOpen(false);
                  }}
                  className="block text-gray-700 hover:text-orange-500"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex gap-4 mt-6">
            <button className="group" title="Search" onClick={openSearch}>
              <Search className="w-5 h-5 group-hover:text-orange-500 transition" />
            </button>

            <button
              className="group"
              title="User"
              onClick={() => onPageChange("login")}
            >
              <User className="w-5 h-5 group-hover:text-orange-500 transition" />
            </button>

            <button className="relative group" title="Wishlist">
              <Heart className="w-5 h-5 group-hover:text-orange-500 transition" />
              <span className="absolute -top-2 -right-1 bg-orange-500 text-white px-1.5 rounded-full text-[10px]">
                0
              </span>
            </button>

            <button className="relative group" title="Cart" onClick={openCart}>
              <ShoppingCart className="w-5 h-5 group-hover:text-orange-500 transition" />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white px-1.5 rounded-full text-[10px]">
                1
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* 🔹 Search Overlay */}
      {showOverlay && (
        <div
          className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
            searchComponentVisible
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={closeSearch}
        >
          <div
            className={`absolute top-0 left-0 w-full h-[30vh] bg-white p-4 flex justify-center items-center shadow-md transition-all duration-300 ${
              searchComponentVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-10 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <SearchCom />
            <button
              title="Close"
              className="absolute top-4 right-10 text-gray-500 hover:text-red-500"
              onClick={closeSearch}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* 🔹 Cart Overlay */}
      {showOverlay2 && (
        <div
          className={`fixed inset-0 z-50 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
            cartComponentVisible
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={closeCart}
        >
          <div
            className={`fixed top-0 right-0 w-[50vh] bg-white p-4 flex  shadow-md transition-all duration-500 ${
              cartComponentVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <CartComponent />
            <button
              title="Close"
              className="absolute top-4 right-6 text-gray-500 hover:text-red-500"
              onClick={closeCart}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
