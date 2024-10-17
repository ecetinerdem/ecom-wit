import React from 'react';

const Info = () => {
  return (
    <div className="bg-white py-8 px-4 md:px-64">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0">
        {/* Company Info */}
        <div className='text-[#737373] text-xs font-bold'>
          <h5 className="font-bold text-lg mb-4 text-[#252B42]">Company Info</h5>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Carrier</li>
            <li>We are hiring</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* Legal */}
        <div className='text-[#737373] text-xs font-bold'>
          <h5 className="font-bold text-lg mb-4 text-[#252B42]">Legal</h5>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Carrier</li>
            <li>We are hiring</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* Features */}
        <div className='text-[#737373] text-xs font-bold'>
          <h5 className="font-bold text-lg mb-4 text-[#252B42]">Features</h5>
          <ul className="space-y-2">
            <li>Business Marketing</li>
            <li>User Analytic</li>
            <li>Live Chat</li>
            <li>Unlimited Support</li>
          </ul>
        </div>

        {/* Resources */}
        <div className='text-[#737373] text-xs font-bold'>
          <h5 className="font-bold text-lg mb-4 text-[#252B42]">Resources</h5>
          <ul className="space-y-2">
            <li>IOS & Android</li>
            <li>Watch a Demo</li>
            <li>Customers</li>
            <li>API</li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div>
          <h5 className="font-bold text-lg mb-4 text-[#252B42]">Get In Touch</h5>
          <form className="flex">
            <input
              type="email"
              placeholder="Your Email"
              className="border p-2 rounded-l-sm flex-grow focus:border-[#737373] focus:outline-none"
            />
            <button className="bg-[#23A6F0] text-white px-4 rounded-r-sm">
              Subscribe
            </button>
          </form>
          <p className="text-xs mt-2 text-[#737373]">Lore imp sum dolor Amit</p>
        </div>
      </div>
    </div>
  );
};

export default Info;
