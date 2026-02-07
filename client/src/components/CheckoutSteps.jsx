import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{ margin: '0 20px' }}>
                {step1 ? <Link to='/login'>Sign In</Link> : <span style={{ color: '#ccc' }}>Sign In</span>}
            </div>
            <div style={{ margin: '0 20px' }}>
                {step2 ? <Link to='/shipping'>Shipping</Link> : <span style={{ color: '#ccc' }}>Shipping</span>}
            </div>
            <div style={{ margin: '0 20px' }}>
                {step3 ? <Link to='/payment'>Payment</Link> : <span style={{ color: '#ccc' }}>Payment</span>}
            </div>
            <div style={{ margin: '0 20px' }}>
                {step4 ? <Link to='/placeorder'>Place Order</Link> : <span style={{ color: '#ccc' }}>Place Order</span>}
            </div>
        </div>
    );
};

export default CheckoutSteps;
