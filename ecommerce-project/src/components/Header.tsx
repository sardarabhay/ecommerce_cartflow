import './Header.css';
import { NavLink } from 'react-router';
import LogoWhite from '../assets/images/logo-white.png';
import MobileLogoWhite from '../assets/images/mobile-logo-white.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import CartIcon from '../assets/images/icons/cart-icon.png';
import { calculateTotalQuantity } from '../utils/totalQuantity';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';


type HeaderProps =  {
    cart: {
        productId: string;
        quantity: number;
        deliveryOptionId: string;
    }[];
};


export function Header({ cart }: HeaderProps) {

    const [searchParams] = useSearchParams();

    const searchText = searchParams.get('search');

    const [searchTerm, setSearchTerm] = useState(searchText || '');

    const navigate = useNavigate();


    const makeSearch = (event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
        if ('key' in event && event.key !== 'Enter') {
            return;
        }
        if (searchTerm.trim()) {
            navigate(`/?search=${searchTerm}`);

        }
    };

    return (
        <div className="header">
            <div className="left-section">
                <NavLink to="/" className="header-link">
                    <img className="logo"
                        src={LogoWhite} />
                    <img className="mobile-logo"
                        src={MobileLogoWhite} />
                </NavLink>
            </div>

            <div className="middle-section">
                <input className="search-bar" type="text" placeholder="Search" onChange={(event) => {
                    setSearchTerm(event.target.value);
                }}
                    value={searchTerm}
                    onKeyDown={makeSearch} />

                <button className="search-button" onClick={makeSearch}>
                    <img className="search-icon" src={SearchIcon} />
                </button>
            </div>

            <div className="right-section">
                <NavLink className="orders-link header-link" to="/orders">

                    <span className="orders-text">Orders</span>
                </NavLink>

                <NavLink className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src={CartIcon} />
                    <div className="cart-quantity">{calculateTotalQuantity(cart)}</div>
                    <div className="cart-text">Cart</div>
                </NavLink>
            </div>
        </div>
    );
}