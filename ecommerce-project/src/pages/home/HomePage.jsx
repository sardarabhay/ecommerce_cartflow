import axios from 'axios';
import { useEffect } from 'react';
import {useState} from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import { useSearchParams } from 'react-router';
import './HomePage.css'

export function HomePage({cart,loadCart}) {
    const[products,setProducts]=useState([]);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search') || '';
    
    useEffect(() => {
        const getHomeData= async()=>{
            if(search){
                const response= await axios.get(`/api/products?search=${search}`);
                setProducts(response.data);
                return;
            }
            const response= await axios.get('/api/products')
            setProducts(response.data);
        }
        getHomeData();
    },[search]);


    return (
        <>
            <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
            <title>Ecommerce Project</title>

            <Header cart={cart} />

            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart} />
            </div>
        </>
    );

}