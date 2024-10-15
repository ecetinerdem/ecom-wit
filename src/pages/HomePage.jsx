import React from 'react'
import Navbar from '../utils/Navbar'
import CarouselSlider from '../components/CarouselSlider'


import Categories from '../components/Categories'
import Products from '../components/Products'

function HomePage() {
  return (
    <div>
      <Navbar />
      <CarouselSlider/>
      <Categories />
      <Products />
      
    </div>
  )
}

export default HomePage