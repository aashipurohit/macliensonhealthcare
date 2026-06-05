import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAdminProductDetails } from "../../redux/slices/adminProductSlice";

const AdminProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    if (id) {
      dispatch(fetchAdminProductDetails(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <div className="p-6">Loading product details...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        {typeof error === "string" ? error : error?.message || "Failed to load product"}
      </div>
    );
  }

  if (!selectedProduct) {
    return <div className="p-6 text-gray-500">Product not found.</div>;
  }

  const product = selectedProduct;
  const primaryImage =
    typeof product.images?.[0]?.url === "string" && product.images[0].url.trim()
      ? product.images[0].url
      : "https://via.placeholder.com/120";

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Admin Product Details</h1>
        <p><strong>Name:</strong> {product.name || "N/A"}</p>
        <p><strong>Price:</strong> ₹{product.price ?? "N/A"}</p>
        <p><strong>Stock:</strong> {product.countInStock ?? product.stock ?? "N/A"}</p>
        <p><strong>Category:</strong> {Array.isArray(product.category) ? product.category.join(", ") : product.category || "N/A"}</p>
        <p><strong>Brand:</strong> {product.brand || "N/A"}</p>
        <p><strong>Units Sold:</strong> {product.purchaseCount ?? 0}</p>
        <p><strong>Rating:</strong> {product.rating ?? "N/A"}</p>
        <p><strong>Reviews:</strong> {product.numReviews ?? "N/A"}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Image</h2>
        <img
          src={primaryImage}
          alt={product.images?.[0]?.altText || product.name}
          className="w-32 h-32 object-cover rounded border"
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700 whitespace-pre-line">{product.description || "N/A"}</p>
      </div>
    </div>
  );
};

export default AdminProductDetails;
