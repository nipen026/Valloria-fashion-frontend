import React from 'react';
import bannerGif from '../../assets/uper-banner.gif';

const SaleBanner = () => {
  return (
    <>
      <div className="mb-5">
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide">
          FASHION PIONEER
        </h1>
      </div>

      <div className="w-full py-4 flex justify-center items-center">
        <div className="w-full  px-4">
          <div className="rounded-xl overflow-hidden shadow-md">
            <img
              src={bannerGif}
              alt="Mega Sale Banner"
              className="w-full h-48 sm:h-auto md:h-auto lg:h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SaleBanner;
