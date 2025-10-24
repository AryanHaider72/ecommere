// components/AutoCarousel.js
import { useState, useEffect } from "react";

const AutoCarousel = () => {
  const slides = [
    { src: "/new3.jpg", alt: "Slide 1" },
    { src: "/new4.png", alt: "Slide 3" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0); // Reset to 0 since you have only 2 slides now (index 2 would be out of bounds)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance every 3 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Manual navigation
  const goToPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % slides.length);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      id="animation-carousel"
      className="relative w-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      role="region"
      aria-label="Image Carousel"
    >
      {/* Carousel wrapper */}
      <div
        className="relative h-auto overflow-hidden md:h-96"
        style={{ height: "70vh" }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-200 ease-linear ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== currentIndex}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              style={{ objectPosition: "center" }}
            />
            {/* Overlay div for the linear gradient on top of the image */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))",
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Text overlay - Made responsive */}
      <div className="absolute top-1/2 left-4 md:left-1/4 transform -translate-y-1/2 text-white z-20 max-w-xs md:max-w-md lg:max-w-lg">
        <h1 className="text-xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
          Discover Stylish Essentials – Up to 50% Off!
        </h1>
        <p className="mt-2 text-sm md:text-base lg:text-lg leading-relaxed">
          Elevate your wardrobe with our curated collection of trendy dresses
          and accessories. Shop now and enjoy free shipping on orders over $50 –
          limited stock available!
        </p>
        {/* Shop Now button - Integrated and fixed */}
        <button className="bg-blue-500 text-md mt-4 text-white border border-blue-500 rounded px-6 py-2 hover:bg-transparent hover:text-white transition-colors duration-200">
          Shop Now
        </button>
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToPrev}
        aria-label="Previous slide"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToNext}
        aria-label="Next slide"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default AutoCarousel;
