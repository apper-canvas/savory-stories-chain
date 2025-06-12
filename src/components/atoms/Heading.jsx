import React from 'react';

const Heading = ({ as: Component = 'h2', children, className = '', ...props }) => {
    return (
        <Component className={`font-heading ${className}`} {...props}>
            {children}
        </Component>
    );
};

export default Heading;