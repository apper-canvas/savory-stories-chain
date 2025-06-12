import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';

const ValueCard = ({ value, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl p-6 shadow-md text-center"
        >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ApperIcon name={value.icon} className="w-8 h-8 text-primary" />
            </div>
            <Heading as="h3" className="text-xl font-semibold text-surface-900 mb-4">
                {value.title}
            </Heading>
            <Paragraph className="leading-relaxed">
                {value.description}
            </Paragraph>
        </motion.div>
    );
};

export default ValueCard;