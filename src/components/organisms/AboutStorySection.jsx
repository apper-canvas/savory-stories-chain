import React from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Image from '@/components/atoms/Image';

const AboutStorySection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Heading as="h2" className="text-3xl md:text-4xl font-bold text-surface-900 mb-6">
                            Where It All Began
                        </Heading>
                        <div className="space-y-6 text-lg text-surface-600 leading-relaxed">
                            <Paragraph>
                                Savory Stories was born from a simple dream: to create a place where exceptional food 
                                meets genuine hospitality. Founded in 2015 by Chef Marcus Rivera and his wife Elena, 
                                our restaurant began as a small neighborhood gem with big ambitions.
                            </Paragraph>
                            <Paragraph>
                                Marcus, trained in classical French cuisine but inspired by his grandmother's 
                                traditional recipes, wanted to bridge the gap between fine dining and comfort food. 
                                Elena, with her background in sustainable agriculture, brought a commitment to 
                                local sourcing and environmental responsibility.
                            </Paragraph>
                            <Paragraph>
                                Together, they created more than just a restaurant—they built a community gathering 
                                place where every meal tells a story and every guest becomes part of our extended family.
                            </Paragraph>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Chef Marcus Rivera"
                            className="rounded-lg shadow-lg w-full"
                        />
                        <div className="absolute -bottom-6 -left-6 bg-secondary p-6 rounded-lg shadow-lg">
                            <Paragraph className="font-heading text-xl font-semibold text-primary">
                                "Every dish should tell a story"
                            </Paragraph>
                            <Paragraph className="text-surface-600 mt-2">- Chef Marcus Rivera</Paragraph>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutStorySection;