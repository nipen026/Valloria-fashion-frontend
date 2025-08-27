import React from 'react';
import premiumImage from '../../assets/premium.png'; // replace with your actual path

const PremiumCollection = () => {
  return (
    <section className="py-12 bg-secondary  transition-colors">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left Image */}
        <div>
          <img
            src={premiumImage}
            alt="Premium Suit"
            className="w-full h-[600px] object-cover shadow rounded"
          />
        </div>

        {/* Right Content */}
        <div className='px-4 md:px-0'>
          <h2 className="text-2xl md:text-3xl font-semibold text-black  mb-4">
            Premium Collection 2025
          </h2>
          <p className="text-gray-700  mb-6 leading-relaxed">
            Discover our handpicked selection of premium menswear, crafted with
            the finest materials and attention to detail. Elevate your wardrobe
            with timeless pieces that define sophisticated style.
          </p>
          <button className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition">
            Explore Collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default PremiumCollection;
