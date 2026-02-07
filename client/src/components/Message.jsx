import React from 'react';

const Message = ({ variant, children }) => {
    const getBackgroundColor = (variant) => {
        switch (variant) {
            case 'danger':
                return '#f8d7da';
            case 'success':
                return '#d4edda';
            case 'info':
                return '#d1ecf1';
            default:
                return '#d1ecf1';
        }
    };

    const getTextColor = (variant) => {
        switch (variant) {
            case 'danger':
                return '#721c24';
            case 'success':
                return '#155724';
            case 'info':
                return '#0c5460';
            default:
                return '#0c5460';
        }
    };

    return (
        <div
            style={{
                padding: '10px',
                margin: '10px 0',
                borderRadius: '5px',
                backgroundColor: getBackgroundColor(variant),
                color: getTextColor(variant),
            }}
        >
            {children}
        </div>
    );
};

Message.defaultProps = {
    variant: 'info',
};

export default Message;
