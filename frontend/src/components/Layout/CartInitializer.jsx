// components/Layout/CartInitializer.jsx
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mergeCart, fetchCart } from "../../redux/slices/cartSlice";

const CartInitializer = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const guestId = localStorage.getItem("guestId");

  const hasMergedRef = useRef(false); // prevents repeated dispatch

  useEffect(() => {
    if (user && guestId && !hasMergedRef.current) {
      hasMergedRef.current = true;
      dispatch(mergeCart()).then(() => {
        dispatch(fetchCart()); // Fetch user cart after merge
      });
    }
  }, [user, guestId, dispatch]);

  return null; // No UI
};

export default CartInitializer;
