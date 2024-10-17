import Banner from '@/components/Banner'
import Categories from '@/components/Categories'
import FeaturedPosts from '@/components/FeaturedPosts'
import HeroSlider from '@/components/HeroSlider'
import Products from '@/components/Products'
import React from 'react'

function HomePageContent() {
  return (
    <>
      <HeroSlider />
      <Categories />
      <Products />
      <HeroSlider startIndex={1} />
      <Banner />
      <FeaturedPosts />
    </>
  )
}

export default HomePageContent