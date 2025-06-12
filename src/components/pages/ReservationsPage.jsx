import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import ReservationProgress from '@/components/organisms/ReservationProgress';
import ReservationFormSteps from '@/components/organisms/ReservationFormSteps';

const ReservationsPage = () => {
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

  return (
    <div className="py-8 min-h-screen bg-surface-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Heading as="h1" className="text-4xl md:text-5xl font-bold text-surface-900 mb-4">
            Make a Reservation
          </Heading>
          <Paragraph className="text-lg max-w-2xl mx-auto">
            Reserve your table for an unforgettable dining experience
          </Paragraph>
        </motion.div>

        <ReservationProgress step={step} />

        <ReservationFormSteps
            formData={formData}
            setFormData={setFormData}
            step={step}
            setStep={setStep}
            loading={loading}
            setLoading={setLoading}
        />
      </div>
    </div>
  );
};

export default ReservationsPage;