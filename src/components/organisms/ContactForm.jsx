import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';
import Spinner from '@/components/atoms/Spinner';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

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

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        toast.success('Message sent successfully! We will get back to you soon.');
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
        setLoading(false);
    };

    const subjectOptions = [
        { value: '', label: 'Select a subject' },
        { value: 'reservation', label: 'Reservation Inquiry' },
        { value: 'catering', label: 'Catering Services' },
        { value: 'feedback', label: 'Feedback' },
        { value: 'general', label: 'General Question' },
        { value: 'other', label: 'Other' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
        >
            <Heading as="h2" className="text-3xl font-bold text-surface-900 mb-6">
                Send us a Message
            </Heading>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <FormField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <FormField
                    label="Subject"
                    name="subject"
                    type="select"
                    value={formData.subject}
                    onChange={handleInputChange}
                    options={subjectOptions}
                    required
                />

                <FormField
                    label="Message"
                    name="message"
                    type="textarea"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    required
                />

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-4 bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {loading ? (
                        <>
                            <Spinner />
                            <span>Sending...</span>
                        </>
                    ) : (
                        <>
                            <ApperIcon name="Send" className="w-5 h-5" />
                            <span>Send Message</span>
                        </>
                    )}
                </Button>
            </form>
        </motion.div>
    );
};

export default ContactForm;