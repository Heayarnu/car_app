'use client';

import Image from 'next/image';
import CustomButton from './CustomButton';

const Hero = () => {
  const handleScroll = () => {
    const discoverSection = document.getElementById('discover');
    if (discoverSection) {
      discoverSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="hero">
      <div className="flex-1 pt-28 padding-x">
        <h1 className="hero__title">
          Find, book, or rent a car -- quickly and easily.
        </h1>

        <p className="hero__subtitle">
          Streamline your car rental experience with our effortless booking
          process.
        </p>

        <CustomButton
          title="Explore cars"
          containerStyles="bg-primary-blue text-white rounded-full mt-7"
          handleClick={handleScroll}
        />
      </div>

      <div className="hero__image-container">
        <div className="hero__image">
          <Image src="/hero.png" alt="hero" fill className="object-contain" />
        </div>

        <div className="hero__image-overlay"></div>
      </div>
    </div>
  );
};

export default Hero;
