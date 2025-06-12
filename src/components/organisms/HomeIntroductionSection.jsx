import React from 'react';
import { motion } from 'framer-motion';
import NavLinkButton from '@/components/atoms/NavLinkButton';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Image from '@/components/atoms/Image';

const HomeIntroductionSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Heading as="h2" className="text-4xl md:text-5xl font-bold text-surface-900 mb-6">
                            A Culinary Journey
                            <span className="block text-primary">Worth Savoring</span>
                        </Heading>
                        <Paragraph className="text-lg mb-6 leading-relaxed">
                            At Savory Stories, we believe that great food is more than sustenance—it's 
                            an experience that brings people together. Our passionate chefs craft each 
                            dish with locally sourced ingredients and time-honored techniques.
                        </Paragraph>
                        <Paragraph className="text-lg mb-8 leading-relaxed">
                            From intimate dinners to celebratory gatherings, we create the perfect 
                            atmosphere for life's most memorable moments.
                        </Paragraph>
                        
                        <NavLinkButton
                            to="/about"
                            className="bg-primary text-white hover:bg-primary/90"
                            icon={(props) => <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2" {...props} />}
                        >
                            Learn Our Story
                        </NavLinkButton>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <Image
                                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Chef preparing dish"
                                className="rounded-lg shadow-lg h-64"
                            />
                            <Image
                                src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Plated dish"
                                className="rounded-lg shadow-lg h-64 mt-8"
                            />
                        </div>
                        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-secondary rounded-full opacity-20"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HomeIntroductionSection;