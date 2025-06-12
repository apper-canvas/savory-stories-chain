import React from 'react';
import HeroSection from '@/components/organisms/HeroSection';
import AboutStorySection from '@/components/organisms/AboutStorySection';
import AboutValuesSection from '@/components/organisms/AboutValuesSection';
import AboutTimelineSection from '@/components/organisms/AboutTimelineSection';
import AboutTeamSection from '@/components/organisms/AboutTeamSection';
import CallToActionSection from '@/components/organisms/CallToActionSection';

const AboutPage = () => {
  return (
    <div className="py-8">
      <HeroSection
        imageSrc="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        imageAlt="Restaurant Interior"
        title="Our Story"
        subtitle="A journey of culinary passion, community connection, and unforgettable dining experiences"
        gradientClass="absolute inset-0 bg-primary opacity-30" // Adjust opacity in the utility class or directly
      />
      <AboutStorySection />
      <AboutValuesSection />
      <AboutTimelineSection />
      <AboutTeamSection />
      <CallToActionSection
        title="Become Part of Our Story"
        description="Every guest adds a new chapter to our tale. We can't wait to welcome you to the Savory Stories family."
        primaryLinkTo="/reservations"
        primaryLinkText="Reserve Your Table"
        primaryLinkIcon="Calendar"
        secondaryLinkTo="/contact"
        secondaryLinkText="Visit Us"
        secondaryLinkIcon="MapPin"
      />
    </div>
  );
};

export default AboutPage;