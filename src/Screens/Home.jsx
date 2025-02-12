// import React from 'react';
// // import Typewriter from 'typewriter-effect'; 
// import Clients from './Clients';
// import Services from './Services';
// import Footer from '../Components/Footer';
// import ProductsSection from './ProductsSection';
// import banner from '../Components/banner.png';
// import HeroVideo from '../assets/HeroVideo.mp4';  // Corrected path

// const Home = () => {
//   const handleClick = () => {
//     alert('Button clicked!');
//   };

//   return (
//     <>
//       {/* Hero Section */}
//       <section className="relative">
//         {/* Video Background */}
//         <div className=" w-full h-[100vh] z-10">
//           <video
//             className="w-full h-full object-cover"
//             autoPlay
//             loop
//             muted
//           >
//             <source
//               src={HeroVideo} // Now pointing to the correct path
//               type="video/mp4"
//             />
//             Your browser does not support the video tag.
//           </video>
//         </div>

//         {/* Content Section */}
       
//       </section>

//       <section>
//         <Services />
//       </section>
//       <section>
//         <Clients />
//       </section>
//       <section>
//         <ProductsSection />
//       </section>
     
//     </>
//   );
// };

// export default Home;



import React from 'react';
import { useNavigate } from 'react-router-dom';
import Clients from './Clients';
import Services from './Services';
import Footer from '../Components/Footer';
import ProductsSection from './ProductsSection';
import HeroVideo from '../assets/HeroVideo.mp4';
import BottomNav from '../Components/BottomNav';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="relative">
        {/* Video Background */}
        <div className="w-full md:h-[100vh]  z-10">
          <video
            className="w-full md:h-[100vh] h-[60vh] object-fill md:object-cover"
            autoPlay
            loop
            muted
          >
            <source
              src={HeroVideo}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
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

      {/* Bottom Navigation Tabs - Mobile Only */}
      <BottomNav />
    </>
  );
};

export default Home;
