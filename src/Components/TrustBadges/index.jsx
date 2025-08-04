import React from 'react';
import { FaShippingFast, FaStar, FaCheckCircle, FaCreditCard } from 'react-icons/fa';

const TrustBadges = () => {
  const badges = [
    {
      icon: <FaShippingFast size={24} className="text-primary" />,
      title: 'Free Shipping',
      subtitle: 'On orders over ₹1000',
    },
    {
      icon: <FaStar size={24} className="text-primary" />,
      title: 'Premium Quality',
      subtitle: 'Guaranteed products',
    },
    {
      icon: <FaCheckCircle size={24} className="text-primary" />,
      title: 'No Returns',
      subtitle: '30-day Replacement Policy',
    },
    {
      icon: <FaCreditCard size={24} className="text-primary" />,
      title: 'Secure Payment',
      subtitle: 'Protected by SSL',
    },
  ];

  return (
    <div className=" bg-gray-100 ">
      <div className='container mx-auto py-8 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
        {badges.map((badge, idx) => (
          <div key={idx} className="flex items-start gap-3" data-aos="fade-left"
            data-aos-delay={idx * 100}>
            {badge.icon}
            <div>
              <p className="text-sm font-semibold text-gray-900">{badge.title}</p>
              <p className="text-sm text-gray-500">{badge.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBadges;
