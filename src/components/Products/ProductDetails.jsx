import React, { useEffect, useState } from 'react';
import { assets } from "../../assets/assets";
import { toast } from "sonner";

const productVariants = {
  "1 kg": {
    price: 0,
    originalPrice: "₹15467"
  },
  "500gm": {
    price: 0,
    originalPrice: "₹7820"
  }
};

const selectedProduct = {
    name: "Tablet",
    description: "Unflavored whey protein supplement designed to support protein needs during recovery, illness, or malnutrition",
    brand: "Beneprotein",
    quantity: ["1 kg", "500gm"],
    images: [{
        url: assets.tabletsrx,
        altText: "tablets",
    },
    {
        url: assets.tabletsrx,
        altText: "tablets",
    }],
};

const ProductDetails = () => {
    const [selectedQuantity, setSelectedQuantity] = useState(selectedProduct.quantity[0]);
    const [mainImage, setMainImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    

    // Initialize main image
    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setMainImage(selectedProduct.images[0].url);
        }
    }, []);

    const handleQuantityChange = (action) => {
        if (action === "plus") setQuantity((prev) => prev + 1);
        if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
    };

    const handleAddToCart = () => {
        if(!selectedQuantity) {
            toast.error("Please select quantity before adding to cart", {
                duration: 1000,
            });
            return;
        }
        
        setIsButtonDisabled(true);
        setTimeout(() => {
            toast.success("Product added to cart!", {
                duration: 1000,
            });
            setIsButtonDisabled(false);
        }, 500);
    }

    return (
        <div className="p-6">
            <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
                <div className="flex flex-col md:flex-row">
                    {/* Left Thumbnails (Desktop) */}
                    <div className="hidden md:flex flex-col space-y-4 mr-6">
                        {selectedProduct.images.map((image, index) => (
                            <img
                                key={index}
                                src={image.url}
                                alt={image.altText || `Thumbnail ${index}`}
                                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border
                                 ${mainImage === image.url ? "border-black" : "border-gray-300"}`}
                                onClick={() => setMainImage(image.url)}
                            />
                        ))}
                    </div>

                    {/* Main image */}
                    <div className="md:w-1/2">
                        <div className="mb-4">
                            <img src={mainImage}
                                alt="Main Product"
                                className="w-full h-auto object-cover rounded-lg" />
                        </div>
                    </div>

                    {/* Mobile Thumbnails */}
                    <div className="md:hidden flex overflow-x-scroll space-x-2 mb-4">
                        {selectedProduct.images.map((image, index) => (
                            <img
                                key={index}
                                src={image.url}
                                alt={image.altText || `Thumbnail ${index}`}
                                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border
                                    ${mainImage === image.url ? "border-black" : "border-gray-300"}`}
                                onClick={() => setMainImage(image.url)}
                            />
                        ))}
                    </div>

                    {/* Right Side */}
                    <div className="md:w-1/2 md:ml-10">
                        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                            {selectedProduct.name}
                        </h1>

                        <p className="text-lg text-gray-600 mb-1 line-through">
                            {productVariants[selectedQuantity].originalPrice}
                        </p>

                        <p className="text-xl text-gray-500 mb-2">
                            ₹{productVariants[selectedQuantity].price}
                        </p>

                        <p className="text-gray-600 mb-4">
                            {selectedProduct.description}
                        </p>

                        <div className="mb-4">
                            <p className="text-gray-700">Size:</p>
                            <div className="flex gap-2 mt-2">
                                {selectedProduct.quantity.map((qty, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedQuantity(qty)}
                                        className={`px-4 py-2 border rounded-full text-sm ${selectedQuantity === qty ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                                    >
                                        {qty}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-700">Quantity:</p>
                            <div className="flex items-center space-x-4 mt-2">
                                <button 
                                    onClick={() => handleQuantityChange("minus")} 
                                    className="px-2 py-1 bg-gray-200 text-lg rounded"
                                >
                                    -
                                </button>
                                <span className="text-lg">{quantity}</span>
                                <button 
                                    onClick={() => handleQuantityChange("plus")} 
                                    className="px-2 py-1 bg-gray-200 rounded text-lg"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button 
                            onClick={handleAddToCart} 
                            disabled={isButtonDisabled}
                            className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            ADD TO CART
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;