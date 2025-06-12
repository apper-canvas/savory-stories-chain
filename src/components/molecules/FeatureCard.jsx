import React from 'react';
import { motion } from 'framer-motion';
import NavLinkButton from '@/components/atoms/NavLinkButton';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';

const FeatureCard = ({ icon, title, description, link, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl p-8 shadow-md text-center group"
        >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <ApperIcon name={icon} className="w-8 h-8 text-primary" />
            </div>
            <Heading as="h3" className="text-xl font-semibold text-surface-900 mb-4">
                {title}
            </Heading>
            <Paragraph className="mb-6">
                {description}
            </Paragraph>
            <NavLinkButton
                to={link}
                className="text-primary font-medium hover:text-primary/80 group !px-0 !py-0"
                icon={(props) => <ApperIcon name="ArrowRight" className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" {...props} />}
            >
                Learn More
            </NavLinkButton>
        </motion.div>
    );
};

export default FeatureCard;