import React, { useRef, useState } from "react";
import Marquee from "react-fast-marquee";

// logo import here

import AlMadinaHyperMarket from "../assets/OurClientLogo/AlMadinaHyperMarket.png";
import aryaasLogo from "../assets/OurClientLogo/aryaasLogo.png";
import BEEFKING from "../assets/OurClientLogo/BEEFKING.png";
import BreadBoxlogo from "../assets/OurClientLogo/BreadBoxlogo.png";
import lantislogo from "../assets/OurClientLogo/lantislogo.png";
import nestologo from "../assets/OurClientLogo/nestologo.png";
import ORBISFOOD from "../assets/OurClientLogo/ORBISFOOD.png";
import Rotanalogo from "../assets/OurClientLogo/Rotanalogo.png";
import TapaKing from "../assets/OurClientLogo/TapaKing.png";
import ThoibaLogistics from "../assets/OurClientLogo/ThoibaLogistics.png";
import BottomNav from "../Components/BottomNav";
import ScrollToTopButton from "../Components/ScrollToTopButton";

const Clients = () => {

  
  return (
 <>
 <section className="bg-gray-100 py-12">
      <div className="container mx-auto w-full">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Our Clients</h2>

        <Marquee behavior="alter" direction="left"  >
          <div className="group relative rounded-2xl bg-transparent mx-6 md:mx-12 overflow-hidden cursor-pointer transition-all">
            <img
              className="w-auto h-12 md:h-24 object-cover rounded-2xl transition-transform duration-700"
              src={AlMadinaHyperMarket}
              alt="Al-Madina-Hypermarket"
            />
          </div>

          <div className="group relative rounded-2xl bg-transparent mx-6 md:mx-12 overflow-hidden cursor-pointer transition-all">
            <img
              className="w-auto md:h-24  h-12 object-cover rounded-2xl transition-transform duration-700"
              src={aryaasLogo}
              alt="Aryass"
            />
          </div>

          <div className="group relative rounded-2xl bg-transparent mx-6 md:mx-12 overflow-hidden cursor-pointer transition-all">
            <img
              className=" w-auto md:h-24 h-12 object-cover rounded-2xl transition-transform duration-700"
              src={BEEFKING}
              alt="Beef King"
            />
          </div>

          <div className=" group relative rounded-2xl bg-transparent mx-6 md:mx-12 overflow-hidden cursor-pointer transition-all">
            <img
              className="w-auto md:h-24 h-12 object-cover rounded-2xl transition-transform duration-700"
              src={BreadBoxlogo}
              alt="Bread Box"
            />
          </div>

          <div className="group relative rounded-2xl bg-transparent  mx-6 md:mx-12 overflow-hidden cursor-pointer transition-all">
            <img
              className=" w-auto md:h-20 h-10 object-cover rounded-2xl transition-transform duration-700"
              src={lantislogo}
              alt="Lantis"
            />
          </div>

          <div className=" mx-6 md:mx-12 overflow-hidden cursor-pointer transition-all">
            <img
              className=" w-auto md:h-28 h-14 object-cover rounded-2xl transition-transform duration-700"
              src={nestologo}
              alt="Nesto"
            />
          </div>

          <div className="group relative  mx-6 md:mx-12 overflow-hidden cursor-pointer transition-all">
            <img
              className=" w-auto md:h-20 h-10 object-cover rounded-2xl transition-transform duration-700"
              src={ORBISFOOD}
              alt="ORBIS FOOD"
            />
          </div>

          <div className="group relative rounded-2xl bg-transparent mx-6 md:mx-12 overflow-hidden cursor-pointer transition-all">
            <img
              className=" object-cover w-auto md:h-24 h-12 rounded-2xl transition-transform duration-700"
              src={Rotanalogo}
              alt="Rotana"
            />
          </div>

          <div className="group relative rounded-2xl bg-transparent mx-6 md:mx-12 overflow-hidden cursor-pointer transition-all">
            <img
              className=" object-cover w-auto md:h-24 h-12 rounded-2xl transition-transform duration-700"
              src={TapaKing}
              alt="TapaKing"
            />
          </div>

          <div className="group relative rounded-2xl bg-transparent mx-6 md:mx-12 overflow-hidden cursor-pointer transition-all">
            <img
              className=" w-auto md:h-24 h-12 object-cover rounded-2xl transition-transform duration-700"
              src={ThoibaLogistics}
              alt="Thoiba Logistics"
            />
          </div>
        </Marquee>
      </div>
    </section>
    <BottomNav/>
    <ScrollToTopButton/>
    </>
  );
};

export default Clients;