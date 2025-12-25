import { Header } from "../components/Header";
import {Link} from 'react-router';
import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import './TrackingPage.css';
import dayjs from "dayjs";

export function TrackingPage({cart}) {
    const {orderId,productId}=useParams();
    const [order,setOrder]=useState(null);

    useEffect(()=>{
        const fetchOrderData=async()=>{
            const response =await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrder(response.data);
        }

        fetchOrderData();
    },[orderId]);

    
    if(!order){
        return null;
    }
    const selectedTrackingProduct=order.products.find((product)=>{
        return product.productId===productId;
    });

    const totalDeliveryTimeMs=selectedTrackingProduct.estimatedDeliveryTimeMs-order.orderTimeMs;
    const timePassedMs=dayjs().valueOf()-order.orderTimeMs;
    let deliveryPercent=(timePassedMs/totalDeliveryTimeMs)*100;
    let deliveryText;
    if (deliveryPercent >= 100) {
    deliveryPercent = 100;
    deliveryText='Delivered on'
  }else{
    deliveryText='Arriving on'
  }

    let isPreparing;
    let isShipped;
    let isDelivered;

    if(deliveryPercent<33){
        isPreparing=deliveryPercent;
    }else if(deliveryPercent>=33 && deliveryPercent <100){
        isShipped=deliveryPercent;
    }else if(deliveryPercent===100){
        isDelivered=deliveryPercent;
    }

    return (
        <>
            <title>Tracking</title>

            <Header cart={cart} />

            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        {deliveryText} {dayjs(selectedTrackingProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                    </div>

                    <div className="product-info">
                        {selectedTrackingProduct.product.name}
                    </div>

                    <div className="product-info">
                        {selectedTrackingProduct.quantity}
                    </div>

                    <img className="product-image" src={selectedTrackingProduct.product.image} />

                    <div className="progress-labels-container">
                        <div className={`progress-label ${isPreparing && 'current-status'}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${isShipped && 'current-status'}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${isDelivered && 'current-status'}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{width:`${deliveryPercent}%`}}></div>
                    </div>
                </div>
            </div>
        </>


    );

}