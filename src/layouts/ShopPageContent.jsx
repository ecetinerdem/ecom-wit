
import CategoryList from '@/components/CategoryList'
import React from 'react'
import ShopProducts from './ShopProducts'
import Brands from '@/components/Brands'
import Filter from '@/utils/Filter'


function ShopPageContent() {
  return (
    <div>
      <CategoryList />
      <Filter />
      <ShopProducts />
      <Brands />
      
    </div>
  )
}

export default ShopPageContent