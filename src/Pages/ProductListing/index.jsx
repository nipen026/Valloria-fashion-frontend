import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filters from '../../Components/Filters';
import ProductGrid from '../../Components/ProductGrid';
import Header from '../../Common/Header';
import Banner from '../../Components/Banner';
import Footer from '../../Common/Footer';
import { GET_FILTER_PRODUCT } from '../../api/get';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ProductListing = () => {
  const [filters, setFilters] = useState({ category: [], price: [], size: [], color: [] });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Fetch products from your API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await GET_FILTER_PRODUCT(location.search); // update URL if needed
        setProducts(response.data.products || []);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.search]);

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

  // --- SEO Auto Generation ---
  const seoTitle = filters.category.length
    ? `Shop ${filters.category.join(', ')} Online | Vigobee`
    : 'Trendy Gen-Z Clothing | Vigobee';

  const seoDescription = filters.category.length
    ? `Discover the best ${filters.category.join(', ')} for Gen-Z. Shop affordable, stylish, and trending outfits online at Vigobee.`
    : 'Shop Gen-Z inspired fashion at Vigobee. Explore trendy shirts, t-shirts, pants, and more with affordable prices.';

  const seoKeywords = [
    ...(filters.category.length ? filters.category : ['shirts', 't-shirts', 'pants', 'fashion', 'streetwear']),
    'gen-z clothing',
    'trendy outfits',
    'affordable fashion',
    'vigobee store',
  ].join(', ');

  return (
    <>
      {/* SEO Tags */}
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        {products[0]?.variants?.[0]?.images?.[0] && (
          <meta property="og:image" content={products[0].variants[0].images[0]} />
        )}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
      </Helmet>

      <Header />
      <Banner />

      {/* Products Section */}
      <div className="bg-secondary  text-black  px-6 py-10">
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
