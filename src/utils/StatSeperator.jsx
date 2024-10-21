import React from 'react';

const StatItem = ({ value, label }) => (
  <div className="text-center mb-8 md:mb-0">
    <h1 className="text-7xl font-bold text-[#252B42] mb-2">{value}</h1>
    <p className="text-[#737373] font-semibold">{label}</p>
  </div>
);

const StatsSeperator = () => {
  return (
    <div className="px-4 py-12 mt-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatItem value="15K" label="Happy Customers" />
          <StatItem value="150K" label="Monthly Visitors" />
          <StatItem value="15" label="Countries Worldwide" />
          <StatItem value="100+" label="Top Partners" />
        </div>
      </div>
    </div>
  );
};

export default StatsSeperator;