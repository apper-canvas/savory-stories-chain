import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import CategoryFilterButton from '@/components/molecules/CategoryFilterButton';

const MenuFilters = ({ categories, activeCategory, setActiveCategory, searchTerm, setSearchTerm }) => {
    return (
        <>
            {/* Search Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-md mx-auto mb-8"
            >
                <div className="relative">
                    <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 w-5 h-5" />
                    <Input
                        type="text"
                        placeholder="Search dishes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </motion.div>

            {/* Category Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-4 mb-12"
            >
                {categories.map((category) => (
                    <CategoryFilterButton 
                        key={category} 
                        category={category} 
                        activeCategory={activeCategory} 
                        onClick={setActiveCategory}
                        count={category !== 'All' ? categories.length : undefined} // Placeholder for count
                    />
                ))}
            </motion.div>
        </>
    );
};

export default MenuFilters;