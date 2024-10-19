import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/productsData';
import { Heart, ShoppingCart, Eye } from 'lucide-react';

function ProductDetail() {
  const { id } = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [product, setProduct] = useState(null);
  const [sliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct || products[0]); // Fallback to first product if not found

    if (foundProduct) {
      // Create an array of 5 images: the product's image + 4 random images
      const randomImages = [...products]
        .filter(p => p.id !== foundProduct.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4)
        .map(p => p.imageUrl);
      
      setSliderImages([foundProduct.imageUrl, ...randomImages]);
    }
  }, [id]);

  const previous = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? sliderImages.length - 1 : prevSlide - 1));
  };

  const next = () => {
    setCurrentSlide((prevSlide) => (prevSlide === sliderImages.length - 1 ? 0 : prevSlide + 1));
  };

  if (!product || sliderImages.length === 0) return <div>Loading...</div>;

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
            <img src={sliderImages[currentSlide]} alt={`Product ${currentSlide + 1}`} className="w-full h-full object-cover" />
            
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
          <h2 className="text-2xl font-bold">{product.title}</h2>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex">
              {/* Stars */}
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15 9H22L17 13L19 21L12 16L5 21L7 13L2 9H9L12 2Z" />
                  </svg>
                ))}
            </div>
            <p className="text-gray-500">(10 Reviews)</p>
          </div>

          {/* Price */}
          <p className="text-2xl font-bold text-[#252B42]">${product.price.toFixed(2)}</p>

          {/* Availability */}
          <p className="text-sm text-gray-500">
            Availability: <span className="text-[#23A6F0]">In Stock</span>
          </p>

          {/* Description */}
          <p className="text-sm text-gray-500">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official...
          </p>

          {/* Color Options */}
          <div className="flex space-x-4 my-6">
            {product.colors.map((color, index) => (
              <span key={index} className="w-6 h-6 rounded-full" style={{ backgroundColor: color }}></span>
            ))}
          </div>

          {/* Select Options Button and Action Icons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-[#23A6F0] text-white py-3 px-6 rounded">Select Options</button>
            <div className="flex space-x-4">
              {[Heart, ShoppingCart, Eye].map((Icon, index) => (
                <button key={index} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
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