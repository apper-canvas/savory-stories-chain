import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import { reservationService } from '../services';

const Reservations = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const timeSlots = [
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', 
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await reservationService.create(formData);
      toast.success('Reservation confirmed! We look forward to serving you.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        specialRequests: ''
      });
      setStep(1);
    } catch (err) {
      toast.error('Failed to create reservation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const canProceedToNext = () => {
    switch (step) {
      case 1:
        return formData.date && formData.time && formData.guests;
      case 2:
        return formData.name && formData.email && formData.phone;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (canProceedToNext() && step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="py-8 min-h-screen bg-surface-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-surface-900 mb-4">
            Make a Reservation
          </h1>
          <p className="text-surface-600 text-lg max-w-2xl mx-auto">
            Reserve your table for an unforgettable dining experience
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    step >= stepNumber
                      ? 'bg-primary text-white'
                      : 'bg-surface-200 text-surface-500'
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`h-1 w-20 md:w-32 mx-2 transition-colors ${
                      step > stepNumber ? 'bg-primary' : 'bg-surface-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-surface-600">
            <span>Date & Time</span>
            <span>Contact Info</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Reservation Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Date & Time Selection */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="font-heading text-2xl font-semibold text-surface-900 mb-6">
                  Select Date & Time
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      <ApperIcon name="Calendar" className="w-4 h-4 inline mr-1" />
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={getMinDate()}
                      className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      <ApperIcon name="Clock" className="w-4 h-4 inline mr-1" />
                      Number of Guests
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    <ApperIcon name="Clock" className="w-4 h-4 inline mr-1" />
                    Preferred Time
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {timeSlots.map((time) => (
                      <motion.button
                        key={time}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData(prev => ({ ...prev, time }))}
                        className={`p-3 rounded-lg border font-medium transition-colors ${
                          formData.time === time
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-surface-700 border-surface-300 hover:border-primary hover:bg-primary/5'
                        }`}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Contact Information */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="font-heading text-2xl font-semibold text-surface-900 mb-6">
                  Contact Information
                </h2>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    <ApperIcon name="User" className="w-4 h-4 inline mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    <ApperIcon name="Mail" className="w-4 h-4 inline mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    <ApperIcon name="Phone" className="w-4 h-4 inline mr-1" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    <ApperIcon name="MessageSquare" className="w-4 h-4 inline mr-1" />
                    Special Requests (Optional)
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Dietary restrictions, seating preferences, special occasions..."
                    className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="font-heading text-2xl font-semibold text-surface-900 mb-6">
                  Confirm Your Reservation
                </h2>

                <div className="bg-surface-50 rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-surface-600">Date:</span>
                    <span className="font-semibold">{new Date(formData.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-surface-600">Time:</span>
                    <span className="font-semibold">{formData.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-surface-600">Guests:</span>
                    <span className="font-semibold">{formData.guests} {formData.guests === 1 ? 'Guest' : 'Guests'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-surface-600">Name:</span>
                    <span className="font-semibold">{formData.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-surface-600">Email:</span>
                    <span className="font-semibold">{formData.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-surface-600">Phone:</span>
                    <span className="font-semibold">{formData.phone}</span>
                  </div>
                  {formData.specialRequests && (
                    <div>
                      <span className="text-surface-600 block mb-2">Special Requests:</span>
                      <p className="font-medium bg-white p-3 rounded border">
                        {formData.specialRequests}
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <ApperIcon name="Info" className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-primary mb-1">Please Note:</h4>
                      <p className="text-sm text-surface-700">
                        Your reservation is subject to availability. We will contact you within 2 hours to confirm your booking.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevStep}
                disabled={step === 1}
                className={`px-6 py-3 font-semibold rounded-lg transition-colors ${
                  step === 1
                    ? 'bg-surface-200 text-surface-500 cursor-not-allowed'
                    : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
                }`}
              >
                <ApperIcon name="ChevronLeft" className="w-4 h-4 inline mr-1" />
                Previous
              </motion.button>

              {step < 3 ? (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextStep}
                  disabled={!canProceedToNext()}
                  className={`px-6 py-3 font-semibold rounded-lg transition-colors ${
                    canProceedToNext()
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-surface-200 text-surface-500 cursor-not-allowed'
                  }`}
                >
                  Next
                  <ApperIcon name="ChevronRight" className="w-4 h-4 inline ml-1" />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={loading}
                  className="px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Confirming...</span>
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Check" className="w-4 h-4" />
                      <span>Confirm Reservation</span>
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Reservations;