import React from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import MilestoneCard from '@/components/molecules/MilestoneCard';

const milestones = [
    { year: '2015', title: 'Founded', description: 'Savory Stories opened its doors in the heart of the city' },
    { year: '2017', title: 'Award Winner', description: 'Received "Best New Restaurant" from City Food Awards' },
    { year: '2019', title: 'Expansion', description: 'Renovated and expanded dining room to accommodate more guests' },
    { year: '2021', title: 'Sustainability', description: 'Achieved zero-waste certification and local sourcing milestone' },
    { year: '2023', title: 'Recognition', description: 'Featured in National Culinary Magazine as "Restaurant of the Year"' }
];

const AboutTimelineSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <Heading as="h2" className="text-3xl md:text-4xl font-bold text-surface-900 mb-4">
                        Our Journey
                    </Heading>
                    <Paragraph className="text-lg max-w-2xl mx-auto">
                        Key milestones that have shaped Savory Stories into what it is today
                    </Paragraph>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    {milestones.map((milestone, index) => (
                        <MilestoneCard 
                            key={milestone.year} 
                            milestone={milestone} 
                            index={index} 
                            totalMilestones={milestones.length} 
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutTimelineSection;