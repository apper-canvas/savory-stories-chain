import React from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import NavLinkButton from '@/components/atoms/NavLinkButton';
import ApperIcon from '@/components/ApperIcon';

const CallToActionSection = ({ 
    title, 
    description, 
    primaryLinkTo, 
    primaryLinkText, 
    primaryLinkIcon,
    secondaryLinkTo, 
    secondaryLinkText, 
    secondaryLinkIcon,
    imageSrc, // Added for AboutPage CTA background
}) => {
    return (
        <section className="relative py-20 bg-primary text-white overflow-hidden">
            {imageSrc && (
                <div className="absolute inset-0">
                    <img
                        src={imageSrc}
                        alt="Background"
                        className="w-full h-full object-cover opacity-30"
                    />
                </div>
            )}
            <div className="relative container mx-auto px-4 md:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <Heading as="h2" className="text-3xl md:text-4xl font-bold mb-6">
                        {title}
                    </Heading>
                    <Paragraph className="text-xl mb-8 text-white/90">
                        {description}
                    </Paragraph>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {primaryLinkTo && (
                            <NavLinkButton
                                to={primaryLinkTo}
                                className="bg-accent text-white hover:bg-accent/90 shadow-lg"
                                icon={(props) => <ApperIcon name={primaryLinkIcon} className="w-5 h-5 mr-2" {...props} />}
                            >
                                {primaryLinkText}
                            </NavLinkButton>
                        )}
                        {secondaryLinkTo && (
                            <NavLinkButton
                                to={secondaryLinkTo}
                                className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30"
                                icon={(props) => <ApperIcon name={secondaryLinkIcon} className="w-5 h-5 mr-2" {...props} />}
                            >
                                {secondaryLinkText}
                            </NavLinkButton>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CallToActionSection;