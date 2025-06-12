import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MenuItemCard from '@/components/molecules/MenuItemCard';
import Heading from '@/components/atoms/Heading';
import ApperIcon from '@/components/ApperIcon';
import Paragraph from '@/components/atoms/Paragraph';

const MenuListDisplay = ({ filteredItems, activeCategory, categories, groupedItems, onItemClick }) => {
    return (
        <AnimatePresence mode="wait">
            {activeCategory === 'All' ? (
                // Show all categories
                <motion.div
                    key="all-categories"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-16"
                >
                    {categories.slice(1).map((category) => (
                        groupedItems[category]?.length > 0 && (
                            <div key={category}>
                                <Heading as="h2" className="text-3xl font-bold text-surface-900 mb-8 text-center">
                                    {category}
                                </Heading>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {groupedItems[category].map((item, index) => (
<MenuItemCard key={item.id} item={item} index={index} onClick={onItemClick} />
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </motion.div>
            ) : (
                // Show filtered category
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredItems.map((item, index) => (
<MenuItemCard key={item.id} item={item} index={index} onClick={onItemClick} />
                    ))}
                </motion.div>
            )}
            {filteredItems.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                >
                    <ApperIcon name="Search" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
                    <Heading as="h3" className="text-xl font-semibold text-surface-900 mb-2">No dishes found</Heading>
                    <Paragraph>Try adjusting your search or category filter</Paragraph>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MenuListDisplay;