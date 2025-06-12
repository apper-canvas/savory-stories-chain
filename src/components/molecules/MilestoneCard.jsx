import React from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';

const MilestoneCard = ({ milestone, index, totalMilestones }) => {
    const isEven = index % 2 === 0;
    return (
        <motion.div
            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`flex items-center mb-12 last:mb-0 ${
                isEven ? 'flex-row' : 'flex-row-reverse'
            }`}
        >
            <div className={`flex-1 ${isEven ? 'pr-8' : 'pl-8'}`}>
                <div className={`bg-surface-50 rounded-xl p-6 ${
                    isEven ? 'text-right' : 'text-left'
                }`}>
                    <Heading as="h3" className="text-xl font-semibold text-surface-900 mb-2">
                        {milestone.title}
                    </Heading>
                    <Paragraph>
                        {milestone.description}
                    </Paragraph>
                </div>
            </div>
            
            <div className="relative">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {milestone.year}
                </div>
                {index < totalMilestones - 1 && (
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-1 h-12 bg-primary/20"></div>
                )}
            </div>
            
            <div className="flex-1"></div>
        </motion.div>
    );
};

export default MilestoneCard;