import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
    const { shippingAddress, saveShippingAddress } = useContext(CartContext);
    const navigate = useNavigate();

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    const [error, setError] = useState(null);

    const validatePostalCode = (pc) => {
        // Remove spaces
        const cleanPC = pc.replace(/\s/g, '');
        if (cleanPC.length !== 6) return false;

        // Pattern: Letter, Number, Letter, Number, Letter, Number
        const pattern = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;
        return pattern.test(cleanPC);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (!validatePostalCode(postalCode)) {
            setError('Postal code must be 6 characters: Letter, Number, Letter, Number, Letter, Number (e.g. A1B 2C3)');
            return;
        }
        saveShippingAddress({ address, city, postalCode: postalCode.replace(/\s/g, '').toUpperCase(), country });
        navigate('/payment');
    };

    return (
        <div className='checkout-page-wrapper'>
            <div className='auth-form-container'>
                <CheckoutSteps step1 step2 />
                <h1>Shipping</h1>
                {error && <div style={{ color: '#ff6b6b', marginBottom: '10px' }}>{error}</div>}
                <form onSubmit={submitHandler}>
                    <div className='form-group'>
                        <label>Address</label>
                        <input
                            type='text'
                            placeholder='Enter address'
                            value={address}
                            required
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label>City</label>
                        <input
                            type='text'
                            placeholder='Enter city'
                            value={city}
                            required
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Postal Code (LNL NLN)</label>
                        <input
                            type='text'
                            placeholder='e.g. A1B 2C3'
                            value={postalCode}
                            required
                            maxLength={7}
                            onChange={(e) => {
                                setPostalCode(e.target.value);
                                if (error) setError(null);
                            }}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Country</label>
                        <input
                            type='text'
                            placeholder='Enter country'
                            value={country}
                            required
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-block'>
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShippingScreen;
