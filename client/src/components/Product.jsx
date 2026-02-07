import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
    return (
        <div className='card'>
            <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} />
            </Link>
            <div className='card-body'>
                <Link to={`/product/${product._id}`}>
                    <h3 className='card-title' style={{ fontSize: '0.9rem', margin: '10px 0', height: '40px', overflow: 'hidden' }}>{product.name}</h3>
                </Link>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 'bold' }}>${product.price}</h3>
                    <Rating value={product.rating} />
                </div>
            </div>
        </div>
    );
};

export default Product;
