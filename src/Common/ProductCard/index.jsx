// import React from 'react';
// import { CiHeart } from 'react-icons/ci';
// import { FaHeart, FaRegHeart } from 'react-icons/fa';

// const ProductCard = ({ product }) => {
//   return (
//     <div className="relative group bg-white dark:bg-zinc-900 rounded shadow hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">

//       {/* Wishlist Icon (Slide on Hover) */}
//       <button
//         className="absolute top-4 left-4 -translate-x-6 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10 bg-white dark:bg-zinc-800 p-2 rounded-full shadow-md"
//         aria-label="Add to wishlist"
//       >
//         <FaRegHeart className="text-primary dark:text-white hover:text-primary" />
//       </button>

//       {/* Product Image */}
//       <img
//         src={product.image}
//         alt={product.name}
//         className="w-full h-64 object-cover rounded"
//       />

//       {/* Product Details */}
//       <div className="mt-2 p-4 space-y-1">
//         <h4 className="font-medium text-sm dark:text-white">{product.name}</h4>
//         <p className="text-xs text-gray-500 dark:text-gray-400">{product.color}</p>
//         <p className="text-primary font-bold text-sm">${product.price}</p>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ADD_WISHLIST } from '../../api/post';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const variant = product.variants?.[0] || {};
  const [isWished, setIsWished] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate()
  const handleAddWishList = (product) => {
    const bodyData = {
      productId: product?.id,
    };
    ADD_WISHLIST(bodyData)
      .then((res) => {
        toast("Added In Wishlist");
        setIsWished(true);
        setShake(true);
        setTimeout(() => setShake(false), 500); // reset shake after animation
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };
  return (
    <div
      key={variant.id}

      className="group relative  rounded-lg shadow overflow-hidden transition"
    >
      {/* Wishlist Icon */}
      <div className="absolute top-[-40px] left-4 group-hover:top-4 transition-all duration-300 z-10">
        <button
          className={`bg-white p-2 rounded-full shadow hover:scale-105 transition-transform ${shake ? "animate-shake" : ""
            }`}
          onClick={() => handleAddWishList(product)}
        >
          {isWished ? (
            <FaHeart size={18} className="text-red-500" />
          ) : (
            <FaRegHeart size={18} className="text-red-500" />
          )}
        </button>
      </div>

      {/* Product Image */}
      <img
        onClick={() => navigate(`/productDetails/${product.id}`)}
        src={variant.images?.[0]}
        alt={product.productName}
        className="w-full md:h-[400px] h-[200px] object-cover"
      />

      <div className="p-4 space-y-2" >
        <h3 className="text-lg font-semibold text-black " onClick={() => navigate(`/productDetails/${product.id}`)}>
          {product.productName}
        </h3>

        <div
  className="flex flex-wrap items-center md:gap-4 gap-2 mb-3 cursor-pointer"
  onClick={() => navigate(`/productDetails/${product.id}`)}
>
  {/* Sale Price */}
  <span className="text-green-600  text-lg font-bold">
    ₹ {variant.salePrice}
  </span>

  {/* MRP (strikethrough) */}
  <span className="text-gray-500  line-through text-sm">
    ₹ {variant.mrp}
  </span>

  {/* Discount Badge */}
  <span className="bg-red-100 text-red-600  px-2 py-0.5 rounded-full text-xs font-semibold">
    {Math.round(((variant.mrp - variant.salePrice) / variant.mrp) * 100)}% OFF
  </span>
</div>



        {/* Colors */}
        {/* <div className="items-center gap-2 mb-2" onClick={() => navigate(`/productDetails/${product.id}`)}>
          <p className="text-xs text-gray-500">Color</p>

          <div
            className="w-5 h-5 mt-1 flex flex-wrap items-center rounded-full border"
            style={{ backgroundColor: variant.color }}
          ></div>
        </div> */}

        {/* Sizes */}
        {/* <div className="flex flex-wrap gap-2 mb-4">
          {variant.size.map((sz) => (
            <span
              key={sz}
              className="px-2 py-1 border text-xs rounded text-gray-600 dark:text-gray-300"
            >
              {sz}
            </span>
          ))}
        </div> */}

        {/* Add to Cart */}

      </div>
    </div>
  );
};

export default ProductCard;
