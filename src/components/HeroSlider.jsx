// HeroSlider.js
import React, { useState } from 'react';
import heroImage from '../assets/images/hero.jpeg';
import heroTwo from '../assets/images/heroTwo.png';
import CallToAction from './CallToAction';

const items = [
  {
    src: heroImage,
    altText: 'Slide 1',
    caption: 'Slide 1',
    key: 1,
    season: 'Summer 2020',
    title: 'NEW COLLECTION',
    description: 'We know how large objects will act, but things on a small scale.',
    buttonText: 'Shop Now',
  },
  {
    src: heroTwo,
    altText: 'Slide 2',
    caption: 'Slide 2',
    key: 2,
    season: 'Autumn 2020',
    title: 'EXCLUSIVE SALE',
    description: 'The finest items at great prices.',
    buttonText: 'Explore',
  },
  {
    src: 'https://picsum.photos/id/678/1200/400',
    altText: 'Slide 3',
    caption: 'Slide 3',
    key: 3,
    season: 'Winter 2020',
    title: 'LIMITED EDITION',
    description: 'Discover unique pieces for the season.',
    buttonText: 'Discover Now',
  },
];

function HeroSlider({ startIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(startIndex);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item, index) => {
    return (
      <div
        key={item.key}
        className={`absolute inset-0 transition-opacity duration-1000 ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}
        onTransitionEnd={() => setAnimating(false)}
      >
        {/* Use CallToAction component */}
        <CallToAction
          season={item.season}
          title={item.title}
          description={item.description}
          buttonText={item.buttonText}
        />
        {/* Add different Tailwind CSS styles based on starting index */}
        <img
          src={item.src}
          alt={item.altText}
          className={`w-[110%] h-[85%] object-cover md:h-[104%] ${startIndex === 1 ? 'w-[50%] bg-[#23856D]' : '' /* Write your custom styles here for index 1 */}`}
        />
        

      </div>
    );
  });

  return (
    <div className={`relative w-full h-screen overflow-hidden ${startIndex === 1 ? '' : '' /* Write your custom styles here for the slider container when startIndex is 1 */}`}>
      <div className="relative h-full">
        {slides}
      </div>

      {/* Transparent Previous/Next Arrows */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-transparent text-white text-8xl font-thin"
        onClick={previous}
      >
        &#8249;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-transparent text-white text-8xl font-thin"
        onClick={next}
      >
        &#8250;
      </button>

      {/* Rectangle Indicators */}
      <div className="absolute bottom-36 md:bottom-4 left-1/2 transform -translate-x-1/2 flex">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-14 h-2 ${activeIndex === index ? 'bg-white' : 'backdrop-brightness-50'}`}
            onClick={() => goToIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;