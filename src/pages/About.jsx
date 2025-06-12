import { motion } from 'framer-motion';
import ApperIcon from '../components/ApperIcon';

const About = () => {
  const milestones = [
    { year: '2015', title: 'Founded', description: 'Savory Stories opened its doors in the heart of the city' },
    { year: '2017', title: 'Award Winner', description: 'Received "Best New Restaurant" from City Food Awards' },
    { year: '2019', title: 'Expansion', description: 'Renovated and expanded dining room to accommodate more guests' },
    { year: '2021', title: 'Sustainability', description: 'Achieved zero-waste certification and local sourcing milestone' },
    { year: '2023', title: 'Recognition', description: 'Featured in National Culinary Magazine as "Restaurant of the Year"' }
  ];

  const values = [
    {
      icon: 'Leaf',
      title: 'Sustainability',
      description: 'We partner with local farms and suppliers to reduce our environmental impact while supporting our community.'
    },
    {
      icon: 'Heart',
      title: 'Passion',
      description: 'Every dish is crafted with love and attention to detail, creating memorable experiences for our guests.'
    },
    {
      icon: 'Users',
      title: 'Community',
      description: 'We believe in bringing people together through exceptional food and warm hospitality.'
    },
    {
      icon: 'Award',
      title: 'Excellence',
      description: 'We continuously strive for perfection in every aspect of our service and culinary offerings.'
    }
  ];

  return (
    <div className="py-8">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Restaurant Interior"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="relative container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              A journey of culinary passion, community connection, and unforgettable dining experiences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-surface-900 mb-6">
                Where It All Began
              </h2>
              <div className="space-y-6 text-lg text-surface-600 leading-relaxed">
                <p>
                  Savory Stories was born from a simple dream: to create a place where exceptional food 
                  meets genuine hospitality. Founded in 2015 by Chef Marcus Rivera and his wife Elena, 
                  our restaurant began as a small neighborhood gem with big ambitions.
                </p>
                <p>
                  Marcus, trained in classical French cuisine but inspired by his grandmother's 
                  traditional recipes, wanted to bridge the gap between fine dining and comfort food. 
                  Elena, with her background in sustainable agriculture, brought a commitment to 
                  local sourcing and environmental responsibility.
                </p>
                <p>
                  Together, they created more than just a restaurant—they built a community gathering 
                  place where every meal tells a story and every guest becomes part of our extended family.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Chef Marcus Rivera"
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-secondary p-6 rounded-lg shadow-lg">
                <p className="font-heading text-xl font-semibold text-primary">
                  "Every dish should tell a story"
                </p>
                <p className="text-surface-600 mt-2">- Chef Marcus Rivera</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </h2>
            <p className="text-surface-600 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do, from sourcing ingredients to serving our guests
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 shadow-md text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ApperIcon name={value.icon} className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-surface-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-surface-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-surface-900 mb-4">
              Our Journey
            </h2>
            <p className="text-surface-600 text-lg max-w-2xl mx-auto">
              Key milestones that have shaped Savory Stories into what it is today
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center mb-12 last:mb-0 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <div className={`bg-surface-50 rounded-xl p-6 ${
                    index % 2 === 0 ? 'text-right' : 'text-left'
                  }`}>
                    <h3 className="font-heading text-xl font-semibold text-surface-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-surface-600">
                      {milestone.description}
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-1 h-12 bg-primary/20"></div>
                  )}
                </div>
                
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet Our Team
            </h2>
            <p className="text-surface-600 text-lg max-w-2xl mx-auto">
              The passionate individuals who bring Savory Stories to life every day
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Chef Marcus Rivera',
                role: 'Executive Chef & Co-Founder',
                image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                bio: 'Classically trained with 15 years of experience in fine dining restaurants across Europe and America.'
              },
              {
                name: 'Elena Rivera',
                role: 'Operations Manager & Co-Founder',
                image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                bio: 'Environmental advocate and business strategist ensuring sustainable practices in all operations.'
              },
              {
                name: 'James Thompson',
                role: 'Sous Chef',
                image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                bio: 'Creative culinary artist specializing in seasonal menu development and innovative flavor combinations.'
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold text-surface-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-surface-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              Become Part of Our Story
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Every guest adds a new chapter to our tale. We can't wait to welcome you to the Savory Stories family.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/reservations"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors shadow-lg"
              >
                <ApperIcon name="Calendar" className="w-5 h-5 mr-2" />
                Reserve Your Table
              </motion.a>
              
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-colors border border-white/30"
              >
                <ApperIcon name="MapPin" className="w-5 h-5 mr-2" />
                Visit Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;