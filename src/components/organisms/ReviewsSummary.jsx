import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import StarRating from '@/components/molecules/StarRating';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';

const ReviewsSummary = ({ reviews, averageRating, ratingDistribution, setShowWriteReview }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
        >
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-primary mb-2">
                        {averageRating}
                    </div>
                    <StarRating rating={Math.round(parseFloat(averageRating))} />
                    <Paragraph className="mt-2">
                        Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                    </Paragraph>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-3 mb-6">
                    {ratingDistribution.map(({ rating, count, percentage }) => (
                        <div key={rating} className="flex items-center space-x-3">
                            <span className="text-sm text-surface-600 w-8">{rating}</span>
                            <ApperIcon name="Star" className="w-4 h-4 text-yellow-400 fill-current" />
                            <div className="flex-1 bg-surface-200 rounded-full h-2">
                                <div
                                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            <span className="text-sm text-surface-600 w-8">{count}</span>
                        </div>
                    ))}
                </div>

                <Button
                    onClick={() => setShowWriteReview(true)}
                    className="w-full px-4 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ApperIcon name="Edit3" className="w-4 h-4" />
                    <span>Write a Review</span>
                </Button>
            </div>
        </motion.div>
    );
};

export default ReviewsSummary;