import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { ShoppingCart } from 'lucide-react';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Button from '@/components/atoms/Button';
import MenuFilters from '@/components/organisms/MenuFilters';
import MenuListDisplay from '@/components/organisms/MenuListDisplay';
import CartModal from '@/components/organisms/CartModal';
import MenuItemModal from '@/components/organisms/MenuItemModal';

import { menuService } from '@/services';
const MenuPage = () => {
const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const { totalItems } = useSelector(state => state.cart);
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

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowMenuModal(true);
  };
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
          <Heading as="h2" className="text-2xl font-bold text-surface-900 mb-4">Unable to Load Menu</Heading>
          <Paragraph className="mb-8">{error}</Paragraph>
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
          <Heading as="h2" className="text-2xl font-bold text-surface-900 mb-4">Menu Coming Soon</Heading>
          <Paragraph className="mb-8">
            Our chefs are putting the finishing touches on our amazing menu. Check back soon!
          </Paragraph>
        </div>
      </div>
    );
  }

  return (
<div className="py-8 relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Heading as="h1" className="text-4xl md:text-5xl font-bold text-surface-900 mb-4">
            Our Menu
          </Heading>
          <Paragraph className="text-lg max-w-2xl mx-auto">
            Discover our carefully curated selection of dishes, each crafted with passion and the finest ingredients
          </Paragraph>
        </motion.div>

        <MenuFilters
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
        />

<MenuListDisplay
            filteredItems={filteredItems}
            activeCategory={activeCategory}
            categories={categories}
            groupedItems={groupedItems}
            onItemClick={handleItemClick}
        />
      </div>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Button
            onClick={() => setShowCartModal(true)}
            className="bg-primary hover:bg-primary-600 text-white shadow-lg rounded-full p-4 relative"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {totalItems}
            </span>
          </Button>
        </motion.div>
      )}

{/* Cart Modal */}
      <CartModal 
        isOpen={showCartModal} 
        onClose={() => setShowCartModal(false)} 
      />

      {/* Menu Item Modal */}
      <MenuItemModal
        item={selectedItem}
        isOpen={showMenuModal}
        onClose={() => setShowMenuModal(false)}
      />
    </div>
  );
};

export default MenuPage;