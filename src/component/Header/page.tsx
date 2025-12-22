import { useState, useEffect } from "react";

const AutoCarousel = () => {
  const slides = [
    { src: "/new3.jpg", alt: "Slide 1" },
    { src: "/new4.png", alt: "Slide 2" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [animateText, setAnimateText] = useState(true);

  // Auto slide
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Re-trigger text animation on slide change
  useEffect(() => {
    setAnimateText(false);
    const timeout = setTimeout(() => setAnimateText(true), 50);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const goToPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % slides.length);

  return (
    <div
      className="relative w-full overflow-hidden bg-gray-200"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      role="region"
      aria-label="Image Carousel"
    >
      {/* SLIDES */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* TEXT CONTENT */}
      <div className="absolute inset-0 flex items-center mx-5">
        <div className="px-4 sm:px-10 md:px-16 max-w-xl text-white">
          <h1
            className={`text-xl sm:text-3xl lg:text-4xl font-extrabold leading-tight ${
              animateText ? "animate-slide-in" : "opacity-0"
            }`}
          >
            Discover Stylish Essentials – Up to 50% Off!
          </h1>

          <p
            className={`mt-3 text-sm sm:text-base lg:text-lg ${
              animateText ? "animate-slide-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.15s" }}
          >
            Elevate your wardrobe with our curated collection of trendy dresses
            and accessories. Shop now and enjoy exclusive deals.
          </p>
        </div>
      </div>

      {/* CONTROLS */}
      <button
        onClick={goToPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 p-3 rounded-full"
      >
        ❮
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 p-3 rounded-full"
      >
        ❯
      </button>
    </div>
  );
};

export default AutoCarousel;
