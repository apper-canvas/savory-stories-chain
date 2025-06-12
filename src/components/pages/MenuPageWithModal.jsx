import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import MenuFilters from '@/components/organisms/MenuFilters';
import MenuListDisplay from '@/components/organisms/MenuListDisplay';
import MenuItemModal from '@/components/organisms/MenuItemModal';
import { menuService } from '@/services';

const MenuPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const categories = ["All", "Appetizers", "Main Courses", "Desserts", "Beverages"];

    const loadMenuItems = async () => {
        try {
            setLoading(true);
            const menuItems = await menuService.getAll();
            setItems(menuItems);
        } catch (error) {
            console.error('Error loading menu items:', error);
            toast.error('Failed to load menu items');
        } finally {
            setLoading(false);
        }
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    useEffect(() => {
        loadMenuItems();
    }, []);

    const filteredItems = items.filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             item.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const groupedItems = filteredItems.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-surface-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-primary to-primary-dark text-white py-20">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <ApperIcon className="w-16 h-16 mx-auto mb-6 text-white" />
                        <Heading as="h1" className="text-5xl font-bold mb-4">
                            Our Menu
                        </Heading>
                        <Paragraph className="text-xl text-white/90 max-w-2xl mx-auto">
                            Discover our carefully crafted dishes made with the finest ingredients
                        </Paragraph>
                    </motion.div>
                </div>
            </div>

            {/* Menu Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <MenuFilters
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                />

                <MenuListDisplay
                    groupedItems={groupedItems}
                    loading={loading}
                    onItemClick={handleItemClick}
                />
            </div>

            {/* Menu Item Modal */}
            <MenuItemModal
                item={selectedItem}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default MenuPage;