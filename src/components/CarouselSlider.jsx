import React, { useState } from 'react';

const items = [
  {
    src: '../public/images/hero.jpeg',
    altText: 'Slide 1',
    caption: 'Slide 1',
    key: 1,
  },
  {
    src: 'https://picsum.photos/id/456/1200/400',
    altText: 'Slide 2',
    caption: 'Slide 2',
    key: 2,
  },
  {
    src: 'https://picsum.photos/id/678/1200/400',
    altText: 'Slide 3',
    caption: 'Slide 3',
    key: 3,
  },
];

function CarouselSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
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
        <img
          src={item.src}
          alt={item.altText}
          className="w-[110%] h-[85%] object-cover md:h-[104%]"
        />
        {/* Caption and Call to Action */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 gap-2 
                        md:items-start md:text-left md:justify-end
                        md:left-[15%] md:bottom-[25%]">
          <p className="text-white text-sm tracking-wide uppercase">Summer 2020</p>
          <h2 className="text-5xl font-bold text-white mt-2 max-w-xs md:max-w-md lg:max-w-lg">NEW COLLECTION</h2>
          <p className="text-white mt-4 max-w-xs md:max-w-sm lg:max-w-md">
            We know how large objects will act, but things on a small scale.
          </p>
          <button className="mt-4 px-8 py-2.5 bg-[#2DC071] text-white font-bold uppercase hover:bg-[#2DC071] transition-all">
            Shop Now
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="relative w-full h-screen overflow-hidden">
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

export default CarouselSlider;