import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <ApperIcon name="UtensilsCrossed" className="w-16 h-16 text-primary" />
          </motion.div>

          <h1 className="font-heading text-6xl font-bold text-primary mb-4">
            404
          </h1>
          
          <h2 className="font-heading text-2xl font-semibold text-surface-900 mb-4">
            Page Not Found
          </h2>
          
          <p className="text-surface-600 text-lg mb-8 leading-relaxed">
            Looks like this page wandered off the menu! Let's get you back to something delicious.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <NavLink
                to="/"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                <ApperIcon name="Home" className="w-5 h-5 mr-2" />
                Back to Home
              </NavLink>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <NavLink
                to="/menu"
                className="inline-flex items-center px-6 py-3 bg-surface-100 text-surface-700 font-semibold rounded-lg hover:bg-surface-200 transition-colors"
              >
                <ApperIcon name="Book" className="w-5 h-5 mr-2" />
                View Menu
              </NavLink>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-6 bg-white rounded-xl shadow-md"
          >
            <h3 className="font-heading text-lg font-semibold text-surface-900 mb-3">
              Popular Pages
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <NavLink
                to="/menu"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Our Menu
              </NavLink>
              <NavLink
                to="/reservations"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Reservations
              </NavLink>
              <NavLink
                to="/about"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                About Us
              </NavLink>
              <NavLink
                to="/contact"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Contact
              </NavLink>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;