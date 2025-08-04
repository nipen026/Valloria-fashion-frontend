import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineZoomIn } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';
import { useLocation, useNavigate, useParams } from 'react-router-dom'; // optional if using route param
import { GET_PRODUCT_BY_ID, GET_REVIEW_BY_PRODUCT } from '../../api/get';
import { ADD_CART, ADD_WISHLIST } from '../../api/post';
import { toast } from 'react-toastify';
import { useCart } from '../../Context/CartContext';
import { InfinitySpin } from 'react-loader-spinner';

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const { getCart } = useCart();
    const [reviews, setReviews] = useState([]);
    const [reviewImage, setReviewImage] = useState()
    const [reviewPopup, setReviewPopup] = useState(false)
    const location = useLocation();
    const navigate = useNavigate()
    const productId = location.pathname.split('/productDetails/')[1]; // Or use useParams if dynamic
    console.log(location.pathname.split('/productDetails/'));
    const token = localStorage.getItem('access-token')
    useEffect(() => {
        getReview()
    }, [])
    const getReview = () => {
        GET_REVIEW_BY_PRODUCT(productId).then((res) => {
            console.log(res);
            setReviews(res.data?.reviews)
        }).catch((err) => {
            console.log(err);
        })
    }
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
                getCart();
                toast('Successfully Added');
            } catch (err) {
                console.error('Add to cart failed:', err);
                toast('Failed to add to cart');
            }
        }

    };

    const handleAddToWishlist = async () => {

        const bodyData = {
            productId: product.id,
        }
        ADD_WISHLIST(bodyData).then(() => {
            toast('Added to wishlist');
        }).catch((err) => {
            console.log(err);
            toast('Failed to add to wishlist');
        })

    };

    if (!product || !selectedVariant) return <div className='h-screen flex justify-center items-center'><InfinitySpin
        visible={true}
        width="400"
        color="#223333"
        ariaLabel="infinity-spin-loading"
    /></div>;

    return (
        <>
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
            {/* ⭐ Reviews Section */}
            <hr />
            <div className="max-w-7xl mx-auto  pt-8">
                <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>

                {reviews.length === 0 ? (
                    <p className="text-gray-500">No reviews yet.</p>
                ) : (
                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className={`pb-4 ${reviews.length > 1 ? 'border-b last:!border-none' : ''}`}
                            >

                                <div>
                                    {review?.images?.length > 0 && review?.images?.map((img) => {
                                        return (
                                            <img src={img} className='w-[100px] rounded-lg cursor-pointer' onClick={() => { setReviewImage(img); setReviewPopup(true) }} />
                                        )
                                    })}
                                </div>
                                <div className=" gap-2 mb-1">
                                    <div className="font-semibold text-sm mt-1">{review.User?.name || 'Anonymous'}</div>
                                    <div className="text-yellow-500 text-sm">
                                        {'★'.repeat(Math.floor(review.rating)) + '☆'.repeat(5 - Math.floor(review.rating))}
                                        <span className="text-xs text-gray-500 ml-2">({review.rating}/5)</span>
                                    </div>
                                </div>
                                <div className="text-md text-gray-700 dark:text-gray-300">{review.comment}</div>
                                <div className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {reviewPopup && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center backdrop-blur-sm transition-opacity">
                    <div className="relative max-w-3xl w-full mx-auto p-4">
                        <img src={reviewImage} alt="Zoomed" className="w-full h-auto rounded-lg shadow-xl animate-scaleIn" />
                        <button
                            onClick={() => setReviewPopup(false)}
                            className="absolute top-4 right-4 text-black hover:bg-opacity-80 rounded-full p-2"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDetail;
