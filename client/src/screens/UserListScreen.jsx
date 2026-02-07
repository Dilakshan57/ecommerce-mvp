import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import Loader from '../components/Loader';
import Message from '../components/Message';

const UserListScreen = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user: userInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            const fetchUsers = async () => {
                try {
                    const config = {
                        headers: { Authorization: `Bearer ${userInfo.token}` }
                    };
                    const { data } = await axios.get('/api/users', config);
                    setUsers(data);
                    setLoading(false);
                } catch (err) {
                    setError(err.message);
                    setLoading(false);
                }
            };
            fetchUsers();
        } else {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                };
                await axios.delete(`/api/users/${id}`, config);
                setUsers(users.filter(x => x._id !== id));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    return (
        <>
            <h1>Users</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} style={{ borderBottom: '1px solid #eee' }}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>
                                    {user.isAdmin ? (<FaCheck color='green' />) : (<FaTimes color='red' />)}
                                </td>
                                <td>
                                    <Link to={`/admin/user/${user._id}/edit`}>
                                        <button className='btn' style={{ marginRight: '10px' }}><FaEdit /></button>
                                    </Link>
                                    <button className='btn' style={{ background: 'red' }} onClick={() => deleteHandler(user._id)}><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default UserListScreen;
