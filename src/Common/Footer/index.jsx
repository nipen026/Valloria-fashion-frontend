import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary text-white  py-10 transition-colors">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* About */}
        <div>
          <h4 className="font-semibold text-lg mb-4">About Vigo<span className='text-[#e5ac4d]'>Bee</span></h4>
          <p className="text-sm text-gray-200 ">
            Elevating men's and woman's fashion with premium quality clothing since 2025.
          </p>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
          <ul className="space-y-2 text-sm text-gray-200 ">
            <li><a href="mailto:info@vigobee.com">Contact Us</a></li>
            <li><a href="/returnPolicy">Shipping & Returns</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-200 ">
            <li><a href="/productListing?latest=true">New Arrivals</a></li>
            <li><a href="/productListing?latest=true">Best Sellers</a></li>
            <li><a href="/productListing?latest=true">Sale</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Contact Information</h4>
          <ul className="space-y-3 text-sm text-gray-200 ">
            
            <li className="flex items-center gap-2">
              <FaEnvelope />
              info@vigobee.com
            </li>
            <li className="flex items-center gap-2">
              <FaPhone />
              +91 798449-3957
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-white/20  pt-6 flex flex-col md:flex-row items-center justify-between text-sm px-4">
        <p className="text-gray-300">&copy; 2025 Vigo<span className='text-[#e5ac4d]'>Bee</span>. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0 text-gray-200">
          {/* <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a> */}
          <a href="#"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
