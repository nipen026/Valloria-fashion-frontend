import React from 'react';
import { FaCheckCircle, FaBox, FaTruck, FaMapMarkerAlt, FaClock, FaEnvelope, FaQuestion } from 'react-icons/fa';
import  new_1 from '../../assets/new-1.png' 
import  new_2 from '../../assets/new-2.png' 
const TrackOrder = () => {
  return (
    <div className=" bg-secondary dark:bg-black text-black dark:text-white px-4 py-10">
      <h1 className="text-2xl font-bold text-center mb-10">Track Your Order</h1>

      {/* Status Progress */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 max-w-5xl mx-auto mb-10">
        <div className="grid grid-cols-4 text-center text-sm font-medium text-gray-600 dark:text-gray-300 mb-4">
          <div className="flex flex-col items-center text-primary">
            <FaCheckCircle size={22} />
            <p>Order Confirmed</p>
            <span className="text-xs font-normal">Order #VV78945612</span>
          </div>
          <div className="flex flex-col items-center text-primary">
            <FaBox size={22} />
            <p>Processing</p>
            <span className="text-xs font-normal">Preparing your order</span>
          </div>
          <div className="flex flex-col items-center text-gray-400">
            <FaTruck size={22} />
            <p>Shipped</p>
            <span className="text-xs font-normal">On the way</span>
          </div>
          <div className="flex flex-col items-center text-gray-400">
            <FaCheckCircle size={22} />
            <p>Delivered</p>
            <span className="text-xs font-normal">Package received</span>
          </div>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-1/2 transition-all duration-700" />
        </div>

        {/* Order Info Sections */}
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          {/* Order Details */}
          <div>
            <h4 className="font-semibold mb-3">Order Details</h4>
            <div className="flex items-center gap-4">
              <img src={new_1} alt="product" className="w-20 h-20 object-cover" />
              <div>
                <h5 className="font-medium">Classic Green Polo Shirt</h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">Size: L | Qty: 1</p>
                <p className="font-semibold text-primary mt-1">$59.99</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <p className="mb-1">Order Date: <span className="font-medium text-black dark:text-white">July 10, 2025</span></p>
              <p>Expected Delivery: <span className="font-medium text-black dark:text-white">July 15, 2025</span></p>
            </div>
          </div>

          {/* Delivery Info */}
          <div>
            <h4 className="font-semibold mb-3">Delivery Information</h4>
            <div className="text-sm space-y-3 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
                <span>123 Fashion Street, Style Avenue, New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock />
                <span>Estimated Time: 3-5 Business Days</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope />
                <span>Updates Sent To: customer@example.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="max-w-5xl mx-auto bg-gray-100 dark:bg-zinc-800 p-6 rounded-lg shadow text-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p className="font-medium text-black dark:text-white flex items-center gap-2 mb-1">Need Help <FaQuestion className='text-red-500' /> </p>
          <p className="text-gray-600 dark:text-gray-400">Our customer service team is here to assist you with any questions.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">Contact Support</button>
          <button className="border px-4 py-2 rounded text-black dark:text-white dark:border-white">View FAQs</button>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
