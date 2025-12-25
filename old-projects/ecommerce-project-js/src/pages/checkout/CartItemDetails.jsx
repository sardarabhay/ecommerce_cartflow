import { formatMoney } from "../../utils/money";
import axios from 'axios';
import {useState} from 'react';
export function CartItemDetails({cartItem,loadCart}) {
    const [isUpdating,setisUpdating]=useState(false);
    const [quantity,setQuantity]=useState(cartItem.quantity);
    const deleteCartItem=async()=>{
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
    }

    const updateQuantity=async()=>{
        await axios.put(`/api/cart-items/${cartItem.productId}`,{
            quantity: Number(quantity)
        });
        await loadCart();
        setisUpdating(false);
    }

    return (
        <>
            <img className="product-image"
                src={cartItem.product.image} />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                    <span>
                        Quantity:{isUpdating? (
                            <input type="text" 
                            className="input-quantity-box" 
                            value={quantity}
                            onChange={(event)=>setQuantity(event.target.value)}
                            onKeyDown={(event)=>{
                                if(event.key==='Enter'){
                                    updateQuantity();
                                }else if(event.key==='Escape'){
                                    setisUpdating(false);
                                    setQuantity(cartItem.quantity);
                                }
                            }}
                            />
                            ):(<span className="quantity-label">
                            {cartItem.quantity}</span>)}
                    </span>
                    <span className="update-quantity-link link-primary"
                        onClick={()=>{setisUpdating(!isUpdating);
                            if(isUpdating){
                                updateQuantity();
                            }}}>
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary"
                        onClick={deleteCartItem}>
                        Delete
                    </span>
                </div>
            </div>
        </>
    );

}