import React from 'react';
// import Typewriter from 'typewriter-effect'; 
import Clients from './Clients';
import Services from './Services';
import Footer from '../Components/Footer';
import ProductsSection from './ProductsSection';
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
              src="" alt="Profile"
            />
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