import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import ReviewsSummary from '@/components/organisms/ReviewsSummary';
import ReviewList from '@/components/organisms/ReviewList';
import WriteReviewModal from '@/components/organisms/WriteReviewModal';
import Button from '@/components/atoms/Button';

import { reviewService } from '@/services';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const reviewData = await reviewService.getAll();
        setReviews(reviewData);
      } catch (err) {
        setError(err.message || 'Failed to load reviews');
        toast.error('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!newReview.author.trim() || !newReview.comment.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const review = await reviewService.create(newReview);
      setReviews(prev => [review, ...prev]);
      setNewReview({ author: '', rating: 5, comment: '' });
      setShowWriteReview(false);
      toast.success('Thank you for your review!');
    } catch (err) {
      toast.error('Failed to submit review. Please try again.');
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(review => review.rating === rating).length / reviews.length) * 100 : 0
  }));

  if (loading) {
    return (
      <div className="py-8">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-10 bg-surface-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-surface-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                <div className="h-20 bg-surface-200 rounded mb-4"></div>
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 bg-surface-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                  <div className="h-6 bg-surface-200 rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-surface-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-surface-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-accent mx-auto mb-4" />
          <Heading as="h2" className="text-2xl font-bold text-surface-900 mb-4">Unable to Load Reviews</Heading>
          <Paragraph className="mb-8">{error}</Paragraph>
          <Button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Heading as="h1" className="text-4xl md:text-5xl font-bold text-surface-900 mb-4">
            Customer Reviews
          </Heading>
          <Paragraph className="text-lg max-w-2xl mx-auto">
            Hear what our guests have to say about their dining experience
          </Paragraph>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ReviewsSummary
            reviews={reviews}
            averageRating={averageRating}
            ratingDistribution={ratingDistribution}
            setShowWriteReview={setShowWriteReview}
          />
          <ReviewList reviews={reviews} setShowWriteReview={setShowWriteReview} />
        </div>

        <WriteReviewModal
          showWriteReview={showWriteReview}
          setShowWriteReview={setShowWriteReview}
          newReview={newReview}
          setNewReview={setNewReview}
          handleSubmitReview={handleSubmitReview}
        />
      </div>
    </div>
  );
};

export default ReviewsPage;