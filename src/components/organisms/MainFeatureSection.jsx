import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import MenuItemCard from '@/components/molecules/MenuItemCard';
import Button from '@/components/atoms/Button';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Label from '@/components/atoms/Label';

import { menuService, reservationService } from '@/services';

const MainFeatureSection = () => {
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

  const guestOptions = Array.from({ length: 8 }, (_, i) => ({
      value: i + 1,
      label: `${i + 1} ${i + 1 === 1 ? 'Guest' : 'Guests'}`
  }));

  const timeOptions = [{ value: '', label: 'Select time' }, ...timeSlots.map(time => ({ value: time, label: time }))];

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

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
          <Paragraph className="mb-4">{error}</Paragraph>
          <Button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary text-white hover:bg-primary/90"
          >
            Try Again
          </Button>
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
          <Heading as="h2" className="text-3xl md:text-4xl font-bold text-surface-900 mb-4">
            Featured Dishes
          </Heading>
          <Paragraph className="text-lg max-w-2xl mx-auto">
            Discover our chef's signature creations that define the Savory Stories experience
          </Paragraph>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {featuredItems.map((item, index) => (
            <MenuItemCard key={item.id} item={item} index={index} />
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
            <Heading as="h2" className="text-3xl font-bold text-surface-900 mb-4">
              Quick Reservation
            </Heading>
            <Paragraph>
              Secure your table with just a few clicks
            </Paragraph>
          </div>

          <form onSubmit={handleQuickReservation} className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <Label htmlFor="quick-reservation-date">Date</Label>
                <Input
                  id="quick-reservation-date"
                  type="date"
                  value={quickReservation.date}
                  onChange={(e) => setQuickReservation(prev => ({ ...prev, date: e.target.value }))}
                  min={getMinDate()}
                  required
                />
              </div>

              <div>
                <Label htmlFor="quick-reservation-time">Time</Label>
                <Select
                  id="quick-reservation-time"
                  value={quickReservation.time}
                  onChange={(e) => setQuickReservation(prev => ({ ...prev, time: e.target.value }))}
                  required
                >
                  {timeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <Label htmlFor="quick-reservation-guests">Guests</Label>
                <Select
                  id="quick-reservation-guests"
                  value={quickReservation.guests}
                  onChange={(e) => setQuickReservation(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                >
                  {guestOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  type="submit"
                  className="w-full px-6 py-3 bg-accent text-white hover:bg-accent/90 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ApperIcon name="Calendar" className="w-5 h-5" />
                  <span>Reserve Now</span>
                </Button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default MainFeatureSection;