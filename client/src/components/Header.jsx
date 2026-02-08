import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { FaShoppingCart, FaUser, FaStore } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';
import SearchBox from './SearchBox';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);

    return (
        <header>
            <nav className='container'>
                <Link to='/' style={{ fontSize: '1.8rem', fontWeight: '800', letterSpacing: '1px' }}>
                    ProShop
                </Link>
                <ul>
                    <li>
                        <SearchBox />
                    </li>
                    <li>
                        <Link to='/shop' style={{ display: 'flex', alignItems: 'center' }}>
                            <FaStore size={18} /> <span style={{ marginLeft: '5px' }}>Products</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/cart' style={{ display: 'flex', alignItems: 'center' }}>
                            <FaShoppingCart size={20} /> <span style={{ marginLeft: '5px' }}>Cart</span>
                            {cartItems.length > 0 && (
                                <span style={{ marginLeft: '5px', background: '#ffc107', color: '#000', borderRadius: '50%', padding: '2px 6px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                    {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                                </span>
                            )}
                        </Link>
                    </li>
                    {user ? (
                        <>
                            <li style={{ position: 'relative', display: 'inline-block' }}>
                                <span style={{ marginRight: '10px', fontWeight: '500' }}>Hello, {user.name}</span>
                                <button onClick={logout} className='btn' style={{ padding: '5px 10px', fontSize: '0.8rem' }}>
                                    Logout
                                </button>
                            </li>
                            {user.isAdmin && (
                                <>
                                    <li><Link to='/admin/productlist'>Manage Products</Link></li>
                                    <li><Link to='/admin/orderlist'>Orders</Link></li>
                                </>
                            )}
                        </>
                    ) : (
                        <li>
                            <Link to='/login' style={{ display: 'flex', alignItems: 'center' }}>
                                <FaUser size={18} /> <span style={{ marginLeft: '5px' }}>Sign In</span>
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
