import React from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/atoms/Heading';
import ServiceInfoCard from '@/components/molecules/ServiceInfoCard';

const parkingInfo = [
    {
        icon: 'Car',
        title: 'Valet Parking',
        description: 'Complimentary valet service available Friday-Sunday'
    },
    {
        icon: 'MapPin',
        title: 'Street Parking',
        description: 'Metered parking available on adjacent streets'
    },
    {
        icon: 'Train',
        title: 'Public Transit',
        description: 'Located 2 blocks from Central Station'
    }
];

const specialServices = [
    {
        icon: 'Users',
        title: 'Private Events',
        description: 'We host private parties and corporate events'
    },
    {
        icon: 'Utensils',
        title: 'Catering',
        description: 'Off-site catering services available'
    },
    {
        icon: 'Gift',
        title: 'Gift Cards',
        description: 'Perfect for any occasion, available in-store and online'
    }
];

const ContactAdditionalInfoSection = () => {
    return (
        <section className="py-16 bg-surface-50">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Heading as="h2" className="text-2xl font-bold text-surface-900 mb-6">
                            Parking & Transportation
                        </Heading>
                        <div className="space-y-4">
                            {parkingInfo.map((info, index) => (
                                <ServiceInfoCard key={index} {...info} />
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Heading as="h2" className="text-2xl font-bold text-surface-900 mb-6">
                            Special Services
                        </Heading>
                        <div className="space-y-4">
                            {specialServices.map((info, index) => (
                                <ServiceInfoCard key={index} {...info} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactAdditionalInfoSection;