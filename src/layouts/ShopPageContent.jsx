
import CategoryList from '@/components/CategoryList'
import React, { useEffect } from 'react'
import ShopProducts from './ShopProducts'
import Brands from '@/components/Brands'
import Filter from '@/utils/Filter'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'


function ShopPageContent() {
  const { gender, category, categoryId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (gender && category && categoryId) {
      dispatch(navigateToCategory(gender, category, categoryId));
    }
  }, [gender, category, categoryId]);
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