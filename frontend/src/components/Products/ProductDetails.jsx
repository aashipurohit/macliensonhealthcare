import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from "sonner";
import { FaInfoCircle, FaBalanceScale, FaHeartbeat, FaSpa } from "react-icons/fa";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";

const productVariants = {
  "500 ml": {
    price: 0,
    originalPrice: "₹15467"
  },
  "200 ml": {
    price: 0,
    originalPrice: "₹7820"
  }
};

const selectedProduct = {
  name: "Flavona Forte Syrup",
  brand: "Maclienson Healthcare",
  quantity: ["500 ml", "200 ml"],
  images: [
    {
      url: assets.flavona_forte_sy,
      altText: "Flavona Forte Syrup front view",
    },
    {
      url: assets.flavona_forte_sy_b,
      altText: "Flavona Forte Syrup back view",
    }
  ],
  description: `
    Flavona Forte Syrup is an advanced Ayurvedic uterine tonic designed for comprehensive women's wellness.
    Enriched with over 30 potent herbs like Ashwagandha, Shatavari, and Dashmool, it supports hormonal balance, revitalizes the reproductive system, and improves menstrual health.
    Ideal for women of all age groups, it enhances vitality, relieves fatigue, and promotes overall well-being.
    The syrup helps regulate mood, energy, and physical health gently and effectively.
  `
};

const ProductDetails = () => {
  const [selectedQuantity, setSelectedQuantity] = useState(selectedProduct.quantity[0]);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, []);

  const handleQuantityChange = (action) => {
    if (action === "plus") setQuantity(prev => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = () => {
    if (!selectedQuantity) {
      toast.error("Please select quantity before adding to cart", { duration: 1000 });
      return;
    }
    setIsButtonDisabled(true);
    setTimeout(() => {
      toast.success("Product added to cart!", { duration: 1000 });
      setIsButtonDisabled(false);
    }, 500);
  };

  return (
    <div className="p-6 bg-purple-50 text-gray-800">
      <div className="max-w-6xl mx-auto bg-rose-50 p-8 rounded-lg shadow-md">
        {/* Best Seller Section centered */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Best Seller</h2>
          <p className="text-xl text-gray-600">This product is a customer favorite, loved for its effectiveness and quality.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" : "border-gray-300"}`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="md:w-1/2">
            <img
              src={mainImage}
              alt="Main Product"
              className="w-full max-h-[500px] object-contain rounded-lg transition-all duration-300"
            />
          </div>

          {/* Mobile Thumbnails */}
          <div className="md:hidden flex overflow-x-scroll space-x-2 mb-4">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" : "border-gray-300"}`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* Product Info */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-2" aria-label="Product Name">{selectedProduct.name}</h1>
            <p className="text-lg text-gray-500 mb-1 line-through" aria-label="Original Price">
              {productVariants[selectedQuantity].originalPrice}
            </p>
            <p className="text-xl text-gray-700 mb-2" aria-label="Discounted Price">
              ₹{productVariants[selectedQuantity].price}
            </p>

            {/* Description with Read More */}
            <div className="mb-4 text-gray-700">
              <div className="flex items-center gap-2">
                <FaInfoCircle className="text-rose-400" />
                <strong>Product Details:</strong>
              </div>
              <p className="mt-1">
                {showMore ? selectedProduct.description : selectedProduct.description.slice(0, 110) + "..." }
              </p>
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-rose-600 font-semibold flex items-center mt-1"
              >
                {showMore ? "Read Less" : "Read More"}
                {showMore ? <MdOutlineExpandLess className="ml-1" /> : <MdOutlineExpandMore className="ml-1" />}
              </button>
            </div>

            {/* Key Benefits with Icons */}
            <div className="mb-6 space-y-2">
              <div className="flex items-center gap-2 text-gray-800">
                <FaBalanceScale className="text-pink-600" /> Corrects Hormonal Imbalance
              </div>
              <div className="flex items-center gap-2 text-gray-800">
                <FaHeartbeat className="text-pink-600" /> Boosts Vitality
              </div>
              <div className="flex items-center gap-2 text-gray-800">
                <FaSpa className="text-pink-600" /> Enhances Overall Well-being
              </div>
            </div>

            {/* Size Options */}
            <div className="mb-4">
              <p className="text-gray-800 font-medium">Size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.quantity.map((qty, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedQuantity(qty)}
                    className={`px-4 py-2 border rounded-full text-sm transition ${selectedQuantity === qty ? 'bg-rose-500 text-black' : 'bg-rose-200 hover:bg-gray-200'}`}
                  >
                    {qty}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <p className="text-gray-800 font-medium">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handleQuantityChange("minus")}
                  className="px-3 py-1 bg-gray-200 text-lg rounded"
                >
                  −
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("plus")}
                  className="px-3 py-1 bg-gray-200 rounded text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`bg-rose-500 text-white py-2 px-6 rounded w-full mb-4 transition ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-rose-600'}`}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
