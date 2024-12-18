import React from 'react';
import { useParams } from 'react-router-dom';

import Header from '@/layouts/Header';
import Brands from '@/components/Brands';
import Footer from '@/layouts/Footer';
import ProductPageContent from '@/layouts/ProductPageContent';

//FIX: Product detail page does not start from the top of the page
const ProductDetailPage = () => {
  return (
    <div>
      <Header />
      <ProductPageContent />
      <Brands />
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
