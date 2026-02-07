import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import AuthContext from '../context/AuthContext';
import Loader from '../components/Loader';
import Message from '../components/Message';

const CheckoutForm = ({ orderId, totalPrice, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setError(error.message);
            setProcessing(false);
        } else {
            // Simulate success for MVP or implement full intent on backend
            // Here we just pass the paymentMethod.id to the backend to "verify"
            // or just assume success for test mode if backend is simple.
            // In a real app we would create a PaymentIntent on the backend and confirm it here.
            // For this MVP, we will assume the backend just marks it as paid if we send a result.
            onSuccess({
                id: paymentMethod.id,
                status: 'COMPLETED',
                update_time: new Date().toISOString(),
                payer: { email_address: 'test@example.com' },
            });
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
            <button type="submit" disabled={!stripe || processing} className='btn btn-block' style={{ marginTop: '10px' }}>
                {processing ? 'Processing...' : `Pay $${totalPrice}`}
            </button>
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        </form>
    );
};


const OrderScreen = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [stripePromise, setStripePromise] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` },
                };
                const { data } = await axios.get(`/api/orders/${id}`, config);
                setOrder(data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        const getStripeApiKey = async () => {
            const { data } = await axios.get('/api/config/stripe');
            if (data) {
                setStripePromise(loadStripe(data));
            }
        };

        if (user) {
            fetchOrder();
            getStripeApiKey();
        }
    }, [id, user]);

    const successPaymentHandler = async (paymentResult) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult, config);
            setOrder(data);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    const deliverHandler = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(`/api/orders/${id}/deliver`, {}, config);
            setOrder(data);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <>
            <h1>Order {order._id}</h1>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div>
                    <div className='card'>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong> {order.user.name}</p>
                        <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Address: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? (
                            <Message variant='success'>Delivered on {order.deliveredAt.substring(0, 10)}</Message>
                        ) : (
                            <Message variant='danger'>Not Delivered</Message>
                        )}
                    </div>

                    <div className='card'>
                        <h2>Payment Method</h2>
                        <p><strong>Method: </strong> {order.paymentMethod}</p>
                        {order.isPaid ? (
                            <Message variant='success'>Paid on {order.paidAt.substring(0, 10)}</Message>
                        ) : (
                            <Message variant='danger'>Not Paid</Message>
                        )}
                    </div>

                    <div className='card'>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? (
                            <Message>Order is empty</Message>
                        ) : (
                            <div>
                                {order.orderItems.map((item, index) => (
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

                <div className='card'>
                    <h2>Order Summary</h2>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span>Items</span>
                        <span>${order.itemsPrice}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span>Shipping</span>
                        <span>${order.shippingPrice}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span>Tax</span>
                        <span>${order.taxPrice}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: 'bold' }}>
                        <span>Total</span>
                        <span>${order.totalPrice}</span>
                    </div>

                    {!order.isPaid && stripePromise && (
                        <div style={{ marginTop: '20px' }}>
                            <Elements stripe={stripePromise}>
                                <CheckoutForm orderId={order._id} totalPrice={order.totalPrice} onSuccess={successPaymentHandler} />
                            </Elements>
                        </div>
                    )}

                    {user && user.isAdmin && order.isPaid && !order.isDelivered && (
                        <button type='button' className='btn btn-block' style={{ marginTop: '10px' }} onClick={deliverHandler}>
                            Mark As Delivered
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default OrderScreen;
