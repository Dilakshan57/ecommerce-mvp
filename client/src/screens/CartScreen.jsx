import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';

const CartScreen = () => {
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const checkoutHandler = () => {
        if (user) {
            navigate('/shipping');
        } else {
            navigate('/login?redirect=shipping');
        }
    };

    return (
        <div>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <Message>
                    Your cart is empty <Link to='/'>Go Back</Link>
                </Message>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '20px' }}>
                    <div className='cart-items'>
                        {cartItems.map((item) => (
                            <div key={item.product} className='card' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Link to={`/product/${item.product}`}>
                                    <img src={item.image} alt={item.name} style={{ width: '80px' }} />
                                </Link>
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                <span>${item.price}</span>
                                <select
                                    value={item.qty}
                                    onChange={(e) => addToCart(item.product, Number(e.target.value))}
                                >
                                    {[...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type='button'
                                    onClick={() => removeFromCart(item.product)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red' }}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className='card'>
                        <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                        ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        <hr style={{ margin: '10px 0' }} />
                        <button
                            type='button'
                            className='btn btn-block'
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                            Proceed To Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartScreen;
