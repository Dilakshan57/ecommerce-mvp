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
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <form onSubmit={submitHandler}>
                <div className='form-group'>
                    <label as='legend'>Select Method</label>
                    <div className='col'>
                        <div style={{ marginBottom: '10px' }}>
                            <input
                                type='radio'
                                id='Stripe'
                                name='paymentMethod'
                                value='Stripe'
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <label htmlFor='Stripe' style={{ marginLeft: '10px' }}>Stripe or Credit Card</label>
                        </div>
                        {/* Add PayPal or others here if needed */}
                    </div>
                </div>
                <button type='submit' className='btn btn-block'>
                    Continue
                </button>
            </form>
        </FormContainer>
    );
};

export default PaymentScreen;
