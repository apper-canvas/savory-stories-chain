import React from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import ContactInfoSection from '@/components/organisms/ContactInfoSection';
import ContactForm from '@/components/organisms/ContactForm';
import LocationMap from '@/components/organisms/LocationMap';
import ContactAdditionalInfoSection from '@/components/organisms/ContactAdditionalInfoSection';

const ContactPage = () => {
    return (
        <div className="py-8">
            {/* Header */}
            <section className="py-12 bg-surface-50">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <Heading as="h1" className="text-4xl md:text-5xl font-bold text-surface-900 mb-4">
                            Contact Us
                        </Heading>
                        <Paragraph className="text-lg max-w-2xl mx-auto">
                            We'd love to hear from you. Get in touch with us for reservations, questions, or just to say hello.
                        </Paragraph>
                    </motion.div>
                </div>
            </section>

            <ContactInfoSection />

            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <ContactForm />
                        <LocationMap />
                    </div>
                </div>
            </section>

            <ContactAdditionalInfoSection />
        </div>
    );
};

export default ContactPage;