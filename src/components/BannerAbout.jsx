import React from 'react'
import bannerAboutImage from '../assets/images/bannerAboutImage.png'

function BannerAbout() {
    return (
      <div className="flex flex-col lg:flex-row items-center md:items-start justify-center md:pl-24 py-16 lg:py-16 bg-white">
        {/* Text and Button Area */}
        <div className="flex flex-col items-center md:items-start gap-4 md:gap-6 md:mt-24">
          <h5 className="text-sm md:text-base text-[#252B42] font-bold">ABOUT COMPANY</h5>
          <h1 className=" text-4xl md:text-6xl text-[#252B42] font-bold md:mt-8">ABOUT US</h1>
          <h4 className="text-xl text-[#737373] font-semibold w-2/3 md:w-7/12 text-center md:text-left mt-6">
            We know how large objects will act, but things on a small scale
          </h4>
          <button className="bg-[#23A6F0] text-white py-3 px-6 rounded-sm hover:bg-[#1c8ed9] transition mt-6">
            Get Quote Now
          </button>
        </div>
  
        {/* Image Area */}
        <div className="mt-8 md:mt-0  flex justify-center ">
          <img
            src={bannerAboutImage}
            alt="Banner"
            className="max-w-full h-auto object-contain"
          />
        </div>
      </div>
    );
  }
  
  export default BannerAbout;