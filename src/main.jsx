


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
import ContactUs from "./Screens/ContactUs.jsx";
import RoServices from './Screens/RoServices.jsx'
import IndustrialService from './Screens/IndustrialService.jsx'
import CommercialService from './Screens/CommercialService.jsx'
import DomesticService from './Screens/DomesticService.jsx'
import AboutUs from "./Screens/AboutUs.jsx";
import Shop from './Screens/Shop.jsx'
import ProductDetail from "./Components/SaleProductDetail.jsx";
import Career from "./Screens/Career.jsx";
import CareerDetail from "./Screens/CareerDetail.jsx";
import ServiceDetails from "./screens/ServiceDetails.jsx";
import Profile from "./Screens/Profile.jsx";
import CheckoutForm from "./Components/form/CheckoutForm.jsx";
// Other theme options:
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import OrderDetail from "./Screens/OrderDetail.jsx";




const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
     

      {/* Layout wrapper for all authenticated routes */}
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/profile" element={<Profile/>} />
        
        {/* <Route path="/clients" element={<Clients/>} /> */}
        <Route path="/sell" element={<Sale/>} />
        <Route path="/product/:name" element={<ProductDetail/>} />
        <Route path="/checkout" element={<CheckoutForm/>} />
        <Route path="/rent" element={<Rent/>} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/roservices" element={<RoServices/>} />
        <Route path="/industrialservice" element={<IndustrialService/>} />
        <Route path="/commercialservice" element={<CommercialService/>} />
        <Route path="/domesticservice" element={<DomesticService/>} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/career" element={<Career/>} />
        {/* <Route path="/career/:name" element={<CareerDetail/>} /> */}
        <Route path="/service/:name" element={<ServiceDetails/>} />
        <Route path="/career/:id" element={<CareerDetail/>} />
        <Route path="/order/:id" element={<OrderDetail/>} />
      
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