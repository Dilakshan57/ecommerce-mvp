import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [shippingAddress, setShippingAddress] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('Stripe');

    useEffect(() => {
        const cartItemsFromStorage = localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [];
        setCartItems(cartItemsFromStorage);

        const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {};
        setShippingAddress(shippingAddressFromStorage);
    }, []);

    const addToCart = async (id, qty) => {
        const { data } = await axios.get(`/api/products/${id}`);
        const item = {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        };

        const existItem = cartItems.find((x) => x.product === item.product);

        let newCartItems;
        if (existItem) {
            newCartItems = cartItems.map((x) =>
                x.product === existItem.product ? item : x
            );
        } else {
            newCartItems = [...cartItems, item];
        }

        setCartItems(newCartItems);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    };

    const removeFromCart = (id) => {
        const newCartItems = cartItems.filter((x) => x.product !== id);
        setCartItems(newCartItems);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    };

    const saveShippingAddress = (data) => {
        setShippingAddress(data);
        localStorage.setItem('shippingAddress', JSON.stringify(data));
    };

    const savePaymentMethod = (data) => {
        setPaymentMethod(data);
        localStorage.setItem('paymentMethod', JSON.stringify(data));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                shippingAddress,
                saveShippingAddress,
                paymentMethod,
                savePaymentMethod,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
