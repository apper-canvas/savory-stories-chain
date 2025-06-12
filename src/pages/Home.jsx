import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const features = [
    {
      icon: 'Book',
      title: 'Curated Menu',
      description: 'Expertly crafted dishes using locally sourced ingredients',
      link: '/menu'
    },
    {
      icon: 'Calendar',
      title: 'Easy Reservations',
      description: 'Book your table in just a few clicks',
      link: '/reservations'
    },
    {
      icon: 'Star',
      title: 'Award Winning',
      description: 'Recognized for culinary excellence and service',
      link: '/reviews'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Restaurant Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Welcome to
              <span className="block text-secondary">Savory Stories</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed max-w-2xl mx-auto">
              Where every dish tells a story and every meal creates a memory. 
              Experience culinary artistry in the heart of the city.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <NavLink
                  to="/menu"
                  className="inline-flex items-center px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors shadow-lg"
                >
                  <ApperIcon name="Book" className="w-5 h-5 mr-2" />
                  Explore Menu
                </NavLink>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <NavLink
                  to="/reservations"
                  className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-colors border border-white/30"
                >
                  <ApperIcon name="Calendar" className="w-5 h-5 mr-2" />
                  Make Reservation
                </NavLink>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <ApperIcon name="ChevronDown" className="w-6 h-6" />
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-surface-900 mb-6">
                A Culinary Journey
                <span className="block text-primary">Worth Savoring</span>
              </h2>
              <p className="text-lg text-surface-600 mb-6 leading-relaxed">
                At Savory Stories, we believe that great food is more than sustenance—it's 
                an experience that brings people together. Our passionate chefs craft each 
                dish with locally sourced ingredients and time-honored techniques.
              </p>
              <p className="text-lg text-surface-600 mb-8 leading-relaxed">
                From intimate dinners to celebratory gatherings, we create the perfect 
                atmosphere for life's most memorable moments.
              </p>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <NavLink
                  to="/about"
                  className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Learn Our Story
                  <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2" />
                </NavLink>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Chef preparing dish"
                  className="rounded-lg shadow-lg object-cover h-64"
                />
                <img
                  src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Plated dish"
                  className="rounded-lg shadow-lg object-cover h-64 mt-8"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-secondary rounded-full opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-surface-900 mb-4">
              Why Choose Savory Stories
            </h2>
            <p className="text-surface-600 text-lg max-w-2xl mx-auto">
              Discover what makes our restaurant a destination for food lovers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-8 shadow-md text-center group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <ApperIcon name={feature.icon} className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-surface-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-surface-600 mb-6">
                  {feature.description}
                </p>
                <NavLink
                  to={feature.link}
                  className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors group"
                >
                  Learn More
                  <ApperIcon name="ArrowRight" className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </NavLink>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Feature Section */}
      <MainFeature />

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Ready for an Unforgettable Dining Experience?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join us for an evening of exceptional cuisine, warm hospitality, and memories that last a lifetime.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <NavLink
                  to="/reservations"
                  className="inline-flex items-center px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors shadow-lg"
                >
                  <ApperIcon name="Calendar" className="w-5 h-5 mr-2" />
                  Book Your Table
                </NavLink>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <NavLink
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-colors border border-white/30"
                >
                  <ApperIcon name="Phone" className="w-5 h-5 mr-2" />
                  Contact Us
                </NavLink>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;