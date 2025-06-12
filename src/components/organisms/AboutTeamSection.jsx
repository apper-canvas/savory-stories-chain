import React from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import TeamMemberCard from '@/components/molecules/TeamMemberCard';

const teamMembers = [
    {
        name: 'Chef Marcus Rivera',
        role: 'Executive Chef & Co-Founder',
        image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        bio: 'Classically trained with 15 years of experience in fine dining restaurants across Europe and America.'
    },
    {
        name: 'Elena Rivera',
        role: 'Operations Manager & Co-Founder',
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        bio: 'Environmental advocate and business strategist ensuring sustainable practices in all operations.'
    },
    {
        name: 'James Thompson',
        role: 'Sous Chef',
        image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        bio: 'Creative culinary artist specializing in seasonal menu development and innovative flavor combinations.'
    }
];

const AboutTeamSection = () => {
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
                        Meet Our Team
                    </Heading>
                    <Paragraph className="text-lg max-w-2xl mx-auto">
                        The passionate individuals who bring Savory Stories to life every day
                    </Paragraph>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <TeamMemberCard key={member.name} member={member} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutTeamSection;