import React from 'react';

const AboutSeperator = () => {
  return (
    <div className="flex justify-center items-center md:flex-wrap">
      <div className="w-[75%] flex flex-col justify-center md:gap-24 md:flex-wrap items-center text-center md:w-full md:flex-row">
        <div className='mb-16 md:mb-0 md:w-1/3 md:text-left'>
            <p className="text-[#E74040] font-semibold text-sm mb-4">Problems trying</p>
            <h2 className="text-2xl font-bold text-[#252B42] mb-4 md:text-4xl">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            </h2>
        </div>
        <div className='md:w-[35%] text-left'>
            <p className="text-[#737373] font-semibold">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
            </p>   
        </div>

      </div>
    </div>
  );
};

export default AboutSeperator;