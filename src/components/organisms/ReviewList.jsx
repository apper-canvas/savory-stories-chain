import React from 'react';
import { motion } from 'framer-motion';
import ReviewCard from '@/components/molecules/ReviewCard';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Button from '@/components/atoms/Button';

const ReviewList = ({ reviews, setShowWriteReview }) => {
    return (
        <div className="lg:col-span-2">
            {reviews.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 bg-white rounded-xl shadow-md"
                >
                    <ApperIcon name="MessageSquare" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
                    <Heading as="h3" className="text-xl font-semibold text-surface-900 mb-2">No reviews yet</Heading>
                    <Paragraph className="mb-6">
                        Be the first to share your dining experience
                    </Paragraph>
                    <Button
                        onClick={() => setShowWriteReview(true)}
                        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Write First Review
                    </Button>
                </motion.div>
            ) : (
                <div className="space-y-6">
                    {reviews.map((review, index) => (
                        <ReviewCard key={review.id} review={review} index={index} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewList;