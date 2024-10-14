import React from 'react'
import Navbar from '../utils/Navbar'
import CarouselSlider from '../components/CarouselSlider'

import MobileCategories from '../components/CategoryCard'

function HomePage() {
  return (
    <div>
      <Navbar />
      <CarouselSlider/>
      <MobileCategories/>
    </div>
  )
}

export default HomePage