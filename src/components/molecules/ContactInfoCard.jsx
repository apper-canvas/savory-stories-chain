import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';

const ContactInfoCard = ({ icon, title, details, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-surface-50 rounded-xl p-6 text-center"
        >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name={icon} className="w-8 h-8 text-primary" />
            </div>
            <Heading as="h3" className="text-xl font-semibold text-surface-900 mb-3">
                {title}
            </Heading>
            <div className="space-y-1 text-surface-600">
                {details.map((detail, idx) => (
                    <Paragraph key={idx}>{detail}</Paragraph>
                ))}
            </div>
        </motion.div>
    );
};

export default ContactInfoCard;