// import React from 'react';
// import { assets } from '../../assets/assets';
// import { RiDeleteBin3Line } from "react-icons/ri";
// import { useDispatch } from "react-redux";




// const CartContents = ({cart, userId, guestId}) => {
//     const dispatch = useDispatch();
//  //handle adding or subtracting to cart
//     const handleAddToCart = (productId, delta, quantity) => {
//         const newQuantity = quantity + delta;
//         if(newQuantity >=1) {
//             dispatch(
//                 updateCartItemQuantity({
//                     productId,
//                     quantity: newQuantity,
//                     guestId,
//                     userId,
//                 })
//             )
//         }
//     };

//      const handleRemoveFromCart = (productId) => {
//         dispatch(removeFromCart({productId, guestId, userId}));
//      };


// //     console.log("CartContents loaded");
// // const cartProducts =[
// // {
// // productId: 1,
// // name: "tabletsrx",
// // quantity: 1,
// // price: 230,
// // type: "Tablet",
// // brand:"tabletsrx ",
// // image: assets.tabletsrx
// // },
// // {
// // productId: 2,
// // name: "tabletsrx",
// // quantity: 1,
// // price: 630,
// // type: "Tablet",
// // brand:"tabletsrx  ",
// // image: assets.tabletsrx
// // },
// // {
// // productId: 3,
// // name: "tabletsrx",
// // quantity: 1,
// // price: 730,
// // type: "tabletsrx",
// // brand:"tabletsrx ",
// // image: assets.tabletsrx
// // },
// // {
// // productId: 4,
// // name: "tabletsrx",
// // quantity: 1,
// // price: 530,
// // type: "tabletsrx",
// // brand:"tabletsrx",
// // image: assets.tabletsrx
// // }
// // ];
// return (
// <div className="p-4">
// {cart?.products?.map((product, index) =>(
// <div
// key={index}
// className="flex items-start justify-between py-4 border-b "
// >
// <div className="flex items-start">
// <img 
// src={product.image} 
// alt={product.name}
// className="w-20 h-24 object-cover mr-4 rounded "
// />
// <div>
// <h3>{product.name}</h3>
// <p className="text-sm text-gray-500">
// Type:{product.type} <br/>
// brand:{product.brand}
// </p>
// <div className="flex items-center mt-2">
// <button 
// onClick={() => 
//     handleAddToCart(
//         product.productId,
//          -1,
//           product.quantity)
//         }
// className="border rounded px-2 py-1 text-xl font-medium">
// -
// </button>
// <span className="mx-4">{product.quantity}</span>
// <button 
// onClick={() => 
//     handleAddToCart(
//         product.productId,
//          1,
//           product.quantity)
//         }
// className="border rounded px-2 py-1 text-xl font-medium">
// +
// </button>
// </div>
// </div>
// </div> 
// <div>
// <p>₹ {product.price.toLocaleString()}</p>
// <button
// onClick ={() => 
// handleRemoveFromCart(
//     product.productId,
//      )} aria-label="Delete" >
// <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600"/>
// </button>
// </div>
// </div>
// ))}
// </div>
// );
// };

// export default CartContents


// import React from 'react';
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { useDispatch, useSelector } from "react-redux";
// import { 
//   updateCartItemQuantity, 
//   removeFromCart 
// } from "../../redux/slices/cartSlice";

// const CartContents = () => {
//   const dispatch = useDispatch();
//   const { cart } = useSelector((state) => state.cart);
//   const { user, guestId } = useSelector((state) => state.auth);

//   const handleQuantityChange = (productId, delta) => {
//     const product = cart.products.find(p => p.productId === productId);
//     if (!product) return;
    
//     const newQuantity = product.quantity + delta;
//     if (newQuantity >= 1) {
//       dispatch(updateCartItemQuantity({
//         productId,
//         quantity: newQuantity,
//         guestId: !user ? guestId : undefined,
//         userId: user?._id
//       }));
//     }
//   };

//   const handleRemoveItem = (productId) => {
//     dispatch(removeFromCart({
//       productId,
//       guestId: !user ? guestId : undefined,
//       userId: user?._id
//     }));
//   };

//   return (
//     <div className="divide-y">
//       {cart.products.map((product) => (
//         <div key={product.productId} className="py-4 flex justify-between">
//           <div className="flex gap-4">
//             <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
//               <img 
//                 src={product.image} 
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//                 onError={(e) => {
//                   e.target.src = '/placeholder-product.jpg';
//                 }}
//               />
//             </div>
//             <div className="flex-1">
//               <h3 className="font-medium">{product.name}</h3>
//               <p className="text-sm text-gray-500 mb-2">
//                 {product.brand}
//               </p>
//               <div className="flex items-center border rounded w-fit">
//                 <button
//                   onClick={() => handleQuantityChange(product.productId, -1)}
//                   className="px-2 py-1 text-lg disabled:opacity-50"
//                   disabled={product.quantity <= 1}
//                 >
//                   -
//                 </button>
//                 <span className="px-3">{product.quantity}</span>
//                 <button
//                   onClick={() => handleQuantityChange(product.productId, 1)}
//                   className="px-2 py-1 text-lg"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="text-right">
//             <p className="font-medium">₹{product.price.toFixed(2)}</p>
//             <button
//               onClick={() => handleRemoveItem(product.productId)}
//               aria-label={`Remove ${product.name} from cart`}
//               className="mt-2 text-red-600 hover:text-red-800"
//             >
//               <RiDeleteBin6Line size={18} />
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CartContents;



import React from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { updateCartItemQuantity, removeFromCart, fetchCart } from '../../redux/slices/cartSlice';

const CartContents = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
 // const { user, guestId } = useSelector((state) => state.auth);

//  useEffect(() => {
//     dispatch(fetchCart());
//   }, [dispatch]);

  

   const handleQuantityChange = async (productId, delta, currentQty) => {
    const newQuantity = currentQty + delta;
    if (newQuantity >= 1) {
      await dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));
      dispatch(fetchCart()); // Refetch cart after update
    }
  };


   const handleRemoveItem = async (productId) => {
    await dispatch(removeFromCart({ productId }));
    dispatch(fetchCart()); // Refetch cart after removal
  };

  return (
    <div className="divide-y">
      {cart.products?.map((product) => (
        <div key={product.productId} className="flex p-4 gap-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <img
              src={product.image || 'https://via.placeholder.com/80'}
              alt={product.name}
              className="w-20 h-20 object-cover rounded"
              onError={(e) => e.target.src = 'https://via.placeholder.com/80'}
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between flex-grow">
            <div className="flex justify-between">
              <h3 className="font-medium">{product.name}</h3>
              <button
                onClick={() => handleRemoveItem(product.productId)}
                aria-label="Remove item"
                className="text-gray-500 hover:text-red-500"
              >
                <RiDeleteBinLine className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-2 flex items-center justify-between">
              {/* Quantity Controls */}
              <div className="flex items-center border rounded">
                <button
                  onClick={() => handleQuantityChange(product.productId, -1, product.quantity)}
                  disabled={product.quantity <= 1}
                  className="px-3 py-1 disabled:opacity-30"
                  aria-label="Decrease quantity"
                >−</button>
                <span className="px-4">{product.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(product.productId, 1, product.quantity)}
                  className="px-3 py-1"
                  aria-label="Increase quantity"
                >+</button>
              </div>

              {/* Price */}
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