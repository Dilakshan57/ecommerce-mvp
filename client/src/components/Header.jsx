import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);

    return (
        <header>
            <nav className='container'>
                <Link to='/' style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    ProShop
                </Link>
                <ul>
                    <li>
                        <Link to='/cart'>
                            <FaShoppingCart /> Cart
                            {cartItems.length > 0 && (
                                <span style={{ marginLeft: '5px', background: 'red', borderRadius: '50%', padding: '2px 6px', fontSize: '0.8rem' }}>
                                    {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                                </span>
                            )}
                        </Link>
                    </li>
                    {user ? (
                        <>
                            <li style={{ position: 'relative', display: 'inline-block' }}>
                                {/* Simple Dropdown Logic could be added here, simplified for MVP */}
                                <span>Hello, {user.name}</span>
                                <button onClick={logout} style={{ marginLeft: '10px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                                    Logout
                                </button>
                            </li>
                            {user.isAdmin && (
                                <>
                                    <li><Link to='/admin/productlist'>Products</Link></li>
                                    <li><Link to='/admin/orderlist'>Orders</Link></li>
                                </>
                            )}
                        </>
                    ) : (
                        <li>
                            <Link to='/login'>
                                <FaUser /> Sign In
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
