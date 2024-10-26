import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/productsData';
import Header from '@/layouts/Header';
import Brands from '@/components/Brands';
import Footer from '@/layouts/Footer';
import ProductPageContent from '@/layouts/ProductPageContent';


const ProductDetailPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const product = products.find((p) => p.id === parseInt(id)); // Find the matching product

  if (!product) {
    return <p>Product not found!</p>;
  }

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
