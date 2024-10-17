import React from 'react';

const InfoSection = ({ title, items }) => (
  <div className='text-[#737373] text-xs font-bold'>
    <h5 className="font-bold text-lg mb-4 text-[#252B42]">{title}</h5>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

const Info = () => {
  const sections = [
    { title: "Company Info", items: ["About Us", "Carrier", "We are hiring", "Blog"] },
    { title: "Legal", items: ["About Us", "Carrier", "We are hiring", "Blog"] },
    { title: "Features", items: ["Business Marketing", "User Analytic", "Live Chat", "Unlimited Support"] },
    { title: "Resources", items: ["IOS & Android", "Watch a Demo", "Customers", "API"] },
  ];

  return (
    <div className="bg-white py-8 px-4 md:px-64">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0">
        {sections.map((section, index) => (
          <InfoSection key={index} title={section.title} items={section.items} />
        ))}
        
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