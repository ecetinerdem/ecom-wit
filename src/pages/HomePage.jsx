import React from 'react';
import Navbar from '../utils/Navbar';
import Categories from '../components/Categories';
import Products from '../components/Products';
import HeroSlider from '../components/HeroSlider';
import Banner from '@/components/Banner';


function HomePage() {
  return (
    <div>
      <Navbar />
      <HeroSlider />
      <Categories />
      <Products />
      <HeroSlider startIndex={1} />
      <Banner />
    </div>
  );
}

export default HomePage;
