import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/apiClient";
import { fetchProductDetails, updateProduct } from '../../redux/slices/productsSlice';

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector((state) => state.products);

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    countInStock: 0,
    sku: '',
    category: '',
    brand: '',
    collections: '',
    type: '',
    images: [assets.tabletsrx, assets.tabletsrx],
  });

  const [uploading, setUploading] = useState(false); 

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      setUploading(true);
      const { data } = await api.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, { url: data.imageUrl, altText: "" }],
      }));
      setUploading(false); 
    } catch (error) {
      console.error(error);
      setUploading(false); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, productData }));
    navigate("/admin/products");
  };

  if (loading) return <p className="text-primary-800 text-center py-10">Loading...</p>;
  if (error) return <p className="text-danger-900 text-center py-10">Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-8 shadow-regal rounded-2xl border border-gold-100 bg-white/90 backdrop-blur-sm my-8">
      <h2 className="text-3xl font-serif font-bold mb-8 text-primary-950 border-b border-gold-100 pb-4">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-primary-800">Product Name</label>
          <input type="text" name="name" value={productData.name} onChange={handleChange} className="w-full border border-gold-200 bg-champagne-50/50 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary-800 transition-all" required />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-primary-800">Description</label>
          <textarea name="description" value={productData.description} onChange={handleChange} className="w-full border border-gold-200 bg-champagne-50/50 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary-800 transition-all" rows={4} required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-semibold mb-2 text-primary-800">Price (₹)</label>
            <input type="number" name="price" value={productData.price} onChange={handleChange} className="w-full border border-gold-200 bg-champagne-50/50 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary-800 transition-all" />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-primary-800">Count in Stock</label>
            <input type="number" name="countInStock" value={productData.countInStock} onChange={handleChange} className="w-full border border-gold-200 bg-champagne-50/50 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary-800 transition-all" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block font-semibold mb-2 text-primary-800">SKU</label>
            <input type="text" name="sku" value={productData.sku} onChange={handleChange} className="w-full border border-gold-200 bg-champagne-50/50 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary-800 transition-all" />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-primary-800">Category</label>
            <select name="category" value={productData.category} onChange={handleChange} className="w-full border border-gold-200 bg-champagne-50/50 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary-800 transition-all" required>
              <option value="">Select Category</option>
              <option value="Tablet">Tablet</option>
              <option value="Syrup">Syrup</option>
              <option value="Capsule">Capsule</option>
              <option value="Powder">Powder</option>
              <option value="Topical">Topical</option>
              <option value="Injection">Injection</option>
            </select>
          </div>
        </div>
        <div className="mb-8 p-6 border-2 border-dashed border-gold-200 rounded-2xl bg-champagne-50/30">
          <label className="block font-semibold mb-3 text-primary-800">Upload Product Images</label>
          <input type="file" onChange={handleImageUpload} disabled={uploading} className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-800 file:text-champagne-50 hover:file:bg-primary-900 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60" />
          <div className="flex gap-4 mt-6 flex-wrap">
            {productData.images.map((image, index) => (
              <div key={index} className="relative group rounded-xl overflow-hidden border border-gold-100 shadow-sm">
                <img src={typeof image === 'string' ? image : image.url} alt={`product-${index}`} className="w-24 h-24 object-contain bg-white p-2" />
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="w-full bg-primary-800 text-champagne-50 py-4 rounded-full font-bold text-lg hover:bg-primary-900 hover:-translate-y-1 transition-all shadow-regal">
          {uploading ? "Uploading..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
