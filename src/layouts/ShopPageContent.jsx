
import ShopCard from '@/components/ShopCard'
import React from 'react'
import ShopProducts from './ShopProducts'
import Brands from '@/components/Brands'
import Filter from '@/utils/Filter'

function ShopPageContent() {
  return (
    <div>
      <ShopCard />
      <Filter />
      <ShopProducts />
      <Brands />
      
    </div>
  )
}

export default ShopPageContent