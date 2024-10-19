import BannerTwo from '@/components/BannerTwo'
import ProductDetail from '@/components/ProductDetail'
import React from 'react'

function ProductPageContent() {
  return (
    <div className='bg-[#FAFAFA]'>
        <ProductDetail />
        <BannerTwo />
    </div>
  )
}

export default ProductPageContent