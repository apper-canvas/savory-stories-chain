import React from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';
import Label from '@/components/atoms/Label';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Spinner from '@/components/atoms/Spinner';
import { reservationService } from '@/services';

const ReservationFormSteps = ({ formData, setFormData, step, setStep, loading, setLoading }) => {
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
            // Don't reset step - allow user to see confirmation
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
        if (canProceedToNext() && step < 4) {
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

    const guestOptions = Array.from({ length: 10 }, (_, i) => ({
        value: i + 1,
        label: `${i + 1} ${i + 1 === 1 ? 'Guest' : 'Guests'}`
    }));

    return (
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
                        <Heading as="h2" className="text-2xl font-semibold text-surface-900 mb-6">
                            Select Date & Time
                        </Heading>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                label="Preferred Date"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                min={getMinDate()}
                                required
                                iconName="Calendar"
                            />

                            <FormField
                                label="Number of Guests"
                                name="guests"
                                type="select"
                                value={formData.guests}
                                onChange={handleInputChange}
                                options={guestOptions}
                                iconName="Clock"
                            />
                        </div>

                        <div>
                            <Label htmlFor="preferred-time">
                                <ApperIcon name="Clock" className="w-4 h-4 inline mr-1" />
                                Preferred Time
                            </Label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {timeSlots.map((time) => (
                                    <Button
                                        key={time}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, time }))}
                                        className={`p-3 rounded-lg border font-medium ${
                                            formData.time === time
                                                ? 'bg-primary text-white border-primary'
                                                : 'bg-white text-surface-700 border-surface-300 hover:border-primary hover:bg-primary/5'
                                        }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {time}
                                    </Button>
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
                        <Heading as="h2" className="text-2xl font-semibold text-surface-900 mb-6">
                            Contact Information
                        </Heading>

                        <FormField
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            iconName="User"
                        />

                        <FormField
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            iconName="Mail"
                        />

                        <FormField
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            iconName="Phone"
                        />

                        <FormField
                            label="Special Requests (Optional)"
                            name="specialRequests"
                            type="textarea"
                            value={formData.specialRequests}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="Dietary restrictions, seating preferences, special occasions..."
                            iconName="MessageSquare"
                        />
                    </motion.div>
                )}

                {/* Step 3: Review Your Reservation */}
                {step === 3 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="text-center mb-8">
                            <Heading level={2} className="text-2xl font-bold text-surface-900 mb-2">
                                Review Your Reservation
                            </Heading>
                            <Paragraph className="text-surface-600">
                                Please review your reservation details before confirming
                            </Paragraph>
                        </div>

                        <div className="bg-surface-50 rounded-lg p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold text-surface-900 mb-3">Reservation Details</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-surface-600">Date:</span>
                                            <span className="font-medium text-surface-900">{formData.date}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-surface-600">Time:</span>
                                            <span className="font-medium text-surface-900">{formData.time}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-surface-600">Party Size:</span>
                                            <span className="font-medium text-surface-900">{formData.guests} guests</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-surface-900 mb-3">Contact Information</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-surface-600">Name:</span>
                                            <span className="font-medium text-surface-900">{formData.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-surface-600">Email:</span>
                                            <span className="font-medium text-surface-900">{formData.email}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-surface-600">Phone:</span>
                                            <span className="font-medium text-surface-900">{formData.phone}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {formData.specialRequests && (
                                <div className="pt-4 border-t border-surface-200">
                                    <h3 className="font-semibold text-surface-900 mb-2">Special Requests</h3>
                                    <p className="text-surface-700 bg-white p-3 rounded border">
                                        {formData.specialRequests}
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Step 4: Confirmation */}
                {step === 4 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <Heading as="h2" className="text-2xl font-semibold text-surface-900 mb-6">
                            Confirm Your Reservation
                        </Heading>

                        <div className="bg-surface-50 rounded-lg p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <Paragraph className="!text-surface-600 !mb-0">Date:</Paragraph>
                                <Paragraph className="font-semibold !mb-0">{new Date(formData.date).toLocaleDateString()}</Paragraph>
                            </div>
                            <div className="flex items-center justify-between">
                                <Paragraph className="!text-surface-600 !mb-0">Time:</Paragraph>
                                <Paragraph className="font-semibold !mb-0">{formData.time}</Paragraph>
                            </div>
                            <div className="flex items-center justify-between">
                                <Paragraph className="!text-surface-600 !mb-0">Guests:</Paragraph>
                                <Paragraph className="font-semibold !mb-0">{formData.guests} {formData.guests === 1 ? 'Guest' : 'Guests'}</Paragraph>
                            </div>
                            <div className="flex items-center justify-between">
                                <Paragraph className="!text-surface-600 !mb-0">Name:</Paragraph>
                                <Paragraph className="font-semibold !mb-0">{formData.name}</Paragraph>
                            </div>
                            <div className="flex items-center justify-between">
                                <Paragraph className="!text-surface-600 !mb-0">Email:</Paragraph>
                                <Paragraph className="font-semibold !mb-0">{formData.email}</Paragraph>
                            </div>
                            <div className="flex items-center justify-between">
                                <Paragraph className="!text-surface-600 !mb-0">Phone:</Paragraph>
                                <Paragraph className="font-semibold !mb-0">{formData.phone}</Paragraph>
                            </div>
                            {formData.specialRequests && (
                                <div>
                                    <Paragraph className="!text-surface-600 block mb-2 !mb-0">Special Requests:</Paragraph>
                                    <Paragraph className="font-medium bg-white p-3 rounded border !mb-0">
                                        {formData.specialRequests}
                                    </Paragraph>
                                </div>
                            )}
                        </div>

                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                                <ApperIcon name="Info" className="w-5 h-5 text-primary mt-0.5" />
                                <div>
                                    <Heading as="h4" className="font-semibold text-primary mb-1">Please Note:</Heading>
                                    <Paragraph className="text-sm text-surface-700">
                                        Your reservation is subject to availability. We will contact you within 2 hours to confirm your booking.
                                    </Paragraph>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t">
                    <Button
                        type="button"
                        onClick={prevStep}
                        disabled={step === 1}
                        className={`px-6 py-3 font-semibold rounded-lg ${
                            step === 1
                                ? 'bg-surface-200 text-surface-500 cursor-not-allowed'
                                : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ApperIcon name="ChevronLeft" className="w-4 h-4 inline mr-1" />
                        Previous
                    </Button>

                    {step < 4 ? (
                        <Button
                            type="button"
                            onClick={nextStep}
                            disabled={!canProceedToNext()}
                            className={`px-6 py-3 font-semibold rounded-lg ${
                                canProceedToNext()
                                    ? 'bg-primary text-white hover:bg-primary/90'
                                    : 'bg-surface-200 text-surface-500 cursor-not-allowed'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Next
                            <ApperIcon name="ChevronRight" className="w-4 h-4 inline ml-1" />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {loading ? (
                                <>
                                    <Spinner className="w-4 h-4" />
                                    <span>Confirming...</span>
                                </>
                            ) : (
                                <>
                                    <ApperIcon name="Check" className="w-4 h-4" />
                                    <span>Confirm Reservation</span>
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </form>
        </motion.div>
    );
};

export default ReservationFormSteps;