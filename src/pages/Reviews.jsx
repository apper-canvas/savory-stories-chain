import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import { reviewService } from '../services';

const Reviews = () => {
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

  const StarRating = ({ rating, interactive = false, onRatingChange }) => (
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
          <h2 className="text-2xl font-bold text-surface-900 mb-4">Unable to Load Reviews</h2>
          <p className="text-surface-600 mb-8">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </motion.button>
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
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-surface-900 mb-4">
            Customer Reviews
          </h1>
          <p className="text-surface-600 text-lg max-w-2xl mx-auto">
            Hear what our guests have to say about their dining experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Rating Summary */}
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
                <p className="text-surface-600 mt-2">
                  Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                </p>
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

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowWriteReview(true)}
                className="w-full px-4 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
              >
                <ApperIcon name="Edit3" className="w-4 h-4" />
                <span>Write a Review</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Reviews List */}
          <div className="lg:col-span-2">
            {reviews.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 bg-white rounded-xl shadow-md"
              >
                <ApperIcon name="MessageSquare" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-surface-900 mb-2">No reviews yet</h3>
                <p className="text-surface-600 mb-6">
                  Be the first to share your dining experience
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowWriteReview(true)}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Write First Review
                </motion.button>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-md p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-surface-900 text-lg">
                          {review.author}
                        </h3>
                        <p className="text-surface-500 text-sm">
                          {new Date(review.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-surface-700 leading-relaxed">
                      {review.comment}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Write Review Modal */}
        {showWriteReview && (
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
                <h2 className="font-heading text-2xl font-semibold text-surface-900">
                  Write a Review
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowWriteReview(false)}
                  className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </motion.button>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={newReview.author}
                    onChange={(e) => setNewReview(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Rating
                  </label>
                  <StarRating
                    rating={newReview.rating}
                    interactive={true}
                    onRatingChange={(rating) => setNewReview(prev => ({ ...prev, rating }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                    rows={4}
                    placeholder="Share your dining experience..."
                    className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    required
                  />
                </div>

                <div className="flex space-x-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowWriteReview(false)}
                    className="flex-1 px-4 py-3 bg-surface-200 text-surface-700 font-semibold rounded-lg hover:bg-surface-300 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Submit Review
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Reviews;