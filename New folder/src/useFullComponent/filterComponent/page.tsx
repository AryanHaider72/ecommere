"use client";
import { useState } from "react";
import { ArrowDown, ArrowRight, ChevronDown } from "lucide-react";

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

export default function FilterComponent() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
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
    <div className="w-full h-[100vh] flex flex-col p-5 rounded-2xl ">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">
        Filter & Sorting
      </h1>

      <div className="space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
        {/* === Accordion Item === */}
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
                      className="w-5 h-5  focus:ring-gray-400 accent-gray-900"
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
                  <label key={category} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() =>
                        handleCheckboxChange("categories", category)
                      }
                      className="w-5 h-5  rounded focus:ring-gray-500 accent-gray-900"
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
                  <label key={category} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() =>
                        handleCheckboxChange("categories", category)
                      }
                      className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500 accent-orange-500"
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
                  <label key={color} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={filters.colors.includes(color)}
                      onChange={() => handleCheckboxChange("colors", color)}
                      className="w-5 h-5 text-black bg-gray-100 border-gray-300 rounded focus:ring-black accent-black"
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
                      onChange={() => handleCheckboxChange("sizes", size)}
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
                  <label key={material} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={filters.materials.includes(material)}
                      onChange={() =>
                        handleCheckboxChange("materials", material)
                      }
                      className="w-5 h-5 text-black bg-gray-100 border-gray-300 rounded focus:ring-black accent-black"
                    />
                    <span className="text-lg">{material}</span>
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
              <div className="p-4 border-t border-gray-100">{content}</div>
            )}
          </div>
        ))}
      </div>

      <button className="p-3 bg-black border text-lg flex justify-between items-center  border-black-400 text-white py-3 rounded hover:bg-white mt-2 hover:text-black transition-all duration-300 rounded-lg">
        Apply
        <ArrowRight />
      </button>
    </div>
  );
}
