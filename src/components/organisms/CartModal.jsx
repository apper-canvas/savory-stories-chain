import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { X, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

import Button from '@/components/atoms/Button';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import Spinner from '@/components/atoms/Spinner';
import { removeFromCart, updateQuantity, clearCart } from '@/store/cartSlice';
import { orderService } from '@/services';

const CartModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { items, totalAmount, totalItems } = useSelector(state => state.cart);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    specialInstructions: ''
  });

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    dispatch(updateQuantity({ itemId, quantity: newQuantity }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
    toast.success('Item removed from cart');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setShowCheckoutForm(true);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsCheckingOut(true);

    try {
      const orderData = {
        customer: {
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
          address: {
            street: customerInfo.address,
            city: customerInfo.city,
            zipCode: customerInfo.zipCode
          }
        },
        items: items,
        subtotal: totalAmount,
        tax: totalAmount * 0.08,
        deliveryFee: 5,
        total: totalAmount + (totalAmount * 0.08) + 5,
        paymentMethod: 'credit_card',
        specialInstructions: customerInfo.specialInstructions
      };

      const order = await orderService.create(orderData);
      
      dispatch(clearCart());
      toast.success(`Order placed successfully! Order #${order.orderNumber}`);
      onClose();
      setShowCheckoutForm(false);
      setCustomerInfo({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        specialInstructions: ''
      });
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-surface-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-primary" />
            <Heading as="h2" className="text-2xl font-bold text-surface-900">
              Your Cart
            </Heading>
            {totalItems > 0 && (
              <span className="bg-primary text-white text-sm px-2 py-1 rounded-full">
                {totalItems} item{totalItems !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-surface-600" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          {!showCheckoutForm ? (
            <>
              {/* Cart Items */}
              <div className="p-6">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-surface-300 mx-auto mb-4" />
                    <Heading as="h3" className="text-xl font-semibold text-surface-900 mb-2">
                      Your cart is empty
                    </Heading>
                    <Paragraph className="text-surface-600">
                      Add some delicious items from our menu to get started
                    </Paragraph>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-surface-50 rounded-xl">
                        <div className="flex-1">
                          <Heading as="h4" className="font-semibold text-surface-900 mb-1">
                            {item.name}
                          </Heading>
                          <Paragraph className="text-sm text-surface-600 mb-2">
                            ${item.price} each
                          </Paragraph>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-surface-200 rounded transition-colors"
                          >
                            <Minus className="w-4 h-4 text-surface-600" />
                          </button>
                          <span className="w-8 text-center font-medium text-surface-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-surface-200 rounded transition-colors"
                          >
                            <Plus className="w-4 h-4 text-surface-600" />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-semibold text-surface-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors mt-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Summary */}
              {items.length > 0 && (
                <div className="border-t border-surface-200 p-6">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-surface-600">
                      <span>Subtotal</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-surface-600">
                      <span>Tax (8%)</span>
                      <span>${(totalAmount * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-surface-600">
                      <span>Delivery Fee</span>
                      <span>$5.00</span>
                    </div>
                    <div className="border-t border-surface-200 pt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${(totalAmount + (totalAmount * 0.08) + 5).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-primary hover:bg-primary-600 text-white"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              )}
            </>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="p-6">
              <div className="mb-6">
                <Heading as="h3" className="text-xl font-bold text-surface-900 mb-2">
                  Delivery Information
                </Heading>
                <Paragraph className="text-surface-600">
                  Please provide your delivery details
                </Paragraph>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={customerInfo.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={customerInfo.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="mb-6">
                <Label htmlFor="specialInstructions">Special Instructions</Label>
                <Input
                  id="specialInstructions"
                  name="specialInstructions"
                  value={customerInfo.specialInstructions}
                  onChange={handleInputChange}
                  placeholder="Any special delivery instructions..."
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={() => setShowCheckoutForm(false)}
                  variant="secondary"
                  className="flex-1"
                >
                  Back to Cart
                </Button>
                <Button
                  type="submit"
                  disabled={isCheckingOut}
                  className="flex-1 bg-primary hover:bg-primary-600 text-white"
                >
                  {isCheckingOut ? (
                    <>
                      <Spinner className="w-4 h-4 mr-2" />
                      Placing Order...
                    </>
                  ) : (
                    `Place Order - $${(totalAmount + (totalAmount * 0.08) + 5).toFixed(2)}`
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  return createPortal(modalContent, document.body);
};

export default CartModal;