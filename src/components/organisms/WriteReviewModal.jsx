import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import FormField from '@/components/molecules/FormField';
import StarRating from '@/components/molecules/StarRating';
import Button from '@/components/atoms/Button';
import Heading from '@/components/atoms/Heading';

const WriteReviewModal = ({ showWriteReview, setShowWriteReview, newReview, setNewReview, handleSubmitReview }) => {
    if (!showWriteReview) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowWriteReview(false)}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
                <div className="flex items-center justify-between mb-6">
                    <Heading as="h2" className="text-2xl font-semibold text-surface-900">
                        Write a Review
                    </Heading>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowWriteReview(false)}
                        className="p-2 hover:bg-surface-100 rounded-lg"
                    >
                        <ApperIcon name="X" className="w-5 h-5" />
                    </motion.button>
                </div>

                <form onSubmit={handleSubmitReview} className="space-y-6">
                    <FormField
                        label="Your Name"
                        name="author"
                        value={newReview.author}
                        onChange={(e) => setNewReview(prev => ({ ...prev, author: e.target.value }))}
                        required
                    />

                    <div>
                        <Label>Rating</Label>
                        <StarRating
                            rating={newReview.rating}
                            interactive={true}
                            onRatingChange={(rating) => setNewReview(prev => ({ ...prev, rating }))}
                        />
                    </div>

                    <FormField
                        label="Your Review"
                        name="comment"
                        type="textarea"
                        value={newReview.comment}
                        onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                        rows={4}
                        placeholder="Share your dining experience..."
                        required
                    />

                    <div className="flex space-x-4">
                        <Button
                            type="button"
                            onClick={() => setShowWriteReview(false)}
                            className="flex-1 px-4 py-3 bg-surface-200 text-surface-700 hover:bg-surface-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-primary text-white hover:bg-primary/90"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Submit Review
                        </Button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default WriteReviewModal;