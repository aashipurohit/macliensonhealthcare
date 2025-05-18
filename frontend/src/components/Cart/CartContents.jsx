import React from 'react';
import { assets } from '../../assets/assets';
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";




const CartContents = ({cart, userId, guestId}) => {
    const dispatch = useDispatch();

    const handleAddToCart = (productId, delta, quantity) => {
        const newQuantity = quantity + delta;
        if(newQuantity >=1) {
            dispatch(
                updateCartItemQuantity({
                    productId,
                    quantity: newQuantity,
                    guestId,
                    userId,
                })
            )
        }
    };

     const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart({productId, guestId, userId}));
     };


//     console.log("CartContents loaded");
// const cartProducts =[
// {
// productId: 1,
// name: "tabletsrx",
// quantity: 1,
// price: 230,
// type: "Tablet",
// brand:"tabletsrx ",
// image: assets.tabletsrx
// },
// {
// productId: 2,
// name: "tabletsrx",
// quantity: 1,
// price: 630,
// type: "Tablet",
// brand:"tabletsrx  ",
// image: assets.tabletsrx
// },
// {
// productId: 3,
// name: "tabletsrx",
// quantity: 1,
// price: 730,
// type: "tabletsrx",
// brand:"tabletsrx ",
// image: assets.tabletsrx
// },
// {
// productId: 4,
// name: "tabletsrx",
// quantity: 1,
// price: 530,
// type: "tabletsrx",
// brand:"tabletsrx",
// image: assets.tabletsrx
// }
// ];
return (
<div className="p-4">
{cart?.products?.map((product, index) =>(
<div
key={index}
className="flex items-start justify-between py-4 border-b "
>
<div className="flex items-start">
<img 
src={product.image} 
alt={product.name}
className="w-20 h-24 object-cover mr-4 rounded "
/>
<div>
<h3>{product.name}</h3>
<p className="text-sm text-gray-500">
Type:{product.type} <br/>
brand:{product.brand}
</p>
<div className="flex items-center mt-2">
<button 
onClick={() => 
    handleAddToCart(
        product.productId,
         -1,
          product.quantity)
        }
className="border rounded px-2 py-1 text-xl font-medium">
-
</button>
<span className="mx-4">{product.quantity}</span>
<button 
onClick={() => 
    handleAddToCart(
        product.productId,
         1,
          product.quantity)
        }
className="border rounded px-2 py-1 text-xl font-medium">
+
</button>
</div>
</div>
</div> 
<div>
<p>₹ {product.price.toLocaleString()}</p>
<button
onClick ={() => 
handleRemoveFromCart(
    product.productId,
     )} aria-label="Delete" >
<RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600"/>
</button>
</div>
</div>
))}
</div>
);
};

export default CartContents


