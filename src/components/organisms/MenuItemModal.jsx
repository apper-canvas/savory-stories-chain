import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import Image from '@/components/atoms/Image';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Button from '@/components/atoms/Button';

const MenuItemModal = ({ item, isOpen, onClose }) => {
    if (!isOpen || !item) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const modalContent = (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                onClick={handleBackdropClick}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header with Close Button */}
                    <div className="sticky top-0 bg-white border-b border-surface-200 p-4 flex justify-between items-center rounded-t-2xl">
                        <Heading as="h2" className="text-2xl font-bold text-surface-900">
                            Menu Item Details
                        </Heading>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="p-2 hover:bg-surface-100 rounded-full"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {/* Image */}
                        <div className="relative mb-6 rounded-xl overflow-hidden">
                            <Image
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-64 object-cover"
                            />
                            <div className="absolute top-4 right-4">
                                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-primary">
                                    {item.category}
                                </span>
                            </div>
                            {item.dietary?.length > 0 && (
                                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
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

                        {/* Item Details */}
                        <div className="space-y-4">
                            <div className="flex items-start justify-between">
                                <Heading as="h3" className="text-3xl font-bold text-surface-900 flex-1">
                                    {item.name}
                                </Heading>
                                <span className="text-3xl font-bold text-primary ml-4">
                                    ${item.price}
                                </span>
                            </div>

                            <Paragraph className="text-lg leading-relaxed text-surface-700">
                                {item.description}
                            </Paragraph>

                            {/* Additional Details */}
                            {item.ingredients && (
                                <div className="border-t border-surface-200 pt-4">
                                    <Heading as="h4" className="text-lg font-semibold text-surface-900 mb-2">
                                        Ingredients
                                    </Heading>
                                    <Paragraph className="text-surface-600">
                                        {Array.isArray(item.ingredients) ? item.ingredients.join(', ') : item.ingredients}
                                    </Paragraph>
                                </div>
                            )}

                            {item.nutrition && (
                                <div className="border-t border-surface-200 pt-4">
                                    <Heading as="h4" className="text-lg font-semibold text-surface-900 mb-2">
                                        Nutritional Information
                                    </Heading>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        {Object.entries(item.nutrition).map(([key, value]) => (
                                            <div key={key} className="flex justify-between">
                                                <span className="text-surface-600 capitalize">{key}:</span>
                                                <span className="font-medium text-surface-900">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {item.allergens && item.allergens.length > 0 && (
                                <div className="border-t border-surface-200 pt-4">
                                    <Heading as="h4" className="text-lg font-semibold text-surface-900 mb-2">
                                        Allergen Information
                                    </Heading>
                                    <div className="flex flex-wrap gap-2">
                                        {item.allergens.map((allergen) => (
                                            <span
                                                key={allergen}
                                                className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full font-medium"
                                            >
                                                Contains {allergen}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-8 pt-6 border-t border-surface-200">
                            <Button
                                variant="primary"
                                size="lg"
                                className="flex-1"
                                onClick={() => {
                                    // Could integrate with ordering system
                                    onClose();
                                }}
                            >
                                Add to Order
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={onClose}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
};

export default MenuItemModal;