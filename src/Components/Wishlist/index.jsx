import React from 'react';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';

const wishlistItems = [
  {
    id: 1,
    name: 'Classic Black T-Shirt',
    price: 799,
    image: '/images/products/tshirt-black.png',
  },
  
];

const Wishlist = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {wishlistItems.length === 0 ? (
        <div className="text-center text-gray-500">Your wishlist is empty 😔</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-zinc-900 shadow-md rounded-xl overflow-hidden transition hover:shadow-xl"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">₹{item.price}</p>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-white hover:text-primary transition ease-in border border-primary flex items-center justify-center gap-1">
                    <FiShoppingCart size={16} /> Move to Cart
                  </button>
                  <button className="flex items-center justify-center p-2 bg-white text-primary hover:bg-primary hover:text-white transition ease-in rounded-lg">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
