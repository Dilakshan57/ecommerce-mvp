import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { FaShoppingCart, FaUser, FaStore, FaBars, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';
import SearchBox from './SearchBox';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (isMenuOpen) setIsCategoriesOpen(false); // Reset sub-menu when closing main menu
    };

    const toggleCategories = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsCategoriesOpen(!isCategoriesOpen);
    };

    return (
        <header>
            <nav className='container'>
                <Link to='/' style={{ fontSize: '1.8rem', fontWeight: '800', letterSpacing: '1px' }}>
                    ProShop
                </Link>

                <div className='menu-icon' onClick={toggleMenu}>
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </div>

                <ul className={isMenuOpen ? 'active' : ''}>
                    <li>
                        <SearchBox />
                    </li>
                    <li className='nav-item-dropdown'>
                        <div className='dropdown-trigger' style={{ display: 'flex', alignItems: 'center' }}>
                            <Link to='/shop' onClick={() => setIsMenuOpen(false)} style={{ display: 'flex', alignItems: 'center' }}>
                                <FaStore size={18} /> <span style={{ marginLeft: '5px' }}>Products</span>
                            </Link>
                            <span className='mobile-arrow-toggle' onClick={toggleCategories} style={{ marginLeft: '10px', cursor: 'pointer', display: 'none' }}>
                                {isCategoriesOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                            </span>
                        </div>
                        <div className={`category-dropdown-menu ${isCategoriesOpen ? 'mobile-open' : ''}`}>
                            <Link to='/shop?category=Phone' onClick={() => setIsMenuOpen(false)} className='category-dropdown-item'>Phone</Link>
                            <Link to='/shop?category=Laptop' onClick={() => setIsMenuOpen(false)} className='category-dropdown-item'>Laptop</Link>
                            <Link to='/shop?category=headphone' onClick={() => setIsMenuOpen(false)} className='category-dropdown-item'>headphone</Link>
                            <Link to='/shop?category=Cameras' onClick={() => setIsMenuOpen(false)} className='category-dropdown-item'>Cameras</Link>
                            <Link to='/shop?category=Clothing' onClick={() => setIsMenuOpen(false)} className='category-dropdown-item'>Clothing</Link>
                        </div>
                    </li>
                    <li>
                        <Link to='/cart' onClick={() => setIsMenuOpen(false)} style={{ display: 'flex', alignItems: 'center' }}>
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
                                <button onClick={() => { logout(); setIsMenuOpen(false); }} className='btn' style={{ padding: '5px 10px', fontSize: '0.8rem' }}>
                                    Logout
                                </button>
                            </li>
                            {user.isAdmin && (
                                <>
                                    <li><Link to='/admin/productlist' onClick={() => setIsMenuOpen(false)}>Manage Products</Link></li>
                                    <li><Link to='/admin/orderlist' onClick={() => setIsMenuOpen(false)}>Orders</Link></li>
                                </>
                            )}
                        </>
                    ) : (
                        <li>
                            <Link to='/login' onClick={() => setIsMenuOpen(false)} style={{ display: 'flex', alignItems: 'center' }}>
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
