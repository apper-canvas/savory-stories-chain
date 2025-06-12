import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import { menuService } from '../services';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Appetizers', 'Main Courses', 'Desserts', 'Beverages'];

  useEffect(() => {
    const loadMenuItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const items = await menuService.getAll();
        setMenuItems(items);
      } catch (err) {
        setError(err.message || 'Failed to load menu items');
        toast.error('Failed to load menu');
      } finally {
        setLoading(false);
      }
    };

    loadMenuItems();
  }, []);

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const groupedItems = categories.reduce((acc, category) => {
    if (category === 'All') return acc;
    acc[category] = filteredItems.filter(item => item.category === category);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="py-8">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="h-10 bg-surface-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-surface-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>

          {/* Category Filters Skeleton */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-surface-200 rounded-full w-24 animate-pulse"></div>
            ))}
          </div>

          {/* Menu Items Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
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
      <div className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-accent mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-surface-900 mb-4">Unable to Load Menu</h2>
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

  if (menuItems.length === 0) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <ApperIcon name="Book" className="w-16 h-16 text-surface-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-surface-900 mb-4">Menu Coming Soon</h2>
          <p className="text-surface-600 mb-8">
            Our chefs are putting the finishing touches on our amazing menu. Check back soon!
          </p>
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
            Our Menu
          </h1>
          <p className="text-surface-600 text-lg max-w-2xl mx-auto">
            Discover our carefully curated selection of dishes, each crafted with passion and the finest ingredients
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-md mx-auto mb-8"
        >
          <div className="relative">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-white text-surface-700 hover:bg-surface-100 border border-surface-300'
              }`}
            >
              {category}
              {category !== 'All' && (
                <span className="ml-2 text-sm opacity-75">
                  ({groupedItems[category]?.length || 0})
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Menu Items */}
        <AnimatePresence mode="wait">
          {activeCategory === 'All' ? (
            // Show all categories
            <motion.div
              key="all-categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              {categories.slice(1).map((category) => (
                groupedItems[category]?.length > 0 && (
                  <div key={category}>
                    <h2 className="font-heading text-3xl font-bold text-surface-900 mb-8 text-center">
                      {category}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {groupedItems[category].map((item, index) => (
                        <MenuItem key={item.id} item={item} index={index} />
                      ))}
                    </div>
                  </div>
                )
              ))}
            </motion.div>
          ) : (
            // Show filtered category
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredItems.map((item, index) => (
                <MenuItem key={item.id} item={item} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <ApperIcon name="Search" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-surface-900 mb-2">No dishes found</h3>
            <p className="text-surface-600">Try adjusting your search or category filter</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const MenuItem = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden group"
    >
      <div className="relative overflow-hidden">
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
        {item.dietary?.length > 0 && (
          <div className="absolute top-4 left-4 flex space-x-1">
            {item.dietary.map((diet) => (
              <span
                key={diet}
                className="px-2 py-1 bg-secondary/90 backdrop-blur-sm text-primary text-xs rounded-full font-medium"
              >
                {diet}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-heading text-xl font-semibold text-surface-900 flex-1">
            {item.name}
          </h3>
          <span className="text-xl font-bold text-primary ml-4">
            ${item.price}
          </span>
        </div>
        
        <p className="text-surface-600 leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

export default Menu;