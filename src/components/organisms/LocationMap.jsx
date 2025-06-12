import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';

const LocationMap = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="h-96 lg:h-full min-h-96"
        >
            <div className="w-full h-full bg-surface-200 rounded-xl overflow-hidden relative">
                {/* Google Maps Embed Placeholder */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/20">
                    <div className="text-center">
                        <ApperIcon name="MapPin" className="w-16 h-16 text-primary mx-auto mb-4" />
                        <Heading as="h3" className="text-xl font-semibold text-surface-900 mb-2">
                            Find Us Here
                        </Heading>
                        <Paragraph>
                            123 Culinary Street<br />
                            Food District, Downtown<br />
                            City, State 12345
                        </Paragraph>
                    </div>
                </div>
                
                {/* Actual Google Maps would go here */}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.0361638409!2d-74.30933068742447!3d40.697539718486624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1635959687932!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 opacity-80"
                />
            </div>
        </motion.div>
    );
};

export default LocationMap;