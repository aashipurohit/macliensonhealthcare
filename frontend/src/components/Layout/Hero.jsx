import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Globe from 'react-globe.gl';
import { assets } from '../../assets/assets';

// ---------------------------------------------------------
// ICONS
// ---------------------------------------------------------
const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" rx="1"></rect>
    <rect x="14" y="4" width="4" height="16" rx="1"></rect>
  </svg>
);

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
    <polygon points="5 3 19 12 5 21 5 3" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"></polygon>
  </svg>
);

// ---------------------------------------------------------
// WEBGL GLOBE COMPONENT
// ---------------------------------------------------------
const WebGLGlobe = () => {
  const globeRef = useRef();
  const containerRef = useRef();
  const [countries, setCountries] = useState({ features: [] });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Load Minimal Topology Data
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(data => {
        setCountries(data);
        // Snap to India safely after the map geometry loads
        setTimeout(() => {
          if (globeRef.current) {
            globeRef.current.pointOfView({ lat: 22.7196, lng: 75.8577, altitude: 2.2 }, 0);
          }
        }, 150);
      })
      .catch(err => console.error("Could not load globe topology", err));
  }, []);

  // Responsive Resizing
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    // Initial measurement
    updateDimensions();

    // Small delay to ensure flex layout has settled
    setTimeout(updateDimensions, 100);

    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Controls Setup
  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = false; // Disable auto-rotate so India is always front and center
        controls.enableZoom = false; // Disable zoom to maintain layout lock
      }
    }
  }, []);

  // Snap to India after data loads
  useEffect(() => {
    if (globeRef.current && countries.features.length > 0) {
      globeRef.current.pointOfView({ lat: 22.7196, lng: 75.8577, altitude: 2.2 }, 0);
    }
  }, [countries]);

  // Marker & Arc Data
  const arcsData = [
    {
      startLat: 22.7196,
      startLng: 75.8577, // Indore, India
      endLat: 44.7972,
      endLng: -106.9562, // Sheridan, Wyoming, USA
      color: '#E2725B'
    }
  ];

  const ringsData = [
    { lat: 22.7196, lng: 75.8577 }, // Indore
    { lat: 44.7972, lng: -106.9562 } // Wyoming
  ];

  const labelsData = [
    { lat: 22.7196, lng: 75.8577, text: "Indore, India HQ" },
    { lat: 44.7972, lng: -106.9562, text: "USA" }
  ];

  return (
    <div ref={containerRef} className="relative w-full h-full flex justify-center items-center bg-[#faf9f8] cursor-grab active:cursor-grabbing overflow-hidden">
      {dimensions.width > 0 && (
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="#faf9f8" // Matches hero background completely
          showGlobe={false} // Hide solid sphere for a minimal, premium dotted wireframe look
          showAtmosphere={false}
          hexPolygonsData={countries.features}
          hexPolygonResolution={3}
          hexPolygonMargin={0.5} // Large margin creates the "dotted wireframe" aesthetic
          hexPolygonColor={() => '#d4cbb8'} // Soft monochromatic taupe/cream
          arcsData={arcsData}
          arcColor={() => '#E2725B'}
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={2500} // Smooth, subtle glowing transfer
          arcAltitudeAutoScale={0.4}
          ringsData={ringsData}
          ringColor={() => '#E2725B'}
          ringMaxRadius={6}
          ringPropagationSpeed={2}
          ringRepeatPeriod={1000}
          labelsData={labelsData}
          labelLat={d => d.lat}
          labelLng={d => d.lng}
          labelText={d => d.text}
          labelSize={1.8}
          labelDotRadius={0.4}
          labelColor={() => '#5A4D41'}
          labelResolution={2}
          labelAltitude={0.02}
        />
      )}

      {/* Soft helper text for interaction */}
      <div className="absolute top-2 right-2 md:top-4 md:right-4 lg:top-24 lg:right-8 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded shadow-sm flex items-center pointer-events-none opacity-90 border border-white/30 z-10">
        <span className="text-[8px] md:text-[9px] font-bold tracking-[0.15em] text-primary-900 uppercase whitespace-nowrap">
          Rotate to view USA Office
        </span>
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// PAYLOAD
// ---------------------------------------------------------
const slides = [
  {
    eyebrow: "GLOBAL REACH",
    heading: "Delivering Trusted Health Solutions Worldwide.",
    description: "From our headquarters in Indore to our facilities in the USA, Maclienson Healthcare provides premium, scientifically-validated pharmaceuticals with unparalleled care.",
    ctaText: "Discover Our Operations",
    ctaLink: "/about",
    isGlobe: true, // Triggers the WebGL Globe Component
  },
  {
    eyebrow: "UNCOMPROMISING QUALITY",
    heading: "Advanced Science for Everyday Wellness.",
    description: "We tackle the world's most pressing health concerns with pharmaceutical-grade, rigorous third-party tested supplements designed for maximum efficacy and safety.",
    ctaText: "Explore Our Standards",
    ctaLink: "/about",
    image: assets.hero_2, // Clinical Excellence
  },
  {
    eyebrow: "EMPOWERING WOMEN",
    heading: "Specialized Care for Her.",
    description: "Scientifically formulated supplements dedicated to hormonal balance, prenatal care, and comprehensive women's health needs at every stage of life.",
    ctaText: "Shop Women's Care",
    ctaLink: "/collections/all",
    image: assets.hero_3, // Women's Care
  }
];

// ---------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userPaused, setUserPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Autoplay Loop
  useEffect(() => {
    if (userPaused) return; // Completely halt if user hit the pause button

    const timer = setInterval(() => {
      nextSlide();
    }, 4000); // Strict 4 seconds interval for all slides

    return () => clearInterval(timer);
  }, [currentSlide, nextSlide, userPaused]);

  return (
    <section className="relative w-full min-h-screen lg:min-h-[75vh] flex flex-col lg:flex-row overflow-hidden bg-[#faf9f8] pt-[130px] md:pt-[150px] lg:pt-0">

      {/* Mobile Image (Visible only on mobile/tablet) */}
      <div className="w-full h-[45vh] min-h-[320px] lg:hidden relative order-1 mt-2">
        <AnimatePresence mode="wait">
          {slides[currentSlide].isGlobe ? (
            <motion.div
              key={`mobile-globe-${currentSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full bg-transparent flex items-center justify-center"
            >
              <WebGLGlobe />
            </motion.div>
          ) : (
            <motion.div
              key={`mobile-img-${currentSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full bg-transparent flex items-center justify-center px-4 pb-4"
            >
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].heading}
                className="w-full h-full object-cover rounded-[2rem] shadow-lg"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Pagination inside the relative container */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-20 pointer-events-auto">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 shadow-sm ${currentSlide === index ? 'bg-primary-600 w-6' : 'bg-gray-300/80 hover:bg-gray-400 w-2'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* LEFT SIDE - CONTENT */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:px-24 lg:pt-[140px] lg:pb-12 min-h-[400px] order-2 lg:order-1 relative z-10 bg-[#faf9f8]">
        <div className="max-w-lg w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-primary-600 mb-6 uppercase font-sans">
                {slides[currentSlide].eyebrow}
              </div>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-[4.5rem] text-primary-950 leading-[1.05] mb-6">
                {slides[currentSlide].heading}
              </h1>
              <p className="font-sans text-base md:text-lg lg:text-xl text-primary-900/70 mb-8 leading-relaxed max-w-lg">
                {slides[currentSlide].description}
              </p>
              <Link
                to={slides[currentSlide].ctaLink}
                className="inline-block px-8 py-4 bg-primary-950 text-champagne-50 font-sans text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase hover:bg-primary-800 transition-colors duration-300"
              >
                {slides[currentSlide].ctaText}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* RIGHT SIDE - MEDIA (Visible on lg and up) */}
      <div className="hidden lg:block lg:w-1/2 relative min-h-[75vh] order-2 bg-transparent">
        <AnimatePresence mode="wait">
          {slides[currentSlide].isGlobe ? (
            <motion.div
              key={`desktop-globe-${currentSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full bg-transparent flex items-center justify-center"
            >
              <WebGLGlobe />
            </motion.div>
          ) : (
            <motion.div
              key={`desktop-img-${currentSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full bg-transparent flex items-center justify-center"
            >
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].heading}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation & Controls */}
        <div className="absolute inset-0 flex flex-col justify-end px-8 pb-10 pointer-events-none z-20">

          <div className="flex items-center justify-between w-full relative">
            <button
              onClick={prevSlide}
              className="w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white text-gray-900 rounded-full shadow-lg pointer-events-auto transition-transform hover:scale-105"
              aria-label="Previous Slide"
            >
              <ChevronLeft />
            </button>

            {/* Pagination & Play/Pause */}
            <div className="flex items-center gap-6 pointer-events-auto bg-white/40 backdrop-blur-md px-6 py-3 rounded-full shadow-sm border border-white/20">
              <div className="flex gap-4 items-center">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${currentSlide === index ? 'bg-primary-600 w-8' : 'bg-white hover:bg-gray-100 w-2.5 border border-gray-200'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <div className="w-px h-5 bg-gray-400/30"></div>

              <button
                onClick={() => setUserPaused(!userPaused)}
                className="text-gray-800 hover:text-primary-600 transition-colors flex items-center justify-center"
                aria-label={userPaused ? "Play Carousel" : "Pause Carousel"}
              >
                {userPaused ? <PlayIcon /> : <PauseIcon />}
              </button>
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white text-gray-900 rounded-full shadow-lg pointer-events-auto transition-transform hover:scale-105"
              aria-label="Next Slide"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>


    </section>
  );
};

export default Hero;