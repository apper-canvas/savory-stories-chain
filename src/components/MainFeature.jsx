import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from './ApperIcon';
import { menuService, reservationService } from '../services';

const MainFeature = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quickReservation, setQuickReservation] = useState({
    date: '',
    time: '',
    guests: 2
  });

  useEffect(() => {
    const loadFeaturedItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const items = await menuService.getAll();
        // Get 3 featured items (one from each main category)
        const featured = items
          .filter(item => ['Appetizers', 'Main Courses', 'Desserts'].includes(item.category))
          .slice(0, 3);
        setFeaturedItems(featured);
      } catch (err) {
        setError(err.message || 'Failed to load featured items');
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedItems();
  }, []);

  const handleQuickReservation = async (e) => {
    e.preventDefault();
    
    if (!quickReservation.date || !quickReservation.time) {
      toast.error('Please select both date and time');
      return;
    }

    try {
      const reservation = {
        ...quickReservation,
        name: 'Quick Reservation',
        email: 'guest@example.com',
        phone: '(555) 000-0000',
        specialRequests: 'Quick reservation from homepage'
      };

      await reservationService.create(reservation);
      toast.success('Reservation created! We will contact you to confirm details.');
      setQuickReservation({ date: '', time: '', guests: 2 });
    } catch (err) {
      toast.error('Failed to create reservation. Please try again.');
    }
  };

  const timeSlots = [
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', 
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
  ];

  if (loading) {
    return (
      <div className="py-16 bg-surface-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-surface-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-surface-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                <div className="h-48 bg-surface-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-surface-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-surface-200 rounded w-full mb-4"></div>
                <div className="h-5 bg-surface-200 rounded w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-surface-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <ApperIcon name="AlertCircle" className="w-12 h-12 text-accent mx-auto mb-4" />
          <p className="text-surface-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-surface-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Featured Dishes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-surface-900 mb-4">
            Featured Dishes
          </h2>
          <p className="text-surface-600 text-lg max-w-2xl mx-auto">
            Discover our chef's signature creations that define the Savory Stories experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer"
            >
              <div className="aspect-w-16 aspect-h-12 relative overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-primary">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold text-surface-900 mb-2">
                  {item.name}
                </h3>
                <p className="text-surface-600 mb-4 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">
                    ${item.price}
                  </span>
                  {item.dietary?.length > 0 && (
                    <div className="flex space-x-1">
                      {item.dietary.map((diet) => (
                        <span
                          key={diet}
                          className="px-2 py-1 bg-secondary/20 text-primary text-xs rounded-full"
                        >
                          {diet}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Reservation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-surface-900 mb-4">
              Quick Reservation
            </h2>
            <p className="text-surface-600">
              Secure your table with just a few clicks
            </p>
          </div>

          <form onSubmit={handleQuickReservation} className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={quickReservation.date}
                  onChange={(e) => setQuickReservation(prev => ({ ...prev, date: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Time
                </label>
                <select
                  value={quickReservation.time}
                  onChange={(e) => setQuickReservation(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Select time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Guests
                </label>
                <select
                  value={quickReservation.guests}
                  onChange={(e) => setQuickReservation(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                  className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors flex items-center justify-center space-x-2"
                >
                  <ApperIcon name="Calendar" className="w-5 h-5" />
                  <span>Reserve Now</span>
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default MainFeature;