import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';

const ServiceInfoCard = ({ icon, title, description }) => {
    return (
        <div className="flex items-start space-x-3">
            <ApperIcon name={icon} className="w-5 h-5 text-primary mt-1" />
            <div>
                <Heading as="h4" className="font-semibold text-surface-900">
                    {title}
                </Heading>
                <Paragraph className="text-surface-600">
                    {description}
                </Paragraph>
            </div>
        </div>
    );
};

export default ServiceInfoCard;