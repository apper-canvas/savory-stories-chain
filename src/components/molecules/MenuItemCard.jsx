import React from 'react';
import { motion } from 'framer-motion';
import Image from '@/components/atoms/Image';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';

const MenuItemCard = ({ item, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer"
        >
            <div className="relative overflow-hidden">
                <Image
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-48 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-primary">
                        {item.category}
                    </span>
                </div>
                {item.dietary?.length > 0 && (
                    <div className="absolute top-4 left-4 flex space-x-1">
                        {item.dietary.map((diet) => (
                            <span
                                key={diet}
                                className="px-2 py-1 bg-secondary/90 backdrop-blur-sm text-primary text-xs rounded-full font-medium"
                            >
                                {diet}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            
            <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                    <Heading as="h3" className="text-xl font-semibold text-surface-900 flex-1">
                        {item.name}
                    </Heading>
                    <span className="text-xl font-bold text-primary ml-4">
                        ${item.price}
                    </span>
                </div>
                
                <Paragraph className="leading-relaxed">
                    {item.description}
                </Paragraph>
            </div>
        </motion.div>
    );
};

export default MenuItemCard;