import React, { useState, useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight, FaShoppingCart } from 'react-icons/fa';
import { assets } from "../../assets/assets";

const FullScreenImageView = ({ 
  product, 
  selectedImage, 
  onClose, 
  onImageChange,
  selectedQuantity,
  onQuantityChange,
  onAddToCart,
  availableQuantities
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  // Initialize current image index
  useEffect(() => {
    const index = product.images.findIndex(img => img.url === selectedImage.url);
    if (index !== -1) {
      setCurrentImageIndex(index);
    }
  }, [selectedImage, product.images]);

  // Navigation functions
  const goToPreviousImage = () => {
    const newIndex = (currentImageIndex - 1 + product.images.length) % product.images.length;
    handleImageChange(newIndex);
  };

  const goToNextImage = () => {
    const newIndex = (currentImageIndex + 1) % product.images.length;
    handleImageChange(newIndex);
  };

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
    onImageChange(product.images[index]);
    setZoomLevel(1); // Reset zoom when changing images
    setPosition({ x: 0, y: 0 }); // Reset position
  };

  // Zoom functionality
  const handleZoom = (direction) => {
    setZoomLevel(prev => {
      const newZoom = direction === 'in' ? 
        Math.min(prev + 0.5, 3) : 
        Math.max(prev - 0.5, 1);
      return newZoom;
    });
  };

  // Drag to pan functionality
  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setStartPos({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPreviousImage();
      if (e.key === 'ArrowRight') goToNextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentImageIndex]);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header with close button and product name */}
      <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close image viewer"
        >
          <FaTimes className="text-lg" />
        </button>
      </div>
      
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left side - thumbnails */}
        <div className="w-20 border-r overflow-y-auto bg-gray-50 hidden md:block">
          {product.images.map((image, index) => (
            <div 
              key={index}
              className={`p-1 border-2 cursor-pointer ${currentImageIndex === index ? 'border-blue-500' : 'border-transparent'}`}
              onClick={() => handleImageChange(index)}
            >
              <img
                src={image.url || assets.product_placeholder}
                alt={image.altText || `Thumbnail ${index + 1}`}
                className="w-full h-20 object-cover"
                onError={(e) => {
                  e.target.src = assets.product_placeholder;
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Center - main image with navigation */}
        <div 
          className="flex-1 relative overflow-hidden bg-gray-50 flex items-center justify-center"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Navigation arrows */}
          <button
            onClick={goToPreviousImage}
            className="absolute left-4 p-2 rounded-full bg-white bg-opacity-70 shadow hover:bg-opacity-100 z-20"
            aria-label="Previous image"
          >
            <FaChevronLeft />
          </button>
          
          <div className="overflow-hidden w-full h-full flex items-center justify-center">
            <img
              src={product.images[currentImageIndex]?.url || assets.product_placeholder}
              alt={product.images[currentImageIndex]?.altText || "Main product image"}
              className="max-h-full max-w-full object-contain transition-transform duration-200"
              style={{
                transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
              }}
              onClick={() => zoomLevel === 1 && handleZoom('in')}
              onError={(e) => {
                e.target.src = assets.product_placeholder;
              }}
            />
          </div>
          
          <button
            onClick={goToNextImage}
            className="absolute right-4 p-2 rounded-full bg-white bg-opacity-70 shadow hover:bg-opacity-100 z-20"
            aria-label="Next image"
          >
            <FaChevronRight />
          </button>
          
          {/* Zoom controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-white bg-opacity-80 p-2 rounded-full shadow">
            <button 
              onClick={() => handleZoom('out')} 
              className="p-1 rounded-full hover:bg-gray-200"
              disabled={zoomLevel <= 1}
            >
              -
            </button>
            <span className="px-2 text-sm">{(zoomLevel * 100).toFixed(0)}%</span>
            <button 
              onClick={() => handleZoom('in')} 
              className="p-1 rounded-full hover:bg-gray-200"
              disabled={zoomLevel >= 3}
            >
              +
            </button>
          </div>
        </div>
        
        {/* Right side - product details */}
        <div className="w-full md:w-80 border-l p-4 overflow-y-auto flex flex-col bg-white">
          <h3 className="text-xl font-bold mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-4">{product.description}</p>
          
          {/* Price section */}
          <div className="mb-4">
            <p className="text-lg text-gray-600 line-through">
              {product.originalPrice}
            </p>
            <p className="text-2xl font-bold">
              ₹{product.price}
            </p>
          </div>

          {/* Size/Quantity selector */}
          <div className="mb-6">
            <p className="text-gray-700 mb-2">Size:</p>
            <div className="flex flex-wrap gap-2">
              {availableQuantities.map((qty, index) => (
                <button
                  key={index}
                  onClick={() => onQuantityChange(qty)}
                  className={`px-4 py-2 border rounded-full text-sm ${
                    selectedQuantity === qty 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {qty}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity selector */}
          <div className="mb-6">
            <p className="text-gray-700 mb-2">Quantity:</p>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => onQuantityChange("minus")} 
                className="px-3 py-1 bg-gray-200 text-lg rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-lg">{product.quantity || 1}</span>
              <button 
                onClick={() => onQuantityChange("plus")} 
                className="px-3 py-1 bg-gray-200 rounded text-lg hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to cart button */}
          <button 
            onClick={onAddToCart}
            className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 mt-auto flex items-center justify-center gap-2"
          >
            <FaShoppingCart />
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullScreenImageView;