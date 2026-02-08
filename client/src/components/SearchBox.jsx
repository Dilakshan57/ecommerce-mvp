import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchBox = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/shop?keyword=${keyword}`);
        } else {
            navigate('/shop');
        }
    };

    return (
        <form onSubmit={submitHandler} className='search-box'>
            <input
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search Products...'
                className='search-input'
            />
            <button type='submit' className='search-btn'>
                <FaSearch />
            </button>
        </form>
    );
};

export default SearchBox;
