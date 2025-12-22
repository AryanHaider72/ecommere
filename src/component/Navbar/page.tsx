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
import { useRouter } from "next/navigation";
import GetNavbar from "@/api/lib/HomePage/Navbar/Navbar";
import {
  Category,
  NavbarApiResponse,
} from "@/api/types/HomePage/Navbar/Navbar";

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
  const [categories, setCategories] = useState<Category[]>([]);

  const router = useRouter();

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
  const wishlist = () => {
    window.location.href = "/WishList";
  };
  const handleShowCategories = async () => {
    const token = localStorage.getItem("token");
    const response = await GetNavbar(token || "");
    const data = response.data as NavbarApiResponse;
    if (response.status === 200 || response.status === 201) {
      console.log(data.categoryList);
      setCategories(data?.categoryList ?? []);
    } else {
      setCategories([]);
    }
  };

  useEffect(() => {
    handleShowCategories();
  }, []);
  return (
    <>
      <nav className="sticky top-0 z-50 bg-white p-4 flex justify-around items-center px-6 relative shadow">
        <a href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-8 w-auto object-contain"
          />
        </a>

        {/* --- Main Navbar Links (Desktop) --- */}
        <div className="hidden md:flex items-center gap-6 relative">
          <ul className="flex gap-6">
            {categories.map((category) => (
              <li key={category.subCategoryID} className="relative group">
                {/* Category Name */}
                <button className="text-gray-800 font-bold hover:text-blue-500 transition capitalize">
                  {category.subCategoryName.toUpperCase()}
                </button>

                {/* Dropdown */}
                {category.subCategory?.length > 0 ? (
                  <div
                    className="absolute left-0 top-full mt-2 w-64 bg-white shadow-lg rounded-md p-4 
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible
                    transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50"
                  >
                    <ul className="space-y-2">
                      {category.subCategory.map((item: any) => (
                        <li key={item.subCategoryDetailID}>
                          <a
                            // href={`/shop?category=${item.subCategoryDetailID}`}
                            className="flex flex-col gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer"
                          >
                            {item.name.toUpperCase()}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <ul className="space-y-2"></ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-3">
            <button className="group" title="Search" onClick={openSearch}>
              <Search className="w-5 h-5 group-hover:text-blue-500 transition" />
            </button>

            <button
              className="group"
              title="User"
              onClick={() => {
                onPageChange("login");
                router.push("/login");
              }}
            >
              <User className="w-5 h-5 group-hover:text-blue-500 transition" />
            </button>

            <button
              className="relative group"
              title="Wishlist"
              onClick={wishlist}
            >
              <Heart className="w-5 h-5 group-hover:text-blue-500 transition" />
              <span className="absolute -top-2 -right-1 bg-blue-500 text-white px-1.5 rounded-full text-[10px]">
                0
              </span>
            </button>

            <button className="relative group" title="Cart" onClick={openCart}>
              <ShoppingCart className="w-5 h-5 group-hover:text-blue-500 transition" />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white px-1.5 rounded-full text-[10px]">
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
            {["Home", "Men", "Women", "Children", "Shop"].map((item) => (
              <li key={item}>
                <a
                  href="/"
                  onClick={() => {
                    onPageChange(item.toLowerCase().replace(" ", ""));
                    setMenuOpen(false);
                  }}
                  className="block text-gray-700 hover:text-blue-500"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex gap-4 mt-6">
            <button className="group" title="Search" onClick={openSearch}>
              <Search className="w-5 h-5 group-hover:text-blue-500 transition" />
            </button>

            <button
              className="group"
              title="User"
              onClick={() => onPageChange("login")}
            >
              <User className="w-5 h-5 group-hover:text-blue-500 transition" />
            </button>

            <button className="relative group" title="Wishlist">
              <Heart className="w-5 h-5 group-hover:text-blue-500 transition" />
              <span className="absolute -top-2 -right-1 bg-blue-500 text-white px-1.5 rounded-full text-[10px]">
                0
              </span>
            </button>

            <button className="relative group" title="Cart" onClick={openCart}>
              <ShoppingCart className="w-5 h-5 group-hover:text-blue-500 transition" />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white px-1.5 rounded-full text-[10px]">
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
