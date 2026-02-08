import { Link } from 'react-router-dom';

const HomeScreen = () => {
    return (
        <div className='landing-wrapper'>
            <div className='landing-content'>
                <h1 className='landing-logo'>ProShop</h1>
                <p className='landing-tagline'>Premium Tech & Lifestyle Curations</p>
                <Link to='/shop' className='btn-enter'>
                    Enter Store
                </Link>
            </div>
        </div>
    );
};

export default HomeScreen;
