import React from 'react';

const Textarea = ({ value, onChange, placeholder, rows = 4, className = '', ...props }) => {
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={`w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${className}`}
            {...props}
        />
    );
};

export default Textarea;