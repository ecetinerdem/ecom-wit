import React from 'react'
import Navbar from '../utils/Navbar'
import CarouselSlider from '../components/CarouselSlider'


import Categories from '../components/Categories'

function HomePage() {
  return (
    <div>
      <Navbar />
      <CarouselSlider/>
      <Categories />
      
    </div>
  )
}

export default HomePage