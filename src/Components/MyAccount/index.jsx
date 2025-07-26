// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const MyAccount = () => {
//   const navigate = useNavigate();

//   const user = {
//     name: 'John Doe',
//     email: 'john@example.com',
//     number: '+91 9876543210',
//     addresses: [
//       {
//         id: 1,
//         type: 'Home',
//         address: '123 Main Street, City, State, 123456',
//       },
//       {
//         id: 2,
//         type: 'Office',
//         address: 'XYZ Tower, Business Road, City, 654321',
//       },
//     ],
//     orders: [
//       {
//         id: 'ORD12345',
//         date: '2025-07-18',
//         total: 1499,
//         status: 'Delivered',
//       },
//       {
//         id: 'ORD12346',
//         date: '2025-07-12',
//         total: 999,
//         status: 'Shipped',
//       },
//     ],
//   };

//   const handleLogout = () => {
//     // Clear auth token and redirect to login
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-3xl font-semibold text-zinc-800 dark:text-zinc-100">My Account</h2>
       
//       </div>

//       {/* Personal Info */}
//       <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6 mb-6 shadow-sm">
//         <h3 className="text-xl font-semibold mb-4 text-zinc-700 dark:text-zinc-100">Personal Information</h3>
//         <div className="grid md:grid-cols-2 gap-4 text-sm text-zinc-600 dark:text-zinc-300">
//           <p><span className="font-medium">Name:</span> {user.name}</p>
//           <p><span className="font-medium">Email:</span> {user.email}</p>
//           <p><span className="font-medium">Contact Number:</span> {user.number}</p>
//         </div>
//       </div>

//       {/* Addresses */}
//       <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6 mb-6 shadow-sm">
//         <h3 className="text-xl font-semibold mb-4 text-zinc-700 dark:text-zinc-100">Saved Addresses</h3>
//         <div className="grid md:grid-cols-2 gap-4">
//           {user.addresses.map(addr => (
//             <div key={addr.id} className="border p-4 rounded text-sm bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">
//               <p className="font-semibold">{addr.type} Address</p>
//               <p>{addr.address}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Recent Orders */}
//       <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6 shadow-sm">
//         <h3 className="text-xl font-semibold mb-4 text-zinc-700 dark:text-zinc-100">Recent Orders</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-left">
//             <thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
//               <tr>
//                 <th className="px-4 py-3">Order ID</th>
//                 <th className="px-4 py-3">Date</th>
//                 <th className="px-4 py-3">Total</th>
//                 <th className="px-4 py-3">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {user.orders.map(order => (
//                 <tr key={order.id} className="border-b border-zinc-200 dark:border-zinc-700">
//                   <td className="px-4 py-2">{order.id}</td>
//                   <td className="px-4 py-2">{order.date}</td>
//                   <td className="px-4 py-2">₹{order.total}</td>
//                   <td className="px-4 py-2">
//                     <span className={`px-2 py-1 rounded text-xs font-medium
//                       ${order.status === 'Delivered'
//                         ? 'bg-green-100 text-green-600'
//                         : order.status === 'Shipped'
//                           ? 'bg-yellow-100 text-yellow-600'
//                           : 'bg-gray-100 text-gray-600'}`}>
//                       {order.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//        <div className="flex justify-end gap-4 mt-5">
//           <button
//             onClick={() => navigate('/')}
//             className="px-4 py-2 bg-primary border border-primary text-white rounded hover:bg-white hover:text-primary transition"
//           >
//             Continue Shopping
//           </button>
//           <button
//             onClick={handleLogout}
//             className="px-4 py-2 bg-white border border-primary text-primary rounded hover:bg-primary hover:text-white transition"
//           >
//             Logout
//           </button>
//         </div>
//     </div>
//   );
// };

// export default MyAccount;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GET_MY_ACCOUNT } from '../../api/get';

const MyAccount = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Fetch user data from API
  useEffect(() => {
    const fetchUser = async () => {
      try {

        const res = await GET_MY_ACCOUNT()

        if (res.data.success) {
          setUser(res.data.user);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (err) {
        console.error('Error fetching user data', err);
        navigate('/signin');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access-token');
    navigate('/signin');
  };

  if (!user) {
    return (
      <div className="text-center py-20 text-zinc-500 dark:text-zinc-300">
        Loading your account...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold text-zinc-800 dark:text-zinc-100">My Account</h2>
      </div>

      {/* Personal Info */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6 mb-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-zinc-700 dark:text-zinc-100">Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-zinc-600 dark:text-zinc-300">
          <p><span className="font-medium">Name:</span> {user.name}</p>
          <p><span className="font-medium">Email:</span> {user.email}</p>
          <p><span className="font-medium">Contact Number:</span> {user.number}</p>
        </div>
      </div>

      {/* Addresses */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6 mb-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-zinc-700 dark:text-zinc-100">Saved Addresses</h3>
        {user.addresses.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">No saved addresses found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {user.addresses.map((addr, index) => (
              <div key={index} className="border p-4 rounded text-sm bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">
                <p className="font-semibold">{addr.type || 'Address'}</p>
                <p>{addr.address}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-zinc-700 dark:text-zinc-100">Recent Orders</h3>
        {user.orders.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">No recent orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {user.orders.map((order, index) => (
                  <tr key={index} className="border-b border-zinc-200 dark:border-zinc-700">
                    <td className="px-4 py-2">{order.id}</td>
                    <td className="px-4 py-2">{order.date}</td>
                    <td className="px-4 py-2">₹{order.total}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium
                        ${order.status === 'Delivered'
                          ? 'bg-green-100 text-green-600'
                          : order.status === 'Shipped'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-gray-100 text-gray-600'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 mt-5">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-primary border border-primary text-white rounded hover:bg-white hover:text-primary transition"
        >
          Continue Shopping
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-white border border-primary text-primary rounded hover:bg-primary hover:text-white transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MyAccount;
