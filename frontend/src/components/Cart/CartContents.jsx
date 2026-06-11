import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCartItemQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";

const CartContents = () => {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.cart);

  const handleQuantityChange = async (productId, delta, currentQty) => {
    const newQuantity = currentQty + delta;

    if (newQuantity < 1 || loading) return;

    await dispatch(
      updateCartItemQuantity({
        productId,
        quantity: newQuantity,
      })
    );
  };

  const handleRemoveItem = async (productId) => {
    if (loading) return;
    await dispatch(removeFromCart({ productId }));
  };

  return (
    <div className="divide-y">
      {cart?.products?.map((product) => (
        <div key={product.productId} className="flex p-4 gap-4">
          <div className="flex-shrink-0">
            <img
              src={product.image || "https://via.placeholder.com/80"}
              alt={product.name}
              className="w-20 h-20 object-cover rounded"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/80";
              }}
            />
          </div>

          <div className="flex flex-col justify-between flex-grow">
            <div className="flex justify-between gap-4">
              <h3 className="font-medium">{product.name}</h3>

              <button
                onClick={() => handleRemoveItem(product.productId)}
                aria-label="Remove item"
                className="text-gray-500 hover:text-red-500"
                disabled={loading}
              >
                <RiDeleteBinLine className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center border rounded">
                <button
                  onClick={() =>
                    handleQuantityChange(
                      product.productId,
                      -1,
                      product.quantity
                    )
                  }
                  disabled={product.quantity <= 1 || loading}
                  className="px-3 py-1 disabled:opacity-30"
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span className="px-4">{product.quantity}</span>

                <button
                  onClick={() =>
                    handleQuantityChange(
                      product.productId,
                      1,
                      product.quantity
                    )
                  }
                  disabled={loading}
                  className="px-3 py-1 disabled:opacity-30"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <p className="font-medium text-right">
                ₹{(product.price * product.quantity).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
