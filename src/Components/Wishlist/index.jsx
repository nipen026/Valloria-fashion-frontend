import React, { useEffect, useState } from 'react';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { GET_WISHLIST } from '../../api/get';
import wishlistImage from '../../assets/wishlisht.jpg'
import { DELETE_WISHLIST } from '../../api/post';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    getWishList()
  }, []);

  const getWishList = () => {
    GET_WISHLIST()
      .then((res) => {
        if (res?.data?.success) {
          const formatted = res.data.wishlist.map((item) => {
            const variant = item.product?.variants?.[0]; // Use first variant if available
            return {
              id: item.productId,
              name: item.product?.productName || 'Unnamed Product',
              price: variant?.salePrice || 0,
              image: variant?.images?.[0] || '/images/placeholder.png',
              size: variant?.size || [],
              color: variant?.color || '',
            };
          });
          setWishlistItems(formatted);
        }
      })
      .catch((err) => {
        console.log('❌ Failed to fetch wishlist:', err);
      });
  }

  const handleRemoveWishList = (id) =>{
    DELETE_WISHLIST(id).then((res)=>{
      console.log(res);
      getWishList()
    }).catch((err)=>{
      console.log(err);
    })
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {wishlistItems.length === 0 ? (
        <div className="text-center text-gray-500"><img src={wishlistImage} className='w-full h-[500px] object-contain'/></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white  shadow-md rounded-xl overflow-hidden transition hover:shadow-xl"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-contain"
              />
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600 ">₹{item.price}</p>

                {/* Color */}
                <div
                  className="flex items-center gap-2"
                  onClick={() => navigate(`productDetails/${item.productId}`)}
                >
                  <div
                    className="w-5 h-5 rounded-full border"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-xs text-gray-500">Color</span>
                </div>

                {/* Sizes */}
                <div className="flex flex-wrap gap-2">
                  {item.size.map((sz) => (
                    <span
                      key={sz}
                      className="px-2 py-1 border text-xs rounded text-gray-600 "
                    >
                      {sz}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mt-3">
                  <button  onClick={() => navigate(`/productDetails/${item.id}`)} className="flex-1 bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-white hover:text-primary transition ease-in border border-primary flex items-center justify-center gap-1">
                    <FiShoppingCart size={16} /> Move to Cart
                  </button>
                  <button className="flex items-center justify-center p-2 bg-white text-primary hover:bg-primary hover:text-white transition ease-in rounded-lg" onClick={()=>handleRemoveWishList(item.id)}>
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
