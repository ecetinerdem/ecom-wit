// CallToAction.js
import React from 'react';

const CallToAction = ({ season, title, description, buttonText }) => {
  return (
    <div className="absolute inset-0 flex flex-col flex-wrap items-center justify-center text-center px-4 gap-2 
                    md:items-start md:text-left md:justify-end
                    md:left-[15%] md:bottom-[25%]">
      <p className="text-white text-sm tracking-wide uppercase">{season}</p>
      <h2 className="text-5xl font-bold text-white mt-2 max-w-xs md:max-w-md lg:max-w-lg">{title}</h2>
      <p className="text-white mt-4 max-w-xs md:max-w-sm lg:max-w-md">{description}</p>
      <button className="mt-4 px-8 py-2.5 bg-[#2DC071] text-white font-bold uppercase hover:bg-[#2DC071] transition-all">
        {buttonText}
      </button>
    </div>
  );
};

export default CallToAction;
