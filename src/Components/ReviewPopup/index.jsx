import React, { useState } from 'react';
import { FaStar, FaRegStar, FaTimes } from 'react-icons/fa';

const ReviewPopup = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    onSubmit({ rating, review, image });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-lg p-6 relative animate-fadeIn">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-primary transition"
          onClick={onClose}
        >
          <FaTimes size={22} />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Share Your Review</h2>

        {/* Star Rating */}
        <div className="flex justify-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) =>
            star <= (hoverRating || rating) ? (
              <FaStar
                key={star}
                size={24}
                className="text-yellow-400 cursor-pointer transition-transform hover:scale-125"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              />
            ) : (
              <FaRegStar
                key={star}
                size={24}
                className="text-yellow-400 cursor-pointer transition-transform hover:scale-125"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              />
            )
          )}
        </div>

        {/* Review Text */}
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 resize-none focus:ring-2 focus:ring-black focus:outline-none"
          rows="4"
          placeholder="Write something about the product..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        {/* Image Upload */}
        <div className="mb-5">
          <label className="block font-medium text-gray-700 mb-1">Upload Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-opacity-80"
          />
          {image && (
            <img
              src={image}
              alt="Preview"
              className="mt-3 w-32 h-32 object-cover rounded-lg border"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition font-semibold"
          onClick={handleSubmit}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ReviewPopup;
