import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { fetchProductDetail } from '../store/actions/productActions';

function ProductDetail() {
  // Updated to get all route parameters
  const { gender, category, productNameSlug, productId } = useParams();
  const dispatch = useDispatch();
  const { currentProduct: product, productLoading } = useSelector(state => state.products);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderImages, setSliderImages] = useState([]);

  // Fetch product using productId from URL
  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetail(productId));
    }
  }, [dispatch, productId]);



  // Mock data for random images (you can replace these with your actual mock data)
  const mockImages = [
    'https://picsum.photos/400/400?random=1',
    'https://picsum.photos/400/400?random=2',
    'https://picsum.photos/400/400?random=3',
    'https://picsum.photos/400/400?random=4',
    'https://picsum.photos/400/400?random=5'
  ];

  useEffect(() => {
    if (product && product.images) {
      // Get the main product image
      const mainImage = product.images[0]?.url;
      
      // Create an array of 5 images:
      // 1. Start with the main product image
      // 2. Fill the rest with random mock images
      const imageSet = [mainImage];
      
      // Add random images from mockImages, excluding any that match the main image
      const remainingMockImages = mockImages.filter(img => img !== mainImage);
      const randomImages = remainingMockImages
        .sort(() => 0.5 - Math.random()) // Shuffle the array
        .slice(0, 4); // Take first 4 images
      
      setSliderImages([...imageSet, ...randomImages]);
    }
  }, [product]);

  const previous = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? sliderImages.length - 1 : prevSlide - 1));
  };

  const next = () => {
    setCurrentSlide((prevSlide) => (prevSlide === sliderImages.length - 1 ? 0 : prevSlide + 1));
  };

  // Show loading state
  if (productLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#23A6F0]"></div>
      </div>
    );
  }

  if (!product || sliderImages.length === 0) return null;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Enhanced Breadcrumbs Section */}
      <div className="flex space-x-2 mb-6">
        <h6 className="text-[#252B42] font-bold">Home</h6>
        <h6 className="text-[#BDBDBD] font-bold">{'>'}</h6>
        <h6 className="text-[#252B42] font-bold">Shop</h6>
        <h6 className="text-[#BDBDBD] font-bold">{'>'}</h6>
        <h6 className="text-[#252B42] font-bold capitalize">{gender}</h6>
        <h6 className="text-[#BDBDBD] font-bold">{'>'}</h6>
        <h6 className="text-[#252B42] font-bold capitalize">{category}</h6>
      </div>

      {/* Main Product Section */}
      <div className="flex flex-col md:flex-row justify-around items-start gap-6">
        {/* Image Slider (A) */}
        <div className="w-full md:w-1/2 max-w-md">
          <div className="relative aspect-square">
            <img 
              src={sliderImages[currentSlide]} 
              alt={`${product.name}`} 
              className="w-full h-full object-cover rounded-lg shadow-lg" 
            />
            
            {/* Slider Arrows */}
            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all"
              onClick={previous}
            >
              &#8249;
            </button>
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all"
              onClick={next}
            >
              &#8250;
            </button>
          </div>

          {/* Thumbnail Images */}
          <div className="flex space-x-2 justify-center mt-4">
            {sliderImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 object-cover cursor-pointer rounded-md transition-all
                  ${currentSlide === index 
                    ? 'border-2 border-[#23A6F0] shadow-lg scale-105' 
                    : 'border border-gray-200 hover:border-[#23A6F0] hover:scale-105'
                  }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Details (B) */}
        <div className="w-full md:w-1/2 max-w-md space-y-6">
          <h2 className="text-2xl font-bold">{product.name}</h2>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`} 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M12 2L15 9H22L17 13L19 21L12 16L5 21L7 13L2 9H9L12 2Z" />
                  </svg>
                ))}
            </div>
            <p className="text-gray-500">({product.sell_count} Reviews)</p>
          </div>

          {/* Price */}
          <p className="text-2xl font-bold text-[#252B42]">${product.price.toFixed(2)}</p>

          {/* Availability */}
          <p className="text-sm text-gray-500">
            Availability: {' '}
            <span className={`font-medium ${product.stock > 0 ? 'text-[#23A6F0]' : 'text-red-500'}`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
            {product.stock > 0 && ` (${product.stock} items)`}
          </p>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed">
            {product.description}
          </p>

          {/* Select Options Button and Action Icons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <button 
              className="bg-[#23A6F0] text-white py-3 px-6 rounded-lg hover:bg-[#1b86c3] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Select Options'}
            </button>
            <div className="flex space-x-4">
              {[Heart, ShoppingCart, Eye].map((Icon, index) => (
                <button 
                  key={index} 
                  className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 transition-all"
                >
                  <Icon size={20} className="text-gray-500" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;