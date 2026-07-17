import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/slices/cartSlice";

const CartInitializer = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.auth.user?.token);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch, userToken]);

  return null;
};

export default CartInitializer;
