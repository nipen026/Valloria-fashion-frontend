import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filters from '../../Components/Filters';
import ProductGrid from '../../Components/ProductGrid';
import Header from '../../Common/Header';
import Banner from '../../Components/Banner';
import Footer from '../../Common/Footer';
import { GET_FILTER_PRODUCT, GET_PRODUCT } from '../../api/get';
import { useLocation } from 'react-router-dom';

const ProductListing = () => {
  const [filters, setFilters] = useState({ category: [], price: [] ,size:[] , color:[] });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  
  // Fetch products from your API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await GET_FILTER_PRODUCT(location.search) // update URL if needed
        setProducts(response.data.products || []);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply category and price filters
  const filteredProducts = products.filter((product) => {
    const catMatch = filters.category.length
      ? filters.category.includes(product.category)
      : true;

    const variant = product.variants?.[0];
    const price = variant?.salePrice || 0;

    const priceMatch = filters.price.length
      ? filters.price.some((p) => price <= p)
      : true;

    return catMatch && priceMatch;
  });

  return (
    <>
      <Header />
      <Banner />
      
      {/* Category Tabs */}
      {/* <div className='border-y p-3 flex justify-start container lg:gap-5 gap-3'>
        {['Shirts', 'T-Shirts', 'Pants', 'Suits', 'Accessories'].map((cat) => (
          <button
            key={cat}
            className='bg-transparent border-none text-[#4B5563] dark:text-white'
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                category: prev.category.includes(cat)
                  ? prev.category.filter((c) => c !== cat)
                  : [...prev.category, cat],
              }))
            }
          >
            {cat}
          </button>
        ))}
      </div> */}

      {/* Products Section */}
      <div className="bg-secondary dark:bg-black text-black dark:text-white px-6 py-10">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-10">
          <Filters filters={filters} setFilters={setFilters} />
          <div className="md:col-span-3 transition-all duration-500">
            <h2 className="text-xl font-bold mb-4">
              {loading ? 'Loading Products...' : `Showing ${filteredProducts.length} Products`}
            </h2>
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductListing;
