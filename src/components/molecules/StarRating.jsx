import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const StarRating = ({ rating, interactive = false, onRatingChange }) => {
    return (
        <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                    key={star}
                    type={interactive ? "button" : undefined}
                    whileHover={interactive ? { scale: 1.1 } : {}}
                    whileTap={interactive ? { scale: 0.9 } : {}}
                    onClick={interactive ? () => onRatingChange(star) : undefined}
                    className={interactive ? 'cursor-pointer' : 'cursor-default'}
                >
                    <ApperIcon
                        name="Star"
                        className={`w-5 h-5 transition-colors ${
                            star <= rating 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-surface-300'
                        }`}
                    />
                </motion.button>
            ))}
        </div>
    );
};

export default StarRating;