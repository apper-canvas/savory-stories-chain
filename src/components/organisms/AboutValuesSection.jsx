import React from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import ValueCard from '@/components/molecules/ValueCard';

const values = [
    {
        icon: 'Leaf',
        title: 'Sustainability',
        description: 'We partner with local farms and suppliers to reduce our environmental impact while supporting our community.'
    },
    {
        icon: 'Heart',
        title: 'Passion',
        description: 'Every dish is crafted with love and attention to detail, creating memorable experiences for our guests.'
    },
    {
        icon: 'Users',
        title: 'Community',
        description: 'We believe in bringing people together through exceptional food and warm hospitality.'
    },
    {
        icon: 'Award',
        title: 'Excellence',
        description: 'We continuously strive for perfection in every aspect of our service and culinary offerings.'
    }
];

const AboutValuesSection = () => {
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
                        Our Values
                    </Heading>
                    <Paragraph className="text-lg max-w-2xl mx-auto">
                        The principles that guide everything we do, from sourcing ingredients to serving our guests
                    </Paragraph>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <ValueCard key={value.title} value={value} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutValuesSection;