


import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Header from "./Components/widget/Header.jsx";
import Home from "./Screens/Home.jsx";
import Services from "./Screens/Services.jsx";
import Clients from "./Screens/Clients.jsx";
import Footer from "./Components/widget/Footer.jsx";
import Login from "./Screens/Login.jsx";
import Rent from "./Screens/Rent.jsx";
import Sale from "./Screens/Sale.jsx";
import Signup from "./Screens/Signup.jsx";
import Layout from "./Components/Layout.jsx";
import Faq from "./screens/Faq.jsx";
import ContactUs from "./Screens/ContactUs.jsx";
import RoServices from './Screens/RoServices.jsx'
import IndustrialService from './Screens/IndustrialService.jsx'
import CommercialService from './Screens/CommercialService.jsx'
import DomesticService from './Screens/DomesticService.jsx'
import AboutUs from "./Screens/AboutUs.jsx";
import Shop from './Screens/Shop.jsx'




const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
     

      {/* Layout wrapper for all authenticated routes */}
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home/>} />
        <Route path="/services" element={<Services/>} />
        
        {/* <Route path="/clients" element={<Clients/>} /> */}
        <Route path="/sale" element={<Sale/>} />
        <Route path="/rent" element={<Rent/>} />
        <Route path="/faq" element={<Faq/>} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/roservices" element={<RoServices/>} />
        <Route path="/industrialservice" element={<IndustrialService/>} />
        <Route path="/commercialservice" element={<CommercialService/>} />
        <Route path="/domesticservice" element={<DomesticService/>} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="*" element={<Home />} />
        
        


        {/* <Route path="*" element={<Layout/>} /> */}
       

        {/* Other standalone routes */}
      
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      </Route>
      
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={routes} />
  </>
);