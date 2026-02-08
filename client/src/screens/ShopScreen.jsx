import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ShopScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { search } = useLocation();
    const keyword = new URLSearchParams(search).get('keyword') || '';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`/api/products?keyword=${keyword}`);
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [keyword]);

    return (
        <div style={{ minHeight: '80vh', paddingBottom: '50px' }}>
            <h1 style={{ margin: '20px 0', fontSize: '2rem', fontWeight: '800' }}>
                {keyword ? `Search Results for "${keyword}"` : 'Store Catalog'}
            </h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : products.length === 0 ? (
                <h2 style={{ color: '#fff', fontWeight: '400', marginTop: '50px', textAlign: 'center' }}>
                    item not available
                </h2>
            ) : (
                <div className='products-grid'>
                    {products.map((product) => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShopScreen;
