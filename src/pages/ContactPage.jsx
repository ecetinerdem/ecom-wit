import React from 'react';

function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center py-8 px-4">
      {/* Content section */}
      <div className="w-full max-w-md">
        {/* Title */}
        <h2 className="text-[#252B42] text-3xl md:text-4xl font-bold mb-4">
          Get answers to all your questions.
        </h2>
        {/* Sub-title */}
        <h4 className="text-[#737373] text-lg md:text-xl font-medium mb-6">
          Problems trying to resolve the conflict between the two major realms of Classical physics:
        </h4>
        {/* Button */}
        <button className="bg-[#23A6F0] text-white py-3 px-8 rounded-sm mb-8 text-lg md:text-xl hover:bg-[#1E90D4]">
          Contact Our Company
        </button>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center space-x-6">
        <i className="fa-brands fa-twitter text-[#BDBDBD] text-3xl md:text-4xl"></i>
        <i className="fa-brands fa-square-facebook text-[#BDBDBD] text-3xl md:text-4xl"></i>
        <i className="fa-brands fa-instagram text-[#BDBDBD] text-3xl md:text-4xl"></i>
        <i className="fa-brands fa-linkedin text-[#BDBDBD] text-3xl md:text-4xl"></i>
      </div>
    </div>
  );
}

export default ContactPage;
