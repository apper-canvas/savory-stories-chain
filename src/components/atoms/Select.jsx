import React from 'react';

const Select = ({ value, onChange, children, className = '', ...props }) => {
    return (
        <select
            value={value}
            onChange={onChange}
            className={`w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${className}`}
            {...props}
        >
            {children}
        </select>
    );
};

export default Select;