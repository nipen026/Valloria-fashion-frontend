import React from 'react';
import  cat_1 from '../../assets/formal.jpg' 
import  cat_2 from '../../assets/kurti.jpg' 
import  cat_3 from '../../assets/top.jpg' 
import  cat_4 from '../../assets/korean.jpg' 
import { useNavigate } from 'react-router-dom';
// Sample category data
const categories = [
  {
    title: 'Formal Collection',
    image: cat_1,
  },
  {
    title: 'Kurti`s Collection',
    image: cat_2,
  },
  {
    title: 'Tops & Jeans Styles',
    image: cat_3,
  },
  {
    title: 'Korean Style',
    image: cat_4,
  },
];

const FeaturedCategories = () => {
  const navigate = useNavigate()
  return (
    <section className="py-12 bg-secondary dark:bg-black transition-colors">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-black dark:text-white mb-10">
          Featured Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden group shadow hover:shadow-lg transition"
            >
              <div
                className="h-[500px] bg-cover bg-center relative"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition ease-linear cursor-pointer flex flex-col justify-end p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">{category.title}</h3>
                  <button className="text-sm text-white flex items-center gap-1 hover:underline" onClick={()=>navigate('/productListing?latest=true')}>
                    Shop Now <span className="text-lg">›</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
