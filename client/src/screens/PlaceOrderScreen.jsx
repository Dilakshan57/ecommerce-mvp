import { useEffect, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';

const PlaceOrderScreen = () => {
    const { cartItems, shippingAddress, paymentMethod, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    // Calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    const itemsPrice = addDecimals(
        cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);
    const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
    const totalPrice = (
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice)
    ).toFixed(2);

    useEffect(() => {
        if (!paymentMethod) {
            navigate('/payment');
        }
    }, [paymentMethod, navigate]);

    const placeOrderHandler = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post(
                '/api/orders',
                {
                    orderItems: cartItems,
                    shippingAddress,
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    taxPrice,
                    totalPrice,
                },
                config
            );

            clearCart();
            navigate(`/order/${data._id}`);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            toast.error(err.message);
        }
    };

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div>
                    <div className='card'>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address:</strong>
                            {shippingAddress.address}, {shippingAddress.city}{' '}
                            {shippingAddress.postalCode}, {shippingAddress.country}
                        </p>
                    </div>

                    <div className='card'>
                        <h2>Payment Method</h2>
                        <strong>Method: </strong>
                        {paymentMethod}
                    </div>

                    <div className='card'>
                        <h2>Order Items</h2>
                        {cartItems.length === 0 ? (
                            <Message>Your cart is empty</Message>
                        ) : (
                            <div>
                                {cartItems.map((item, index) => (
                                    <div key={index} style={{ borderBottom: '1px solid #eee', padding: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img src={item.image} alt={item.name} style={{ width: '50px', marginRight: '10px' }} />
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div>
                                            {item.qty} x ${item.price} = ${item.qty * item.price}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <div className='card'>
                        <h2>Order Summary</h2>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Items</span>
                            <span>${itemsPrice}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Shipping</span>
                            <span>${shippingPrice}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Tax</span>
                            <span>${taxPrice}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: 'bold' }}>
                            <span>Total</span>
                            <span>${totalPrice}</span>
                        </div>

                        {error && <Message variant='danger'>{error}</Message>}

                        <button
                            type='button'
                            className='btn btn-block'
                            disabled={cartItems.length === 0}
                            onClick={placeOrderHandler}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlaceOrderScreen;
