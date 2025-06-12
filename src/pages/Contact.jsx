import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setLoading(false);
  };

  const contactInfo = [
    {
      icon: 'MapPin',
      title: 'Address',
      details: ['123 Culinary Street', 'Food District, Downtown', 'City, State 12345']
    },
    {
      icon: 'Phone',
      title: 'Phone',
      details: ['(555) 123-4567', 'Call for reservations']
    },
    {
      icon: 'Mail',
      title: 'Email',
      details: ['hello@savorystories.com', 'info@savorystories.com']
    },
    {
      icon: 'Clock',
      title: 'Hours',
      details: [
        'Mon-Thu: 5:00 PM - 10:00 PM',
        'Fri-Sat: 5:00 PM - 11:00 PM',
        'Sun: 4:00 PM - 9:00 PM'
      ]
    }
  ];

  return (
    <div className="py-8">
      {/* Header */}
      <section className="py-12 bg-surface-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-surface-900 mb-4">
              Contact Us
            </h1>
            <p className="text-surface-600 text-lg max-w-2xl mx-auto">
              We'd love to hear from you. Get in touch with us for reservations, questions, or just to say hello.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-surface-50 rounded-xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={info.icon} className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-surface-900 mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1 text-surface-600">
                  {info.details.map((detail, idx) => (
                    <p key={idx}>{detail}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-heading text-3xl font-bold text-surface-900 mb-6">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="reservation">Reservation Inquiry</option>
                    <option value="catering">Catering Services</option>
                    <option value="feedback">Feedback</option>
                    <option value="general">General Question</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className="w-full px-6 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Send" className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="h-96 lg:h-full min-h-96"
            >
              <div className="w-full h-full bg-surface-200 rounded-xl overflow-hidden relative">
                {/* Google Maps Embed Placeholder */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/20">
                  <div className="text-center">
                    <ApperIcon name="MapPin" className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="font-heading text-xl font-semibold text-surface-900 mb-2">
                      Find Us Here
                    </h3>
                    <p className="text-surface-600">
                      123 Culinary Street<br />
                      Food District, Downtown<br />
                      City, State 12345
                    </p>
                  </div>
                </div>
                
                {/* Actual Google Maps would go here */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.0361638409!2d-74.30933068742447!3d40.697539718486624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1635959687932!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 opacity-80"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-surface-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl font-bold text-surface-900 mb-6">
                Parking & Transportation
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <ApperIcon name="Car" className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-surface-900">Valet Parking</h4>
                    <p className="text-surface-600">Complimentary valet service available Friday-Sunday</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <ApperIcon name="MapPin" className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-surface-900">Street Parking</h4>
                    <p className="text-surface-600">Metered parking available on adjacent streets</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <ApperIcon name="Train" className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-surface-900">Public Transit</h4>
                    <p className="text-surface-600">Located 2 blocks from Central Station</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-heading text-2xl font-bold text-surface-900 mb-6">
                Special Services
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <ApperIcon name="Users" className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-surface-900">Private Events</h4>
                    <p className="text-surface-600">We host private parties and corporate events</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <ApperIcon name="Utensils" className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-surface-900">Catering</h4>
                    <p className="text-surface-600">Off-site catering services available</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <ApperIcon name="Gift" className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-surface-900">Gift Cards</h4>
                    <p className="text-surface-600">Perfect for any occasion, available in-store and online</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;