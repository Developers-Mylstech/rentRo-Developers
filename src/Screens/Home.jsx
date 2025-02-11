import React from 'react';
import Typewriter from 'typewriter-effect'; 
import Clients from './Clients';
import Services from './Services';
import Footer from '../Components/Footer';
import ProductsSection from './ProductsSection';
import banner from '../Components/banner.png';
import HeroVideo from '../assets/HeroVideo.mp4';  // Corrected path

const Home = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="px-10 pt-32 bg-black relative">
        {/* Video Background */}
        <div className="absolute top-0 left-0 w-full h-full z-10">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
          >
            <source
              src={HeroVideo} // Now pointing to the correct path
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-2 items-center justify-items-center gap-5 relative z-10">
          <div className="order-1 lg:order-1 shadow-2xl">
            <img
              className="h-80 w-80 object-cover lg:w-[500px] lg:h-[500px]"
              src={banner} alt="Profile"
            />
          </div>
          <div className="order-2 lg:order-2 flex flex-col justify-center lg:items-start text-center sm:text-left">
            <p className="mt-2 text-3xl md:text-lg sm:text-sm text-white">RAMADAN OFFER</p> 
            <p className="mt-2 text-3xl md:text-lg sm:text-sm text-white">Ending Soon</p>

            <p className="text-4xl font-bold md:text-7xl text-white">
              Water <span className="text-orange-600">Filter</span>.
            </p>
            <p className="text-3xl md:text-6xl text-white">
              On Monthly Rent{' '}
            </p>
            <p className="mt-2 lg:text-3xl md:text-lg sm:text-sm text-white">
              Your Trusted partner for Reliable Water Filters and Services
            </p>
            <div className="flex">
              <button className="text-lg md:text-2xl bg-orange-600 text-black py-2 m-2 px-5 mt-10 hover:bg-zinc-800 rounded-full">
                <a href="#ContactMe">Contact Me</a>
              </button>
            
            </div>
          </div>
        </div>
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
      
    </>
  );
};

export default Home;
