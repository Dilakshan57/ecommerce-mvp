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
        <div className='container'>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <div style={{ marginTop: '40px', textAlign: 'center' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <img src={product.image} alt={product.name} className='product-detail-img' />
                    </div>

                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
                            <div>
                                <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{product.name}</h1>
                                <p style={{ fontSize: '1.2rem', color: '#888', marginBottom: '20px' }}>{product.description}</p>
                                <div className='rating-container' style={{ marginBottom: '20px' }}>
                                    {/* Rating component if needed */}
                                </div>
                            </div>

                            <div className='card' style={{ padding: '25px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: '#000' }}>
                                    <span>Price:</span>
                                    <strong>${product.price}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: '#000' }}>
                                    <span>Status:</span>
                                    <span>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                                </div>

                                {product.countInStock > 0 && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center', color: '#000' }}>
                                        <span>Quantity:</span>
                                        <select
                                            value={qty}
                                            onChange={(e) => setQty(Number(e.target.value))}
                                            style={{ padding: '5px', borderRadius: '5px' }}
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
                                    style={{ marginBottom: '15px' }}
                                >
                                    Add To Cart
                                </button>

                                <button
                                    className='btn btn-block'
                                    onClick={() => navigate(-1)}
                                    style={{ background: '#333', color: '#fff' }}
                                >
                                    Go Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductScreen;
