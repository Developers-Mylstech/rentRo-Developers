// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )









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
import Home from "./screens/Home.jsx";
import Services from "./screens/Services.jsx";
import Clients from "./screens/Clients.jsx";
import Footer from "./Components/Footer.jsx";
import Login from "./screens/Login.jsx";
import Rent from "./screens/Rent.jsx";
import Sale from "./screens/Sale.jsx";
import Signup from "./screens/Signup.jsx";
import Layout from "./Components/Layout.jsx";




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
