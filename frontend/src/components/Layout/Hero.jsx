import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// SVG World Map paths (simplified dot-matrix style continents)
const CONTINENT_DOTS = [];
const GLOBE_RADIUS = 250;

// Generate dot-matrix globe points
function generateDots() {
  const dots = [];
  for (let lat = -90; lat <= 90; lat += 4) {
    for (let lon = -180; lon <= 180; lon += 4) {
      if (isLand(lat, lon)) {
        dots.push({ lat, lon });
      }
    }
  }
  return dots;
}

// Simplified land mask (approximate continent bounding boxes)
function isLand(lat, lon) {
  // North America
  if (lat >= 15 && lat <= 72 && lon >= -168 && lon <= -52) {
    if (lat >= 25 && lon >= -125 && lon <= -65) return true;
    if (lat >= 15 && lat <= 30 && lon >= -118 && lon <= -85) return true;
    if (lat >= 45 && lon >= -140 && lon <= -55) return true;
  }
  // South America
  if (lat >= -56 && lat <= 13 && lon >= -82 && lon <= -34) return true;
  // Europe
  if (lat >= 35 && lat <= 71 && lon >= -10 && lon <= 40) return true;
  // Africa
  if (lat >= -35 && lat <= 37 && lon >= -18 && lon <= 52) return true;
  // Asia
  if (lat >= 0 && lat <= 75 && lon >= 25 && lon <= 180) return true;
  if (lat >= -10 && lat <= 10 && lon >= 95 && lon <= 141) return true;
  // Australia
  if (lat >= -44 && lat <= -11 && lon >= 114 && lon <= 154) return true;
  return false;
}

const DOTS = generateDots();

const MARKERS = [
  { lat: 22.7196, lon: 75.8577, label: 'Indore, India' },
  { lat: 37.0902, lon: -95.7129, label: 'USA Facility' },
];

function project(lat, lon, rotY, radius) {
  const latRad = (lat * Math.PI) / 180;
  const lonRad = ((lon + rotY) * Math.PI) / 180;
  const x = radius * Math.cos(latRad) * Math.sin(lonRad);
  const y = radius * Math.sin(latRad);
  const z = radius * Math.cos(latRad) * Math.cos(lonRad);
  return { x, y, z };
}

const Hero = () => {
  const [rotY, setRotY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);
  const rotRef = useRef(0);
  const rafRef = useRef(null);

  // Auto-rotate
  useEffect(() => {
    const animate = () => {
      if (!dragging) {
        rotRef.current += 0.15;
        setRotY(rotRef.current);
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [dragging]);

  const handleMouseDown = (e) => {
    setDragging(true);
    dragStart.current = { x: e.clientX, rotY: rotRef.current };
  };

  const handleMouseMove = (e) => {
    if (!dragging || !dragStart.current) return;
    const delta = e.clientX - dragStart.current.x;
    rotRef.current = dragStart.current.rotY + delta * 0.3;
    setRotY(rotRef.current);
  };

  const handleMouseUp = () => setDragging(false);

  const handleTouchStart = (e) => {
    setDragging(true);
    dragStart.current = { x: e.touches[0].clientX, rotY: rotRef.current };
  };

  const handleTouchMove = (e) => {
    if (!dragging || !dragStart.current) return;
    const delta = e.touches[0].clientX - dragStart.current.x;
    rotRef.current = dragStart.current.rotY + delta * 0.3;
    setRotY(rotRef.current);
  };

  const cx = 300;
  const cy = 300;
  const R = 240;

  // Filter visible dots (z > 0 = facing camera)
  const visibleDots = DOTS.map((d) => {
    const p = project(d.lat, d.lon, rotY, R);
    return { ...p, visible: p.z > 0 };
  });

  const visibleMarkers = MARKERS.map((m) => {
    const p = project(m.lat, m.lon, rotY, R);
    return { ...m, ...p, visible: p.z > 5 };
  });

  return (
    <section className="relative w-full overflow-hidden bg-[#faf7f2] pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">

          {/* LEFT: Copy & CTA */}
          <div className="max-w-2xl z-10">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center rounded-full border border-[#e8d5b0] bg-white/60 px-4 py-1.5 text-sm font-semibold text-[#3d1f0f] shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a24a35] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#a24a35]"></span>
              </span>
              Global Operations in USA & India
            </div>

            {/* Heading */}
            <h1 className="font-serif mb-6 text-5xl font-bold leading-tight text-[#3d1f0f] md:text-6xl lg:text-7xl">
              Delivering Trusted Health Solutions Worldwide.
            </h1>

            {/* Body */}
            <p className="mb-10 text-lg md:text-xl max-w-lg text-[#3d1f0f]/70 leading-relaxed">
              From our headquarters in Indore to our facilities in the USA, Maclienson Healthcare provides premium, scientifically-validated pharmaceuticals with unparalleled care.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/collections/all"
                className="rounded-full bg-[#a24a35] px-8 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-[#8a3d2b] hover:shadow-lg"
              >
                Explore Products
              </Link>
              <Link
                to="/about"
                className="rounded-full border-2 border-[#3d1f0f] px-8 py-3 text-lg font-semibold text-[#3d1f0f] transition hover:bg-[#3d1f0f] hover:text-white"
              >
                Our Global Reach
              </Link>
            </div>
          </div>

          {/* RIGHT: SVG Globe */}
          <div
            className="relative flex justify-center items-center select-none"
            style={{ cursor: dragging ? 'grabbing' : 'grab' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            <svg
              viewBox="0 0 600 600"
              width="100%"
              style={{ maxWidth: 560 }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Atmospheric glow */}
                <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="70%" stopColor="#e8d5b0" stopOpacity="0" />
                  <stop offset="100%" stopColor="#e8c97a" stopOpacity="0.35" />
                </radialGradient>
                {/* Sphere shading */}
                <radialGradient id="sphereShade" cx="38%" cy="35%" r="60%">
                  <stop offset="0%" stopColor="#5a6475" stopOpacity="0.0" />
                  <stop offset="100%" stopColor="#1a1e26" stopOpacity="0.55" />
                </radialGradient>
                {/* Clip to circle */}
                <clipPath id="globeClip">
                  <circle cx={cx} cy={cy} r={R} />
                </clipPath>
                {/* Marker pulse */}
                <radialGradient id="markerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#e06040" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#e06040" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Outer glow ring */}
              <circle cx={cx} cy={cy} r={R + 18} fill="url(#globeGlow)" />

              {/* Ocean base */}
              <circle cx={cx} cy={cy} r={R} fill="#2a303c" />

              {/* Dot-matrix continents */}
              <g clipPath="url(#globeClip)">
                {visibleDots.map((d, i) =>
                  d.visible ? (
                    <circle
                      key={i}
                      cx={cx + d.x}
                      cy={cy - d.y}
                      r={1.6}
                      fill="#8a9ab0"
                      opacity={0.55 + (d.z / R) * 0.45}
                    />
                  ) : null
                )}
              </g>

              {/* 3D shading overlay */}
              <circle cx={cx} cy={cy} r={R} fill="url(#sphereShade)" clipPath="url(#globeClip)" />

              {/* Globe border */}
              <circle cx={cx} cy={cy} r={R} fill="none" stroke="#e8d5b0" strokeWidth="0.8" opacity="0.4" />

              {/* Markers */}
              {visibleMarkers.map((m, i) =>
                m.visible ? (
                  <g key={i}>
                    {/* Pulse ring */}
                    <circle
                      cx={cx + m.x}
                      cy={cy - m.y}
                      r={10}
                      fill="url(#markerGlow)"
                      opacity={0.6}
                    >
                      <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                    </circle>
                    {/* Dot */}
                    <circle
                      cx={cx + m.x}
                      cy={cy - m.y}
                      r={5}
                      fill="#e06040"
                      stroke="#fff"
                      strokeWidth={1.5}
                    />
                    {/* Label */}
                    <text
                      x={cx + m.x + 9}
                      y={cy - m.y + 4}
                      fontSize="11"
                      fill="#f5ece0"
                      fontFamily="sans-serif"
                      fontWeight="600"
                      opacity={Math.min(1, (m.z / R) * 2)}
                    >
                      {m.label}
                    </text>
                  </g>
                ) : null
              )}
            </svg>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#faf7f2] to-transparent pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;