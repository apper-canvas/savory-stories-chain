import reviewData from '../mockData/reviews.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const reviewService = {
  async getAll() {
    await delay(300);
    return [...reviewData].sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  async getById(id) {
    await delay(200);
    const review = reviewData.find(rev => rev.id === id);
    if (!review) {
      throw new Error('Review not found');
    }
    return { ...review };
  },

  async create(review) {
    await delay(400);
    const newReview = {
      ...review,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    reviewData.unshift(newReview);
    return { ...newReview };
  },

  async update(id, data) {
    await delay(350);
    const index = reviewData.findIndex(rev => rev.id === id);
    if (index === -1) {
      throw new Error('Review not found');
    }
    reviewData[index] = { ...reviewData[index], ...data };
    return { ...reviewData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = reviewData.findIndex(rev => rev.id === id);
    if (index === -1) {
      throw new Error('Review not found');
    }
    reviewData.splice(index, 1);
    return { success: true };
  },

  async getAverageRating() {
    await delay(150);
    if (reviewData.length === 0) return 0;
    const sum = reviewData.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviewData.length).toFixed(1);
  }
};

export default reviewService;