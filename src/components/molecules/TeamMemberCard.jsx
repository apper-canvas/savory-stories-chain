import React from 'react';
import { motion } from 'framer-motion';
import Image from '@/components/atoms/Image';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';

const TeamMemberCard = ({ member, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
        >
            <Image
                src={member.image}
                alt={member.name}
                className="w-full h-64"
            />
            <div className="p-6">
                <Heading as="h3" className="text-xl font-semibold text-surface-900 mb-1">
                    {member.name}
                </Heading>
                <Paragraph className="text-primary font-medium mb-3">
                    {member.role}
                </Paragraph>
                <Paragraph className="leading-relaxed">
                    {member.bio}
                </Paragraph>
            </div>
        </motion.div>
    );
};

export default TeamMemberCard;