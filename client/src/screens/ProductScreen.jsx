import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import Message from '../components/Message';
import CartContext from '../context/CartContext';

const ProductScreen = () => {
    const [product, setProduct] = useState({});
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const addToCartHandler = async () => {
        await addToCart(product._id, qty);
        navigate('/cart');
    };

    return (
        <div className='container' style={{ paddingBottom: '80px', background: '#fff' }}>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <div className='product-layout-refinement'>
                    {/* Left aligned image with 10% margins */}
                    <img
                        src={product.image}
                        alt={product.name}
                        className='product-img-left-refinement'
                    />

                    <div style={{ flex: 1, paddingRight: '10%' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#1a1a1a' }}>{product.name}</h1>
                        <p style={{ fontSize: '1.2rem', color: '#444', marginBottom: '30px', lineHeight: '1.6' }}>{product.description}</p>

                        <div className='card' style={{ padding: '25px', background: '#fff', color: '#1a1a1a', borderRadius: '15px', border: '1px solid #ddd', maxWidth: '400px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                <span>Price:</span>
                                <strong>${product.price}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                <span>Status:</span>
                                <span>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                            </div>

                            {product.countInStock > 0 && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                                    <span>Quantity:</span>
                                    <select
                                        value={qty}
                                        onChange={(e) => setQty(Number(e.target.value))}
                                        style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                                    >
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <button
                                className='btn btn-block'
                                type='button'
                                disabled={product.countInStock === 0}
                                onClick={addToCartHandler}
                                style={{ marginBottom: '15px', padding: '12px' }}
                            >
                                Add To Cart
                            </button>

                            <button
                                className='btn btn-block'
                                onClick={() => navigate(-1)}
                                style={{ background: '#333', color: '#fff', padding: '12px' }}
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductScreen;
