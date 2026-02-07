import React from 'react';

const FormContainer = ({ children }) => {
    return (
        <div className='container'>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '50rem' }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default FormContainer;
