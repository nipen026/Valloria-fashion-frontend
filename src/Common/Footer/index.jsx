import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary text-white dark:bg-black dark:text-white py-10 transition-colors">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* About */}
        <div>
          <h4 className="font-semibold text-lg mb-4">About Vogue Vastra</h4>
          <p className="text-sm text-gray-200 dark:text-gray-400">
            Elevating men's fashion with premium quality clothing and accessories since 2010.
          </p>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
          <ul className="space-y-2 text-sm text-gray-200 dark:text-gray-400">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Size Guide</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-200 dark:text-gray-400">
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Best Sellers</a></li>
            <li><a href="#">Sale</a></li>
            <li><a href="#">Gift Cards</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Contact Information</h4>
          <ul className="space-y-3 text-sm text-gray-200 dark:text-gray-400">
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1" />
              123 Fashion Street, New York, NY 10001
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope />
              contact@voguevastra.com
            </li>
            <li className="flex items-center gap-2">
              <FaPhone />
              +1 (555) 123-4567
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-white/20 dark:border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm px-4">
        <p className="text-gray-300">&copy; 2024 Vogue Vastra. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0 text-gray-200">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
