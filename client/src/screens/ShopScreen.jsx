import { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ShopScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products');
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <h1 style={{ margin: '20px 0', fontSize: '2rem', fontWeight: '800' }}>Store Catalog</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <div className='products-grid'>
                    {products.map((product) => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
            )}
        </>
    );
};

export default ShopScreen;
