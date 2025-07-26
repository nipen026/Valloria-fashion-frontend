// import React, { useState } from 'react';
// import mainImg from '../../assets/main.png';
// import blackImg from '../../assets/sub-1.png';
// import whiteImg from '../../assets/sub-2.png';
// import blueImg from '../../assets/sub-3.png';
// import { MdOutlineZoomIn } from 'react-icons/md';
// import { FaHeart } from 'react-icons/fa';
// const ProductDetail = () => {
//     const [mainImage, setMainImage] = useState(mainImg);
//     const [isZoomed, setIsZoomed] = useState(false);
//     const [selectedColor, setSelectedColor] = useState('black');
//     const [selectedSize, setSelectedSize] = useState('M');
//     const thumbnails = [
//         { color: 'main', src: mainImg },
//         { color: 'black', src: blackImg },
//         { color: 'white', src: whiteImg },
//         { color: 'blue', src: blueImg },
//     ];
//     const colors = ['#0A4B3C', '#000000', '#ffffff', '#1e3a8a'];
//     const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

//     return (
//         <div className="bg-secondary dark:bg-black text-black dark:text-white min-h-screen px-4 py-10">
//             <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
//                 {/* Product Image */}
//                 <div className="flex flex-col gap-4 items-center">
//                     <div className="relative">
//                         <img
//                             src={mainImage}
//                             alt="Main"
//                             className="w-auto h-[500px] object-contain rounded-lg shadow"
//                         />
//                         <button
//                             onClick={() => setIsZoomed(true)}
//                             className="absolute top-2 right-2 text-primary hover:bg-opacity-70 text-2xl p-2 rounded-full"
//                             aria-label="Zoom"
//                         >
//                            <MdOutlineZoomIn />
//                         </button>
//                     </div>
//                     {/* Thumbnail row */}
//                     <div className="flex gap-4">
//                         {thumbnails.map(({ color, src }, i) => (
//                             <img
//                                 key={i}
//                                 src={src}
//                                 alt={color}
//                                 onClick={() => setMainImage(src)}
//                                 className={`w-16 h-16 object-cover border rounded cursor-pointer hover:ring-2 ring-primary ${mainImage === src ? 'ring-2 ring-primary' : ''
//                                     }`}
//                             />
//                         ))}

//                     </div>
//                 </div>
//                 {isZoomed && (
//                     <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center backdrop-blur-sm transition-opacity">
//                         <div className="relative max-w-3xl w-full mx-auto p-4">
//                             <img src={mainImage} alt="Zoomed" className="w-full h-auto rounded-lg shadow-xl animate-scaleIn" />
//                             <button
//                                 onClick={() => setIsZoomed(false)}
//                                 className="absolute top-4 right-4 text-black hover:bg-opacity-80 rounded-full p-2"
//                             >
//                                 ✕
//                             </button>
//                         </div>
//                     </div>
//                 )}
//                 {/* Product Info */}
//                 <div>
//                     <h1 className="text-2xl font-semibold mb-2">
//                         Premium Cotton Pocket T-Shirt
//                     </h1>
//                     <p className="text-xl font-bold mb-4">$89.00</p>

//                     {/* Color Options */}
//                     <div className="mb-4">
//                         <h4 className="font-medium mb-2">Color</h4>
//                         <div className="flex gap-3">
//                             {colors.map((color, i) => (
//                                 <div
//                                     key={i}
//                                     onClick={() => setSelectedColor(color)}
//                                     className={`w-6 h-6 rounded-full cursor-pointer border-2 ${selectedColor === color ? 'ring-2 ring-primary' : ''
//                                         }`}
//                                     style={{ backgroundColor: color }}
//                                 />
//                             ))}
//                         </div>
//                     </div>

//                     {/* Size Options */}
//                     <div className="mb-6">
//                         <h4 className="font-medium mb-2">Size</h4>
//                         <div className="flex flex-wrap gap-2">
//                             {sizes.map((size) => (
//                                 <button
//                                     key={size}
//                                     onClick={() => setSelectedSize(size)}
//                                     className={`px-4 py-1 border rounded text-sm ${selectedSize === size
//                                         ? 'bg-primary text-white'
//                                         : 'dark:text-white text-black'
//                                         }`}
//                                 >
//                                     {size}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex flex-col sm:flex-row gap-4 mb-6">
//                         <button className="bg-primary text-white px-6 py-3 rounded hover:bg-opacity-90 transition w-full">
//                             ADD TO CART
//                         </button>
//                         <button className="border px-6 py-3 rounded w-full dark:border-white border-black flex items-center justify-center gap-2">
//                             <span><FaHeart/></span> ADD TO WISHLIST
//                         </button>
//                     </div>

//                     {/* Description */}
//                     <div className="mb-4">
//                         <h4 className="font-medium mb-1">Description</h4>
//                         <p className="text-sm text-gray-700 dark:text-gray-300">
//                             Crafted from premium cotton, this t-shirt features a classic pocket detail and a refined fit. Perfect for both casual and smart-casual occasions.
//                         </p>
//                     </div>

//                     {/* Materials & Care */}
//                     <div>
//                         <h4 className="font-medium mb-1">Materials & Care</h4>
//                         <ul className="text-sm list-disc pl-5 text-gray-700 dark:text-gray-300">
//                             <li>100% Premium Cotton</li>
//                             <li>Machine wash cold</li>
//                             <li>Tumble dry low</li>
//                             <li>Do not bleach</li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>

//             {/* Complete the Look */}
//             <div className="mt-16 max-w-7xl mx-auto">
//                 <h2 className="text-xl font-semibold mb-6">Complete the Look</h2>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                     {['green', 'black', 'white', 'blue'].map((color, i) => (
//                         <div
//                             key={i}
//                             className="bg-white dark:bg-zinc-900 rounded shadow hover:shadow-lg transition"
//                         >
//                             <img
//                                 src={mainImage}
//                                 alt={color}
//                                 className="w-full h-64 object-cover"
//                             />
//                             <div className="p-4">
//                                 <h4 className="text-sm font-medium mb-1">Classic Cotton Shirt</h4>
//                                 <p className="text-sm text-primary font-semibold">$79.00</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductDetail;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineZoomIn } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';
import { useLocation, useNavigate, useParams } from 'react-router-dom'; // optional if using route param
import { GET_PRODUCT_BY_ID } from '../../api/get';
import { ADD_CART } from '../../api/post';
import { toast } from 'react-toastify';

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate()
    const productId = location.pathname.split('/productDetails/')[1]; // Or use useParams if dynamic
    console.log(location.pathname.split('/productDetails/'));
    const token = localStorage.getItem('access-token')

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await GET_PRODUCT_BY_ID(productId);
                setProduct(data.product);

                if (data.product.variants?.length > 0) {
                    const defaultVariant = data.product.variants[0];
                    setSelectedVariant(defaultVariant);
                    setSelectedColor(defaultVariant.color);
                    setSelectedSize(defaultVariant.size[0]);
                    setMainImage(defaultVariant.images[0]);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleColorChange = (color) => {
        const variant = product.variants.find(v => v.color === color);
        if (variant) {
            setSelectedVariant(variant);
            setSelectedColor(color);
            setSelectedSize(variant.size[0]);
            setMainImage(variant.images[0]);
        }
    };

    const handleAddToCart = async () => {
        if (!token) {
            navigate('/signin')
        }
        const bodyData = {
            productId: product.id,
            size: selectedSize,
            color: selectedColor,
            quantity: 1
        }
        if (token) {
            try {
                await ADD_CART(bodyData);
                toast('Successfully Added');
            } catch (err) {
                console.error('Add to cart failed:', err);
                toast('Failed to add to cart');
            }
        }

    };

    const handleAddToWishlist = async () => {
        try {
            await axios.post('/api/wishlist', {
                productId: product.id,
                variantId: selectedVariant.id
            });
            alert('Added to wishlist');
        } catch (err) {
            console.error('Wishlist failed:', err);
            alert('Failed to add to wishlist');
        }
    };

    if (!product || !selectedVariant) return <div>Loading...</div>;

    return (
        <div className="bg-secondary dark:bg-black text-black dark:text-white min-h-screen px-4 py-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Product Image */}
                <div className="flex flex-col gap-4 items-center">
                    <div className="relative">
                        <img
                            src={mainImage}
                            alt="Main"
                            className="w-auto h-[500px] object-contain rounded-lg shadow"
                        />
                        <button
                            onClick={() => setIsZoomed(true)}
                            className="absolute top-2 right-2 text-primary hover:bg-opacity-70 text-2xl p-2 rounded-full"
                        >
                            <MdOutlineZoomIn />
                        </button>
                    </div>

                    <div className="flex gap-4">
                        {selectedVariant.images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt="thumb"
                                onClick={() => setMainImage(img)}
                                className={`w-16 h-16 object-cover border rounded cursor-pointer hover:ring-2 ring-primary ${mainImage === img ? 'ring-2 ring-primary' : ''}`}
                            />
                        ))}
                    </div>
                </div>

                {isZoomed && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center backdrop-blur-sm transition-opacity">
                        <div className="relative max-w-3xl w-full mx-auto p-4">
                            <img src={mainImage} alt="Zoomed" className="w-full h-auto rounded-lg shadow-xl animate-scaleIn" />
                            <button
                                onClick={() => setIsZoomed(false)}
                                className="absolute top-4 right-4 text-black hover:bg-opacity-80 rounded-full p-2"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}

                {/* Product Info */}
                <div>
                    <h1 className="text-2xl font-semibold mb-2">{product.productName}</h1>
                    <div className="text-xl font-bold mb-4 flex items-center gap-3">
                        <span className="text-primary">₹{selectedVariant.salePrice}</span>
                        <span className="text-gray-500 line-through text-base">₹{selectedVariant.mrp}</span>
                        <span className="text-green-600 text-sm">
                            ({Math.round(((selectedVariant.mrp - selectedVariant.salePrice) / selectedVariant.mrp) * 100)}% OFF)
                        </span>
                    </div>


                    <p className="text-sm text-gray-500 mb-2">
                        Brand: {product.brandName}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-primary text-white text-xs p-1 px-3 flex items-center rounded-full">
                            {product.category}
                        </span>
                        <span className="bg-gray-200 text-gray-800 text-xs p-1 px-3 flex items-center rounded-full">
                            {product.subCategory}
                        </span>
                        <span className="border border-gray-400 text-gray-700 text-xs p-1 px-3 flex items-center rounded-full">
                            Tag: {product.productTypeTag}
                        </span>
                    </div>

                    <p className="text-sm text-gray-500 mb-4">
                        Origin: {product.originCountry?.toUpperCase()} | Material: {product.material} | Weight: {product.weight}kg
                    </p>

                    {/* Color */}
                    <div className="mb-4">
                        <h4 className="font-medium mb-2">Color</h4>
                        <div className="flex gap-3">
                            {product.variants.map((variant, i) => (
                                <div
                                    key={i}
                                    onClick={() => handleColorChange(variant.color)}
                                    className={`w-6 h-6 rounded-full cursor-pointer border-2 ${selectedColor === variant.color ? 'ring-2 ring-primary' : ''}`}
                                    style={{ backgroundColor: variant.color }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Size */}
                    <div className="mb-6">
                        <h4 className="font-medium mb-2">Size</h4>
                        <div className="flex flex-wrap gap-2">
                            {selectedVariant.size.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-1 border rounded text-sm ${selectedSize === size
                                        ? 'bg-primary text-white'
                                        : 'dark:text-white text-black'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <button
                            onClick={handleAddToCart}
                            className="bg-primary text-white px-6 py-3 rounded hover:bg-opacity-90 transition w-full"
                        >
                            ADD TO CART
                        </button>
                        <button
                            onClick={handleAddToWishlist}
                            className="border px-6 py-3 rounded w-full dark:border-white border-black flex items-center justify-center gap-2"
                        >
                            <FaHeart /> ADD TO WISHLIST
                        </button>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <div
                            className="text-md text-gray-700 dark:text-gray-300 leading-7"
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
