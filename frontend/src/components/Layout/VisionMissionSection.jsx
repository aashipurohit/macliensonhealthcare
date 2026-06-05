import React, { useRef } from 'react';
import { assets } from "../../assets/assets";

const VisionMissionSection = () => {
  const cards = [
    {
      title: "Vision",
      content: "To be a global leader in transforming healthcare by delivering innovative, high-quality, and accessible pharmaceutical solutions that improve human life and well-being.",
      type: "paragraph",
      bgImage: assets.values_1 // Using vision image for first box
    },
    {
      title: "Mission",
      content: "We are dedicated to developing and marketing world-class pharmaceutical products.",
      type: "paragraph",
      bgImage: assets.mission_2 // Using mission_1 image for second box
    },
    {
      title: "Core Values",
      content: ["Innovation", "Quality", "Affordability", "Integrity", "Compassion"],
      type: "list",
      bgImage: assets.values_2 // Assuming you have a values image in assets
    }
  ];

  // Create refs at the top level
  const visionRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const cardRefs = [visionRef, missionRef, valuesRef];

  const handleMouseMove = (e, ref) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Increased rotation values for more dramatic effect
    const rotateX = ((y - centerY) / centerY) * 15;
    const rotateY = ((x - centerX) / centerX) * -15;
    
    // Added slight translation for depth
    const translateZ = 20;
    
    ref.current.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(${translateZ}px)
      scale(1.05)
    `;
    
    // Add subtle shadow on movement
    ref.current.style.boxShadow = `
      ${-rotateY * 0.5}px ${rotateX * 0.5}px 15px rgba(0, 0, 0, 0.3)
    `;
  };

  const handleMouseLeave = (ref) => {
    if (ref.current) {
      ref.current.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        translateZ(0px)
        scale(1)
      `;
      ref.current.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    }
  };

  return (
    <section className="bg-gray-50 px-4 py-12 ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            ref={cardRefs[index]}
            className="group relative h-full min-h-[300px] overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-all duration-500 ease-out  "
            style={{
              backgroundImage: `url(${card.bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transformStyle: "preserve-3d",
              willChange: "transform, box-shadow",
              backfaceVisibility: "hidden"
            }}
            onMouseMove={(e) => handleMouseMove(e, cardRefs[index])}
            onMouseLeave={() => handleMouseLeave(cardRefs[index])}
          >
            {/* Enhanced overlay with gradient */}
            <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-gray-900/70 via-gray-900/45 to-gray-950/75 transition-all duration-500 group-hover:from-gray-900/55 group-hover:via-gray-900/35 group-hover:to-gray-950/65      "></div>

            <div className="relative z-10 p-8 flex flex-col h-full transform-style-preserve-3d">
              <h3 className="mb-6 text-center text-2xl font-bold text-white drop-shadow-sm">
                {card.title}
              </h3>
              {card.type === "paragraph" ? (
                <p className="text-center text-lg leading-relaxed text-gray-100/90 transition-colors duration-300 group-hover:text-white">
                  {card.content}
                </p>
              ) : (
                <ul className="mx-auto space-y-3 text-lg">
                  {card.content.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-100/90 transition-colors duration-300 group-hover:text-white">
                      <span className="h-3 w-3 flex-shrink-0 rounded-full bg-primary-300 "></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VisionMissionSection;


