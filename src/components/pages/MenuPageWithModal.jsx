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

    // Debug: Log state changes
    console.log('🔍 MenuPageWithModal State:', {
        itemsCount: items.length,
        loading,
        selectedCategory,
        searchTerm,
        selectedItem: selectedItem ? { id: selectedItem.id, name: selectedItem.name } : null,
        isModalOpen
    });
    const categories = ["All", "Appetizers", "Main Courses", "Desserts", "Beverages"];

const loadMenuItems = async () => {
        console.log('🔄 loadMenuItems: Starting menu items load...');
        const startTime = performance.now();
        
        try {
            setLoading(true);
            console.log('🔄 loadMenuItems: Loading state set to true');
            
            const menuItems = await menuService.getAll();
            console.log('✅ loadMenuItems: Received menu items:', {
                count: menuItems.length,
                items: menuItems.map(item => ({ id: item.id, name: item.name, category: item.category }))
            });
            
            setItems(menuItems);
            console.log('✅ loadMenuItems: Items state updated');
        } catch (error) {
            console.error('❌ loadMenuItems: Error loading menu items:', error);
            console.error('❌ loadMenuItems: Error details:', {
                message: error.message,
                stack: error.stack
            });
            toast.error('Failed to load menu items');
        } finally {
            setLoading(false);
            const endTime = performance.now();
            console.log('🔄 loadMenuItems: Loading completed', {
                duration: `${(endTime - startTime).toFixed(2)}ms`,
                loadingState: false
            });
        }
    };

const handleItemClick = (item) => {
        console.log('🎯 handleItemClick: Menu item clicked!', {
            clickedItem: {
                id: item?.id,
                name: item?.name,
                category: item?.category,
                price: item?.price
            },
            currentSelectedItem: selectedItem ? { id: selectedItem.id, name: selectedItem.name } : null,
            currentModalState: isModalOpen
        });

        if (!item) {
            console.error('❌ handleItemClick: No item provided to click handler');
            return;
        }

        if (!item.id) {
            console.error('❌ handleItemClick: Item missing required id field:', item);
            return;
        }

        console.log('✅ handleItemClick: Setting selected item...');
        setSelectedItem(item);
        
        console.log('✅ handleItemClick: Opening modal...');
        setIsModalOpen(true);
        
        console.log('🎯 handleItemClick: State updates initiated', {
            newSelectedItem: { id: item.id, name: item.name },
            newModalState: true
        });
    };

    const handleCloseModal = () => {
        console.log('🔽 handleCloseModal: Closing modal...', {
            currentSelectedItem: selectedItem ? { id: selectedItem.id, name: selectedItem.name } : null,
            currentModalState: isModalOpen
        });
        
        setIsModalOpen(false);
        console.log('✅ handleCloseModal: Modal state set to false');
        
        setSelectedItem(null);
        console.log('✅ handleCloseModal: Selected item cleared');
    };

useEffect(() => {
        console.log('🔄 useEffect: Component mounted, loading menu items...');
        loadMenuItems();
    }, []);

    // Debug: Monitor selectedItem changes
    useEffect(() => {
        console.log('🔍 useEffect selectedItem changed:', {
            previousItem: 'tracked in state',
            newSelectedItem: selectedItem ? {
                id: selectedItem.id,
                name: selectedItem.name,
                category: selectedItem.category,
                price: selectedItem.price,
                description: selectedItem.description?.substring(0, 50) + '...'
            } : null
        });
    }, [selectedItem]);

    // Debug: Monitor modal state changes
    useEffect(() => {
        console.log('🔍 useEffect isModalOpen changed:', {
            newModalState: isModalOpen,
            hasSelectedItem: !!selectedItem,
            selectedItemId: selectedItem?.id || 'none'
        });
        
        if (isModalOpen && !selectedItem) {
            console.warn('⚠️ Modal is open but no selectedItem available!');
        }
        
        if (!isModalOpen && selectedItem) {
            console.warn('⚠️ Modal is closed but selectedItem still exists!');
        }
    }, [isModalOpen, selectedItem]);

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
            
            {/* Debug: Modal render tracking */}
            {console.log('🎨 Rendering MenuItemModal:', {
                modalProps: {
                    item: selectedItem ? { id: selectedItem.id, name: selectedItem.name } : null,
                    isOpen: isModalOpen,
                    onClose: typeof handleCloseModal
                },
                shouldRender: isModalOpen && selectedItem
            })}
        </div>
    );
};

export default MenuPage;