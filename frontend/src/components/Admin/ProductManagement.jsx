import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchAdminProducts , deleteProduct } from '../../redux/slices/adminProductSlice';




const ProductManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [stockFilter, setStockFilter] = useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const { products = [], loading, error } = useSelector(
    (state) => state.adminProducts
);
    
    useEffect(() => {
        dispatch(fetchAdminProducts());
    
    }, [dispatch]);

const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete the Product"))
    {
       dispatch(deleteProduct(id));
    }
};

const categoryOptions = [
  "All",
  ...new Set(
    products.flatMap((product) =>
      Array.isArray(product.category)
        ? product.category
        : product.category
          ? [product.category]
          : []
    )
  ),
];

const visibleProducts = products
  .filter((product) => {
    const stock = product.countInStock ?? product.stock ?? 0;

    if (stockFilter === "In Stock") return stock > 0;
    if (stockFilter === "Low Stock") return stock > 0 && stock <= 5;
    if (stockFilter === "Out of Stock") return stock <= 0;
    return true;
  })
  .filter((product) => {
    if (categoryFilter === "All") return true;

    if (Array.isArray(product.category)) {
      return product.category.includes(categoryFilter);
    }

    return product.category === categoryFilter;
  })
  .filter((product) => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return true;

    return (
      product.name?.toLowerCase().includes(query) ||
      product.brand?.toLowerCase().includes(query) ||
      product.sku?.toLowerCase().includes(query)
    );
  });

     if (loading) return <p>Loading...</p>
     if (error) return <p>Error: {error}</p>


  return (
    <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Product Management</h2>

    
<Link 
  to="/admin/products/new"
  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 mb-4"
>
  Add New Product
</Link>

        <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, brand, or SKU"
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
            >
              <option value="All">All</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
        </div>

        <div className="overflow-x-auto shadow-sm sm:rounded-lg">
            <table className="min-w-full text-left text-gray-500" >
                <thead className="bg-gray-100 text-xs uppercase text-gray-700" >
                    <tr>
                        <th className="py-3 px-4" >Name</th>
                        <th className="py-3 px-4" >Price</th>
                        <th className="py-3 px-4" >SKU</th>
                        <th className="py-3 px-4" >Actions</th>
                    </tr>
                </thead>
                 <tbody>
                    {visibleProducts.length > 0 ? 
                    (visibleProducts.map((product) => ( 
                         <tr
                         key={product._id}
                         className="border-b hover:bg-gray-50 cursor-pointer"
                         onClick={() => navigate(`/admin/products/${product._id}`)}
                         >
                            <td className="p-4 font-medium text-gray-900 whitespace-nowrap" >
                              {product.name}
                            </td>
                            <td className="p-4" >₹{product.price}</td>
                            <td className="p-4" >{product.sku}</td>
                            <td className="p-4" >
                                <Link to={`/admin/products/${product._id}/edit`}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600">
                                    Edit
                                </Link>
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(product._id);
                                }} 
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                    Delete
                                </button>
                            </td>
                         </tr>
                         ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="p-4 text-center text-gray-500"  >
                                    No Products found.
                                </td>
                            </tr>
                        ) }
                 </tbody>
            </table>

        </div>
     
      
    </div>
  )
}

export default ProductManagement


