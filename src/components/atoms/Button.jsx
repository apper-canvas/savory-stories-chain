import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ onClick, children, className = '', type = 'button', disabled = false, ...props }) => {
    // Filter out props that are not valid HTML attributes for a button
    const filteredProps = { ...props };
    delete filteredProps.whileHover;
    delete filteredProps.whileTap;

    return (
        <motion.button
            onClick={onClick}
            className={`transition-colors duration-200 ${className}`}
            type={type}
            disabled={disabled}
            {...props} // Pass motion props like whileHover, whileTap
            {...filteredProps} // Pass other standard HTML props
        >
            {children}
        </motion.button>
    );
};

export default Button;