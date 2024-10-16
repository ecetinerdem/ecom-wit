import React from 'react';
import Navbar from '../utils/Navbar';
import Categories from '../components/Categories';
import Products from '../components/Products';
import HeroSlider from '../components/HeroSlider';


function HomePage() {
  return (
    <div>
      <Navbar />
      <HeroSlider />
      <Categories />
      <Products />
      <HeroSlider startIndex={1} />
    </div>
  );
}

export default HomePage;
