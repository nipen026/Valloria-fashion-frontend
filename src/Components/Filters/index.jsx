// import React, { useState } from 'react';

// const Filters = ({ filters, setFilters }) => {
//     const [showFilters, setShowFilters] = useState(false);
   

//     const toggleFilter = (type, value) => {
//         setFilters((prev) => ({
//             ...prev,
//             [type]: prev[type].includes(value)
//                 ? prev[type].filter((v) => v !== value)
//                 : [...prev[type], value],
//         }));
//     };

//     return (
//         <>
//             {/* Filter Button for Mobile */}
//             <div className="md:hidden mb-4 flex justify-between items-center">
//                 <button
//                     onClick={() => setShowFilters(!showFilters)}
//                     className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-white px-3 py-2 border rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
//                 >
//                     <svg width="18" height="18" fill="currentColor" viewBox="0 0 18 10">
//                         <path d="M0 1h18M2.5 5h13M6.25 9h5.5" stroke="currentColor" strokeWidth="1.5" />
//                     </svg>
//                     Filters
//                 </button>
//             </div>

//             {/* Slide-in Filter Panel for Mobile */}
//             <div
//                 className={`
//           fixed  left-0 bottom-0 z-40 w-64 h-[calc(100vh-125px)] bg-white dark:bg-zinc-900 shadow-lg transform transition-transform duration-300 ease-in-out
//           ${showFilters ? 'translate-x-0' : '-translate-x-full'} 
//           md:static md:translate-x-0 md:w-full md:shadow-none md:block
//         `}
//             >
//                 <aside className="p-4  border border-[#E5E7EB] dark:border-zinc-700 rounded">
//                     {/* Header */}
//                     <div className="flex justify-between items-center md:hidden mb-5">
//                         <h3 className="text-lg font-semibold dark:text-white">Filters</h3>
//                         <button onClick={() => setShowFilters(false)} className="text-gray-600 dark:text-white">
//                             ✕
//                         </button>
//                     </div>

//                     {/* Filters */}
//                     <div className='lg:flex mb-3  items-center justify-between  hidden'>
//                         <p>Filters</p>
//                         <svg width="18" height="18" fill="currentColor" viewBox="0 0 18 10">
//                             <path d="M0 1h18M2.5 5h13M6.25 9h5.5" stroke="currentColor" strokeWidth="1.5" />
//                         </svg>
//                     </div>
//                     <div className='space-y-2 mb-5'>
//                         <h4 className="font-medium mb-2 dark:text-white">Categories</h4>
//                         {['Formal Wear', 'Casual Wear', 'Accessories'].map((cat) => (
//                             <label key={cat} className="block text-sm text-gray-600 dark:text-white">
//                                 <input
//                                     type="checkbox"
//                                     checked={filters.category.includes(cat)}
//                                     onChange={() => toggleFilter('category', cat)}
//                                     className="mr-2 accent-primary border-[#767676] w-4 h-4"
//                                 />
//                                 {cat}
//                             </label>
//                         ))}
//                     </div>

//                     <div className='space-y-2 mb-5'>
//                         <h4 className="font-medium mb-2 dark:text-white">Price</h4>
//                         {[30, 50, 100, 200, 300].map((price) => (
//                             <label key={price} className="block text-sm text-gray-600 dark:text-white">
//                                 <input
//                                     type="checkbox"
//                                     checked={filters.price.includes(price)}
//                                     onChange={() => toggleFilter('price', price)}
//                                     className="mr-2 accent-primary border-[#767676] w-4 h-4"
//                                 />
//                                 Below ${price}
//                             </label>
//                         ))}
//                     </div>
//                 </aside>
//             </div>

//             {/* Overlay for mobile when filter is open */}
//             {showFilters && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
//                     onClick={() => setShowFilters(false)}
//                 ></div>
//             )}
//         </>
//     );
// };

// export default Filters;
import React, { useState } from 'react';

const SIZE_LIST = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
const ALL_COLORS = ['#000000', '#ffffff', '#ff0000', '#0000ff', '#008000', '#ffa500', '#800080', '#a52a2a', '#808080', '#00ffff'];

const subCategories = {
  "Men's Wear": ['T-Shirts', 'Shirts', 'Jeans', 'Trousers', 'Jackets', 'Suits', 'Kurta', 'Sherwani', 'Blazer'],
  "Women's Wear": ['Dresses', 'Tops', 'Sarees', 'Salwar Kameez', 'Lehengas', 'Skirts', 'Blouses', 'Kurtis', 'Jackets'],
};

const Filters = ({ filters, setFilters }) => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4 flex justify-between items-center px-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-white px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 18 10">
            <path d="M0 1h18M2.5 5h13M6.25 9h5.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          Filters
        </button>
      </div>

      {/* Filter Panel */}
      <div className={`fixed  border-[1px] rounded-xl md:static top-[90px] left-0 z-40 bg-white dark:bg-zinc-900 md:bg-transparent shadow-md md:shadow-none h-full md:h-auto w-72 md:w-full p-4 transition-transform duration-300 ease-in-out
        ${showFilters ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:block`}>
        
        <div className="space-y-6 overflow-y-auto md:overflow-visible max-h-[calc(100vh-80px)] md:max-h-none">

          {/* Category Filter */}
          <div>
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Category</h4>
            {Object.entries(subCategories).map(([group, items]) => (
              <div key={group} className="mb-3">
                <p className="text-sm font-medium text-gray-600 dark:text-white">{group}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {items.map((item) => (
                    <button
                      key={item}
                      onClick={() => toggleFilter('category', item)}
                      className={`px-3 py-1 rounded-full border text-xs ${
                        filters.category.includes(item)
                          ? 'bg-primary text-white border-primary'
                          : 'border-gray-300 text-gray-700 dark:text-white'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Price Filter */}
          <div className='space-y-2'>
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Price Range</h4>
            {['₹0 - ₹500', '₹500 - ₹1000', '₹1000 - ₹2000', '₹2000+'].map((label) => (
              <label key={label} className="block text-sm text-gray-600 dark:text-white">
                <input
                  type="checkbox"
                  checked={filters.price.includes(label)}
                  onChange={() => toggleFilter('price', label)}
                  className="mr-2 accent-primary"
                />
                {label}
              </label>
            ))}
          </div>

          {/* Size Filter */}
          <div>
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Size</h4>
            <div className="flex flex-wrap gap-2">
              {SIZE_LIST.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleFilter('size', size)}
                  className={`px-3 py-1 rounded border text-sm ${
                    filters.size.includes(size)
                      ? 'bg-primary text-white border-primary'
                      : 'border-gray-300 text-gray-700 dark:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div>
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Color</h4>
            <div className="flex flex-wrap gap-3">
              {ALL_COLORS.map((color) => (
                <div
                  key={color}
                  onClick={() => toggleFilter('color', color)}
                  className={`w-7 h-7 rounded-full cursor-pointer border-2 transition-all duration-200 ${
                    filters.color.includes(color) ? 'border-primary scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {showFilters && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setShowFilters(false)}
        />
      )}
    </>
  );
};

export default Filters;


