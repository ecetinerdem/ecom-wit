import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { fetchProductDetail } from '../store/actions/productActions';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct: product, productLoading } = useSelector(state => state.products);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetail(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product && product.images) {
      // Create slider images array from product images
      // If product has multiple images, use them; if not, repeat the first image
      const productImages = product.images.map(img => img.url);
      const repeatedImages = productImages.length < 5 
        ? [...productImages, ...Array(5 - productImages.length).fill(productImages[0])]
        : productImages.slice(0, 5);
      
      setSliderImages(repeatedImages);
    }
  }, [product]);

  const previous = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? sliderImages.length - 1 : prevSlide - 1));
  };

  const next = () => {
    setCurrentSlide((prevSlide) => (prevSlide === sliderImages.length - 1 ? 0 : prevSlide + 1));
  };

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
      {/* Breadcrumbs Section */}
      <div className="flex space-x-2 mb-6">
        <h6 className="text-[#252B42] font-bold">Home</h6>
        <h6 className="text-[#BDBDBD] font-bold">{'>'}</h6>
        <h6 className="text-[#BDBDBD] font-bold">Shop</h6>
      </div>

      {/* Main Product Section */}
      <div className="flex flex-col md:flex-row justify-around items-start gap-6">
        {/* Image Slider (A) */}
        <div className="w-full md:w-1/2 max-w-md">
          <div className="relative aspect-square">
            <img 
              src={sliderImages[currentSlide]} 
              alt={`${product.name}`} 
              className="w-full h-full object-cover" 
            />
            
            {/* Slider Arrows */}
            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-transparent text-white text-4xl md:text-6xl font-thin"
              onClick={previous}
            >
              &#8249;
            </button>
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-transparent text-white text-4xl md:text-6xl font-thin"
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
                className={`w-16 h-16 object-cover cursor-pointer ${currentSlide === index ? 'border-2 border-blue-500' : ''}`}
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
            <span className={`${product.stock > 0 ? 'text-[#23A6F0]' : 'text-red-500'}`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
            {product.stock > 0 && ` (${product.stock} items)`}
          </p>

          {/* Description */}
          <p className="text-sm text-gray-500">
            {product.description}
          </p>

          {/* Select Options Button and Action Icons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              className="bg-[#23A6F0] text-white py-3 px-6 rounded disabled:bg-gray-400"
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Select Options'}
            </button>
            <div className="flex space-x-4">
              {[Heart, ShoppingCart, Eye].map((Icon, index) => (
                <button 
                  key={index} 
                  className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-50"
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