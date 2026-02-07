import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductListScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingCreate, setLoadingCreate] = useState(false);

    const { user: userInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
            return;
        }

        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products');
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchProducts();
    }, [userInfo, navigate]);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                };
                await axios.delete(`/api/products/${id}`, config);
                setProducts(products.filter(x => x._id !== id));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const createProductHandler = async () => {
        setLoadingCreate(true);
        try {
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };
            const { data } = await axios.post('/api/products', {}, config);
            setLoadingCreate(false);
            navigate(`/admin/product/${data._id}/edit`);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoadingCreate(false);
        }
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Products</h1>
                <button className='btn' onClick={createProductHandler}>
                    <FaPlus /> Create Product
                </button>
            </div>
            {loadingCreate && <Loader />}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id} style={{ borderBottom: '1px solid #eee' }}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <Link to={`/admin/product/${product._id}/edit`}>
                                        <button className='btn' style={{ marginRight: '10px' }}><FaEdit /></button>
                                    </Link>
                                    <button className='btn' style={{ background: 'red' }} onClick={() => deleteHandler(product._id)}><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default ProductListScreen;
