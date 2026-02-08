import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
    const { shippingAddress, savePaymentMethod } = useContext(CartContext);
    const navigate = useNavigate();

    if (!shippingAddress.address) {
        navigate('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('Stripe');

    const submitHandler = (e) => {
        e.preventDefault();
        savePaymentMethod(paymentMethod);
        navigate('/placeorder');
    };

    return (
        <div className='checkout-page-wrapper'>
            <div className='auth-form-container'>
                <CheckoutSteps step1 step2 step3 />
                <h1 style={{ color: '#fff' }}>Payment Method</h1>
                <form onSubmit={submitHandler}>
                    <div className='form-group'>
                        <label as='legend' style={{ color: '#fff' }}>Select Method</label>
                        <div className='col'>
                            <div style={{ marginBottom: '10px', color: '#fff' }}>
                                <input
                                    type='radio'
                                    id='Stripe'
                                    name='paymentMethod'
                                    value='Stripe'
                                    checked
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label htmlFor='Stripe' style={{ marginLeft: '10px', color: '#fff' }}>Stripe or Credit Card</label>
                            </div>
                        </div>
                    </div>
                    <button type='submit' className='btn btn-block'>
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentScreen;
