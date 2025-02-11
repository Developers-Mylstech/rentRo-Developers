// import React from "react";
// import { Outlet } from "react-router-dom";
// import Header from "./Header";
// import Footer from "./Footer";
// import ScrollToTop from "./ScrollToTop";
// function Layout() {
//   return (
//   <>
//    <ScrollToTop/>
//   <Header />
//   <Outlet />
//   <Footer />
//   </>
//   )
// }

// export default Layout;



import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ For smooth transitions
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop.jsx";
// import Loader from "./Loader";




function Layout() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // ✅ Simulate loading effect for smooth transition
//     const timeout = setTimeout(() => setLoading(false), 4000);
//     return () => clearTimeout(timeout);
//   }, []);

//   // ✅ Show loader while page is loading
//   if (loading) return <Loader />;

  return (
    <>
      <ScrollToTop />
      <Header />

      {/* ✅ Smooth Page Transition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Outlet />
      </motion.div>

      <Footer />
    </>
  );
}

export default Layout;
