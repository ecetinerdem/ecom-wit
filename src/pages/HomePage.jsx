import React from 'react';
import Navbar from '../utils/Navbar';
import Categories from '../components/Categories';
import Products from '../components/Products';
import HeroSlider from '../components/HeroSlider';

function HomePage() {
  return (
    <div>
      <Navbar />
      {/* First slider starts from index 0 */}
      <HeroSlider startIndex={0} />
      <Categories />
      <Products />
      {/* Second slider starts from index 1 (key: 2) */}
      <HeroSlider startIndex={1} />
    </div>
  );
}

export default HomePage;
