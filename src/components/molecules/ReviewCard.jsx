import React from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import StarRating from '@/components/molecules/StarRating';

const ReviewCard = ({ review, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
        >
            <div className="flex items-start justify-between mb-4">
                <div>
                    <Heading as="h3" className="font-semibold text-surface-900 text-lg">
                        {review.author}
                    </Heading>
                    <Paragraph className="text-sm text-surface-500">
                        {new Date(review.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </Paragraph>
                </div>
                <StarRating rating={review.rating} />
            </div>
            <Paragraph className="leading-relaxed text-surface-700">
                {review.comment}
            </Paragraph>
        </motion.div>
    );
};

export default ReviewCard;