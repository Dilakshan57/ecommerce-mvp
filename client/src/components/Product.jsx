import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    return (
        <div className='card'>
            <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} style={{ borderRadius: '5px' }} />
            </Link>
            <div className='card-body'>
                <Link to={`/product/${product._id}`}>
                    <h3>{product.name}</h3>
                </Link>
                <h3>${product.price}</h3>
            </div>
        </div>
    );
};

export default Product;
