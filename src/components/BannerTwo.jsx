import React from 'react';
import products from '../data/productsData'; // Import your product data

const BannerTwo = () => {
  // Assuming you want to display the first product's image
  const product = products[0]; // Example: Get the first product data

  return (
    <main className="flex flex-col w-full p-4 md:pt-8 bg-[#FFFFFF] md:mb-28">
      {/* Div A - Text Section */}
      <div className="flex flex-row justify-center gap-4 md:gap-8 items-center mb-4 text-[#737373]">
        <h6 className="text-xs md:text-md font-semibold md:font-bold mb-2 md:mb-0">Description</h6>
        <h6 className="text-xs md:text-md font-semibold md:font-bold mb-2 md:mb-0">Additional Information</h6>
        <h6 className="text-xs md:text-md font-semibold md:font-bold mb-2 md:mb-0">Reviews (0)</h6>
      </div>

      {/* Separator */}
      <div className="w-4/5 h-px bg-gray-300 mb-4 mx-auto"></div>

      {/* Div B - Content Section */}
      <div className="flex flex-col md:flex-row justify-center gap-x-4">
        {/* Div Blue - Image */}
        <div className="w-full flex justify-center md:justify-end md:w-1/3 mb-4 md:mb-0">
          <div className="w-[90%] md:w-2/3 md:mb-0 flex items-center md:py-16">
            <img 
              src={product.imageUrl} // Use product image dynamically
              alt={product.title} // Alt text from product title
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Div Red - First Text Block */}
        <div className="w-full md:w-1/3 mb-4 md:mb-0 md:px-4 flex justify-center">
            <div className="w-[90%] flex flex-col justify-center items-center  md:w-4/5 mb-4 md:mb-0 md:px-4">
            <h3 className="text-xl text-[#252B42] font-bold mb-2 md:pr-8">the quick fox jumps over</h3>
            <p className="text-sm font-semibold text-[#737373] mb-4">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official
                consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
            </p>
            <p className="text-sm font-semibold text-[#737373] mb-4">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official
                consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
            </p>
            <p className="text-sm font-semibold text-[#737373]">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official
                consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
            </p>
            </div>
        </div>

        {/* Div Yellow - Second Text Block */}
        <div className="w-full md:w-1/3 flex justify-center mr-12">
            <div className="w-[90%]  flex flex-col justify-center items-center md:w-2/3">
            <h3 className="text-xl text-[#252B42] font-bold mb-2">the quick fox jumps over</h3>
            <ul className="space-y-2">
                <li className="flex items-center">
                <span className="mr-4 text-xl ">{'>'}</span>
                <p className="text-sm font-bold text-[#737373]">the quick fox jumps over the lazy dog</p>
                </li>
                <li className="flex items-center">
                <span className="mr-4 text-xl">{'>'}</span>
                <p className="text-sm font-bold text-[#737373]">the quick fox jumps over the lazy dog</p>
                </li>
                <li className="flex items-center">
                <span className="mr-4 text-xl">{'>'}</span>
                <p className="text-sm font-bold text-[#737373]">the quick fox jumps over the lazy dog</p>
                </li>
                <li className="flex items-center">
                <span className="mr-4 text-xl">{'>'}</span>
                <p className="text-sm font-bold text-[#737373]">the quick fox jumps over the lazy dog</p>
                </li>
            </ul>
            <h3 className="text-xl text-[#252B42] font-bold mt-4 mb-2">the quick fox jumps over</h3>
            <ul className="space-y-2">
                <li className="flex items-center">
                <span className="mr-4 text-xl">{'>'}</span>
                <p className="text-sm font-bold text-[#737373]">the quick fox jumps over the lazy dog</p>
                </li>
                <li className="flex items-center">
                <span className="mr-4 text-xl">{'>'}</span>
                <p className="text-sm font-bold text-[#737373]">the quick fox jumps over the lazy dog</p>
                </li>
                <li className="flex items-center">
                <span className="mr-4 text-xl">{'>'}</span>
                <p className="text-sm font-bold text-[#737373]">the quick fox jumps over the lazy dog</p>
                </li>
            </ul>
            </div>
        </div>
      </div>
    </main>
  );
};

export default BannerTwo;
