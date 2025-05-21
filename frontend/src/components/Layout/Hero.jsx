import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { assets } from "../../assets/assets";

const heroSlides = [
  {
    image: assets.main_c7,
    headline: "Experience Modern Healthcare",
    subtext: "A step ahead in medical excellence and innovation.",
  },
  {
    image: assets.main_c6,
    headline: "Your Health, Our Priority",
    subtext: "Delivering trusted health solutions with care and precision.",
  },
  {
    image: assets.main_c2,
    headline: "Maclienson Healthcare Pvt. Ltd.",
    subtext: "Macliens at your Service.",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showText, setShowText] = useState(false);
  const timerRef = useRef(null);
  const textTimerRef = useRef(null);

  const startTimers = () => {
    setShowText(false);

    // Show text after 1 second
    textTimerRef.current = setTimeout(() => {
      setShowText(true);
    }, 1000);

    // Move to next slide after 5 seconds
    timerRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
  };

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (textTimerRef.current) clearTimeout(textTimerRef.current);
  };

  useEffect(() => {
    startTimers();
    return () => clearTimers();
  }, [currentSlide]);

  const goToPrevious = () => {
    clearTimers();
    setCurrentSlide((prev) =>
      prev === 0 ? heroSlides.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    clearTimers();
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const goToSlide = (index) => {
    clearTimers();
    setCurrentSlide(index);
  };

  const {  headline, subtext } = heroSlides[currentSlide];

  return (
    <section className="relative h-[calc(120vh-300px)] overflow-hidden">
      {/* Background Images */}
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
              className="w-full h-full object-cover "
            />
          </div>
        ))}
      </div>

      {/* Overlay with delayed text */}
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-end text-white px-4 pb-50 text-center z-10">

        {showText && (
          <div
            key={currentSlide}
            className="max-w-4xl opacity-0 translate-y-8 animate-fadeInUp"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{headline}</h1>
            <p className="text-base md:text-lg mb-6">{subtext}</p>
          </div>
        )}
      </div>

      {/* Arrows */}
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

      {/* Dots */}
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
