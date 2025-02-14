


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
import Header from "./Components/Header.jsx";
import Home from "./Screens/Home.jsx";
import Services from "./Screens/Services.jsx";
import Clients from "./Screens/Clients.jsx";
import Footer from "./Components/Footer.jsx";
import Login from "./Screens/Login.jsx";
import Rent from "./Screens/Rent.jsx";
import Sale from "./Screens/Sale.jsx";
import Signup from "./Screens/Signup.jsx";
import Layout from "./Components/Layout.jsx";
import Shop from "./Screens/Shop.jsx";
import DomesticService from "./Screens/DomesticService.jsx";
import CommercialService from "./Screens/CommercialService.jsx";
import IndustrialService from './Screens/IndustrialService.jsx';
import RoServices from './Screens/RoServices.jsx'
import ContactUs from "./Screens/ContactUs.jsx";
import AboutUs from "./Screens/AboutUs.jsx";


const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
     

      {/* Layout wrapper for all authenticated routes */}
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/clients" element={<Clients/>} />
        <Route path="/sale" element={<Sale/>} />
        <Route path="/rent" element={<Rent/>} />
         <Route path="/shop" element={<Shop/>} />
         <Route path="/contactus" element={<ContactUs/>} />
        <Route path="/domesticservices" element={<DomesticService/>} />
        <Route path="/commercialservice" element={<CommercialService/>} />
        <Route path="/industrialservice" element={<IndustrialService/>} /> 
        <Route path="/roservices" element={<RoServices/>} /> 
        <Route path="/aboutus" element={<AboutUs/>} /> 

        
        <Route path="*" element={<Layout/>} />
       
        <Route path="*" element={<Layout/>} />
       

        {/* Other standalone routes */}
      
      </Route>
      <Route path="*" element={<Layout />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={routes} />
  </>
);
