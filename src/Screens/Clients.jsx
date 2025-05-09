// import React, { useRef, useState } from "react";
// import Marquee from "react-fast-marquee";

// // logo import here

// import AlMadinaHyperMarket from "../assets/OurClientLogo/AlMadinaHyperMarket-min.png";
// import aryaasLogo from "../assets/OurClientLogo/aryaasLogo-min.png";
// import BEEFKING from "../assets/OurClientLogo/BEEFKING-min.png";
// import BreadBoxlogo from "../assets/OurClientLogo/BreadBoxlogo-min.png";
// import lantislogo from "../assets/OurClientLogo/lantislogo-min.png";
// import nestologo from "../assets/OurClientLogo/nestologo-min.png";
// import ORBISFOOD from "../assets/OurClientLogo/ORBISFOOD-min.png";
// import Rotanalogo from "../assets/OurClientLogo/Rotanalogo-min.png";
// import TapaKing from "../assets/OurClientLogo/TapaKing-min.png";
// import ThoibaLogistics from "../assets/OurClientLogo/ThoibaLogistics-min.png";
      

// const Clients = () => {

  
//   return (
//  <>
//  <section className="bg-gray-100 py-12">
//       <div className="container mx-auto w-full">
//         <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Our Clients</h2>

//         <Marquee behavior="alter" direction="left"  >
//           <div className="group relative rounded-2xl bg-transparent mx-6 md:mx-12 overflow-hidden cursor-pointer transition-all">
//             <img
//               className="w-auto h-12 md:h-24 object-cover rounded-2xl transition-transform duration-700"
//               src={AlMadinaHyperMarket}
//               alt="Al-Madina-Hypermarket"
//             />
//           </div>

//           <div className="group relative rounded-2xl bg-transparent mx-6 md:mx-12 overflow-hidden cursor-pointer transition-all">
//             <img
//               className="w-auto md:h-24  h-12 object-cover rounded-2xl transition-transform duration-700"
//               src={aryaasLogo}
//               alt="Aryass"
//             />
//           </div>

//           <div className="group relative rounded-2xl bg-transparent mx-6 md:mx-12 overflow-hidden cursor-pointer transition-all">
//             <img
//               className=" w-auto md:h-24 h-12 object-cover rounded-2xl transition-transform duration-700"
//               src={BEEFKING}
//               alt="Beef King"
//             />
//           </div>

//           <div className=" group relative rounded-2xl bg-transparent mx-6 md:mx-12 overflow-hidden cursor-pointer transition-all">
//             <img
//               className="w-auto md:h-24 h-12 object-cover rounded-2xl transition-transform duration-700"
//               src={BreadBoxlogo}
//               alt="Bread Box"
//             />
//           </div>

//           <div className="group relative rounded-2xl bg-transparent  mx-6 md:mx-12 overflow-hidden cursor-pointer transition-all">
//             <img
//               className=" w-auto md:h-20 h-10 object-cover rounded-2xl transition-transform duration-700"
//               src={lantislogo}
//               alt="Lantis"
//             />
//           </div>

//           <div className=" mx-6 md:mx-12 overflow-hidden cursor-pointer transition-all">
//             <img
//               className=" w-auto md:h-28 h-14 object-cover rounded-2xl transition-transform duration-700"
//               src={nestologo}
//               alt="Nesto"
//             />
//           </div>

//           <div className="group relative  mx-6 md:mx-12 overflow-hidden cursor-pointer transition-all">
//             <img
//               className=" w-auto md:h-20 h-10 object-cover rounded-2xl transition-transform duration-700"
//               src={ORBISFOOD}
//               alt="ORBIS FOOD"
//             />
//           </div>

//           <div className="group relative rounded-2xl bg-transparent mx-6 md:mx-12 overflow-hidden cursor-pointer transition-all">
//             <img
//               className=" object-cover w-auto md:h-24 h-12 rounded-2xl transition-transform duration-700"
//               src={Rotanalogo}
//               alt="Rotana"
//             />
//           </div>

//           <div className="group relative rounded-2xl bg-transparent mx-6 md:mx-12 overflow-hidden cursor-pointer transition-all">
//             <img
//               className=" object-cover w-auto md:h-24 h-12 rounded-2xl transition-transform duration-700"
//               src={TapaKing}
//               alt="TapaKing"
//             />
//           </div>

//           <div className="group relative rounded-2xl bg-transparent mx-6 md:mx-12 overflow-hidden cursor-pointer transition-all">
//             <img
//               className=" w-auto md:h-24 h-12 object-cover rounded-2xl transition-transform duration-700"
//               src={ThoibaLogistics}
//               alt="Thoiba Logistics"
//             />
//           </div>
//         </Marquee>
//       </div>
//     </section>
//     {/* <BottomNav/> */}
//     {/* <ScrollToTopButton/> */}
//     </>
//   );
// };

// export default Clients;


import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import axiosInstance from "../utils/axiosInstance"; // Adjust the import path as needed

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axiosInstance.get("/clients"); // Adjust API endpoint
        setClients(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch clients");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return (
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto w-full">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
            Our Clients
          </h2>
          <div className="flex justify-center">
            <p>Loading client logos...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto w-full">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
            Our Clients
          </h2>
          <div className="flex justify-center text-red-500">
            <p>Error: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (clients.length === 0) {
    return (
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto w-full">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
            Our Clients
          </h2>
          <div className="flex justify-center">
            <p>No clients found</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto w-full">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Our Clients
        </h2>

        <Marquee behavior="alternate" direction="left">
          {clients.map((client) => (
            <div
              key={client.clientId}
              className="group relative rounded-2xl bg-transparent mx-6 md:mx-12 overflow-hidden cursor-pointer transition-all"
            >
              <img
                className="w-auto h-12 md:h-24 object-contain rounded-2xl transition-transform duration-700 group-hover:scale-110"
                src={client.imageUrl}
                alt={client.name}
                
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Clients;