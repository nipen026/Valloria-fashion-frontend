import React from 'react';
import bannerVideo from '../../assets/banner.mp4';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();
  return (
    <section className="relative h-[calc(100vh-130px)] w-full overflow-hidden" aria-label="Vigo bee Banner">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={bannerVideo}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10 flex items-center">
        {/* Text Section */}
        <div className="container text-center mx-auto px-4 text-white max-w-4xl z-20">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold mb-4">
            <span className="text-center md:hidden inline-block animate-typing whitespace-nowrap overflow-hidden ">VigoBee</span>
            <span className="hidden md:inline-block animate-typing  whitespace-nowrap overflow-hidden ">VigoBee – Elevate Your Style</span>
          </h1>

          <p className="mb-6 text-xl font-light">
            Explore the finest in men’s and women’s fashion with VigoBee's exclusive seasonal collections. From timeless basics to bold new arrivals — we redefine modern fashion.
          </p>

          {/* <h2 className="text-2xl font-semibold mt-8 mb-2">Why Choose Velloria?</h2> */}
          {/* <ul className="mb-6 text-base leading-relaxed list-disc list-inside">
            <li>Premium handpicked fabrics</li>
            <li>Exclusive designer collections</li>
            <li>Free shipping & easy returns</li>
            <li>Fashion for every occasion</li>
          </ul> */}

          <button onClick={() => navigate('/productListing?latest=true')} className="border border-white font-semibold px-6 py-2 text-white hover:bg-white hover:text-primary ease-in transition">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
