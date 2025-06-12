import React from 'react';

const Spinner = ({ className = 'w-5 h-5', color = 'border-white/30', borderTopColor = 'border-t-white' }) => {
    return (
        <div className={`${className} border-2 ${color} ${borderTopColor} rounded-full animate-spin`}></div>
    );
};

export default Spinner;