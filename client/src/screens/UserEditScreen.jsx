import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

const UserEditScreen = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user: userInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
            return;
        }
        const fetchUser = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                };
                const { data } = await axios.get(`/api/users/${id}`, config);
                setName(data.name);
                setEmail(data.email);
                setIsAdmin(data.isAdmin);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchUser();
    }, [id, userInfo, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            };

            await axios.put(
                `/api/users/${id}`,
                { name, email, isAdmin },
                config
            );
            navigate('/admin/userlist');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <form onSubmit={submitHandler}>
                        <div className='form-group'>
                            <label>Name</label>
                            <input
                                type='text'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
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
                            <label>
                                <input
                                    type='checkbox'
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                    style={{ width: 'auto', marginRight: '5px' }}
                                />
                                Is Admin
                            </label>
                        </div>
                        <button type='submit' className='btn btn-block'>
                            Update
                        </button>
                    </form>
                )}
            </FormContainer>
        </>
    );
};

export default UserEditScreen;
