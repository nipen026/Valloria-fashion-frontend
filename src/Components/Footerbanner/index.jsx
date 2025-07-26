import React from 'react';
import bannerGif from '../../assets/footer-banner.png';

const FooterBanner = () => {
  return (
    <>
    

      <div className="w-full flex justify-center items-center">
        <div className="w-full">
          <div className="overflow-hidden shadow-md">
            <img
              src={bannerGif}
              alt="Mega Sale Banner"
              className="w-full h-auto sm:h-auto md:h-96 lg:h-auto md:object-cover object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterBanner;
