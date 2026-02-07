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
        <>
            <button className='btn' onClick={() => navigate(-1)}>Go Back</button>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                    <div>
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div>
                        <h3>{product.name}</h3>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Price: ${product.price}</p>
                        <p>Description: {product.description}</p>

                        <div className='card'>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span>Price:</span>
                                <strong>${product.price}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span>Status:</span>
                                <span>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                            </div>

                            {product.countInStock > 0 && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center' }}>
                                    <span>Qty</span>
                                    <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
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
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductScreen;
