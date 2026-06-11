import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import CartContents from "../Cart/CartContents.jsx";
import { fetchCart } from "../../redux/slices/cartSlice";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cart, loading, error, initialized } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    if (drawerOpen && !initialized) {
      dispatch(fetchCart());
    }
  }, [drawerOpen, initialized, dispatch]);

  const handleCheckout = () => {
    toggleCartDrawer();
    navigate(user ? "/checkout" : "/login?redirect=checkout");
  };

  const totalItems =
    cart?.products?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const subtotal = cart?.totalPrice || 0;

  return (
    <div
      className={`fixed inset-0 z-[100] ${
        drawerOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!drawerOpen}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
          drawerOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={toggleCartDrawer}
      />

      <aside
        className={`absolute top-0 right-0 h-screen w-full bg-white flex flex-col shadow-2xl transition-transform duration-200 ease-in-out sm:w-96 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h2 className="text-xl font-bold text-gray-900">
            Your Cart ({totalItems})
          </h2>
          <button
            onClick={toggleCartDrawer}
            className="rounded-full p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
            aria-label="Close cart drawer"
          >
            <IoMdClose className="h-6 w-6" />
          </button>
        </div>

       <div className="flex-1 overflow-y-auto p-4 min-h-0">
            {loading ? (
              <div className="flex h-full items-center justify-center text-gray-600">
                Loading your cart...
              </div>
            ) : cart?.products?.length > 0 ? (
              <CartContents />
            ) : error ? (
              <div className="text-center text-red-600">
                {typeof error === "string"
                  ? error
                  : error?.message || "Something went wrong"}
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center">
              <p className="mb-4 text-lg text-gray-900">Your cart is empty</p>
              <button
                onClick={toggleCartDrawer}
                className="rounded bg-primary-600 px-4 py-2 font-medium text-white transition hover:bg-primary-700"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {cart?.products?.length > 0 && (
          <div className="sticky bottom-0 flex-shrink-0 border-t border-gray-200 bg-white p-4">
            <div className="mb-4 flex justify-between text-lg font-medium text-gray-900">
              <span>Subtotal</span>
              <span>&#8377;{subtotal.toLocaleString("en-IN")}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading || totalItems === 0}
              className={`w-full rounded-lg py-3 font-semibold transition ${
                loading || totalItems === 0
                  ? "cursor-not-allowed bg-gray-300 text-white"
                  : "bg-primary-600 text-white hover:bg-primary-700"
              }`}
            >
              {loading ? "Processing..." : "Proceed to Checkout"}
            </button>

            <p className="mt-2 text-center text-xs text-gray-500">
              Shipping, taxes & discounts calculated at checkout.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
