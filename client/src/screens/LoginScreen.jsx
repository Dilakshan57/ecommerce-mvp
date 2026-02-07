import { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Message from '../components/Message';
import Loader from '../components/Loader';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const { login, user, loading } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (user) {
            navigate(redirect);
        }
    }, [navigate, user, redirect]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className='auth-page-wrapper'>
            <div style={{ maxWidth: '400px', margin: '0 auto', background: 'rgba(255, 255, 255, 0.9)', padding: '2rem', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                <h1>Sign In</h1>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <form onSubmit={submitHandler}>
                    <div className='form-group'>
                        <label>Email Address</label>
                        <input
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-block'>
                        Sign In
                    </button>
                </form>

                <div style={{ marginTop: '10px' }}>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
