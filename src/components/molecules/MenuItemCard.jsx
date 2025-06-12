import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Image from '@/components/atoms/Image';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Button from '@/components/atoms/Button';
import { addToCart } from '@/store/cartSlice';
const MenuItemCard = ({ item, index, onClick }) => {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const handleClick = () => {
        if (onClick) {
            onClick(item);
        }
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        dispatch(addToCart({ item, quantity }));
        toast.success(`${item.name} added to cart!`);
        setQuantity(1);
    };

    const handleQuantityChange = (e) => {
        e.stopPropagation();
        setQuantity(parseInt(e.target.value));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer"
            onClick={handleClick}
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
                
                <Paragraph className="leading-relaxed mb-4">
                    {item.description}
                </Paragraph>

                {/* Add to Cart Section */}
                <div className="flex items-center justify-between pt-4 border-t border-surface-200">
                    <div className="flex items-center gap-2">
                        <label htmlFor={`quantity-${item.id}`} className="text-sm font-medium text-surface-700">
                            Qty:
                        </label>
                        <select
                            id={`quantity-${item.id}`}
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="border border-surface-300 rounded px-2 py-1 text-sm"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </div>
                    
                    <Button
                        onClick={handleAddToCart}
                        className="bg-primary hover:bg-primary-600 text-white text-sm px-4 py-2"
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default MenuItemCard;