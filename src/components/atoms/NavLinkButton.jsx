import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavLinkButton = ({ to, children, className = '', icon: Icon, ...props }) => {
    // Filter out props that are not valid HTML attributes for NavLink
    const filteredProps = { ...props };
    delete filteredProps.whileHover;
    delete filteredProps.whileTap;

    return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <NavLink
                to={to}
                className={`inline-flex items-center px-8 py-4 font-semibold rounded-lg transition-colors ${className}`}
                {...filteredProps}
            >
                {Icon && React.createElement(Icon, { className: 'w-5 h-5 mr-2' })}
                {children}
            </NavLink>
        </motion.div>
    );
};

export default NavLinkButton;