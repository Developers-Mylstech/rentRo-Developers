import React from 'react';
import Clients from './Clients';
import Services from './Services';
import Footer from '../Components/Footer';
import ProductsSection from './ProductsSection';
import banner from '../Components/banner.png'

const Home = () => {
  return (
    <>
      <section className="bg-white py-12 relative">
        <div className="container mx-auto bg-cover bg-center bg-no-repeat -z-10 "  style={{ backgroundImage: `url((${banner})` }} >
          <div className="flex flex-wrap items-start">
            {/* Left side: Offer and Content */}
            <div className="w-full lg:w-1/2 px-4 relative z-10"> {/* z-10 to bring content above the background */}
              <div className="max-w-lg">
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-[#f26a25] mb-2">RAMADAN OFFER</h4>
                  <h6 className="text-base text-gray-600">Ending soon</h6>
                </div>
                <div>
                  <h1 className="text-5xl font-bold text-gray-800 leading-tight mb-2">
                    Water
                  </h1>
                  <h1 className="text-5xl font-bold text-gray-800 leading-tight mb-4">
                    Filters
                  </h1>
                  <h2 className="text-2xl font-medium text-gray-600 mb-4">On Monthly Rent</h2>
                  <h3 className="text-3xl font-semibold text-[#f26a25] mb-4">
                    <span className="mr-2">AED 50.00</span>
                    <span className="line-through text-gray-500">AED 70.00</span>
                  </h3>
                  <p className="text-gray-600 mb-6">Your Trusted Partner for Reliable Water Filters and Services.</p>
                  <div className="flex items-center">
                    <a
                      href="shop.php"
                      className="bg-[#f26a25] hover:bg-[#d9531f] text-white font-medium py-2 px-4 rounded mr-4"
                    >
                      Book Now
                    </a>
                    <span className="text-gray-600">Our Products</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Product Images, Filter Image, and Social Links */}
            <div className="w-full lg:w-1/2 px-4 mt-8 lg:mt-0 flex flex-col items-start relative z-10"> {/* z-10 to bring content above the background */}
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-[#f26a25] mb-2">Our Products</h4>
                <p className="text-gray-600">Discover Premium Water Filtration Solutions for Every Need</p>
              </div>

              <div className="flex space-x-4 mb-4">
                {/* Product Images */}
                <img
                  src="https://panel.rentro.ae/assets/images/banners/22.png"
                  alt="Product 1"
                  className="w-24 h-24 object-cover rounded"
                />
                <img
                  src="https://panel.rentro.ae/assets/images/banners/33.png"
                  alt="Product 2"
                  className="w-24 h-24 object-cover rounded"
                />
              </div>

              <div className="mb-4">
                {/* Filter Image */}
                <img
                  src="your_filter_image_url.png"
                  alt="Filter"
                  className="w-[300px] h-auto"
                />
              </div>

              <div className="flex items-center space-x-4">
                {/* Social Media Icons */}
                <a href="https://www.facebook.com/rentrouae/" target="_blank" rel="noopener noreferrer">
                  <img src="assets/images/social-icon/1.png" alt="Facebook" className="w-8 h-8" />
                </a>
                <a href="https://www.instagram.com/rentrouae/" target="_blank" rel="noopener noreferrer">
                  <img src="assets/images/social-icon/2.png" alt="Instagram" className="w-8 h-8" />
                </a>
              </div>
            </div>

          </div>
        </div>
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('your_background_image_url.jpg')",
          }}
        ></div>
      </section>

      <section>
        <Services />
      </section>
      <section>
        <Clients />
      </section>
      <section>
        <ProductsSection />
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
};

export default Home;
