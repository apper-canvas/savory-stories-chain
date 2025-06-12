import React from 'react';
import HeroSection from '@/components/organisms/HeroSection';
import HomeIntroductionSection from '@/components/organisms/HomeIntroductionSection';
import HomeWhyChooseUsSection from '@/components/organisms/HomeWhyChooseUsSection';
import MainFeatureSection from '@/components/organisms/MainFeatureSection';
import CallToActionSection from '@/components/organisms/CallToActionSection';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection
        imageSrc="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        imageAlt="Restaurant Interior"
        title={
          <>
            Welcome to
            <span className="block text-secondary">Savory Stories</span>
          </>
        }
        subtitle="Where every dish tells a story and every meal creates a memory. Experience culinary artistry in the heart of the city."
        primaryLinkTo="/menu"
        primaryLinkText="Explore Menu"
        primaryLinkIcon="Book"
        secondaryLinkTo="/reservations"
        secondaryLinkText="Make Reservation"
        secondaryLinkIcon="Calendar"
        showScrollIndicator
      />
      <HomeIntroductionSection />
      <HomeWhyChooseUsSection />
      <MainFeatureSection />
      <CallToActionSection
        title="Ready for an Unforgettable Dining Experience?"
        description="Join us for an evening of exceptional cuisine, warm hospitality, and memories that last a lifetime."
        primaryLinkTo="/reservations"
        primaryLinkText="Book Your Table"
        primaryLinkIcon="Calendar"
        secondaryLinkTo="/contact"
        secondaryLinkText="Contact Us"
        secondaryLinkIcon="Phone"
      />
    </div>
  );
};

export default HomePage;