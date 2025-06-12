import React from 'react';
import ContactInfoCard from '@/components/molecules/ContactInfoCard';

const contactInfo = [
    {
        icon: 'MapPin',
        title: 'Address',
        details: ['123 Culinary Street', 'Food District, Downtown', 'City, State 12345']
    },
    {
        icon: 'Phone',
        title: 'Phone',
        details: ['(555) 123-4567', 'Call for reservations']
    },
    {
        icon: 'Mail',
        title: 'Email',
        details: ['hello@savorystories.com', 'info@savorystories.com']
    },
    {
        icon: 'Clock',
        title: 'Hours',
        details: [
            'Mon-Thu: 5:00 PM - 10:00 PM',
            'Fri-Sat: 5:00 PM - 11:00 PM',
            'Sun: 4:00 PM - 9:00 PM'
        ]
    }
];

const ContactInfoSection = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {contactInfo.map((info, index) => (
                        <ContactInfoCard key={info.title} {...info} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContactInfoSection;