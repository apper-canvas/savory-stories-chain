import React from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import FeatureCard from '@/components/molecules/FeatureCard';

const features = [
    {
        icon: 'Book',
        title: 'Curated Menu',
        description: 'Expertly crafted dishes using locally sourced ingredients',
        link: '/menu'
    },
    {
        icon: 'Calendar',
        title: 'Easy Reservations',
        description: 'Book your table in just a few clicks',
        link: '/reservations'
    },
    {
        icon: 'Star',
        title: 'Award Winning',
        description: 'Recognized for culinary excellence and service',
        link: '/reviews'
    }
];

const HomeWhyChooseUsSection = () => {
    return (
        <section className="py-20 bg-surface-50">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <Heading as="h2" className="text-3xl md:text-4xl font-bold text-surface-900 mb-4">
                        Why Choose Savory Stories
                    </Heading>
                    <Paragraph className="text-lg max-w-2xl mx-auto">
                        Discover what makes our restaurant a destination for food lovers
                    </Paragraph>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={feature.title} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeWhyChooseUsSection;