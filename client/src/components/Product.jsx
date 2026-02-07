import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    return (
        <div className='card'>
            <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} />
            </Link>
            <div className='card-body'>
                <Link to={`/product/${product._id}`}>
                    <h3 className='card-title' style={{ fontSize: '1.1rem', margin: '10px 0' }}>{product.name}</h3>
                </Link>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${product.price}</h3>
                <div className='rating'>
                    <span>TODO: Rating</span>
                </div>
            </div>
        </div>
    );
};

export default Product;
