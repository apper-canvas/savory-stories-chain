import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';

const CategoryFilterButton = ({ category, activeCategory, onClick, count }) => {
    return (
        <Button
            onClick={() => onClick(category)}
            className={`px-6 py-3 rounded-full font-medium ${
                activeCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-surface-700 hover:bg-surface-100 border border-surface-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {category}
            {count !== undefined && (
                <span className="ml-2 text-sm opacity-75">
                    ({count})
                </span>
            )}
        </Button>
    );
};

export default CategoryFilterButton;