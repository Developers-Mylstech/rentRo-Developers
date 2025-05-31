import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ For smooth transitions
import Header from "./widget/Header";
import Footer from "./widget/Footer";
import ScrollToTop from "./widget/ScrollToTop.JSX";
import Loader from "./widget/Loader"; // ✅ Import the Loader component
import ScrollToTopButton from "../Components/widget/ScrollToTopButton";
import BottomNav from "./widget/BottomNav";

function Layout() {
  const [loading, setLoading] = useState(true);
 
  

  useEffect(() => {
    // ✅ Show loader for 5 seconds
    const timeout = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timeout);
  }, []);

  // ✅ Show loader while page is loading
  if (loading) return <Loader />;

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
        className="md:pt-[4.2%] pt-[15%]"
      >
        <Outlet />
      </motion.div>
      <BottomNav/>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}

export default Layout;
