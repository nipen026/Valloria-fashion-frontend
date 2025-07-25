
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaCcPaypal, FaCheckCircle, FaCreditCard, FaLock, FaTruck } from 'react-icons/fa';
// import { IoMdCart } from 'react-icons/io';
// import { SiAmericanexpress, SiMastercard, SiVisa } from 'react-icons/si';
// import { GET_ALL_CART } from '../../api/get';
// import { toast } from 'react-toastify';
// const base_url = import.meta.env.VITE_BASE_URL;
// const Shipping = () => {
//   const [orderItems, setOrderItems] = useState([]);
//   const [formData, setFormData] = useState({
//     firstName: '', lastName: '', address: '', city: '', state: '', zip: '', phone: ''
//   });
//   const [errors, setErrors] = useState({});

//   const shipping = 12.0;
//   const tax = 38.99;
//   const currencyFormatter = new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//     minimumFractionDigits: 2,
//   });

//   const handleRazorpayPayment = async () => {
//     if (!validateForm()) return;

//     const token = localStorage.getItem('access-token');
//     try {
//       const { data } = await axios.post(
//         `${base_url}payment/create-order`,
//         { amount: parseInt(Math.round(total).toFixed(0)) },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: data.order.amount,
//         currency: 'INR',
//         name: 'Valloria Fashion',
//         description: 'Order Payment',
//         order_id: data.order.id,
//         handler: async function (response) {
//           const verifyRes = await axios.post(
//             `${base_url}payment/verify`,
//             {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               orderId: data.order.receipt, // optional: match your db order
//             },
//             { headers: { Authorization: `Bearer ${token}` } }
//           );

//           if (verifyRes.data.success) {
//             toast.success('Payment successful!');
//           } else {
//             toast.error('Payment verification failed.');
//           }
//         },
//         prefill: {
//           name: formData.firstName + ' ' + formData.lastName,
//           email: 'customer@example.com',
//           contact: formData.phone,
//         },
//         theme: {
//           color: '#0a4b3c',
//         },
//       };

//       const razor = new window.Razorpay(options);
//       razor.open();
//     } catch (err) {
//       console.error('Payment error:', err);
//       alert('Failed to initiate payment.');
//     }
//   };


//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const res = await GET_ALL_CART();
//         console.log(res.data, "res");

//         setOrderItems(res.data || []);
//       } catch (err) {
//         console.error('Error fetching cart items:', err);
//       }
//     };
//     fetchCart();
//   }, []);

//   const subtotal = orderItems.reduce((acc, item) => {
//     const matchedVariant = item.Product?.variants?.find(
//       v => v.color === item.color && v.size?.includes(item.size)
//     );
//     const price = matchedVariant?.salePrice || 0;
//     return acc + price * item.quantity;
//   }, 0);
//   const total = subtotal + shipping + tax;

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: '' });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.firstName) newErrors.firstName = 'First Name is required';
//     if (!formData.lastName) newErrors.lastName = 'Last Name is required';
//     if (!formData.address) newErrors.address = 'Address is required';
//     if (!formData.city) newErrors.city = 'City is required';
//     if (!formData.state) newErrors.state = 'State is required';
//     if (!formData.zip) newErrors.zip = 'ZIP Code is required';
//     if (!formData.phone) newErrors.phone = 'Phone Number is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handlePlaceOrder = () => {
//     if (!validateForm()) return;
//     // Place order logic here...
//     if (formData.paymentMethod === 'card') {
//       handleRazorpayPayment();
//     } else {
//       console.log('Place order with:', formData);
//       // handle COD or PayPal logic
//     }
//   };

//   return (
//     <div className="min-h-auto bg-secondary dark:bg-black text-black dark:text-white">
//       {/* Progress bar */}
//       <div className="flex items-center bg-[#E8F3F1] justify-center gap-8 mb-10 py-5">
//         <div className="text-gray-400 flex items-center gap-4"><IoMdCart /> Cart</div>
//         <div className="w-48 h-px bg-gray-300 dark:bg-gray-600" />
//         <div className="text-primary font-semibold flex items-center gap-4"><FaTruck /> Shipping</div>
//         <div className="w-48 h-px bg-gray-300 dark:bg-gray-600" />
//         <div className="text-gray-400 flex items-center gap-4"><FaCreditCard /> Payment</div>
//         <div className="w-48 h-px bg-gray-300 dark:bg-gray-600" />
//         <div className="text-gray-400 flex items-center gap-4"><FaCheckCircle /> Confirmation</div>
//       </div>

//       <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-10">
//         {/* Shipping form */}
//         <div className='md:col-span-2'>
//           <div className="md:col-span-2">
//             <h2 className="text-2xl font-bold mb-6 text-primary">Shipping Details</h2>
//             <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {[
//                 { name: 'firstName', placeholder: 'First Name' },
//                 { name: 'lastName', placeholder: 'Last Name' },
//                 { name: 'address', placeholder: 'Street Address', full: true },
//                 { name: 'city', placeholder: 'City' },
//                 { name: 'state', placeholder: 'State/Province' },
//                 { name: 'zip', placeholder: 'ZIP/Postal Code' },
//                 { name: 'phone', placeholder: 'Phone Number' }
//               ].map(({ name, placeholder, full }) => (
//                 <div key={name} className={full ? 'col-span-2' : ''}>
//                   <input
//                     type="text"
//                     name={name}
//                     placeholder={placeholder}
//                     value={formData[name]}
//                     onChange={handleChange}
//                     className="border-2 border-primary rounded px-4 py-2 w-full bg-white dark:bg-black"
//                   />
//                   {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
//                 </div>
//               ))}

//               <div className="col-span-2 flex items-center gap-2 mt-2">
//                 <input type="checkbox" id="save" className="accent-primary w-4 h-4" />
//                 <label htmlFor="save" className="text-sm">Save this address for future orders</label>
//               </div>
//             </form>
//           </div>
//           <div className="mt-8">
//             <h3 className="text-xl font-semibold mb-3 text-primary">Select Payment Method</h3>
//             <div className="flex flex-wrap gap-4">
//               {[
//                 { id: 'card', label: 'Credit/Debit Card', icon: <FaCreditCard className="mr-2" /> },
//                 { id: 'paypal', label: 'PayPal', icon: <FaCcPaypal className="mr-2" /> },
//                 { id: 'cod', label: 'Cash on Delivery', icon: <FaTruck className="mr-2" /> },
//               ].map(({ id, label, icon }) => {
//                 const isSelected = formData.paymentMethod === id;
//                 return (
//                   <label
//                     key={id}
//                     htmlFor={id}
//                     className={`flex items-center cursor-pointer border rounded px-4 py-2 transition w-full md:w-auto
//                      ${isSelected ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-primary dark:bg-zinc-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700'}`}
//                   >
//                     <input
//                       type="radio"
//                       id={id}
//                       name="paymentMethod"
//                       value={id}
//                       className="hidden"
//                       onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
//                       checked={isSelected}
//                     />
//                     <span className="flex items-center text-sm">
//                       {icon}
//                       {label}
//                     </span>
//                   </label>
//                 );
//               })}
//             </div>

//           </div>
//         </div>
//         {/* Order Summary */}
//         <div className="bg-gray-100 dark:bg-zinc-900 rounded p-6 shadow-md">
//           <h3 className="text-lg font-semibold mb-4 text-primary">Order Summary</h3>
//           <div className="space-y-4 text-sm">
//             {orderItems.map((item, i) => (
//               <div key={i} className="flex items-center gap-4">
//                 {(() => {
//                   const matchedVariant = item.Product?.variants?.find(
//                     v => v.color === item.color && v.size?.includes(item.size)
//                   );
//                   const image = matchedVariant?.images?.[0] || '';
//                   const price = matchedVariant?.salePrice || 0;

//                   return (
//                     <>
//                       <img src={image} alt={item.Product?.productName} className="w-16 h-16 object-cover rounded" />
//                       <div className="flex-1">
//                         <h4 className="font-medium">{item.Product?.productName}</h4>
//                         <p className="text-xs text-gray-600 dark:text-gray-400">Size: {item.size}</p>
//                         <div className="flex items-center gap-2">
//                           <span className="text-xs text-gray-600 dark:text-gray-400">Color:</span>
//                           <div
//                             className="w-4 h-4 rounded-full border border-gray-300"
//                             style={{ backgroundColor: item.color }}
//                           />
//                         </div>
//                         <p className="text-xs">Qty: {item.quantity}</p>
//                       </div>
//                       <p className="font-semibold">{currencyFormatter.format((price * item.quantity).toFixed(2))}</p>
//                     </>
//                   );
//                 })()}
//               </div>
//             ))}

//             <hr className="border-gray-300 dark:border-gray-600" />
//             <div className="flex justify-between"><span>Subtotal</span><span>{currencyFormatter.format(subtotal)}</span></div>
//             <div className="flex justify-between"><span>Shipping</span><span>{currencyFormatter.format(shipping)}</span></div>
//             <div className="flex justify-between"><span>Tax</span><span>{currencyFormatter.format(tax)}</span></div>
//             <div className="flex justify-between font-bold text-lg mt-2">
//               <span>Total</span>
//               <span className="text-primary">{currencyFormatter.format(total)}</span>
//             </div>
//           </div>

//           <button onClick={handlePlaceOrder} className="mt-6 w-full bg-primary text-white py-2 rounded hover:bg-opacity-90 transition">
//             Place Order
//           </button>

//           <div className="mt-3 flex items-center gap-2 justify-center text-center text-xs text-gray-500 dark:text-gray-400">
//             <FaLock /> Secure Checkout
//           </div>

//           <div className="flex text-lg text-gray-700 justify-center gap-2 mt-2">
//             <SiVisa className='text-2xl' />
//             <SiMastercard className='text-2xl' />
//             <SiAmericanexpress className='text-2xl' />
//             <FaCcPaypal className='text-2xl' />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shipping;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCcPaypal, FaCheckCircle, FaCreditCard, FaLock, FaTruck } from 'react-icons/fa';
import { IoMdCart } from 'react-icons/io';
import { SiAmericanexpress, SiMastercard, SiVisa } from 'react-icons/si';
import { GET_ALL_CART } from '../../api/get';
import { toast } from 'react-toastify';
const base_url = import.meta.env.VITE_BASE_URL;

const Shipping = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', address: '', city: '', state: '', zip: '', phone: '', paymentMethod: ''
  });
  const [errors, setErrors] = useState({});

  const shipping = 12.0;
  const tax = 38.99;
  const currencyFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  });

  const handleRazorpayPayment = async () => {
    if (!validateForm()) return;

    const token = localStorage.getItem('access-token');
    try {
      const { data } = await axios.post(
        `${base_url}payment/create-order`,
        { amount: parseInt(Math.round(total).toFixed(0)) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: 'INR',
        name: 'Valloria Fashion',
        description: 'Order Payment',
        order_id: data.order.id,
        handler: async function (response) {
          const verifyRes = await axios.post(
            `${base_url}payment/verify`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: data.order.receipt,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (verifyRes.data.success) toast.success('Payment successful!');
          else toast.error('Payment verification failed.');
        },
        prefill: {
          name: formData.firstName + ' ' + formData.lastName,
          email: 'customer@example.com',
          contact: formData.phone,
        },
        theme: { color: '#0a4b3c' },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error('Payment error:', err);
      alert('Failed to initiate payment.');
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await GET_ALL_CART();
        setOrderItems(res.data || []);
      } catch (err) {
        console.error('Error fetching cart items:', err);
      }
    };
    fetchCart();
  }, []);

  const subtotal = orderItems.reduce((acc, item) => {
    const matchedVariant = item.Product?.variants?.find(
      v => v.color === item.color && v.size?.includes(item.size)
    );
    const price = matchedVariant?.salePrice || 0;
    return acc + price * item.quantity;
  }, 0);
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    ['firstName', 'lastName', 'address', 'city', 'state', 'zip', 'phone'].forEach(field => {
      if (!formData[field]) newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) return;
    if (formData.paymentMethod === 'card') handleRazorpayPayment();
    else console.log('Place order with:', formData);
  };

  return (
    <div className="min-h-auto bg-secondary dark:bg-black text-black dark:text-white">
      {/* Progress bar */}
      <div className="flex flex-wrap justify-center items-center bg-[#E8F3F1] gap-4 md:gap-8 mb-10 py-5 px-4 text-sm sm:text-base">
        <div className="text-gray-400 flex items-center gap-2"><IoMdCart /> Cart</div>
        <div className="hidden sm:block w-16 sm:w-32 h-px bg-gray-300 dark:bg-gray-600" />
        <div className="text-primary font-semibold flex items-center gap-2"><FaTruck /> Shipping</div>
        <div className="hidden sm:block w-16 sm:w-32 h-px bg-gray-300 dark:bg-gray-600" />
        <div className="text-gray-400 flex items-center gap-2"><FaCreditCard /> Payment</div>
        <div className="hidden sm:block w-16 sm:w-32 h-px bg-gray-300 dark:bg-gray-600" />
        <div className="text-gray-400 flex items-center gap-2"><FaCheckCircle /> Confirmation</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl px-4 md:px-8 mx-auto mb-10">
        {/* Shipping form */}
        <div className='lg:col-span-2'>
          <h2 className="text-2xl font-bold mb-6 text-primary">Shipping Details</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[{ name: 'firstName', placeholder: 'First Name' }, { name: 'lastName', placeholder: 'Last Name' },
              { name: 'address', placeholder: 'Street Address', full: true },
              { name: 'city', placeholder: 'City' }, { name: 'state', placeholder: 'State/Province' },
              { name: 'zip', placeholder: 'ZIP/Postal Code' }, { name: 'phone', placeholder: 'Phone Number' }]
              .map(({ name, placeholder, full }) => (
                <div key={name} className={full ? 'md:col-span-2' : ''}>
                  <input
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                    className="border-2 border-primary rounded px-4 py-2 w-full bg-white dark:bg-black"
                  />
                  {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
                </div>
              ))}
            <div className="md:col-span-2 flex items-center gap-2 mt-2">
              <input type="checkbox" id="save" className="accent-primary w-4 h-4" />
              <label htmlFor="save" className="text-sm">Save this address for future orders</label>
            </div>
          </form>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3 text-primary">Select Payment Method</h3>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              {[{ id: 'card', label: 'Credit/Debit Card', icon: <FaCreditCard className="mr-2" /> },
                { id: 'paypal', label: 'PayPal', icon: <FaCcPaypal className="mr-2" /> },
                { id: 'cod', label: 'Cash on Delivery', icon: <FaTruck className="mr-2" /> }]
                .map(({ id, label, icon }) => {
                  const isSelected = formData.paymentMethod === id;
                  return (
                    <label
                      key={id}
                      htmlFor={id}
                      className={`flex items-center cursor-pointer border rounded px-4 py-2 transition w-full sm:w-auto
                      ${isSelected ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-primary dark:bg-zinc-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700'}`}
                    >
                      <input
                        type="radio"
                        id={id}
                        name="paymentMethod"
                        value={id}
                        className="hidden"
                        onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                        checked={isSelected}
                      />
                      <span className="flex items-center text-sm">{icon}{label}</span>
                    </label>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-100 dark:bg-zinc-900 rounded p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-primary">Order Summary</h3>
          <div className="space-y-4 text-sm">
            {orderItems.map((item, i) => {
              const matchedVariant = item.Product?.variants?.find(
                v => v.color === item.color && v.size?.includes(item.size)
              );
              const image = matchedVariant?.images?.[0] || '';
              const price = matchedVariant?.salePrice || 0;
              return (
                <div key={i} className="flex items-center gap-4">
                  <img src={image} alt={item.Product?.productName} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.Product?.productName}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Size: {item.size}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 dark:text-gray-400">Color:</span>
                      <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: item.color }} />
                    </div>
                    <p className="text-xs">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">{currencyFormatter.format(price * item.quantity)}</p>
                </div>
              );
            })}

            <hr className="border-gray-300 dark:border-gray-600" />
            <div className="flex justify-between"><span>Subtotal</span><span>{currencyFormatter.format(subtotal)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{currencyFormatter.format(shipping)}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>{currencyFormatter.format(tax)}</span></div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total</span>
              <span className="text-primary">{currencyFormatter.format(total)}</span>
            </div>
          </div>

          <button onClick={handlePlaceOrder} className="mt-6 w-full bg-primary text-white py-2 rounded hover:bg-opacity-90 transition">
            Place Order
          </button>

          <div className="mt-3 flex items-center gap-2 justify-center text-center text-xs text-gray-500 dark:text-gray-400">
            <FaLock /> Secure Checkout
          </div>

          <div className="flex text-lg text-gray-700 justify-center gap-2 mt-2">
            <SiVisa className='text-2xl' />
            <SiMastercard className='text-2xl' />
            <SiAmericanexpress className='text-2xl' />
            <FaCcPaypal className='text-2xl' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
