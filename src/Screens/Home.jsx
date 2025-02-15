

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Clients from './Clients';
import Services from './Services';
import Footer from '../Components/Footer';
import ProductsSection from './ProductsSection';
import HeroVideo from '../assets/HeroVideo.mp4';
import HeroVideo2 from '../assets/HeroVideo2.mp4';
import BottomNav from '../Components/BottomNav';
import Aquaguard from "../assets/OurBrand/Aquaguard.png";
import Aquapro from "../assets/OurBrand/Aquapro.png";
import Bluewater from "../assets/OurBrand/Bluewater.png";
import Culligan from "../assets/OurBrand/Culligan.png";
import Kent from "../assets/OurBrand/Kent.png";
import WaterLogic from "../assets/OurBrand/WaterLogic.png";
import Marquee from "react-fast-marquee";
import { useRef } from 'react';
import OurBrand from "../Components/OurBrand.jsx";
import roLogo1 from "../assets/roLogo1.png";
import roLogo2 from "../assets/roLogo2.png";
import roLogo3 from "../assets/roLogo3.png";
import roLogo4 from "../assets/roLogo4.png";
import BannerCarousel from "../Components/BannerCarousel.jsx"
const Home = () => {
  const navigate = useNavigate();

  const ourBrandSection= useRef(null)
  const scrollToClient = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
     });
    };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Video Background */}
        <div className="z-10">
    <video
      className="w-full md:h-[100vh] h-[60vh] object-fill md:object-cover"
      autoPlay
      loop
      muted
    >
      <source src={HeroVideo2} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div className='absolute inset-0 bg-black bg-opacity-20'></div>
    <BannerCarousel />
    <div className='hidden md:block absolute top-20 right-4'>
      <h2 className='md:text-2xl text-medium md:text-blue-800 font-bold'>RAMADAN OFFER</h2>
      <p className='md:text-lg text-sm text-black'>Ending Soon</p>
    </div>
  </div>
        <div className="absolute bottom-0 left-0 right-0 bg-transparent pt-4 overflow-hidden z-50 home-gradient">
  <div className="h-full w-full inset-y-full hover:inset-y-0">
    <div className="absolute bottom-0 left-0 h-full w-full z-10 opacity-0 transition-all ease-in-out duration-300 hover:opacity-100">
      <div className="absolute bottom-0 left-0 h-[100%] w-full flex justify-center items-center z-30 text-white bg-gradient-to-t from-blue-200 to-transparent bg-opacity-30 backdrop-blur-sm">
        <button
          onClick={() => scrollToClient(ourBrandSection)}
          className="text-lg hover:text-xl text-blue-900 transition-all duration-300 ease-in-out"
        >
          Checkout our brands
        </button>
      </div>
    </div>
  </div>

  

  <div className="w-full overflow-hidden whitespace-nowrap pb-4 ">
    
    <Marquee>
      <img
        src={Aquaguard}
        alt="Aquaguard Logo"
        className="h-10 md:h-16 md:mx-14 lg:mx-20 xl:mx-24 mx-6 w-auto object-contain"
      />
      <img
        src={Aquapro}
        alt="Aquapro Logo"
        className="h-10 md:h-16 md:mx-14 lg:mx-20 xl:mx-24 mx-6 w-auto object-contain"
      />
      <img
        src={Bluewater}
        alt="Bluewater Logo"
        className="h-10 md:h-16 md:mx-14 lg:mx-20 xl:mx-24 mx-6 w-auto object-contain"
      />
      <img
        src={Culligan}
        alt="Culligan Logo"
        className="h-10 md:h-16 md:mx-14 lg:mx-20 xl:mx-24 mx-6 w-auto object-contain"
      />
      <img
        src={Kent}
        alt="Kent Logo"
        className="h-10 md:h-16 md:mx-14 lg:mx-20 xl:mx-24 mx-6 w-auto object-contain"
      />
      <img
        src={WaterLogic}
        alt="WaterLogic Logo"
        className="h-10 md:h-16 md:mx-14 lg:mx-20 xl:mx-24 mx-6 w-auto object-contain"
      />
    </Marquee>
  </div>
</div>

      </section>

      <section>
        <Services />
      </section>
      <section>
        <Clients />
      </section>
      <section >
        <ProductsSection />
      </section>
      <section className='mt-20' ref={ourBrandSection}>
        <OurBrand/>
      </section>
     

      {/* Bottom Navigation Tabs - Mobile Only */}
      <BottomNav />
    </>
  );
};

export default Home;
