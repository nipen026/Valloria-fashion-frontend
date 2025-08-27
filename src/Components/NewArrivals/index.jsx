import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GET_PRODUCT } from '../../api/get';
import { FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ADD_WISHLIST } from '../../api/post';
import { toast } from 'react-toastify';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [isWished, setIsWished] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await GET_PRODUCT();
        setProducts(res.data.products || []);
      } catch (err) {
        console.error('Failed to load products:', err);
      }
    };
    fetchProducts();
  }, []);

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
    <section className="py-10 bg-[#F9FAFB]  transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-black ">
            New Arrivals
          </h2>
          <div
            className="cursor-pointer group"
            onClick={() => navigate('/productListing?latest=true')}
          >
            <p className="flex items-center gap-2 text-black  font-medium">
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                View More
              </span>
              <FaChevronRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => {
            const variant = product.variants?.[0];
            if (!variant) return null;

            return (
              <div
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                key={variant.id}
                className="group relative bg-white  rounded-xl shadow-md hover:shadow-lg overflow-hidden transition-all"
              >
                {/* Wishlist Icon */}
                <div className="absolute top-[-40px] left-4 group-hover:top-4 transition-all duration-300 z-10">
                  <button
                    className={`bg-white p-1 md:p-2 rounded-full shadow hover:scale-105 transition-transform ${shake ? "animate-shake" : ""
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
                  onClick={() => navigate(`productDetails/${product.id}`)}
                  src={variant.images?.[0]}
                  alt={product.productName}
                  className="w-full h-58 sm:h-72 md:h-80 md:object-cover object-contain cursor-pointer transition-transform group-hover:scale-105"
                />

                <div className="p-4 space-y-2">
                  {/* Product Name */}
                  <h3
                    className="text-lg font-semibold text-black  cursor-pointer"
                    onClick={() => navigate(`productDetails/${product.id}`)}
                  >
                    {product.productName}
                  </h3>

                  {/* Price */}
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


                  {/* Color */}
                  <div
                    className="flex items-center gap-2 mb-4"
                    onClick={() => navigate(`productDetails/${product.id}`)}
                  >
                    <div
                      className="w-5 h-5 rounded-full border"
                      style={{ backgroundColor: variant.color }}
                    ></div>
                    <span className="text-xs text-gray-500">Color</span>
                  </div>

                  {/* Sizes */}
                  {/* <div className="flex flex-wrap gap-2">
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
                  <button
                    onClick={() => navigate(`productDetails/${product.id}`)}
                    className="w-full border border-primary font-semibold text-primary py-2 rounded hover:bg-primary hover:text-white transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
