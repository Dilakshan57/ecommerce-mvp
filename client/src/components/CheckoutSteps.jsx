import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{ margin: '0 20px' }}>
                {step1 ? <Link to='/login' style={{ color: '#fff' }}>Sign In</Link> : <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Sign In</span>}
            </div>
            <div style={{ margin: '0 20px' }}>
                {step2 ? <Link to='/shipping' style={{ color: '#fff' }}>Shipping</Link> : <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Shipping</span>}
            </div>
            <div style={{ margin: '0 20px' }}>
                {step3 ? <Link to='/payment' style={{ color: '#fff' }}>Payment</Link> : <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Payment</span>}
            </div>
            <div style={{ margin: '0 20px' }}>
                {step4 ? <Link to='/placeorder' style={{ color: '#fff' }}>Place Order</Link> : <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Place Order</span>}
            </div>
        </div>
    );
};

export default CheckoutSteps;
