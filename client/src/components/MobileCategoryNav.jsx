import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileCategoryNav = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const activeCategory = query.get('category');

    const isShopPage = location.pathname === '/shop';
    const isProductPage = location.pathname.startsWith('/product/');

    if (!isShopPage && !isProductPage) return null;

    const categories = [
        { name: 'All', link: '/shop' },
        { name: 'Phone', link: '/shop?category=Phone' },
        { name: 'Laptop', link: '/shop?category=Laptop' },
        { name: 'Headphone', link: '/shop?category=headphone' },
        { name: 'Cameras', link: '/shop?category=Cameras' },
        { name: 'Clothing', link: '/shop?category=Clothing' },
    ];

    return (
        <div className='mobile-category-nav'>
            <div className='mobile-category-list'>
                {categories.map((cat) => (
                    <Link
                        key={cat.name}
                        to={cat.link}
                        className={`mobile-category-item ${(cat.name === 'All' && !activeCategory) || activeCategory === cat.name ? 'active' : ''
                            }`}
                    >
                        {cat.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MobileCategoryNav;
