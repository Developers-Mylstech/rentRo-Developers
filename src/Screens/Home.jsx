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
      <section className="relative">
        {/* Video Background */}
        <div className=" w-full h-[100vh] z-10">
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