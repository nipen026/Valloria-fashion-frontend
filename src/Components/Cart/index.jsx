import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa';
import { GET_ALL_CART } from '../../api/get';
import { Link, useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { DELETE_CART } from '../../api/post';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);
  const [shaking, setShaking] = useState(false);
  const [moved, setMoved] = useState(false);
  const shipping = 60; // INR
  const navigate = useNavigate();

  const handleClick = () => {
    setMoved(true);
    setShaking(true);
    setTimeout(() => setShaking(false), 600); // Reset animation after 600ms
  };

  const formatINR = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);

  const fetchCart = async () => {
    try {
      const res = await GET_ALL_CART();
      const data = res.data || [];
      setCartItems(data);

      let subtotalCalc = 0;
      let taxCalc = 0;

      data.forEach((item) => {
        const variant = item.Product?.variants?.[0];
        const price = variant?.salePrice || 0;
        const quantity = item.quantity || 1;
        const taxRate = variant?.taxRate || 0;
        const taxType = variant?.taxType || 'percentage';

        const totalPrice = price * quantity;
        subtotalCalc += totalPrice;

        const taxAmount =
          taxType === 'percentage'
            ? (totalPrice * taxRate) / 100
            : taxRate * quantity;

        taxCalc += taxAmount;
      });

      setSubtotal(subtotalCalc);
      setTaxTotal(taxCalc);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const deleteCart = async (id) => {
    try {
      await DELETE_CART(id);
      const res = await GET_ALL_CART();
      const updatedCart = res.data || [];
      setCartItems(updatedCart);

      if (updatedCart.length === 0) {
        navigate('/');
      } else {
        fetchCart(); // refresh calculations
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const total = subtotal + shipping + taxTotal;
  return (

    <div className="bg-secondary dark:bg-black text-black dark:text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Left: Cart Items */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-6">
            Your Shopping Cart ({cartItems.length} items)
          </h2>
          <div className="space-y-6">
            {cartItems.map((item) => {
              const product = item.Product;
              const variant = product?.variants?.[0];
              const image = variant?.images?.[0];
              const price = variant?.salePrice || 0;

              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b pb-6 dark:border-gray-700"
                >
                  <img
                    src={image}
                    alt={product?.productName}
                    className="w-24 h-24 object-cover rounded shadow"
                  />
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-base">{product?.productName}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="inline-block w-4 h-4 rounded-full mr-1" style={{ backgroundColor: variant?.color }}></span>

                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Size: {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteCart(item.id)}
                        className="text-gray-500 hover:text-red-500 transition"
                      >
                        <IoClose className="text-xl" />
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center justify-between mt-3 gap-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <select
                          className="border rounded px-3 py-1 dark:bg-black dark:border-white"
                          defaultValue={item.quantity}
                        >
                          {[1, 2, 3, 4].map((q) => (
                            <option key={q}>{q}</option>
                          ))}
                        </select>
                        <button
                          onClick={handleClick}
                          className={`flex items-center gap-1 text-sm font-medium transition ${moved ? 'text-red-500' : 'text-primary'
                            } ${shaking ? 'animate-pulse' : ''}`}
                        >
                          {moved ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                          Move To Wishlist
                        </button>
                      </div>
                      <p className="font-semibold text-right">{formatINR(price)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-md sticky top-6 h-fit">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span>{formatINR(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax</span>
              <span>{formatINR(taxTotal)}</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-base dark:border-gray-700">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>
          </div>
          <Link to="/shipping">
            <button className="mt-6 w-full bg-primary text-white py-2 rounded hover:bg-opacity-90 transition">
              Proceed to Checkout
            </button>
          </Link>
          <Link to="/">
            <button className="mt-3 w-full border border-black dark:border-white py-2 rounded text-sm hover:bg-gray-100 dark:hover:bg-zinc-800 transition">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>

  );
};

export default Cart;
