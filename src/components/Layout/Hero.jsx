import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { assets } from "../../assets/assets"; // your local asset import

const heroSlides = [
  {
    image: assets.main_cp,
    headline: "Maclienson Healthcare Pvt. Ltd.",
    subtext: "Macliens at your Service ."
  },
  {
    image: assets.main_c3,
    headline: "Your Health, Our Priority",
    subtext: "Delivering trusted health solutions with care and precision."
  },
  {
    image: assets.main_c2,
    headline: "Experience Modern Healthcare",
    subtext: "A step ahead in medical excellence and innovation."
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef(null);

  // Start the automatic slide change after 5 seconds
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
  };

  // Stop the timer when the component is unmounted or when the user manually changes the slide
  const clearAutoTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    startTimer(); // start the timer when the component mounts
    return () => clearAutoTimer(); // cleanup on unmount
  }, []);

  // Change to the previous slide
  const goToPrevious = () => {
    clearAutoTimer(); // stop the auto timer when user manually navigates
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    startTimer(); // restart the timer for the new slide
  };

  // Change to the next slide
  const goToNext = () => {
    clearAutoTimer(); // stop the auto timer when user manually navigates
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    startTimer(); // restart the timer for the new slide
  };

  // Change slide when a bubble dot is clicked
  const goToSlide = (index) => {
    clearAutoTimer(); // stop the auto timer when user clicks a bubble
    setCurrentSlide(index);
    startTimer(); // restart the timer for the new slide
  };

  const {  headline, subtext } = heroSlides[currentSlide];

  return (
    <section className="relative h-[calc(100vh-80px)] overflow-hidden">
      {/* Background Image Container for Smooth Sliding */}
      <div className="absolute inset-0 flex transition-transform duration-1000 ease-in-out">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`w-full h-full absolute transition-transform duration-1000 ease-in-out ${
              index === currentSlide
                ? "translate-x-0"
                : index < currentSlide
                ? "-translate-x-full"
                : "translate-x-full"
            }`}
          >
            <img
              src={slide.image}
              alt={`Hero Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white px-4 text-center z-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{headline}</h1>
        <p className="text-base md:text-lg mb-6 max-w-2xl">{subtext}</p>
        <Link
          to="/products"
          className="bg-white text-black px-6 py-3 rounded-md text-base font-medium hover:bg-gray-200 transition"
        >
          Buy Now
        </Link>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white z-20 bg-black bg-opacity-40 hover:bg-opacity-70 p-2 rounded-full transition"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white z-20 bg-black bg-opacity-40 hover:bg-opacity-70 p-2 rounded-full transition"
      >
        <ChevronRight size={32} />
      </button>

      {/* Dots (Bubble navigation) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentSlide ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
