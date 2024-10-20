import BannerTwo from '@/components/BannerTwo'
import ProductDetail from '@/components/ProductDetail'
import Products from '@/components/Products'
import React from 'react'

function ProductPageContent() {
  return (
    <div className='bg-[#FAFAFA]'>
        <ProductDetail />
        <BannerTwo />
        <Products />
    </div>
  )
}

export default ProductPageContent