import React from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Image from '@/components/atoms/Image';
import NavLinkButton from '@/components/atoms/NavLinkButton';
import ApperIcon from '@/components/ApperIcon';

const HeroSection = ({
    imageSrc,
    imageAlt,
    title,
    subtitle,
    primaryLinkTo,
    primaryLinkText,
    primaryLinkIcon,
    secondaryLinkTo,
    secondaryLinkText,
    secondaryLinkIcon,
    showScrollIndicator = false,
    gradientClass = 'hero-gradient'
}) => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    className="w-full h-full"
                />
                <div className={`absolute inset-0 ${gradientClass}`}></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center text-white px-4 md:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <Heading as="h1" className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                        {title}
                    </Heading>
                    <Paragraph className="text-xl md:text-2xl mb-8 leading-relaxed max-w-2xl mx-auto text-white">
                        {subtitle}
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

            {/* Scroll Indicator */}
            {showScrollIndicator && (
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
                >
                    <ApperIcon name="ChevronDown" className="w-6 h-6" />
                </motion.div>
            )}
        </section>
    );
};

export default HeroSection;